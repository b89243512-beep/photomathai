"use client";
import { useState, useEffect, useCallback } from "react";
import { Sigma, Trophy, RotateCcw } from "lucide-react";

function isPrime(n: number): boolean {
  if (n < 2) return false;
  if (n < 4) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}

export function PrimeOrNot() {
  const [num, setNum] = useState(() => Math.floor(Math.random() * 98) + 2);
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

  const answer = useCallback((saysPrime: boolean) => {
    const correct = isPrime(num) === saysPrime;
    if (correct) setScore((s) => s + 1);
    setFlash(correct ? "green" : "red");
    setTimeout(() => setFlash(null), 150);
    setNum(Math.floor(Math.random() * 98) + 2);
  }, [num]);

  const start = () => { setScore(0); setTime(30); setRunning(true); setNum(Math.floor(Math.random() * 98) + 2); };

  if (!running && time === 30) {
    return (
      <div className="text-center py-10">
        <Sigma className="w-14 h-14 text-indigo-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Prime or Not</h3>
        <p className="text-slate-500 mt-1">Decide whether each number is prime. 30 seconds.</p>
        <button onClick={start} className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold shadow-lg hover:shadow-xl transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (!running) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-indigo-500 mx-auto mb-3" />
        <p className="text-5xl font-extrabold text-indigo-500 mt-3">{score}</p>
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
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Score</p><p className="text-2xl font-bold text-indigo-500">{score}</p></div>
        <div className="h-10 w-px bg-slate-200" />
        <div><p className="text-xs uppercase tracking-wider text-slate-400">Time</p><p className={`text-2xl font-bold ${time <= 5 ? "text-red-500" : "text-slate-900"}`}>{time}s</p></div>
      </div>
      <p className="text-6xl md:text-7xl font-extrabold text-slate-900 mb-8">{num}</p>
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => answer(true)} className="px-8 py-4 rounded-xl bg-indigo-500 text-white font-bold text-lg hover:bg-indigo-600 transition-all shadow-md">
          Prime
        </button>
        <button onClick={() => answer(false)} className="px-8 py-4 rounded-xl bg-slate-600 text-white font-bold text-lg hover:bg-slate-700 transition-all shadow-md">
          Not Prime
        </button>
      </div>
    </div>
  );
}
