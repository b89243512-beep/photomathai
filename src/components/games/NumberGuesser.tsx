"use client";
import { useState } from "react";
import { Search, Trophy, ChevronUp, ChevronDown } from "lucide-react";

export function NumberGuesser() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState<{ value: number; hint: "up" | "down" | "correct" }[]>([]);
  const [won, setWon] = useState(false);

  const submit = () => {
    const g = Number(guess);
    if (!g || g < 1 || g > 100) return;
    if (g === target) {
      setAttempts((a) => [...a, { value: g, hint: "correct" }]);
      setWon(true);
    } else {
      setAttempts((a) => [...a, { value: g, hint: g < target ? "up" : "down" }]);
    }
    setGuess("");
  };

  const restart = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setAttempts([]);
    setGuess("");
    setWon(false);
  };

  if (won) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-rose-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Got it!</h3>
        <p className="text-4xl font-extrabold text-rose-500 mt-2">{target}</p>
        <p className="text-slate-500 mt-1">Solved in {attempts.length} {attempts.length === 1 ? "guess" : "guesses"}</p>
        <button onClick={restart} className="mt-6 px-8 py-3 rounded-xl bg-rose-500 text-white font-bold hover:bg-rose-600 transition-colors">
          New Game
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-6">
      <Search className="w-10 h-10 text-rose-500 mx-auto mb-2" />
      <h3 className="text-xl font-bold text-slate-900">Guess a number between 1 and 100</h3>
      <p className="text-slate-500 text-sm mt-1 mb-5">I&apos;ll tell you if it&apos;s higher or lower.</p>

      <div className="flex items-center justify-center gap-2 mb-5">
        <input type="number" min={1} max={100} autoFocus value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder="?"
          className="w-32 text-center text-2xl font-bold bg-white border-2 border-slate-200 rounded-xl py-3 focus:outline-none focus:border-rose-400" />
        <button onClick={submit} className="px-5 py-3 rounded-xl bg-rose-500 text-white font-semibold hover:bg-rose-600 transition-colors">
          Guess
        </button>
      </div>

      {attempts.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">Your guesses</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
            {attempts.map((a, i) => (
              <div key={i} className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                a.hint === "correct" ? "bg-green-100 text-green-700" :
                a.hint === "up" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
              }`}>
                <span>{a.value}</span>
                {a.hint === "up" && <ChevronUp className="w-3.5 h-3.5" />}
                {a.hint === "down" && <ChevronDown className="w-3.5 h-3.5" />}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">{attempts.length} {attempts.length === 1 ? "try" : "tries"} so far</p>
        </div>
      )}
    </div>
  );
}
