"use client";
import { useState, useEffect, useCallback } from "react";
import { Dices, Trophy, RotateCcw } from "lucide-react";

export function OddOrEven() {
  const [num, setNum] = useState(() => Math.floor(Math.random() * 500) + 1);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);
  const [flash, setFlash] = useState<"green" | "red" | null>(null);

  useEffect(() => {
    if (!running) return;
    if (time <= 0) { setRunning(false); setBest((b) => Math.max(b, score)); return; }
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, time, score]);

  const answer = useCallback((isOdd: boolean) => {
    const correct = (num % 2 !== 0) === isOdd;
    if (correct) setScore((s) => s + 1);
    setFlash(correct ? "green" : "red");
    setTimeout(() => setFlash(null), 150);
    setNum(Math.floor(Math.random() * 500) + 1);
  }, [num]);

  const start = () => { setScore(0); setTime(30); setRunning(true); setNum(Math.floor(Math.random() * 500) + 1); };

  if (!running && time === 30) {
    return (
      <div className="text-center py-10">
        <Dices className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Odd or Even Rush</h3>
        <p className="text-slate-500 mt-1">Classify as many numbers as you can in 30 seconds.</p>
        <button onClick={start} className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg hover:shadow-xl transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (!running) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-emerald-500 mx-auto mb-3" />
        <p className="text-5xl font-extrabold text-emerald-500 mt-3">{score}</p>
        <p className="text-slate-500 mt-1">correct in 30 seconds</p>
        {best > 0 && <p className="text-xs text-slate-400 mt-2">Best: {best}</p>}
        <button onClick={start} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all">
          <RotateCcw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className={`text-center py-6 transition-colors rounded-2xl ${flash === "green" ? "bg-green-50" : flash === "red" ? "bg-red-50" : ""}`}>
      <div className="flex items-center justify-center gap-6 mb-6">
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Score</p><p className="text-2xl font-bold text-emerald-500">{score}</p></div>
        <div className="h-10 w-px bg-slate-200" />
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Time</p><p className={`text-2xl font-bold ${time <= 5 ? "text-red-500" : "text-slate-900"}`}>{time}s</p></div>
      </div>
      <p className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-8">{num}</p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => answer(true)} className="px-8 py-4 rounded-xl bg-purple-500 text-white font-bold text-lg hover:bg-purple-600 transition-all shadow-md">
          Odd
        </button>
        <button onClick={() => answer(false)} className="px-8 py-4 rounded-xl bg-emerald-500 text-white font-bold text-lg hover:bg-emerald-600 transition-all shadow-md">
          Even
        </button>
      </div>
    </div>
  );
}
