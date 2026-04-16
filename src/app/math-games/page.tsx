"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Zap, Brain, Target, Dices, Sigma, Search, BookOpen, Puzzle, Grid3x3,
  ArrowLeft, Gamepad2, Sparkles, Clock, Trophy, Users, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";

import { QuickMath } from "@/components/games/QuickMath";
import { MemorySequence } from "@/components/games/MemorySequence";
import { TimesTables } from "@/components/games/TimesTables";
import { OddOrEven } from "@/components/games/OddOrEven";
import { PrimeOrNot } from "@/components/games/PrimeOrNot";
import { NumberGuesser } from "@/components/games/NumberGuesser";
import { MathTrivia } from "@/components/games/MathTrivia";
import { EquationBuilder } from "@/components/games/EquationBuilder";
import { NumberFlip } from "@/components/games/NumberFlip";

type GameId = "quick-math" | "memory" | "times-tables" | "odd-even" | "prime" | "guesser" | "trivia" | "builder" | "flip";

interface GameMeta {
  id: GameId;
  title: string;
  tagline: string;
  description: string;
  icon: typeof Zap;
  time: string;
  difficulty: "Easy" | "Medium" | "Hard";
  color: string;
  iconColor: string;
  bg: string;
  Component: () => React.ReactElement;
}

const GAMES: GameMeta[] = [
  { id: "quick-math", title: "Quick Math", tagline: "60-second arithmetic", description: "Race against the clock. Solve addition, subtraction, and multiplication problems in 60 seconds.", icon: Zap, time: "60s", difficulty: "Easy", color: "from-amber-500 to-orange-500", iconColor: "text-amber-500", bg: "bg-amber-50", Component: QuickMath },
  { id: "memory", title: "Memory Sequence", tagline: "Remember the numbers", description: "Memorize number sequences that grow longer each round. How far can you go?", icon: Brain, time: "Endless", difficulty: "Medium", color: "from-purple-500 to-pink-500", iconColor: "text-purple-500", bg: "bg-purple-50", Component: MemorySequence },
  { id: "times-tables", title: "Times Tables", tagline: "Multiplication mastery", description: "Practice any times table from 2 to 12 with 10 questions per round.", icon: Target, time: "5 min", difficulty: "Easy", color: "from-blue-500 to-cyan-500", iconColor: "text-blue-500", bg: "bg-blue-50", Component: TimesTables },
  { id: "odd-even", title: "Odd or Even Rush", tagline: "Classify quickly", description: "Click as many numbers as you can in 30 seconds — are they odd or even?", icon: Dices, time: "30s", difficulty: "Easy", color: "from-emerald-500 to-teal-500", iconColor: "text-emerald-500", bg: "bg-emerald-50", Component: OddOrEven },
  { id: "prime", title: "Prime or Not", tagline: "Spot the primes", description: "Rapid-fire prime identification. Decide if each number is prime — 30 seconds.", icon: Sigma, time: "30s", difficulty: "Medium", color: "from-indigo-500 to-purple-500", iconColor: "text-indigo-500", bg: "bg-indigo-50", Component: PrimeOrNot },
  { id: "guesser", title: "Number Guesser", tagline: "Binary search", description: "I picked a number between 1 and 100. Guess it in as few tries as possible.", icon: Search, time: "Unlimited", difficulty: "Easy", color: "from-rose-500 to-pink-500", iconColor: "text-rose-500", bg: "bg-rose-50", Component: NumberGuesser },
  { id: "trivia", title: "Math Trivia", tagline: "10-question quiz", description: "Test your math knowledge with 10 multiple-choice questions across all topics.", icon: BookOpen, time: "3 min", difficulty: "Medium", color: "from-cyan-500 to-blue-500", iconColor: "text-cyan-500", bg: "bg-cyan-50", Component: MathTrivia },
  { id: "builder", title: "Equation Builder", tagline: "Reach the target", description: "Combine 4 random numbers with operators to hit the target value.", icon: Puzzle, time: "Unlimited", difficulty: "Hard", color: "from-orange-500 to-red-500", iconColor: "text-orange-500", bg: "bg-orange-50", Component: EquationBuilder },
  { id: "flip", title: "Number Slide Puzzle", tagline: "Classic 8-puzzle", description: "Slide numbered tiles to arrange them 1-8 in order. A classic brain teaser.", icon: Grid3x3, time: "Unlimited", difficulty: "Hard", color: "from-pink-500 to-rose-500", iconColor: "text-pink-500", bg: "bg-pink-50", Component: NumberFlip },
];

const faqs = [
  { q: "Are these math games really free?", a: "Yes, 100% free. All 8+ games run directly in your browser without any sign-up, payment, or download. Play as many times as you want." },
  { q: "Are the games suitable for kids?", a: "Yes. Games like Quick Math, Times Tables, Odd or Even, and Number Guesser are perfect for elementary and middle school kids. Memory Sequence and Math Trivia work great for older students too." },
  { q: "Do I need to install anything?", a: "No. Every game runs instantly in your browser. Works on desktop, tablet, and mobile — no app downloads, no plugins." },
  { q: "Can I play these games on my phone?", a: "Yes, all games are fully mobile-optimized with touch support. You can play anywhere, anytime." },
  { q: "Are scores saved?", a: "Best scores are remembered within your browser session. Close the tab and they reset — we don&apos;t store any personal data." },
  { q: "Which game is best for mental math practice?", a: "Quick Math is the most effective for general arithmetic speed. Times Tables is ideal for multiplication mastery. Odd or Even Rush trains instant number recognition." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-indigo-200 transition-all bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-slate-900 pr-4">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
      </button>
      {open && <div className="px-5 pb-5"><p className="text-slate-500 text-sm leading-relaxed">{answer}</p></div>}
    </div>
  );
}

