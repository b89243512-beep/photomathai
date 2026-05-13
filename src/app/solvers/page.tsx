import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sigma, FunctionSquare, Divide, Percent, Square, Triangle, Variable, GitBranch,
  Calculator as CalcIcon, BarChart3, Sparkles, ArrowRight, Camera,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Math Solvers and Calculators , Free AI Step-by-Step Tools",
  description:
    "Free online math solvers and calculators with step-by-step solutions. Algebra, quadratic equations, derivatives, integrals, fractions, percentages, matrices and more, no sign-up required.",
  alternates: { canonical: "/solvers" },
  keywords: [
    "math solver", "math calculator", "online math solver", "free math solver",
    "algebra solver", "equation solver", "quadratic equation solver",
    "derivative calculator", "integral calculator", "limit calculator",
    "fraction calculator", "percentage calculator", "matrix calculator",
    "step by step math solver", "math problem solver online",
  ],
};

type Tool = {
  href: string;
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  category: "Solver" | "Calculator";
  hint: string;
  available: boolean;
};

const tools: Tool[] = [
  {
    href: "/solvers/quadratic-equation-solver",
    title: "Quadratic Equation Solver",
    desc: "Solve ax² + bx + c = 0 with step-by-step roots using the quadratic formula and discriminant.",
    icon: Square,
    category: "Solver",
    hint: "ax² + bx + c = 0",
    available: true,
  },
  {
    href: "/solvers/equation-solver",
    title: "Equation Solver",
    desc: "Solve linear, quadratic, and rational equations with full algebraic steps.",
    icon: Sigma,
    category: "Solver",
    hint: "2x + 5 = 13",
    available: true,
  },
  {
    href: "/solvers/algebra-solver",
    title: "Algebra Solver",
    desc: "Simplify, factor, and solve any algebraic expression with detailed work shown.",
    icon: Variable,
    category: "Solver",
    hint: "x² , 5x + 6",
    available: true,
  },
  {
    href: "/solvers/system-of-equations-solver",
    title: "System of Equations Solver",
    desc: "Solve systems of 2 or 3 linear equations using substitution and elimination methods.",
    icon: GitBranch,
    category: "Solver",
    hint: "{ x + y = 5, x , y = 1 }",
    available: true,
  },
  {
    href: "/solvers/derivative-calculator",
    title: "Derivative Calculator",
    desc: "Compute derivatives of any function with chain, product, and quotient rules applied step by step.",
    icon: FunctionSquare,
    category: "Calculator",
    hint: "d/dx(x³ + 2x)",
    available: true,
  },
  {
    href: "/solvers/integral-calculator",
    title: "Integral Calculator",
    desc: "Definite and indefinite integrals with substitution, integration by parts, and partial fractions.",
    icon: Sigma,
    category: "Calculator",
    hint: "∫(2x + 1) dx",
    available: true,
  },
  {
    href: "/solvers/limit-calculator",
    title: "Limit Calculator",
    desc: "Evaluate limits including one-sided, at infinity, and indeterminate forms via L'Hôpital.",
    icon: ArrowRight,
    category: "Calculator",
    hint: "lim x→0 sin(x)/x",
    available: true,
  },
  {
    href: "/solvers/matrix-calculator",
    title: "Matrix Calculator",
    desc: "Determinant, inverse, eigenvalues, and operations for matrices up to 4×4.",
    icon: CalcIcon,
    category: "Calculator",
    hint: "det(A), A⁻¹, A·B",
    available: true,
  },
  {
    href: "/solvers/fraction-calculator",
    title: "Fraction Calculator",
    desc: "Add, subtract, multiply, divide, and simplify fractions with full steps shown.",
    icon: Divide,
    category: "Calculator",
    hint: "1/2 + 2/3",
    available: true,
  },
  {
    href: "/solvers/percentage-calculator",
    title: "Percentage Calculator",
    desc: "Percentage of, percentage change, percentage increase/decrease, and reverse percentages.",
    icon: Percent,
    category: "Calculator",
    hint: "What is 18% of 240?",
    available: true,
  },
  {
    href: "/solvers/trigonometry-calculator",
    title: "Trigonometry Calculator",
    desc: "Evaluate sin, cos, tan and their inverses, plus identities and triangle solving.",
    icon: Triangle,
    category: "Calculator",
    hint: "sin(30°), cos⁻¹(0.5)",
    available: true,
  },
  {
    href: "/solvers/standard-deviation-calculator",
    title: "Standard Deviation Calculator",
    desc: "Compute mean, variance, and standard deviation for any data set, sample or population.",
    icon: BarChart3,
    category: "Calculator",
    hint: "σ, σ², μ",
    available: true,
  },
];

