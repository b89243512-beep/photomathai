import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuadraticSolver } from "@/components/QuadraticSolver";
import {
  Sparkles,
  ArrowLeft,
  Lightbulb,
  Camera,
  Check,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quadratic Equation Solver , Free Step-by-Step with Examples",
  description:
    "Solve any quadratic equation ax² + bx + c = 0 free online. Step-by-step solution using the quadratic formula and discriminant. Five worked examples included.",
  alternates: { canonical: "/solvers/quadratic-equation-solver" },
  keywords: [
    "quadratic equation solver",
    "quadratic formula calculator",
    "solve quadratic equation",
    "quadratic equation calculator",
    "discriminant calculator",
    "ax2+bx+c=0 solver",
    "factor quadratic",
    "complete the square calculator",
    "roots of quadratic equation",
    "step by step quadratic solver",
  ],
};

type Example = {
  title: string;
  equation: string;
  a: number;
  b: number;
  c: number;
  discriminant: string;
  result: string;
  notes: string;
  steps: { title: string; content: string }[];
};

const examples: Example[] = [
  {
    title: "Example 1, Two distinct real roots",
    equation: "x² − 5x + 6 = 0",
    a: 1, b: -5, c: 6,
    discriminant: "D = (−5)² − 4(1)(6) = 25 − 24 = 1",
    result: "x₁ = 3, x₂ = 2",
    notes: "Since D > 0, the equation has two different real roots. This is the most common case in introductory algebra.",
    steps: [
      { title: "Identify coefficients", content: "a = 1, b = −5, c = 6" },
      { title: "Compute discriminant", content: "D = b² − 4ac = 25 − 24 = 1" },
      { title: "Apply the formula", content: "x = (5 ± √1) / 2 = (5 ± 1) / 2" },
      { title: "Final roots", content: "x₁ = 6/2 = 3, x₂ = 4/2 = 2" },
    ],
  },
  {
    title: "Example 2, One repeated real root",
    equation: "x² − 4x + 4 = 0",
    a: 1, b: -4, c: 4,
    discriminant: "D = (−4)² − 4(1)(4) = 16 − 16 = 0",
    result: "x₁ = x₂ = 2",
    notes: "When D = 0, the parabola touches the x-axis at exactly one point. This is also called a 'double root' or 'repeated root'.",
    steps: [
      { title: "Identify coefficients", content: "a = 1, b = −4, c = 4" },
      { title: "Compute discriminant", content: "D = 16 − 16 = 0" },
      { title: "Apply the formula", content: "x = (4 ± √0) / 2 = 4/2" },
      { title: "Single repeated root", content: "x = 2 (multiplicity 2)" },
    ],
  },
  {
    title: "Example 3, Complex (no real) roots",
    equation: "x² + 2x + 5 = 0",
    a: 1, b: 2, c: 5,
    discriminant: "D = (2)² − 4(1)(5) = 4 − 20 = −16",
    result: "x = −1 ± 2i",
    notes: "When D < 0, the equation has no real solutions. The two roots are complex conjugates, expressed using the imaginary unit i where i² = −1.",
    steps: [
      { title: "Identify coefficients", content: "a = 1, b = 2, c = 5" },
      { title: "Compute discriminant", content: "D = 4 − 20 = −16 (negative)" },
      { title: "Rewrite using i", content: "√(−16) = 4i" },
      { title: "Final complex roots", content: "x = (−2 ± 4i) / 2 = −1 ± 2i" },
    ],
  },
  {
    title: "Example 4, Factorable quadratic",
    equation: "2x² + 7x + 3 = 0",
    a: 2, b: 7, c: 3,
    discriminant: "D = 7² − 4(2)(3) = 49 − 24 = 25",
    result: "x₁ = −1/2, x₂ = −3",
    notes: "When the discriminant is a perfect square and the coefficients are integers, the equation often factors cleanly. (2x + 1)(x + 3) = 0 gives the same roots.",
    steps: [
      { title: "Identify coefficients", content: "a = 2, b = 7, c = 3" },
      { title: "Compute discriminant", content: "D = 49 − 24 = 25 = 5²" },
      { title: "Apply the formula", content: "x = (−7 ± 5) / 4" },
      { title: "Final roots", content: "x₁ = −2/4 = −1/2, x₂ = −12/4 = −3" },
    ],
  },
  {
    title: "Example 5, Quadratic with fractional coefficient",
    equation: "0.5x² − 2x − 6 = 0",
    a: 0.5, b: -2, c: -6,
    discriminant: "D = (−2)² − 4(0.5)(−6) = 4 + 12 = 16",
    result: "x₁ ≈ 6, x₂ ≈ −2",
    notes: "Multiplying both sides by 2 first turns this into x² − 4x − 12 = 0, which factors as (x − 6)(x + 2) = 0. Either approach gives the same roots.",
    steps: [
      { title: "Identify coefficients", content: "a = 0.5, b = −2, c = −6" },
      { title: "Compute discriminant", content: "D = 4 − (−12) = 16" },
      { title: "Apply the formula", content: "x = (2 ± √16) / 1 = (2 ± 4)" },
      { title: "Final roots", content: "x₁ = 6, x₂ = −2" },
    ],
  },
];

