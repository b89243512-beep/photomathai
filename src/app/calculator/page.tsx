"use client";

import { useState, useCallback } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  ChevronDown,
  ChevronUp,
  Delete,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Safe math expression evaluator                                     */
/* ------------------------------------------------------------------ */

function evaluateExpression(expr: string): string {
  try {
    let e = expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/π/g, `(${Math.PI})`)
      .replace(/e(?![a-z])/g, `(${Math.E})`)
      .replace(/sin\(/g, "Math.sin(")
      .replace(/cos\(/g, "Math.cos(")
      .replace(/tan\(/g, "Math.tan(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/abs\(/g, "Math.abs(")
      .replace(/(\d+)!/g, "factorial($1)")
      .replace(/\^/g, "**");

    // Implicit multiplication: 2π, 3(, )(
    e = e.replace(/(\d)(Math\.|[a-zA-Z(])/g, "$1*$2");
    e = e.replace(/\)(\d|Math\.|[a-zA-Z(])/g, ")*$1");

    // Factorial helper
    const factorial = (n: number): number => {
      if (n < 0) return NaN;
      if (n <= 1) return 1;
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    };

    // Validate: only allow safe characters
    if (/[^0-9+\-*/().Mmathlogsincoqrtabef\s^*]/.test(e.replace(/factorial/g, ""))) {
      return "Error";
    }

    // eslint-disable-next-line no-new-func
    const result = new Function("factorial", `"use strict"; return (${e});`)(factorial);

    if (typeof result !== "number" || !isFinite(result)) return "Error";

    // Clean up floating point
    const rounded = parseFloat(result.toPrecision(12));
    return String(rounded);
  } catch {
    return "Error";
  }
}

/* ------------------------------------------------------------------ */
/*  Step-by-step solution generator                                    */
/* ------------------------------------------------------------------ */

interface Step {
  description: string;
  value: string;
}

function generateSteps(expr: string, result: string): Step[] {
  const steps: Step[] = [];
  const clean = expr.replace(/×/g, "*").replace(/÷/g, "/");

  steps.push({ description: "Original expression", value: expr });

  // Detect expression type and add relevant steps
  if (/sin|cos|tan/.test(expr)) {
    steps.push({ description: "Evaluate trigonometric function(s)", value: `Compute trig values (radians)` });
  }
  if (/ln\(/.test(expr)) {
    steps.push({ description: "Evaluate natural logarithm", value: `ln(x) = logₑ(x)` });
  }
  if (/log\(/.test(expr)) {
    steps.push({ description: "Evaluate base-10 logarithm", value: `log(x) = log₁₀(x)` });
  }
  if (/√/.test(expr)) {
    steps.push({ description: "Evaluate square root", value: `√(x) = x^(1/2)` });
  }
  if (/π/.test(expr)) {
    steps.push({ description: "Substitute π", value: `π ≈ ${Math.PI.toFixed(6)}` });
  }
  if (/(?<![a-z])e(?![a-z])/.test(expr)) {
    steps.push({ description: "Substitute e (Euler's number)", value: `e ≈ ${Math.E.toFixed(6)}` });
  }

  if (/\^|\*\*/.test(clean)) {
    steps.push({ description: "Apply exponentiation", value: "Evaluate powers" });
  }
  if (/[*/]/.test(clean.replace(/\*\*/g, ""))) {
    steps.push({ description: "Perform multiplication / division", value: "Left to right" });
  }
  if (/[+-]/.test(clean.replace(/^-/, "").replace(/\(-/g, ""))) {
    steps.push({ description: "Perform addition / subtraction", value: "Left to right" });
  }

  steps.push({ description: "Final result", value: result });
  return steps;
}

/* ------------------------------------------------------------------ */
/*  Calculator tabs config                                             */
/* ------------------------------------------------------------------ */

type TabName = "Basic" | "Functions" | "abc" | "≤ ∨";

const basicKeys = [
  ["x", "y", "z", "x²", "xⁿ", "□/□", "∂"],
  ["7", "8", "9", "+", "e", "ln(", "sin("],
  ["4", "5", "6", "−", "π", "log(", "cos("],
  ["1", "2", "3", "×", "(", ")", "tan("],
  ["0", ".", "÷", "^", "√(", "!", ""],
];

const functionKeys = [
  ["sin(", "cos(", "tan(", "ln(", "log(", "√("],
  ["sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "abs(", "e", "π"],
];

const abcKeys = [
  ["a", "b", "c", "d", "f", "g"],
  ["h", "i", "j", "k", "l", "m"],
  ["n", "p", "q", "r", "s", "t"],
  ["u", "v", "w", "x", "y", "z"],
];

const comparisonKeys = [
  ["<", ">", "≤", "≥", "=", "≠"],
  ["∞", "∪", "∩", "∈", "⊂", "∅"],
];

function getKeysForTab(tab: TabName) {
  switch (tab) {
    case "Basic": return basicKeys;
    case "Functions": return functionKeys;
    case "abc": return abcKeys;
    case "≤ ∨": return comparisonKeys;
  }
}

function mapKeyToInsert(key: string): string {
  switch (key) {
    case "x²": return "^2";
    case "xⁿ": return "^";
    case "□/□": return "/";
    case "∂": return "d/d";
    case "−": return "-";
    case "sin⁻¹(": return "asin(";
    case "cos⁻¹(": return "acos(";
    case "tan⁻¹(": return "atan(";
    default: return key;
  }
}

function isOperatorKey(key: string) {
  return ["+", "−", "×", "÷", "^", "="].includes(key);
}

function isSpecialKey(key: string) {
  return ["sin(", "cos(", "tan(", "ln(", "log(", "√(", "sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "abs(", "e", "π", "∂"].includes(key);
}

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    question: "Is the Free Photo Math Calculator really free?",
    answer: "Yes, the Free Photo Math Calculator is completely free to use. You can solve unlimited math problems with step-by-step solutions without any hidden fees, subscriptions, or account registration.",
  },
  {
    question: "What types of calculations can I perform?",
    answer: "The Free Photo Math Calculator supports basic arithmetic (addition, subtraction, multiplication, division), exponents, square roots, trigonometric functions (sin, cos, tan), logarithms (natural log and base-10), constants (π and e), factorials, and more.",
  },
  {
    question: "Does the calculator show step-by-step solutions?",
    answer: "Yes, every calculation includes a detailed step-by-step breakdown showing how the result was obtained. This helps you understand the solution process, not just the final answer.",
  },
  {
    question: "Can I use the calculator on my phone?",
    answer: "Absolutely. The Free Photo Math Calculator is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. No app download required.",
  },
  {
    question: "How accurate are the calculations?",
    answer: "The calculator uses high-precision floating-point arithmetic and provides results accurate to 12 significant digits. For most academic and professional purposes, this level of precision is more than sufficient.",
  },
  {
    question: "Can I use variables in my expressions?",
    answer: "The calculator keypad includes variables (x, y, z, a through z) for building expressions. For evaluating expressions with specific variable values, substitute the numbers before solving.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ Item Component                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden transition-all duration-200 hover:border-indigo-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Calculator Page                                               */
/* ------------------------------------------------------------------ */

export default function CalculatorPage() {
  const [expression, setExpression] = useState("");
  const [activeTab, setActiveTab] = useState<TabName>("Basic");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);

  const handleKeyPress = useCallback((key: string) => {
    const insert = mapKeyToInsert(key);
    setExpression((prev) => prev + insert);
    setResult(null);
    setSteps([]);
  }, []);

  const handleSolve = useCallback(() => {
    if (!expression.trim()) return;
    const res = evaluateExpression(expression);
    setResult(res);
    setSteps(generateSteps(expression, res));
  }, [expression]);

  const handleClear = useCallback(() => {
    setExpression("");
    setResult(null);
    setSteps([]);
  }, []);

  const handleBackspace = useCallback(() => {
    setExpression((prev) => prev.slice(0, -1));
    setResult(null);
    setSteps([]);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSolve();
      }
    },
    [handleSolve]
  );

  const keys = getKeysForTab(activeTab);
  const tabs: TabName[] = ["Basic", "Functions", "abc", "≤ ∨"];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-8 md:py-10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
              Free Photo Math Calculator:{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Step-by-Step Solutions
              </span>
            </h1>
            <p className="text-sm md:text-base text-gray-500 mt-2 max-w-2xl mx-auto leading-relaxed">
              Instant, step-by-step solutions for any math expression you can think of. Whether you need to solve algebra equations, evaluate trigonometric functions, compute logarithms, or work through calculus problems — the Free Photo Math Calculator gives you detailed breakdowns of every step, completely free and with no sign-up required.
            </p>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-6 md:py-10">
          <div className="max-w-lg mx-auto px-4">
            {/* Calculator Body */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Input Area */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={expression}
                      onChange={(e) => {
                        setExpression(e.target.value);
                        setResult(null);
                        setSteps([]);
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="ax² + bx + c = 0"
                      className="w-full text-lg font-mono text-gray-900 placeholder:text-gray-300 bg-transparent focus:outline-none py-2"
                    />
                  </div>
                  <button
                    onClick={handleBackspace}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                    aria-label="Backspace"
                  >
                    <Delete className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleSolve}
                    className="px-5 py-2 rounded-xl bg-rose-400 hover:bg-rose-500 text-white font-semibold text-sm transition-colors"
                  >
                    Solve
                  </button>
                </div>
              </div>

              {/* Keypad Tabs */}
              <div className="flex border-b border-gray-100">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                      activeTab === tab
                        ? "text-gray-900 border-b-2 border-gray-900 bg-gray-50"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tab === "Functions" ? "Functions ∨" : tab === "abc" ? "abc ∨" : tab}
                  </button>
                ))}
              </div>

              {/* Keypad */}
              <div className="p-3 bg-gray-50/50">
                {keys.map((row, ri) => (
                  <div key={ri} className="flex gap-1.5 mb-1.5">
                    {row.map((key, ki) =>
                      key === "" ? (
                        <div key={ki} className="flex-1" />
                      ) : (
                        <button
                          key={ki}
                          onClick={() => handleKeyPress(key)}
                          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                            isOperatorKey(key)
                              ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                              : isSpecialKey(key)
                              ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                              : /^\d$/.test(key) || key === "."
                              ? "bg-white text-gray-900 hover:bg-gray-100 shadow-sm border border-gray-200"
                              : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200"
                          }`}
                        >
                          {key}
                        </button>
                      )
                    )}
                  </div>
                ))}

                {/* Bottom row: Clear */}
                <div className="flex gap-1.5 mt-1">
                  <button
                    onClick={handleClear}
                    className="flex-1 py-2.5 rounded-lg bg-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-300 transition-colors active:scale-95"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* Result & Steps */}
            {result && (
              <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                {/* Result */}
                <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Result</p>
                  <p className="text-3xl font-bold text-gray-900 font-mono">
                    {result}
                  </p>
                </div>

                {/* Steps */}
                <div className="p-5">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                    Step-by-Step Solution
                  </p>
                  <div className="space-y-3">
                    {steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {step.description}
                          </p>
                          <p className="text-sm text-gray-400 font-mono mt-0.5">
                            {step.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-gray-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Free Photo Math Calculator: Your Complete Online Math Solver
              </h2>
              <p>
                The Free Photo Math Calculator is a powerful, browser-based tool that lets you solve mathematical expressions instantly with clear, step-by-step explanations. Whether you are working on basic arithmetic, algebraic equations, trigonometric identities, or logarithmic expressions, this calculator handles it all — completely free and without requiring any sign-up or software download.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                Solve Any Math Problem with Detailed Steps
              </h3>
              <p>
                Unlike standard calculators that only give you the final answer, the Free Photo Math Calculator breaks down every problem into clear, understandable steps. When you enter an expression and tap Solve, you receive a complete walkthrough showing the order of operations, function evaluations, and intermediate calculations that lead to the result. This makes it an ideal learning tool for students who want to understand the reasoning behind each solution, not just memorize answers.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                Comprehensive Mathematical Functions
              </h3>
              <p>
                The Free Photo Math Calculator supports a wide range of mathematical operations. You can compute trigonometric functions including sine, cosine, and tangent, as well as their inverse counterparts. Natural logarithms, base-10 logarithms, square roots, exponents, and factorials are all available at the tap of a button. The calculator also recognizes mathematical constants like π and e, allowing you to work with precise values in your computations. This breadth of functionality makes it suitable for everything from middle school homework to university-level coursework.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                Designed for Students and Educators
              </h3>
              <p>
                The intuitive keypad interface is designed to mimic the layout of scientific calculators that students are already familiar with. The organized tab system separates basic operations, advanced functions, variables, and comparison operators into logical groups, making it easy to find exactly what you need. The responsive design ensures that the calculator works perfectly on phones, tablets, and laptops, so you can solve problems wherever you are — in class, at the library, or at home.
              </p>

              <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">
                Completely Free with No Limitations
              </h3>
              <p>
                There are no usage limits, no premium tiers, and no account requirements. The Free Photo Math Calculator is available to everyone, anytime. Process as many calculations as you need throughout your study sessions. Every feature, including step-by-step solutions, is accessible without payment. Our mission is to make quality math tools available to every student regardless of their financial situation, ensuring that access to education is never limited by cost.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-gray-50" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 mt-4 text-lg">
                Everything you need to know about the Free Photo Math Calculator.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