export default function SolversIndexPage() {
  const solvers = tools.filter((t) => t.category === "Solver");
  const calculators = tools.filter((t) => t.category === "Calculator");

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero-subtle py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              All Math Tools in One Place
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Free Math Solvers &{" "}
              <span className="gradient-text">Step-by-Step Calculators</span>
            </h1>
            <p className="text-base md:text-lg text-muted mt-4 max-w-2xl mx-auto leading-relaxed">
              Every tool on this page is free, runs in your browser, and shows the full solution, not just the answer. Pick a solver or calculator below, or upload a photo of your math problem on the homepage.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#solver"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg shadow-indigo-500/20"
              >
                <Camera className="w-4 h-4" />
                Solve from Photo
              </Link>
              <a
                href="#solvers"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground bg-white border border-border hover:border-primary/40 transition"
              >
                Browse Tools
              </a>
            </div>
          </div>
        </section>

        {/* Solvers grid */}
        <section id="solvers" className="py-12 md:py-14 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Solvers</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Equation & Algebra Solvers</h2>
              </div>
              <p className="text-sm text-muted">Solve equations, simplify expressions, factor polynomials.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {solvers.map((t) => (
                <ToolCard key={t.href} tool={t} />
              ))}
            </div>
          </div>
        </section>

        {/* Calculators grid */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-1">Calculators</p>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">Specialized Calculators</h2>
              </div>
              <p className="text-sm text-muted">Compute specific quantities with step-by-step working.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {calculators.map((t) => (
                <ToolCard key={t.href} tool={t} />
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                One destination for every kind of math problem
              </h2>
              <p>
                Whether you are tackling a quadratic equation, finding a derivative, simplifying fractions, or computing the standard deviation of a data set, the right calculator can save you time and help you actually understand the method. This is the hub for every solver and calculator on Free PhotoMath AI, organized so you can find what you need in seconds.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Solvers for equations and algebra</h3>
              <p>
                Our solvers handle the kind of problems you encounter throughout middle school, high school, and university algebra: linear equations, quadratic equations, systems of equations, polynomial simplification, and word problems. Each solver shows every step, including the rule applied at each stage, so you can use the result both as an answer key and as a learning aid.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Calculators for specific computations</h3>
              <p>
                When you need a focused tool for one type of computation, the specialized calculators on this page deliver exactly that. Derivatives, integrals, limits, matrices, fractions, percentages, trigonometric values, and statistical measures all have their own dedicated pages with clean inputs, fast computation, and complete worked solutions. Each calculator includes five fully worked examples so you can see the method in action before plugging in your own numbers.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">Why choose Free PhotoMath AI</h3>
              <p>
                All tools are free, no sign-up is required, and everything runs in your browser. You can use these calculators on a phone, tablet, or desktop without installing an app. Solutions include step-by-step reasoning, not just numerical answers, so the calculators function as study tools as much as answer keys. If a problem is too complex to type in, you can always upload a photo on the homepage and let our AI do the parsing for you.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  const isComingSoon = !tool.available;

  const inner = (
    <>
      {isComingSoon && (
        <span className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
          Soon
        </span>
      )}
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4 group-hover:from-indigo-200 group-hover:to-purple-200 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-bold text-foreground text-base mb-1.5 leading-tight">
        {tool.title}
      </h3>
      <p className="text-xs text-muted leading-relaxed mb-3">{tool.desc}</p>
      <code className="inline-block text-[11px] font-mono bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-200">
        {tool.hint}
      </code>
      {tool.available && (
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Open tool
          <ArrowRight className="w-3 h-3" />
        </div>
      )}
    </>
  );

  if (isComingSoon) {
    return (
      <div className="group relative block bg-white rounded-2xl border border-border p-6 opacity-70 cursor-default">
        {inner}
      </div>
    );
  }

  return (
    <Link
      href={tool.href}
      className="group relative block bg-white rounded-2xl border border-border p-6 transition-all hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5"
    >
      {inner}
    </Link>
  );
}
