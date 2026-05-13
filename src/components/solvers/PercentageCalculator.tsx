"use client";

import { useState } from "react";

function fmt(n: number) {
  if (!isFinite(n)) return "—";
  return parseFloat(n.toPrecision(8)).toString();
}

type Mode = "of" | "is_what_percent" | "change" | "increase";

const modes: { id: Mode; label: string; example: string }[] = [
  { id: "of", label: "What is X% of Y?", example: "18% of 240" },
  { id: "is_what_percent", label: "X is what % of Y?", example: "30 is what % of 120" },
  { id: "change", label: "% change from X to Y", example: "From 80 to 100" },
  { id: "increase", label: "Increase / decrease X by Y%", example: "100 + 15%" },
];

export function PercentageCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [x, setX] = useState("18");
  const [y, setY] = useState("240");
  const [submitted, setSubmitted] = useState(true);

  const xN = parseFloat(x), yN = parseFloat(y);
  const valid = !isNaN(xN) && !isNaN(yN);

  let result: { value: string; explain: string } | null = null;
  if (valid) {
    if (mode === "of") result = { value: fmt((xN / 100) * yN), explain: `(${xN}/100) × ${yN}` };
    else if (mode === "is_what_percent") result = { value: fmt((xN / yN) * 100) + "%", explain: `(${xN}/${yN}) × 100` };
    else if (mode === "change") result = { value: fmt(((yN - xN) / xN) * 100) + "%", explain: `((${yN} − ${xN}) / ${xN}) × 100` };
    else if (mode === "increase") result = { value: fmt(xN * (1 + yN / 100)), explain: `${xN} × (1 + ${yN}/100)` };
  }

  const labelX = mode === "of" ? "X (percent)" : mode === "is_what_percent" ? "X (number)" : mode === "change" ? "Original X" : "Base X";
  const labelY = mode === "of" ? "Y (number)" : mode === "is_what_percent" ? "Y (number)" : mode === "change" ? "New Y" : "Y (percent)";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-2 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setSubmitted(false); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                mode === m.id ? "bg-white text-primary border border-primary/30 shadow-sm" : "text-gray-500 hover:bg-white/50"
              }`}
            >
              <p className="font-semibold leading-tight">{m.label}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">{m.example}</p>
            </button>
          ))}
        </div>
        <div className="p-5 md:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{labelX}</label>
              <input type="number" value={x} onChange={(e) => { setX(e.target.value); setSubmitted(false); }} step="any" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5">{labelY}</label>
              <input type="number" value={y} onChange={(e) => { setY(e.target.value); setSubmitted(false); }} step="any" className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
            </div>
          </div>
          <button onClick={() => setSubmitted(true)} className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition">
            Calculate
          </button>
        </div>
      </div>

      {submitted && result && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Result</p>
            <p className="text-3xl md:text-4xl font-bold text-primary font-mono">{result.value}</p>
          </div>
          <div className="p-5 text-sm text-gray-600">
            <p><strong>Computation:</strong> <span className="font-mono">{result.explain} = {result.value}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
