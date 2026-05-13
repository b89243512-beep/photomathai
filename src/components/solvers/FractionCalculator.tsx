"use client";

import { useState } from "react";

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

function simplify(n: number, d: number) {
  if (d === 0) return { n: NaN, d: NaN };
  const sign = (n * d) < 0 ? -1 : 1;
  const an = Math.abs(n), ad = Math.abs(d);
  const g = gcd(an, ad);
  return { n: sign * (an / g), d: ad / g };
}

type Op = "+" | "−" | "×" | "÷";

export function FractionCalculator() {
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [op, setOp] = useState<Op>("+");
  const [n2, setN2] = useState("2");
  const [d2, setD2] = useState("3");
  const [submitted, setSubmitted] = useState(true);

  const A = parseInt(n1, 10), B = parseInt(d1, 10), C = parseInt(n2, 10), D = parseInt(d2, 10);
  const valid = ![A, B, C, D].some((v) => isNaN(v)) && B !== 0 && D !== 0;

  let result = { n: 0, d: 1 };
  let explain = "";
  if (valid) {
    if (op === "+") {
      result = { n: A * D + C * B, d: B * D };
      explain = `${A}/${B} + ${C}/${D} = (${A}·${D} + ${C}·${B}) / (${B}·${D}) = ${A * D + C * B}/${B * D}`;
    } else if (op === "−") {
      result = { n: A * D - C * B, d: B * D };
      explain = `${A}/${B} − ${C}/${D} = (${A}·${D} − ${C}·${B}) / (${B}·${D}) = ${A * D - C * B}/${B * D}`;
    } else if (op === "×") {
      result = { n: A * C, d: B * D };
      explain = `${A}/${B} × ${C}/${D} = (${A}·${C}) / (${B}·${D}) = ${A * C}/${B * D}`;
    } else {
      result = { n: A * D, d: B * C };
      explain = `${A}/${B} ÷ ${C}/${D} = ${A}/${B} × ${D}/${C} = ${A * D}/${B * C}`;
    }
  }
  const simp = simplify(result.n, result.d);
  const decimal = simp.d ? simp.n / simp.d : NaN;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Fraction operation</p>
          <p className="font-mono text-lg text-gray-900">a/b {op} c/d</p>
        </div>
        <div className="p-5 md:p-6">
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <FractionInput n={n1} d={d1} setN={setN1} setD={setD1} onChange={() => setSubmitted(false)} />
            <select value={op} onChange={(e) => { setOp(e.target.value as Op); setSubmitted(false); }} className="px-3 py-2 rounded-lg border border-gray-200 text-xl font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
              {(["+", "−", "×", "÷"] as Op[]).map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <FractionInput n={n2} d={d2} setN={setN2} setD={setD2} onChange={() => setSubmitted(false)} />
          </div>
          <button onClick={() => setSubmitted(true)} className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">Calculate</button>
        </div>
      </div>

      {submitted && valid && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Result</p>
            <div className="flex items-baseline gap-4 flex-wrap">
              <p className="text-3xl md:text-4xl font-bold text-primary font-mono">
                <span className="inline-flex flex-col items-center align-middle leading-none">
                  <span>{simp.n}</span>
                  <span className="border-t-2 border-current px-2">{simp.d}</span>
                </span>
              </p>
              <p className="text-sm text-gray-500 font-mono">≈ {parseFloat(decimal.toPrecision(8)).toString()}</p>
            </div>
          </div>
          <div className="p-5 text-sm text-gray-600 space-y-1.5">
            <p><strong>Step 1.</strong> <span className="font-mono">{explain}</span></p>
            <p><strong>Step 2.</strong> Simplify by GCD({Math.abs(result.n)}, {result.d}) = {gcd(result.n, result.d)} → <span className="font-mono">{simp.n}/{simp.d}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}

function FractionInput({ n, d, setN, setD, onChange }: { n: string; d: string; setN: (v: string) => void; setD: (v: string) => void; onChange: () => void }) {
  return (
    <div className="flex flex-col items-center">
      <input type="number" value={n} onChange={(e) => { setN(e.target.value); onChange(); }} className="w-20 text-center py-2 rounded-lg border border-gray-200 text-lg font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
      <div className="w-20 h-px bg-gray-400 my-1" />
      <input type="number" value={d} onChange={(e) => { setD(e.target.value); onChange(); }} className="w-20 text-center py-2 rounded-lg border border-gray-200 text-lg font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
    </div>
  );
}
