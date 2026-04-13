import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

/* ------------------------------------------------------------------ */
/*  Rate limiting (in-memory, per IP)                                  */
/* ------------------------------------------------------------------ */

const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 10; // max requests per window
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  // Clean up expired entries every 100 checks to prevent memory leak
  if (rateLimit.size > 1000) {
    for (const [key, val] of rateLimit) {
      if (now > val.resetTime) rateLimit.delete(key);
    }
  }

  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count++;
  return true;
}

/* ------------------------------------------------------------------ */
/*  Security helpers                                                   */
/* ------------------------------------------------------------------ */

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_TEXT_LENGTH = 1000;
const MAX_CONTEXT_LENGTH = 5000;

const ALLOWED_ORIGINS = [
  "https://photomathai.com",
  "https://www.photomathai.com",
  "http://localhost:3000",
  "http://localhost:3001",
];

function checkOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Allow if no origin (same-origin requests from browser)
  if (!origin && !referer) return true;

  if (origin && ALLOWED_ORIGINS.includes(origin)) return true;
  if (referer) {
    for (const allowed of ALLOWED_ORIGINS) {
      if (referer.startsWith(allowed)) return true;
    }
  }

  return false;
}

function sanitizeText(text: string, maxLen: number): string {
  return text.slice(0, maxLen).replace(/[<>]/g, "").trim();
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* ------------------------------------------------------------------ */
/*  Shared Gemini setup                                                */
/* ------------------------------------------------------------------ */

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
}

const SYSTEM_PROMPT = `You are a professional math tutor and problem solver called "Free PhotoMath AI".
When given a math problem (from an image or text):
1. First, clearly state what the problem is asking
2. Provide a detailed step-by-step solution
3. Clearly state the final answer
4. If relevant, explain the concept behind the solution

Format your response using markdown:
- Use **bold** for important terms
- Use headers (##) to separate sections
- Use numbered lists for steps
- Do NOT use LaTeX notation like $...$ or \\frac{}{}
- Write math expressions in plain text: use / for fractions, ^ for exponents, sqrt() for roots
- Example: write "x = (-b + sqrt(b^2 - 4ac)) / (2a)" not "$x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}$"

Be thorough but clear. Explain each step so a student can learn from it.
If the image is not a math problem, politely let the user know and try to help anyway.`;

/* ------------------------------------------------------------------ */
/*  POST /api/solve — initial solve (image or text)                    */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  try {
    // Origin check
    if (!checkOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const question = formData.get("question") as string | null;

    if (!file && !question) {
      return NextResponse.json(
        { error: "Please upload an image or type a question." },
        { status: 400 }
      );
    }

    // Validate file
    if (file) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: "Invalid file type. Please upload JPG, PNG, WebP, or PDF." },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File too large. Maximum size is 5MB." },
          { status: 400 }
        );
      }
    }

    // Validate text input
    if (question && (typeof question !== "string" || question.length > MAX_TEXT_LENGTH)) {
      return NextResponse.json(
        { error: "Question too long. Maximum 1000 characters." },
        { status: 400 }
      );
    }

    const model = getModel();
    if (!model) {
      return NextResponse.json(
        { error: "Service temporarily unavailable." },
        { status: 503 }
      );
    }

    // Build request parts
    const parts: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }> = [
      { text: SYSTEM_PROMPT },
    ];

    if (file) {
      const bytes = await file.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");
      parts.push({
        inlineData: { mimeType: file.type, data: base64 },
      });
      const safeQ = question ? sanitizeText(question, MAX_TEXT_LENGTH) : "";
      parts.push({
        text: safeQ
          ? `Analyze this math problem image and answer this specific question: ${safeQ}`
          : "Analyze this math problem and provide a complete step-by-step solution.",
      });
    } else if (question) {
      parts.push({ text: sanitizeText(question, MAX_TEXT_LENGTH) });
    }

    const result = await model.generateContent(parts);
    const text = result.response.text();

    return NextResponse.json({ solution: text });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}

/* ------------------------------------------------------------------ */
/*  PUT /api/solve — follow-up chat                                    */
/* ------------------------------------------------------------------ */

export async function PUT(request: NextRequest) {
  try {
    // Origin check
    if (!checkOrigin(request)) {
      return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    // Rate limiting
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { question, context } = body;

    if (!question || typeof question !== "string" || question.length > MAX_TEXT_LENGTH) {
      return NextResponse.json({ error: "Invalid question." }, { status: 400 });
    }

    const model = getModel();
    if (!model) {
      return NextResponse.json(
        { error: "Service temporarily unavailable." },
        { status: 503 }
      );
    }

    const safeQuestion = sanitizeText(question, MAX_TEXT_LENGTH);
    const safeContext = typeof context === "string"
      ? sanitizeText(context, MAX_CONTEXT_LENGTH)
      : "No previous context.";

    const prompt = `You are a professional math tutor called "Free PhotoMath AI".
You previously solved a math problem. Here is the context of the previous solution:

${safeContext}

The student now asks a follow-up question: "${safeQuestion}"

Provide a clear, helpful response. Use markdown formatting. Do NOT use LaTeX notation — write math in plain text.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ solution: text });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again." },
      { status: 500 }
    );
  }
}
