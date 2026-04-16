"use client";
import { useState, useEffect } from "react";
import { Brain, Trophy, RotateCcw } from "lucide-react";

export function MemorySequence() {
  const [level, setLevel] = useState(1);
  const [seq, setSeq] = useState<number[]>([]);
  const [showing, setShowing] = useState(false);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "showing" | "input" | "result">("idle");
  const [result, setResult] = useState<"win" | "lose" | null>(null);
  const [best, setBest] = useState(1);

  const makeSeq = (len: number) => Array.from({ length: len }, () => Math.floor(Math.random() * 10));

  const start = () => {
    const s = makeSeq(level + 2);
    setSeq(s);
    setPhase("showing");
    setShowing(true);
    const duration = Math.max(2000, (level + 2) * 700);
    setTimeout(() => {
      setShowing(false);
      setPhase("input");
    }, duration);
  };

  const nextLevel = () => {
    setResult(null);
    setInput("");
    setLevel((l) => l + 1);
    setTimeout(start, 300);
  };

  const restart = () => {
    setResult(null);
    setInput("");
    setLevel(1);
    setPhase("idle");
  };

  const submit = () => {
    const correct = input === seq.join("");
    setResult(correct ? "win" : "lose");
    setPhase("result");
    if (correct) setBest((b) => Math.max(b, level + 1));
  };

  if (phase === "idle") {
    return (
      <div className="text-center py-10">
        <Brain className="w-14 h-14 text-purple-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Memory Sequence</h3>
        <p className="text-slate-500 mt-1">Memorize the numbers, then type them in order. Each round adds one more.</p>
        <button onClick={() => { setLevel(1); start(); }} className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-xl transition-all">
          Start Game
        </button>
        {best > 1 && <p className="text-xs text-slate-400 mt-4">Best streak: Level {best}</p>}
      </div>
    );
  }

  if (phase === "showing") {
    return (
      <div className="text-center py-10">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Level {level}</p>
        <p className="text-slate-500 mb-6">Memorize this sequence:</p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {seq.map((n, i) => (
            <div key={i} className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center text-2xl font-extrabold shadow-lg animate-pulse">
              {showing ? n : "?"}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (phase === "input") {
    return (
      <div className="text-center py-10">
        <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Level {level}</p>
        <p className="text-slate-600 mb-6">Type the sequence ({seq.length} digits):</p>
        <input
          type="text"
          inputMode="numeric"
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value.replace(/\D/g, "").slice(0, seq.length))}
          onKeyDown={(e) => { if (e.key === "Enter" && input.length === seq.length) submit(); }}
          className="w-64 text-center text-3xl font-bold tracking-widest bg-white border-2 border-slate-200 rounded-xl py-3 focus:outline-none focus:border-purple-400"
        />
        <div className="mt-4">
          <button onClick={submit} disabled={input.length !== seq.length} className="px-6 py-2.5 rounded-xl bg-purple-500 text-white font-semibold hover:bg-purple-600 transition-colors disabled:opacity-40">
            Submit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-10">
      {result === "win" ? (
        <>
          <Trophy className="w-14 h-14 text-green-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-900">Correct!</h3>
          <p className="text-slate-500 mt-1">Level {level} completed. Ready for level {level + 1}?</p>
          <button onClick={nextLevel} className="mt-6 px-8 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors">
            Next Level
          </button>
        </>
      ) : (
        <>
          <RotateCcw className="w-14 h-14 text-red-500 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-slate-900">Not quite!</h3>
          <p className="text-slate-500 mt-1">Correct: <span className="font-mono font-bold text-slate-700">{seq.join(" ")}</span></p>
          <p className="text-sm text-slate-400 mt-1">You reached level {level}</p>
          <button onClick={restart} className="mt-6 px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors">
            Try Again
          </button>
        </>
      )}
    </div>
  );
}
