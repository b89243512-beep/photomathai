"use client";
import { useState } from "react";
import { BookOpen, Trophy, Check, X as XIcon } from "lucide-react";

interface Q { q: string; options: string[]; correct: number; explain?: string; }

const POOL: Q[] = [
  { q: "What is the square root of 144?", options: ["10", "12", "14", "16"], correct: 1 },
  { q: "What is 7 × 8?", options: ["54", "56", "64", "72"], correct: 1 },
  { q: "Which number is a prime?", options: ["9", "15", "17", "21"], correct: 2 },
  { q: "What is 25% of 80?", options: ["15", "20", "25", "30"], correct: 1 },
  { q: "What is 2³ × 2²?", options: ["16", "32", "8", "64"], correct: 1, explain: "2^(3+2) = 2^5 = 32" },
  { q: "What is π rounded to 2 decimals?", options: ["3.12", "3.14", "3.16", "3.18"], correct: 1 },
  { q: "What is the sum of interior angles of a triangle?", options: ["90°", "180°", "270°", "360°"], correct: 1 },
  { q: "Solve for x: 3x + 6 = 21", options: ["3", "5", "7", "9"], correct: 1 },
  { q: "What is 15²?", options: ["205", "215", "225", "245"], correct: 2 },
  { q: "Which of these is an irrational number?", options: ["0.5", "√2", "1/3", "7"], correct: 1 },
  { q: "What is 100 ÷ 4?", options: ["20", "25", "30", "40"], correct: 1 },
  { q: "What is 9! / 7!?", options: ["56", "63", "72", "81"], correct: 2, explain: "9 × 8 = 72" },
];

function pickQuestions(n: number): Q[] {
  return [...POOL].sort(() => Math.random() - 0.5).slice(0, n);
}

export function MathTrivia() {
  const [questions, setQuestions] = useState<Q[]>(() => pickQuestions(10));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showing, setShowing] = useState(false);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  const choose = (i: number) => {
    if (showing) return;
    setSelected(i);
    setShowing(true);
    if (i === current.correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx((x) => x + 1); setSelected(null); setShowing(false); }
    }, 1200);
  };

  const restart = () => {
    setQuestions(pickQuestions(10));
    setIdx(0); setScore(0); setSelected(null); setShowing(false); setDone(false);
  };

  if (done) {
    return (
      <div className="text-center py-10">
        <Trophy className="w-14 h-14 text-cyan-500 mx-auto mb-3" />
        <h3 className="text-2xl font-bold text-slate-900">Quiz complete!</h3>
        <p className="text-5xl font-extrabold text-cyan-500 mt-3">{score}<span className="text-2xl text-slate-400">/10</span></p>
        <p className="text-slate-500 mt-1">
          {score === 10 ? "Perfect score! 🎉" : score >= 7 ? "Well done!" : score >= 4 ? "Keep practicing!" : "Try again!"}
        </p>
        <button onClick={restart} className="mt-6 px-8 py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors">
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4 text-sm">
        <span className="text-slate-400">Question {idx + 1}/10</span>
        <span className="text-cyan-500 font-bold">Score: {score}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((idx + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="text-center mb-6">
        <BookOpen className="w-10 h-10 text-cyan-500 mx-auto mb-3" />
        <p className="text-xl md:text-2xl font-bold text-slate-900">{current.q}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-xl mx-auto">
        {current.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === current.correct;
          let cls = "bg-white border-slate-200 text-slate-700 hover:border-cyan-300 hover:bg-cyan-50";
          if (showing) {
            if (isCorrect) cls = "bg-green-50 border-green-400 text-green-700";
            else if (isSelected) cls = "bg-red-50 border-red-400 text-red-700";
            else cls = "bg-white border-slate-200 text-slate-400 opacity-50";
          }
          return (
            <button key={i} onClick={() => choose(i)} disabled={showing}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 font-semibold transition-all ${cls}`}>
              <span>{opt}</span>
              {showing && isCorrect && <Check className="w-5 h-5" />}
              {showing && isSelected && !isCorrect && <XIcon className="w-5 h-5" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
