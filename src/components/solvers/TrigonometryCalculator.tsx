"use client";

import { useState } from "react";

function fmt(n: number) { return parseFloat(n.toPrecision(8)).toString(); }

type Fn = "sin" | "cos" | "tan" | "asin" | "acos" | "atan";
const labels: Record<Fn, string> = { sin: "sin", cos: "cos", tan: "tan", asin: "sin⁻¹", acos: "cos⁻¹", atan: "tan⁻¹" };

export function TrigonometryCalculator() {
  const [fn, setFn] = useState<Fn>("sin");
  const [angle, setAngle] = useState("30");
  const [unit, setUnit] = useState<"deg" | "rad">("deg");
  const [submitted, setSubmitted] = useState(true);

  const xN = parseFloat(angle);
  const isInverse = fn.startsWith("a");

  let result = NaN;
  if (!isNaN(xN)) {
    if (isInverse) {
      result = Math[fn](xN);
      if (unit === "deg") result = (result * 180) / Math.PI;
    } else {
      const radians = unit === "deg" ? (xN * Math.PI) / 180 : xN;
      result = Math[fn](radians);
      if (Math.abs(result) < 1e-12) result = 0;
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Trigonometric function</p>
          <p className="font-mono text-lg text-gray-900">{labels[fn]}(x)</p>
        </div>
        <div className="p-5 md:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Function</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["sin", "cos", "tan", "asin", "acos", "atan"] as Fn[]).map((f) => (
                <button key={f} onClick={() => { setFn(f); setSubmitted(false); }} className={`py-2 rounded-lg font-mono text-sm transition ${fn === f ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{labels[f]}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 items-end">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{isInverse ? "Value (between −1 and 1)" : "Angle"}</label>
              <input type="number" value={angle} onChange={(e) => { setAngle(e.target.value); setSubmitted(false); }} step="any" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{isInverse ? "Output unit" : "Input unit"}</label>
              <select value={unit} onChange={(e) => { setUnit(e.target.value as "deg" | "rad"); setSubmitted(false); }} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
                <option value="deg">Degrees</option>
                <option value="rad">Radians</option>
              </select>
            </div>
          </div>
          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">Calculate</button>
        </div>
      </div>

      {submitted && !isNaN(result) && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Result</p>
            <p className="font-mono text-2xl md:text-3xl">
              {labels[fn]}({xN}{!isInverse && unit === "deg" && "°"}) = <span className="font-bold text-primary">{fmt(result)}{isInverse && unit === "deg" && "°"}</span>
            </p>
          </div>
          {!isInverse && (
            <div className="p-5 text-sm text-gray-600 space-y-1.5">
              <p><strong>Step 1.</strong> {unit === "deg" ? `Convert to radians: ${xN}° × π/180 = ${fmt((xN * Math.PI) / 180)} rad` : `Input is already in radians.`}</p>
              <p><strong>Step 2.</strong> Evaluate {labels[fn]} at this value: <span className="font-mono">{fmt(result)}</span></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
