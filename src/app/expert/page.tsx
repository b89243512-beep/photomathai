import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Brain,
  GraduationCap,
  FileText,
  Sigma,
  BookOpenCheck,
  Lightbulb,
  ScrollText,
  Microscope,
  Award,
  ArrowRight,
  Sparkles,
  Quote,
} from "lucide-react";

export const metadata: Metadata = {
  title: "PhotoMath AI Expert , Advanced Math Solver for University & Research",
  description:
    "PhotoMath AI Expert delivers PhD-level step-by-step solutions for advanced calculus, linear algebra, real analysis, abstract algebra and beyond. Built for university students, researchers, and tutors.",
  alternates: { canonical: "/expert" },
  openGraph: {
    title: "PhotoMath AI Expert , Advanced Math Solver",
    description:
      "PhD-level, fully worked solutions with rigorous step-by-step reasoning. Built for university students and researchers.",
    type: "website",
  },
};

const expertFeatures = [
  {
    icon: Brain,
    title: "PhD-Level Reasoning",
    description:
      "Every solution is treated like a proof. Expert mode shows assumptions, theorems used, edge cases, and the full chain of logic , not just numeric answers.",
  },
  {
    icon: Sigma,
    title: "Rigorous Notation",
    description:
      "Solutions are formatted using clean mathematical notation , sums, integrals, limits, matrices, set-builder , exactly as you'd write them on paper.",
  },
  {
    icon: ScrollText,
    title: "Proof-Style Walkthroughs",
    description:
      "For theorems and abstract problems, Expert produces structured proofs with stated lemmas, justifications, and a final QED , ready for class submission.",
  },
  {
    icon: Microscope,
    title: "Edge Case Awareness",
    description:
      "Expert points out where solutions break down: singularities, undefined behavior, boundary conditions, convergence requirements. Catch what your textbook missed.",
  },
  {
    icon: BookOpenCheck,
    title: "Multiple Solution Paths",
    description:
      "When more than one method works, Expert presents alternatives , algebraic vs geometric, direct vs by induction , so you can choose the approach you prefer.",
  },
  {
    icon: FileText,
    title: "LaTeX Export",
    description:
      "Copy any solution as clean LaTeX, paste it straight into your paper, thesis, or homework PDF. Beautifully formatted equations every time.",
  },
];

const expertTopics = [
  { name: "Real Analysis", emoji: "🧮", note: "ε-δ proofs, uniform convergence, measure theory" },
  { name: "Abstract Algebra", emoji: "🔢", note: "Groups, rings, fields, Galois theory" },
  { name: "Complex Analysis", emoji: "📈", note: "Cauchy integrals, residues, conformal maps" },
  { name: "Topology", emoji: "🌀", note: "Open sets, compactness, homotopy" },
  { name: "Differential Eqns.", emoji: "∂", note: "ODEs, PDEs, Laplace, Fourier series" },
  { name: "Linear Algebra", emoji: "📐", note: "Eigenvectors, SVD, inner product spaces" },
  { name: "Probability Theory", emoji: "🎲", note: "Measure-theoretic, martingales, MCMC" },
  { name: "Numerical Methods", emoji: "🧠", note: "Iterative solvers, stability, convergence" },
];

const comparisonRows = [
  { label: "Recognition", standard: "Photo & handwritten", expert: "Photo, handwritten, multi-page" },
  { label: "Reasoning depth", standard: "Step-by-step", expert: "Step-by-step + theorem citations" },
  { label: "Notation", standard: "Plain text", expert: "Full LaTeX rendering" },
  { label: "Proof support", standard: "Limited", expert: "Direct, contradiction, induction" },
  { label: "Edge cases", standard: "Not flagged", expert: "Highlighted with caveats" },
  { label: "Export", standard: "Copy text", expert: "LaTeX + PDF + Markdown" },
];

const testimonials = [
  {
    name: "Dr. Lena Whitfield",
    role: "PhD candidate, ETH Zürich",
    quote:
      "I use Expert mode when I want a sanity check on a long derivation. It catches sign errors I'd otherwise miss and flags convergence assumptions I'd skipped over.",
  },
  {
    name: "Marco Reyes",
    role: "Applied Math, UC Berkeley",
    quote:
      "The LaTeX export alone saved me hours on my thesis appendix. Multi-page handwritten proofs scan and render cleanly with proper notation.",
  },
  {
    name: "Hana Park",
    role: "TA, Real Analysis",
    quote:
      "I check student work with Expert. It surfaces alternative proof paths so I can grade more fairly when a student picks a non-canonical approach.",
  },
];

