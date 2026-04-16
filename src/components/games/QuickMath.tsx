"use client";
import { useState, useEffect, useCallback } from "react";
import { Zap, Trophy, RotateCcw } from "lucide-react";

type Problem = { question: string; answer: number };

function makeProblem(): Problem {
  const ops = ["+", "-", "×"] as const;
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;
  if (op === "-" && b > a) [a, b] = [b, a];
  if (op === "×") { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; }
  const answer = op === "+" ? a + b : op === "-" ? a - b : a * b;
  return { question: `${a} ${op} ${b}`, answer };
}

export function QuickMath() {
  const [problem, setProblem] = useState<Problem>(makeProblem);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      setBest((b) => Math.max(b, score));
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, score]);

  const submit = useCallback(() => {
    if (Number(input) === problem.answer) setScore((s) => s + 1);
    setInput("");
    setProblem(makeProblem());
  }, [input, problem]);

  const start = () => { setScore(0); setTimeLeft(60); setRunning(true); setInput(""); setProblem(makeProblem()); };

  if (!running && timeLeft === 60) {
    return (
      <div className="text-center py-10">
        <Zap className="w-14 h-14 text-amber-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Quick Math</h3>
        <p className="text-slate-500 mt-1">Solve as many problems as you can in 60 seconds.</p>
        <button onClick={start} className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg hover:shadow-xl transition-all">
          Start Game
        </button>
      </div>
    );
  }

  if (!running) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-amber-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Time&apos;s up!</h3>
        <p className="text-5xl font-extrabold text-amber-500 mt-3">{score}</p>
        <p className="text-slate-500 mt-1">correct answers</p>
        {best > 0 && <p className="text-xs text-slate-400 mt-2">Best: {best}</p>}
        <button onClick={start} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all">
          <RotateCcw className="w-4 h-4" /> Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <div className="flex items-center justify-center gap-6 mb-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Score</p>
          <p className="text-2xl font-bold text-amber-500">{score}</p>
        </div>
        <div className="h-10 w-px bg-slate-200" />
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">Time</p>
          <p className={`text-2xl font-bold ${timeLeft <= 10 ? "text-red-500" : "text-slate-900"}`}>{timeLeft}s</p>
        </div>
      </div>
      <p className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6">{problem.question}</p>
      <input
        type="number"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
        placeholder="?"
        className="w-40 text-center text-3xl font-bold bg-white border-2 border-slate-200 rounded-xl py-3 focus:outline-none focus:border-amber-400"
      />
      <div className="mt-4">
        <button onClick={submit} className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-semibold hover:bg-amber-600 transition-colors">
          Submit
        </button>
      </div>
    </div>
  );
}
