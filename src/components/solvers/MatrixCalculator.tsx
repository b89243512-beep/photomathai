"use client";

import { useState, useMemo } from "react";

function fmt(n: number) { return parseFloat(n.toPrecision(8)).toString(); }

type Op = "det" | "inverse" | "transpose" | "multiply" | "add";

const ops: { id: Op; label: string }[] = [
  { id: "det", label: "Determinant" },
  { id: "inverse", label: "Inverse" },
  { id: "transpose", label: "Transpose" },
  { id: "multiply", label: "Multiply" },
  { id: "add", label: "Add" },
];

type M = [[string, string], [string, string]];
const empty: M = [["", ""], ["", ""]];

function parseM(m: M): number[][] | null {
  const out = m.map((row) => row.map((c) => parseFloat(c)));
  if (out.flat().some(isNaN)) return null;
  return out;
}

export function MatrixCalculator() {
  const [op, setOp] = useState<Op>("det");
  const [A, setA] = useState<M>([["4", "2"], ["3", "1"]]);
  const [B, setB] = useState<M>([["1", "0"], ["0", "1"]]);

  const result = useMemo(() => {
    const a = parseM(A);
    if (!a) return null;
    if (op === "det") {
      const d = a[0][0] * a[1][1] - a[0][1] * a[1][0];
      return { kind: "scalar", value: fmt(d), explain: `det = (${a[0][0]})(${a[1][1]}) − (${a[0][1]})(${a[1][0]}) = ${fmt(d)}` };
    }
    if (op === "transpose") {
      return { kind: "matrix", value: [[a[0][0], a[1][0]], [a[0][1], a[1][1]]], explain: "Swap rows and columns." };
    }
    if (op === "inverse") {
      const d = a[0][0] * a[1][1] - a[0][1] * a[1][0];
      if (d === 0) return { kind: "error", value: "Determinant is zero — matrix is singular, no inverse exists.", explain: "" };
      const inv = [[a[1][1] / d, -a[0][1] / d], [-a[1][0] / d, a[0][0] / d]];
      return { kind: "matrix", value: inv, explain: `A⁻¹ = (1/det) × adj(A), where det = ${fmt(d)}.` };
    }
    const b = parseM(B);
    if (!b) return null;
    if (op === "add") {
      const r = [[a[0][0] + b[0][0], a[0][1] + b[0][1]], [a[1][0] + b[1][0], a[1][1] + b[1][1]]];
      return { kind: "matrix", value: r, explain: "Add corresponding entries." };
    }
    if (op === "multiply") {
      const r = [
        [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
        [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]],
      ];
      return { kind: "matrix", value: r, explain: "Row of A · column of B for each entry." };
    }
    return null;
  }, [A, B, op]);

  const showB = op === "multiply" || op === "add";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100 grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {ops.map((o) => (
            <button key={o.id} onClick={() => setOp(o.id)} className={`py-2 rounded-lg text-xs font-medium transition ${op === o.id ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-100"}`}>{o.label}</button>
          ))}
        </div>
        <div className="p-5 md:p-6 space-y-5">
          <MatrixInput label="Matrix A (2×2)" m={A} setM={setA} />
          {showB && <MatrixInput label="Matrix B (2×2)" m={B} setM={setB} />}
        </div>
      </div>

      {result && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
            <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Result</p>
            {result.kind === "scalar" && <p className="text-3xl font-bold text-primary font-mono">{result.value as string}</p>}
            {result.kind === "matrix" && (
              <div className="inline-block font-mono">
                <table className="border-l-2 border-r-2 border-primary/40">
                  <tbody>
                    {(result.value as number[][]).map((row, i) => (
                      <tr key={i}>{row.map((c, j) => <td key={j} className="px-3 py-1.5 text-lg font-bold text-primary">{fmt(c)}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {result.kind === "error" && <p className="text-amber-700">{result.value as string}</p>}
          </div>
          {result.explain && <div className="p-5 text-sm text-gray-600"><p>{result.explain}</p></div>}
        </div>
      )}
    </div>
  );
}

function MatrixInput({ label, m, setM }: { label: string; m: M; setM: (v: M) => void }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-2">{label}</p>
      <div className="inline-block border-l-2 border-r-2 border-gray-400 px-2 py-1">
        <div className="grid grid-cols-2 gap-2">
          {m.flat().map((v, i) => (
            <input key={i} type="number" value={v} step="any" onChange={(e) => {
              const nm: M = [[m[0][0], m[0][1]], [m[1][0], m[1][1]]];
              const row = Math.floor(i / 2), col = i % 2;
              nm[row][col] = e.target.value;
              setM(nm);
            }} className="w-16 px-2 py-1.5 rounded border border-gray-200 text-center font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
