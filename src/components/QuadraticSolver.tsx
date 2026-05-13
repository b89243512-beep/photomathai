"use client";

import { useState, useMemo } from "react";

function fmt(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return parseFloat(n.toPrecision(8)).toString();
}

function sign(n: number): string {
  return n >= 0 ? "+" : "−";
}

function abs(n: number): string {
  return fmt(Math.abs(n));
}

export function QuadraticSolver({ defaults = { a: "1", b: "-5", c: "6" } }: { defaults?: { a: string; b: string; c: string } }) {
  const [a, setA] = useState(defaults.a);
  const [b, setB] = useState(defaults.b);
  const [c, setC] = useState(defaults.c);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const aN = parseFloat(a);
    const bN = parseFloat(b);
    const cN = parseFloat(c);
    if (isNaN(aN) || isNaN(bN) || isNaN(cN)) return null;
    if (aN === 0) return { error: "Coefficient 'a' cannot be zero in a quadratic equation." };

    const D = bN * bN - 4 * aN * cN;
    const twoA = 2 * aN;

    let roots: { x1: string; x2: string; nature: string; complex: boolean };
    if (D > 0) {
      const sqrtD = Math.sqrt(D);
      roots = {
        x1: fmt((-bN + sqrtD) / twoA),
        x2: fmt((-bN - sqrtD) / twoA),
        nature: "Two distinct real roots",
        complex: false,
      };
    } else if (D === 0) {
      const x = fmt(-bN / twoA);
      roots = { x1: x, x2: x, nature: "One repeated real root", complex: false };
    } else {
      const sqrtAbs = Math.sqrt(-D);
      const real = fmt(-bN / twoA);
      const imag = fmt(sqrtAbs / twoA);
      roots = {
        x1: `${real} + ${imag}i`,
        x2: `${real} − ${imag}i`,
        nature: "Two complex conjugate roots",
        complex: true,
      };
    }

    return { a: aN, b: bN, c: cN, D, roots };
  }, [a, b, c]);

  const handleSolve = () => setSubmitted(true);
  const handleReset = () => {
    setA("");
    setB("");
    setC("");
    setSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <div className="p-5 md:p-6 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-gray-100">
          <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Quadratic equation</p>
          <p className="text-2xl md:text-3xl font-bold font-mono text-gray-900">
            ax<sup>2</sup> + bx + c = 0
          </p>
        </div>

        <div className="p-5 md:p-6">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "a", value: a, setter: setA },
              { label: "b", value: b, setter: setB },
              { label: "c", value: c, setter: setC },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Coefficient <span className="font-mono text-primary">{f.label}</span>
                </label>
                <input
                  type="number"
                  value={f.value}
                  onChange={(e) => { f.setter(e.target.value); setSubmitted(false); }}
                  step="any"
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-lg font-mono text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition"
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSolve}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:opacity-90 transition shadow-sm"
            >
              Solve
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold hover:bg-gray-200 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      {submitted && result && (
        <div className="mt-5 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {"error" in result ? (
            <div className="p-5 text-red-600 text-sm font-medium">{result.error}</div>
          ) : (
            <>
              <div className="p-5 md:p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-b border-gray-100">
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-semibold mb-2">Solution</p>
                <div className="space-y-1.5 font-mono">
                  <p className="text-xl md:text-2xl text-gray-900">
                    x<sub>1</sub> = <span className="font-bold text-primary">{result.roots.x1}</span>
                  </p>
                  {result.roots.x1 !== result.roots.x2 && (
                    <p className="text-xl md:text-2xl text-gray-900">
                      x<sub>2</sub> = <span className="font-bold text-primary">{result.roots.x2}</span>
                    </p>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-3">{result.roots.nature}</p>
              </div>

              <div className="p-5 md:p-6">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-4">Step-by-step</p>
                <ol className="space-y-3">
                  <Step n={1} title="Original equation">
                    <code className="font-mono text-sm">
                      {fmt(result.a)}x² {sign(result.b)} {abs(result.b)}x {sign(result.c)} {abs(result.c)} = 0
                    </code>
                  </Step>
                  <Step n={2} title="Apply the quadratic formula">
                    <code className="font-mono text-sm">x = (−b ± √(b² − 4ac)) / 2a</code>
                  </Step>
                  <Step n={3} title="Compute the discriminant">
                    <code className="font-mono text-sm">
                      D = b² − 4ac = ({fmt(result.b)})² − 4·({fmt(result.a)})·({fmt(result.c)}) ={" "}
                      <span className="font-bold">{fmt(result.D)}</span>
                    </code>
                  </Step>
                  <Step n={4} title="Substitute into the formula">
                    <code className="font-mono text-sm">
                      x = (−({fmt(result.b)}) ± √{fmt(result.D)}) / (2·{fmt(result.a)})
                    </code>
                  </Step>
                  <Step n={5} title="Final roots">
                    <code className="font-mono text-sm">
                      x<sub>1</sub> = {result.roots.x1}, x<sub>2</sub> = {result.roots.x2}
                    </code>
                  </Step>
                </ol>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
        {n}
      </span>
      <div>
        <p className="text-sm font-medium text-gray-700">{title}</p>
        <div className="text-gray-500 mt-0.5">{children}</div>
      </div>
    </li>
  );
}
