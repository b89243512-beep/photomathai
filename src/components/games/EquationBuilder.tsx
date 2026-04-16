"use client";
import { useState, useEffect } from "react";
import { Puzzle, Trophy, RotateCcw } from "lucide-react";

type Op = "+" | "-" | "×";

function makeRound() {
  const target = Math.floor(Math.random() * 40) + 10;
  const nums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 9) + 1);
  return { target, nums };
}

export function EquationBuilder() {
  const [round, setRound] = useState(makeRound);
  const [selected, setSelected] = useState<{ value: number; idx: number }[]>([]);
  const [ops, setOps] = useState<Op[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const addNum = (idx: number) => {
    if (selected.some((s) => s.idx === idx)) return;
    if (selected.length === ops.length + 1 && selected.length < 4) return;
    if (ops.length === selected.length && selected.length >= 1) return;
    setSelected((s) => [...s, { value: round.nums[idx], idx }]);
  };

  const addOp = (op: Op) => {
    if (selected.length === 0) return;
    if (ops.length === selected.length) return;
    setOps((o) => [...o, op]);
  };

  useEffect(() => {
    if (selected.length > 0 && ops.length === selected.length - 1 && selected.length >= 1) {
      let r = selected[0].value;
      for (let i = 0; i < ops.length; i++) {
        const n = selected[i + 1].value;
        r = ops[i] === "+" ? r + n : ops[i] === "-" ? r - n : r * n;
      }
      setResult(r);
    } else {
      setResult(null);
    }
  }, [selected, ops]);

  const reset = () => { setSelected([]); setOps([]); setResult(null); setMessage(null); };

  const submit = () => {
    if (result === null) return;
    if (result === round.target) {
      setMessage("🎉 Correct!");
    } else {
      setMessage(`Got ${result}, needed ${round.target}`);
    }
  };

  const newRound = () => { setRound(makeRound()); reset(); };

  return (
    <div className="py-6 text-center">
      <Puzzle className="w-10 h-10 text-orange-500 mx-auto mb-2" />
      <h3 className="text-lg font-bold text-slate-900">Equation Builder</h3>
      <p className="text-sm text-slate-500 mb-4">Use the numbers and operators to reach the target.</p>

      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl py-4 px-6 inline-block mb-6">
        <p className="text-xs uppercase tracking-wider opacity-80">Target</p>
        <p className="text-4xl font-extrabold">{round.target}</p>
      </div>

      {/* Expression */}
      <div className="bg-slate-50 rounded-xl py-4 px-4 mb-4 min-h-[70px] flex items-center justify-center gap-2 flex-wrap">
        {selected.length === 0 && <span className="text-slate-400 text-sm">Click numbers and operators to build your equation</span>}
        {selected.map((s, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">{s.value}</span>
            {i < ops.length && <span className="text-2xl font-bold text-orange-500">{ops[i]}</span>}
          </span>
        ))}
        {result !== null && (
          <>
            <span className="text-2xl font-bold text-slate-400 mx-1">=</span>
            <span className={`text-2xl font-extrabold ${result === round.target ? "text-green-600" : "text-slate-900"}`}>{result}</span>
          </>
        )}
      </div>

      {/* Numbers */}
      <div className="mb-3">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Numbers</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {round.nums.map((n, i) => {
            const used = selected.some((s) => s.idx === i);
            return (
              <button key={i} onClick={() => addNum(i)} disabled={used}
                className={`w-14 h-14 rounded-xl font-extrabold text-2xl transition-all ${
                  used ? "bg-slate-100 text-slate-300" : "bg-white border-2 border-orange-200 text-orange-600 hover:border-orange-400 hover:scale-105"
                }`}>
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* Operators */}
      <div className="mb-5">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Operators</p>
        <div className="flex justify-center gap-2">
          {(["+", "-", "×"] as Op[]).map((o) => (
            <button key={o} onClick={() => addOp(o)}
              className="w-14 h-14 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-extrabold text-2xl hover:border-orange-300 hover:scale-105 transition-all">
              {o}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <p className={`mb-4 font-semibold ${message.startsWith("🎉") ? "text-green-600" : "text-slate-600"}`}>{message}</p>
      )}

      <div className="flex items-center justify-center gap-3">
        <button onClick={submit} disabled={result === null} className="px-6 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:opacity-40">
          Check
        </button>
        <button onClick={reset} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
          <RotateCcw className="w-4 h-4 inline mr-1" /> Clear
        </button>
        <button onClick={newRound} className="px-6 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors">
          New Round
        </button>
      </div>
    </div>
  );
}
