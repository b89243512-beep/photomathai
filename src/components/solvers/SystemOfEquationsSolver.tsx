"use client";

import { useState } from "react";

function fmt(n: number) {
  if (!isFinite(n)) return "—";
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toPrecision(8)).toString();
}

export function SystemOfEquationsSolver() {
  const [coeffs, setCoeffs] = useState({ a1: "2", b1: "3", c1: "12", a2: "1", b2: "-1", c2: "1" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (k: keyof typeof coeffs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoeffs((p) => ({ ...p, [k]: e.target.value }));
    setSubmitted(false);
  };

  const a1 = parseFloat(coeffs.a1), b1 = parseFloat(coeffs.b1), c1 = parseFloat(coeffs.c1);
  const a2 = parseFloat(coeffs.a2), b2 = parseFloat(coeffs.b2), c2 = parseFloat(coeffs.c2);
  const det = a1 * b2 - a2 * b1;
  const x = (c1 * b2 - c2 * b1) / det;
  const y = (a1 * c2 - a2 * c1) / det;

  const valid = [a1, b1, c1, a2, b2, c2].every((n) => !isNaN(n));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Linear system</p>
          <div className="font-mono text-lg md:text-xl text-gray-900 space-y-0.5">
            <p>a₁x + b₁y = c₁</p>
            <p>a₂x + b₂y = c₂</p>
          </div>
        </div>
        <div className="p-5 md:p-6 space-y-4">
          {[1, 2].map((row) => (
            <div key={row} className="grid grid-cols-3 gap-3">
              {(["a", "b", "c"] as const).map((k) => {
                const key = `${k}${row}` as keyof typeof coeffs;
                return (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                      <span className="font-mono text-primary">{k}</span>
                      <sub>{row}</sub>
                    </label>
                    <input
                      type="number"
                      value={coeffs[key]}
                      onChange={handle(key)}
                      step="any"
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base font-mono text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                    />
                  </div>
                );
              })}
            </div>
          ))}
          <button
            onClick={() => setSubmitted(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Solve System
          </button>
        </div>
      </div>

      {submitted && valid && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {det === 0 ? (
            <div className="p-5 text-amber-700 bg-amber-50">
              <p className="font-semibold text-sm">No unique solution</p>
              <p className="text-xs mt-1">The determinant is zero — the system has either no solutions or infinitely many.</p>
            </div>
          ) : (
            <>
              <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Solution</p>
                <p className="text-xl md:text-2xl font-mono">x = <span className="font-bold text-primary">{fmt(x)}</span></p>
                <p className="text-xl md:text-2xl font-mono">y = <span className="font-bold text-primary">{fmt(y)}</span></p>
              </div>
              <div className="p-5 md:p-6 space-y-2 text-sm text-gray-600">
                <p><strong>Step 1.</strong> Compute the determinant: det = a₁b₂ − a₂b₁ = ({fmt(a1)})({fmt(b2)}) − ({fmt(a2)})({fmt(b1)}) = <span className="font-mono">{fmt(det)}</span></p>
                <p><strong>Step 2.</strong> Apply Cramer&apos;s rule: x = (c₁b₂ − c₂b₁) / det = {fmt(c1 * b2 - c2 * b1)} / {fmt(det)} = <span className="font-mono">{fmt(x)}</span></p>
                <p><strong>Step 3.</strong> y = (a₁c₂ − a₂c₁) / det = {fmt(a1 * c2 - a2 * c1)} / {fmt(det)} = <span className="font-mono">{fmt(y)}</span></p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