export default function MathGamesPage() {
  const [activeId, setActiveId] = useState<GameId | null>(null);
  const active = GAMES.find((g) => g.id === activeId);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-b from-indigo-50 to-white py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4">
              <Gamepad2 className="w-3.5 h-3.5" /> 9 FREE GAMES · NO SIGN-UP
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Free <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Math Games</span> Online
            </h1>
            <p className="text-sm md:text-base text-slate-500 mt-3 max-w-2xl mx-auto">
              Play 9 brain-training math games instantly in your browser. Perfect for kids, students, and adults who want to sharpen their mental math skills — completely free, no download required.
            </p>
          </div>
        </section>

        {/* Active Game or Grid */}
        <section className="py-8 md:py-10">
          <div className="max-w-5xl mx-auto px-4">
            {active ? (
              <div>
                <button
                  onClick={() => setActiveId(null)}
                  className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to all games
                </button>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className={`bg-gradient-to-r ${active.color} px-6 py-4 text-white`}>
                    <div className="flex items-center gap-3">
                      <active.icon className="w-6 h-6" />
                      <div>
                        <h2 className="text-lg md:text-xl font-bold">{active.title}</h2>
                        <p className="text-xs opacity-90">{active.tagline}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 md:p-6">
                    <active.Component />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {GAMES.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveId(g.id)}
                    className="group text-left bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all"
                  >
                    <div className={`h-2 bg-gradient-to-r ${g.color}`} />
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 rounded-xl ${g.bg} flex items-center justify-center`}>
                          <g.icon className={`w-6 h-6 ${g.iconColor}`} />
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {g.difficulty}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {g.time}
                          </span>
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {g.title}
                      </h3>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">{g.tagline}</p>
                      <p className="text-sm text-slate-500 mt-2 leading-relaxed line-clamp-2">{g.description}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-500 group-hover:gap-2.5 transition-all">
                        Play now →
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Features */}
        {!active && (
          <section className="py-10 bg-white">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Sparkles, title: "100% Free", desc: "No sign-up, no ads" },
                { icon: Gamepad2, title: "9 Games", desc: "Something for every skill level" },
                { icon: Users, title: "All Ages", desc: "Kids, students, and adults" },
                { icon: Trophy, title: "Track Scores", desc: "Beat your personal best" },
              ].map((b) => (
                <div key={b.title} className="text-center p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                  <b.icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
                  <p className="font-semibold text-slate-900 text-sm">{b.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="py-12 md:py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-slate-500 leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">The Best Free Math Games for Brain Training</h2>
              <p>Math games are one of the most effective ways to build mental arithmetic speed, improve pattern recognition, and make learning genuinely fun. Our collection of nine free math games covers the full range of core skills — from basic arithmetic and times tables to prime number identification and classic logic puzzles. Every game runs directly in your browser with no download, no account creation, and no cost. Just pick a game and start playing.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Who Are These Math Games For?</h3>
              <p>These games work for a wide audience. Elementary and middle school students use them to drill fundamentals like addition, subtraction, and multiplication. High school and college students warm up their brains before exams with timed challenges like Quick Math and Prime or Not. Adults who want to keep their minds sharp play Memory Sequence, Equation Builder, and the Number Slide Puzzle for daily brain training. Teachers and parents use them in the classroom or at home as engaging practice that kids actually want to do.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Why Math Games Work Better Than Worksheets</h3>
              <p>Research in cognitive science consistently shows that game-based learning increases retention, engagement, and motivation compared to traditional repetition. Games add three key ingredients that worksheets lack: immediate feedback (you know instantly if you got it right), intrinsic motivation (beating your score is inherently rewarding), and appropriate challenge (difficulty scales as you improve). When students play Quick Math and see their score climbing, they develop a positive association with math that pure drill work rarely produces.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Game-by-Game Guide</h3>
              <p>Quick Math is the speed arithmetic challenge — solve as many problems as possible in 60 seconds. Memory Sequence grows number strings longer each round, training working memory. Times Tables lets you focus on a single multiplication table with 10 randomized questions. Odd or Even Rush is pure classification speed. Prime or Not tests your number theory intuition. Number Guesser teaches binary search without calling it that. Math Trivia offers 10 varied multiple-choice questions. Equation Builder is strategic — combine four numbers with operators to reach a target. The Number Slide Puzzle is the timeless 8-puzzle, one of the oldest logic challenges in computing.</p>

              <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Safe, Private, No Tracking</h3>
              <p>Unlike many online game sites, we do not require accounts, email addresses, or personal information. Your scores stay in your browser session and are not transmitted anywhere. There are no pop-up ads in the games, no distractions, and no paywalls. Whether you are a parent looking for a safe educational site for your child or an adult who just wants to practice math during a coffee break, you can play with confidence.</p>

              <p className="mt-6">Need more? Check out our <Link href="/calculator" className="text-indigo-500 hover:underline">Free Photo Math Calculator</Link> for step-by-step problem solving, or return to the <Link href="/" className="text-indigo-500 hover:underline">main PhotoMath AI</Link> to upload any math problem for an AI solution.</p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((f) => <FAQItem key={f.q} question={f.q} answer={f.a} />)}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
