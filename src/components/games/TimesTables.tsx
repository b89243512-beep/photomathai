"use client";
import { useState, useEffect } from "react";
import { Target, Trophy, RotateCcw } from "lucide-react";

export function TimesTables() {
  const [table, setTable] = useState<number | null>(null);
  const [questions, setQuestions] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (table !== null) {
      const q = Array.from({ length: 10 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
      setQuestions(q);
      setIdx(0);
      setScore(0);
      setDone(false);
      setInput("");
    }
  }, [table]);

  const submit = () => {
    if (table === null) return;
    const correct = Number(input) === table * questions[idx];
    if (correct) setScore((s) => s + 1);
    setInput("");
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx((i) => i + 1);
  };

  if (table === null) {
    return (
      <div className="text-center py-10">
        <Target className="w-14 h-14 text-blue-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Times Tables</h3>
        <p className="text-slate-500 mt-1 mb-6">Pick a number from 2-12. Answer 10 questions for that table.</p>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2 max-w-md mx-auto">
          {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
            <button key={n} onClick={() => setTable(n)}
              className="aspect-square rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-bold text-xl hover:shadow-lg hover:scale-105 transition-all">
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-blue-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Table of {table} — Done!</h3>
        <p className="text-5xl font-extrabold text-blue-500 mt-3">{score}<span className="text-2xl text-slate-400">/10</span></p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => setTable(table)} className="px-6 py-2.5 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">
            <RotateCcw className="w-4 h-4 inline mr-1" /> Retry
          </button>
          <button onClick={() => setTable(null)} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors">
            Change Table
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <div className="flex items-center justify-center gap-6 mb-6">
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Table</p><p className="text-2xl font-bold text-blue-500">×{table}</p></div>
        <div className="h-10 w-px bg-slate-200" />
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Progress</p><p className="text-2xl font-bold text-slate-900">{idx + 1}/10</p></div>
        <div className="h-10 w-px bg-slate-200" />
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Score</p><p className="text-2xl font-bold text-green-500">{score}</p></div>
      </div>
      <p className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">
        {table} × {questions[idx]}
      </p>
      <input type="number" autoFocus value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="?"
        className="w-40 text-center text-3xl font-bold bg-white border-2 border-slate-200 rounded-xl py-3 focus:outline-none focus:border-blue-400" />
      <div className="mt-4">
        <button onClick={submit} className="px-6 py-2.5 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
}
