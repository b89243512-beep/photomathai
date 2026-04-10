"use client";

import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import {
  SendHorizonal,
  Loader2,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ImageIcon,
  ArrowDown,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  image?: string;
}

function cleanLatex(text: string): string {
  return text
    // Block LaTeX: $$...$$ or \[...\]
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, expr) => formatMathExpr(expr))
    .replace(/\\\[([\s\S]+?)\\\]/g, (_, expr) => formatMathExpr(expr))
    // Inline LaTeX: $...$
    .replace(/\$(.+?)\$/g, (_, expr) => `<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">${formatMathExpr(expr)}</code>`)
    // Leftover \text{...}
    .replace(/\\text\{([^}]+)\}/g, "$1");
}

function formatMathExpr(expr: string): string {
  return expr
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)")
    .replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)")
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\sqrt\[(\d+)\]\{([^}]+)\}/g, "ⁿ√($2)")
    .replace(/\^{([^}]+)}/g, "^($1)")
    .replace(/_{([^}]+)}/g, "₍$1₎")
    .replace(/\\times/g, "×")
    .replace(/\\cdot/g, "·")
    .replace(/\\div/g, "÷")
    .replace(/\\pm/g, "±")
    .replace(/\\mp/g, "∓")
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\approx/g, "≈")
    .replace(/\\infty/g, "∞")
    .replace(/\\pi/g, "π")
    .replace(/\\theta/g, "θ")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\sigma/g, "σ")
    .replace(/\\sum/g, "Σ")
    .replace(/\\prod/g, "Π")
    .replace(/\\int/g, "∫")
    .replace(/\\partial/g, "∂")
    .replace(/\\rightarrow/g, "→")
    .replace(/\\leftarrow/g, "←")
    .replace(/\\Rightarrow/g, "⇒")
    .replace(/\\left/g, "")
    .replace(/\\right/g, "")
    .replace(/\\quad/g, "  ")
    .replace(/\\,/g, " ")
    .replace(/\\;/g, " ")
    .replace(/\\!/g, "")
    .replace(/\\ /g, " ")
    .replace(/\\ln/g, "ln")
    .replace(/\\log/g, "log")
    .replace(/\\sin/g, "sin")
    .replace(/\\cos/g, "cos")
    .replace(/\\tan/g, "tan")
    .replace(/\\[a-zA-Z]+/g, "")
    .replace(/[{}]/g, "")
    .trim();
}

function MarkdownContent({ content }: { content: string }) {
  const cleaned = cleanLatex(content);
  const html = cleaned
    .replace(/^### (.+)$/gm, '<h3 class="text-base font-bold text-gray-900 mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-lg font-bold text-gray-900 mt-5 mb-2">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
    .replace(/`([^`]+)`/g, '<code class="bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^(\d+)\. (.+)$/gm, '<div class="flex gap-3 my-2"><span class="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">$1</span><span class="pt-0.5">$2</span></div>')
    .replace(/^[•\-] (.+)$/gm, '<div class="flex gap-2 my-1.5"><span class="text-indigo-400 mt-1">•</span><span>$1</span></div>')
    .replace(/\n\n/g, '</p><p class="my-3">')
    .replace(/\n/g, "<br/>");

  return (
    <div
      className="text-sm text-gray-600 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
}

export default function SolvePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const lastMsgRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("mathSolution");
    const storedImage = sessionStorage.getItem("mathImage");
    const storedQuestion = sessionStorage.getItem("mathQuestion");

    if (stored) {
      const msgs: Message[] = [];
      if (storedImage || storedQuestion) {
        msgs.push({
          role: "user",
          content: storedQuestion || "Solve this math problem",
          image: storedImage || undefined,
        });
      }
      msgs.push({ role: "assistant", content: stored });
      setMessages(msgs);
      setInitialLoading(false);
    } else {
      window.location.href = "/";
    }
  }, []);

  // Scroll to the start of the latest assistant message (not the bottom)
  useEffect(() => {
    if (lastMsgRef.current && messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === "assistant") {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [messages]);

  // Track scroll position for "scroll to bottom" button
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const diff = container.scrollHeight - container.scrollTop - container.clientHeight;
      setShowScrollBtn(diff > 200);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleFollowUp = async (overrideInput?: string) => {
    const msg = overrideInput || input.trim();
    if (!msg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: msg }]);
    setLoading(true);

    try {
      const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant");
      const res = await fetch("/api/solve", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg, context: lastAssistant?.content || "" }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.error ? `Error: ${data.error}` : data.solution },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleNewImage = async (file: File) => {
    if (loading) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setMessages((prev) => [
        ...prev,
        { role: "user", content: "Solve this problem", image: imageData },
      ]);
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/solve", { method: "POST", body: formData });
        const data = await res.json();
        if (data.solution) sessionStorage.setItem("mathSolution", data.solution);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error ? `Error: ${data.error}` : data.solution },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleFollowUp();
    }
  };

  if (initialLoading) {
    return (
      <div className="h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
            <p className="text-sm text-gray-400">Loading solution...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />

      {/* Scrollable chat area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto bg-gray-50/50"
      >
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
          {messages.map((msg, i) => {
            const isLastAssistant = msg.role === "assistant" && i === messages.length - 1;
            return (
            <div
              key={i}
              ref={isLastAssistant ? lastMsgRef : undefined}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-white text-[10px] font-bold">AI</span>
                </div>
              )}

              <div
                className={`${
                  msg.role === "user"
                    ? "max-w-md bg-indigo-500 text-white rounded-2xl rounded-tr-sm px-4 py-3"
                    : "max-w-2xl bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-gray-100"
                }`}
              >
                {msg.image && (
                  <div className="mb-3">
                    <img
                      src={msg.image}
                      alt="Math problem"
                      className="max-w-[200px] rounded-lg border border-white/20"
                    />
                  </div>
                )}

                {msg.role === "assistant" ? (
                  <>
                    <MarkdownContent content={msg.content} />
                    <div className="flex items-center gap-1 mt-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleCopy(msg.content, i)}
                        className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 transition-colors px-2 py-1 rounded-md hover:bg-gray-50"
                      >
                        {copiedIdx === i ? (
                          <><Check className="w-3 h-3 text-green-500" /> Copied</>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-green-500 hover:bg-green-50 transition-colors">
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>

              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gray-700 text-[10px] font-bold">You</span>
                </div>
              )}
            </div>
            );
          })}

          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] font-bold">AI</span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                  <span className="text-sm text-gray-400">Solving...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={scrollToBottom}
            className="w-8 h-8 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-500 transition-colors"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom fixed area: quick actions + input */}
      <div className="shrink-0 bg-white border-t border-gray-200">
        {/* Quick actions */}
        <div className="max-w-3xl mx-auto px-4 pt-3 pb-1">
          <div className="flex flex-wrap gap-1.5">
            {["Explain this step", "Simplify this solution", "Show another method"].map((q) => (
              <button
                key={q}
                onClick={() => handleFollowUp(q)}
                disabled={loading}
                className="text-xs px-3 py-1.5 rounded-full border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleNewImage(file);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:bg-indigo-50 transition-colors disabled:opacity-40 shrink-0"
              aria-label="Upload image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-gray-50 rounded-full border border-gray-200 px-4 py-2.5 flex items-center gap-2 focus-within:border-indigo-300 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow-up..."
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={() => handleFollowUp()}
                disabled={loading || !input.trim()}
                className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors disabled:opacity-30 shrink-0"
                aria-label="Send"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <SendHorizonal className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