export default function QuadraticEquationSolverPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-muted">
            <Link href="/solvers" className="flex items-center gap-1 hover:text-primary transition-colors">
              <ArrowLeft className="w-3 h-3" />
              All Solvers
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-600">Quadratic Equation Solver</span>
          </div>
        </div>

        {/* Hero */}
        <section className="gradient-hero-subtle py-10 md:py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Free Solver, No Sign-up
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              Quadratic Equation Solver{" "}
              <span className="gradient-text">with Steps</span>
            </h1>
            <p className="text-base md:text-lg text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
              Enter the coefficients of <code className="font-mono text-foreground">ax² + bx + c = 0</code> and get the roots, the discriminant, and the complete step-by-step solution using the quadratic formula.
            </p>
          </div>
        </section>

        {/* Solver widget */}
        <section className="py-8 md:py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <QuadraticSolver defaults={{ a: "1", b: "-5", c: "6" }} />
            <p className="text-center text-xs text-muted mt-5">
              Tip: enter negative coefficients with a minus sign (e.g. <code className="font-mono">−5</code>). For more complex problems, use the{" "}
              <Link href="/" className="text-primary font-semibold hover:underline">photo solver</Link>.
            </p>
          </div>
        </section>

        {/* Key concepts */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                How the <span className="gradient-text">quadratic formula</span> works
              </h2>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">The Formula</p>
              <p className="font-mono text-2xl md:text-3xl text-center text-gray-900 py-6">
                x = (−b ± √(b² − 4ac)) / 2a
              </p>
              <p className="text-sm text-muted text-center max-w-xl mx-auto leading-relaxed">
                For any quadratic <code className="font-mono">ax² + bx + c = 0</code> where <code className="font-mono">a ≠ 0</code>, this formula gives the two roots directly. The expression under the square root, <code className="font-mono">b² − 4ac</code>, is called the discriminant and tells you what kind of roots to expect.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { sign: "D > 0", color: "emerald", title: "Two real roots", desc: "The parabola crosses the x-axis at two distinct points." },
                { sign: "D = 0", color: "amber", title: "One repeated root", desc: "The parabola touches the x-axis at exactly one point." },
                { sign: "D < 0", color: "rose", title: "Complex roots", desc: "The parabola does not touch the x-axis. Roots involve i." },
              ].map((card) => (
                <div key={card.sign} className="bg-white rounded-xl border border-border p-5">
                  <div className={`inline-flex items-center justify-center w-12 h-8 rounded-lg bg-${card.color}-50 text-${card.color}-600 font-mono text-sm font-bold mb-3`}>
                    {card.sign}
                  </div>
                  <p className="font-bold text-foreground text-sm">{card.title}</p>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 Worked examples */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Worked Examples</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Five quadratic equations, <span className="gradient-text">solved step by step</span>
              </h2>
              <p className="text-muted mt-3 text-base max-w-xl mx-auto">
                Each example shows a different case you&apos;ll see in real problems , distinct, repeated, complex, factorable, and fractional coefficients.
              </p>
            </div>

            <div className="space-y-6">
              {examples.map((ex, i) => (
                <article key={i} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  {/* Example header */}
                  <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-border flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary font-semibold">{ex.title}</p>
                      <p className="text-lg md:text-xl font-bold font-mono text-gray-900 mt-1">{ex.equation}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-mono font-semibold text-gray-900">{ex.result}</span>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="px-6 py-5">
                    <ol className="space-y-3">
                      {ex.steps.map((s, si) => (
                        <li key={si} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {si + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{s.title}</p>
                            <code className="font-mono text-sm text-gray-500 mt-0.5 block">{s.content}</code>
                          </div>
                        </li>
                      ))}
                    </ol>

                    {/* Notes */}
                    <div className="mt-5 flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">{ex.notes}</p>
                    </div>

                    {/* Try this one in the calculator */}
                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-2">
                      <p className="text-xs text-muted">
                        Coefficients: <code className="font-mono">a = {ex.a}</code>, <code className="font-mono">b = {ex.b}</code>, <code className="font-mono">c = {ex.c}</code>
                      </p>
                      <p className="text-xs text-muted">
                        Discriminant: <code className="font-mono">{ex.discriminant}</code>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                The quadratic equation solver, explained from the ground up
              </h2>
              <p>
                A quadratic equation is any equation that can be written in the form <code className="font-mono">ax² + bx + c = 0</code>, where <code className="font-mono">a</code>, <code className="font-mono">b</code>, and <code className="font-mono">c</code> are numbers and <code className="font-mono">a</code> is not zero. Quadratic equations show up everywhere in mathematics, physics, engineering, and economics, anywhere you describe parabolic motion, area, optimization, or growth that levels off. This solver handles all of them with full step-by-step solutions, completely free.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">When you need a quadratic equation solver</h3>
              <p>
                You reach for a quadratic solver any time a problem reduces to finding the values of a variable that make a second-degree polynomial equal zero. Common examples include finding where a projectile lands, calculating the dimensions of a rectangle given its area and perimeter, optimizing revenue in a pricing problem, or simply working through algebra homework. The solver above gives you the answer plus every intermediate step, so it works as both an answer key and a study aid.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Methods for solving quadratic equations</h3>
              <p>
                There are several classical methods: factoring (works when roots are rational), completing the square (a foundational technique), the quadratic formula (always works), and graphing (for visual estimates). This solver uses the quadratic formula because it handles every case uniformly, including complex roots, and produces clean steps you can follow by hand. Each worked example above corresponds to a different scenario you&apos;ll encounter in coursework and exam problems.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Understanding the discriminant</h3>
              <p>
                The discriminant, <code className="font-mono">D = b² − 4ac</code>, is the single most important quantity in a quadratic equation. Its sign alone tells you the nature of the roots before you do any other work. A positive discriminant means two distinct real roots, zero means one repeated real root, and negative means two complex conjugate roots. Learning to spot the discriminant&apos;s sign by inspection is a powerful shortcut in algebra and pre-calculus.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">From algebra class to real applications</h3>
              <p>
                Beyond schoolwork, the quadratic formula is the workhorse of any field that involves curves, growth, or motion. In physics, free-fall and projectile motion are quadratic in time. In economics, profit and cost models often involve quadratic terms. In engineering, parabolic shapes appear in antennas, headlights, bridges, and arches. Mastering the quadratic formula isn&apos;t just an academic exercise, it&apos;s a tool you reuse for the rest of your technical life.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Tips for using this solver effectively</h3>
              <p>
                Enter coefficients exactly as they appear in the original equation, including negative signs. Decimals and fractions both work, just use the decimal form (e.g. enter <code className="font-mono">0.5</code> for one-half). If the leading coefficient is not 1, the solver still applies the quadratic formula correctly. For equations that aren&apos;t already in standard form, rearrange them to <code className="font-mono">ax² + bx + c = 0</code> before entering values. For more complex problems, including word problems and handwritten equations, use the photo solver on our homepage instead.
              </p>
            </article>

            <div className="mt-8 p-5 rounded-2xl bg-white border border-border flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Need to solve something more complex?</p>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  Cubic equations, systems of equations, calculus problems, or word problems are all supported on our main solver,{" "}
                  <Link href="/" className="text-primary font-semibold hover:underline">
                    upload a photo or type the problem
                  </Link>{" "}
                  and the AI handles the rest.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              Got a photo of a math problem?
            </h2>
            <p className="text-white/85 mt-3 text-base max-w-xl mx-auto">
              Skip the typing , upload a photo and get a full step-by-step solution for any equation in seconds.
            </p>
            <Link
              href="/#solver"
              className="inline-flex items-center gap-2 mt-7 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-5 h-5" />
              Try the Photo Solver
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
