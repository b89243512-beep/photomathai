"use client";

import { useState, useMemo } from "react";

function fmt(n: number) { return parseFloat(n.toPrecision(8)).toString(); }

export function StandardDeviationCalculator() {
  const [raw, setRaw] = useState("4, 8, 15, 16, 23, 42");
  const [mode, setMode] = useState<"sample" | "population">("sample");

  const stats = useMemo(() => {
    const nums = raw.split(/[,\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    if (nums.length < 2) return null;
    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sqDiff = nums.map((x) => (x - mean) ** 2);
    const sqSum = sqDiff.reduce((a, b) => a + b, 0);
    const variance = mode === "sample" ? sqSum / (n - 1) : sqSum / n;
    const stdev = Math.sqrt(variance);
    return { nums, n, sum, mean, sqSum, variance, stdev };
  }, [raw, mode]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Mean, variance, standard deviation</p>
          <p className="font-mono text-base text-gray-900">σ = √(Σ(x − μ)² / N)</p>
        </div>
        <div className="p-5 md:p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Data values (comma or space separated)</label>
            <textarea value={raw} onChange={(e) => setRaw(e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-base font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Sample or population?</label>
            <div className="grid grid-cols-2 gap-2">
              {(["sample", "population"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)} className={`py-2.5 rounded-lg text-sm font-medium capitalize transition ${mode === m ? "bg-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{m} (n {m === "sample" ? "−" : ""}{m === "sample" ? " 1" : ""})</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {stats && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Mean (μ)</p>
              <p className="text-2xl font-bold text-primary font-mono mt-1">{fmt(stats.mean)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Variance</p>
              <p className="text-2xl font-bold text-primary font-mono mt-1">{fmt(stats.variance)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Std Dev (σ)</p>
              <p className="text-2xl font-bold text-primary font-mono mt-1">{fmt(stats.stdev)}</p>
            </div>
          </div>
          <div className="p-5 text-sm text-gray-600 space-y-1.5">
            <p><strong>Step 1.</strong> Count: n = {stats.n}, Sum: {fmt(stats.sum)}</p>
            <p><strong>Step 2.</strong> Mean: μ = {fmt(stats.sum)} / {stats.n} = <span className="font-mono">{fmt(stats.mean)}</span></p>
            <p><strong>Step 3.</strong> Σ(x − μ)² = {fmt(stats.sqSum)}</p>
            <p><strong>Step 4.</strong> Variance ({mode}): {mode === "sample" ? `${fmt(stats.sqSum)} / (${stats.n} − 1)` : `${fmt(stats.sqSum)} / ${stats.n}`} = <span className="font-mono">{fmt(stats.variance)}</span></p>
            <p><strong>Step 5.</strong> σ = √variance = <span className="font-mono">{fmt(stats.stdev)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