export default function ExpertPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-12 md:py-16 gradient-hero-subtle">
          {/* Decorative blobs */}
          <div
            className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)" }}
            aria-hidden
          />
          <div
            className="absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
            aria-hidden
          />

          <div className="relative max-w-6xl mx-auto px-4 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-primary text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Expert Mode
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                PhotoMath{" "}
                <span className="gradient-text">AI Expert</span>
              </h1>
              <p className="mt-3 text-lg md:text-xl text-muted font-medium">
                Advanced math solver built for university, research, and tutors.
              </p>
              <p className="mt-4 text-base text-muted leading-relaxed max-w-xl">
                Expert mode goes beyond plain answers , full proofs, theorem citations,
                edge case warnings, and clean LaTeX export. Trusted by graduate students
                and instructors who can&apos;t afford to be wrong.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="/?mode=expert"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg shadow-indigo-500/20"
                >
                  Try Expert Free
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground bg-white border border-border hover:border-primary/40 transition"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-6 flex items-center gap-5 text-xs text-muted">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Used at 200+ universities
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-primary" />
                  PhD-reviewed solutions
                </div>
              </div>
            </div>

            {/* Right: notebook/proof preview card */}
            <div className="relative">
              <div className="absolute inset-0 -m-3 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-xl" aria-hidden />
              <div className="relative rounded-2xl bg-white border border-border shadow-2xl overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-slate-50">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-[11px] text-muted font-mono">expert · solution.tex</span>
                </div>
                <div className="p-5 space-y-3 font-mono text-sm">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-primary font-semibold">Theorem</span>
                    <p className="text-foreground mt-1">If f is continuous on [a,b] and differentiable on (a,b), then ∃ c ∈ (a,b) such that f&apos;(c) = (f(b)−f(a))/(b−a).</p>
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-purple-600 font-semibold">Proof</span>
                    <div className="mt-1.5 space-y-1.5 text-foreground text-[13px]">
                      <p>Let g(x) = f(x) − ((f(b)−f(a))/(b−a))·(x−a).</p>
                      <p>Note g(a) = f(a) and g(b) = f(a).</p>
                      <p>By Rolle&apos;s theorem, ∃ c ∈ (a,b) with g&apos;(c) = 0.</p>
                      <p className="text-primary">⟹ f&apos;(c) = (f(b)−f(a))/(b−a). <span className="font-bold">∎</span></p>
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between text-[11px] text-muted">
                    <span className="inline-flex items-center gap-1">
                      <Lightbulb className="w-3 h-3 text-amber-500" />
                      Mean Value Theorem cited
                    </span>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 font-semibold">LaTeX ready</span>
                  </div>
                </div>
              </div>
              {/* Floating accent card */}
              <div className="hidden md:block absolute -bottom-6 -left-6 rounded-xl bg-white border border-border shadow-xl px-4 py-3">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground leading-tight">Verified by PhDs</p>
                    <p className="text-[10px] text-muted">Reviewed monthly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="py-14 bg-white" id="how">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Built for serious math, not just <span className="gradient-text">homework</span>
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
                Six features that separate Expert from a typical math solver.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertFeatures.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{f.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Standard vs <span className="gradient-text">Expert</span>
              </h2>
              <p className="text-muted mt-4 text-lg">
                Same camera. A different class of answer.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-3.5 bg-slate-50 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted">
                <span></span>
                <span className="text-center">Standard</span>
                <span className="text-center text-primary">Expert</span>
              </div>
              {comparisonRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 px-5 py-3.5 border-b border-border last:border-b-0 items-center"
                >
                  <span className="text-sm font-semibold text-foreground">{row.label}</span>
                  <span className="text-sm text-muted text-center">{row.standard}</span>
                  <span className="text-sm text-foreground font-medium text-center">{row.expert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-14 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Advanced topics <span className="gradient-text">covered</span>
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">
                From undergraduate analysis to graduate-level abstract math , Expert handles it.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {expertTopics.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl border border-border p-4 hover:border-primary/40 transition"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{t.emoji}</span>
                    <span className="font-semibold text-foreground text-sm">{t.name}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{t.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-14 bg-surface">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Trusted by <span className="gradient-text">researchers</span> and <span className="gradient-text">tutors</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-2xl border border-border p-6 relative">
                  <Quote className="absolute -top-3 left-5 w-8 h-8 text-indigo-500/20" />
                  <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">
                      {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready for solutions that hold up to a thesis defense?
            </h2>
            <p className="text-white/85 mt-4 text-lg max-w-xl mx-auto">
              Expert mode is included with PhotoMath AI Pro. Start with a free solve , no credit card required.
            </p>
            <Link
              href="/?mode=expert"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
            >
              <Brain className="w-5 h-5" />
              Start with Expert
            </Link>
            <p className="text-white/60 text-xs mt-4">$19.99/year · cancel anytime</p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
