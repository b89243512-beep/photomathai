"use client";

import { useCallback, useState } from "react";
import { Delete } from "lucide-react";

/* ---------- Safe math expression evaluator ---------- */
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
      .replace(/asin\(/g, "Math.asin(")
      .replace(/acos\(/g, "Math.acos(")
      .replace(/atan\(/g, "Math.atan(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/log\(/g, "Math.log10(")
      .replace(/√\(/g, "Math.sqrt(")
      .replace(/abs\(/g, "Math.abs(")
      .replace(/(\d+)!/g, "factorial($1)")
      .replace(/\^/g, "**");
    e = e.replace(/(\d)(Math\.|[a-zA-Z(])/g, "$1*$2");
    e = e.replace(/\)(\d|Math\.|[a-zA-Z(])/g, ")*$1");
    const factorial = (n: number): number => {
      if (n < 0) return NaN;
      if (n <= 1) return 1;
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    };
    if (/[^0-9+\-*/().Mmathlogsincoqrtabef\s^*]/.test(e.replace(/factorial/g, ""))) return "Error";
    // eslint-disable-next-line no-new-func
    const result = new Function("factorial", `"use strict"; return (${e});`)(factorial);
    if (typeof result !== "number" || !isFinite(result)) return "Error";
    return String(parseFloat(result.toPrecision(12)));
  } catch {
    return "Error";
  }
}

interface Step { description: string; value: string }

function generateSteps(expr: string, result: string): Step[] {
  const steps: Step[] = [{ description: "Original expression", value: expr }];
  const clean = expr.replace(/×/g, "*").replace(/÷/g, "/");
  if (/sin|cos|tan/.test(expr)) steps.push({ description: "Evaluate trigonometric function(s)", value: "Compute trig values (radians)" });
  if (/ln\(/.test(expr)) steps.push({ description: "Evaluate natural logarithm", value: "ln(x) = logₑ(x)" });
  if (/log\(/.test(expr)) steps.push({ description: "Evaluate base-10 logarithm", value: "log(x) = log₁₀(x)" });
  if (/√/.test(expr)) steps.push({ description: "Evaluate square root", value: "√(x) = x^(1/2)" });
  if (/π/.test(expr)) steps.push({ description: "Substitute π", value: `π ≈ ${Math.PI.toFixed(6)}` });
  if (/(?<![a-z])e(?![a-z])/.test(expr)) steps.push({ description: "Substitute e (Euler's number)", value: `e ≈ ${Math.E.toFixed(6)}` });
  if (/\^|\*\*/.test(clean)) steps.push({ description: "Apply exponentiation", value: "Evaluate powers" });
  if (/[*/]/.test(clean.replace(/\*\*/g, ""))) steps.push({ description: "Perform multiplication / division", value: "Left to right" });
  if (/[+-]/.test(clean.replace(/^-/, "").replace(/\(-/g, ""))) steps.push({ description: "Perform addition / subtraction", value: "Left to right" });
  steps.push({ description: "Final result", value: result });
  return steps;
}

const basicKeys = [
  ["7", "8", "9", "÷", "(", ")"],
  ["4", "5", "6", "×", "√(", "^"],
  ["1", "2", "3", "−", "π", "e"],
  ["0", ".", "+", "!", "log(", "ln("],
];

const funcKeys = [
  ["sin(", "cos(", "tan(", "ln(", "log(", "√("],
  ["sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "abs(", "e", "π"],
];

type Tab = "Basic" | "Functions";

function mapKey(k: string): string {
  switch (k) {
    case "−": return "-";
    case "sin⁻¹(": return "asin(";
    case "cos⁻¹(": return "acos(";
    case "tan⁻¹(": return "atan(";
    default: return k;
  }
}

const isOp = (k: string) => ["+", "−", "×", "÷", "^"].includes(k);
const isFn = (k: string) => ["sin(", "cos(", "tan(", "ln(", "log(", "√(", "sin⁻¹(", "cos⁻¹(", "tan⁻¹(", "abs(", "e", "π"].includes(k);

export function InlineCalculator({ placeholder = "2x + 5 = 13" }: { placeholder?: string }) {
  const [expression, setExpression] = useState("");
  const [tab, setTab] = useState<Tab>("Basic");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);

  const press = useCallback((k: string) => {
    setExpression((p) => p + mapKey(k));
    setResult(null);
    setSteps([]);
  }, []);

  const solve = useCallback(() => {
    if (!expression.trim()) return;
    const r = evaluateExpression(expression);
    setResult(r);
    setSteps(generateSteps(expression, r));
  }, [expression]);

  const clear = useCallback(() => { setExpression(""); setResult(null); setSteps([]); }, []);
  const back = useCallback(() => {
    setExpression((p) => p.slice(0, -1));
    setResult(null);
    setSteps([]);
  }, []);

  const keys = tab === "Basic" ? basicKeys : funcKeys;

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={expression}
              onChange={(e) => { setExpression(e.target.value); setResult(null); setSteps([]); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); solve(); } }}
              placeholder={placeholder}
              className="flex-1 text-lg font-mono text-gray-900 placeholder:text-gray-300 bg-transparent focus:outline-none py-2"
            />
            <button
              onClick={back}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              aria-label="Backspace"
            >
              <Delete className="w-5 h-5" />
            </button>
            <button
              onClick={solve}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
            >
              Solve
            </button>
          </div>
        </div>

        <div className="flex border-b border-gray-100">
          {(["Basic", "Functions"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                tab === t ? "text-gray-900 border-b-2 border-indigo-600 bg-gray-50" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="p-3 bg-gray-50/50">
          {keys.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 mb-1.5">
              {row.map((k, ki) => (
                <button
                  key={ki}
                  onClick={() => press(k)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${
                    isOp(k)
                      ? "bg-rose-100 text-rose-600 hover:bg-rose-200"
                      : isFn(k)
                      ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                      : "bg-white text-gray-900 hover:bg-gray-100 shadow-sm border border-gray-200"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          ))}
          <button
            onClick={clear}
            className="w-full py-2.5 rounded-lg bg-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-300 transition-colors active:scale-95 mt-1"
          >
            Clear
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-cyan-50">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Result</p>
            <p className="text-3xl font-bold text-gray-900 font-mono">{result}</p>
          </div>
          <div className="p-5">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Step-by-Step Solution</p>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{s.description}</p>
                    <p className="text-sm text-gray-400 font-mono mt-0.5">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
