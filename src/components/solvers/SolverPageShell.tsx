import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Sparkles, ArrowLeft, Lightbulb, Camera, Check, AlertCircle } from "lucide-react";

export type WorkedExample = {
  title: string;
  problem: string;
  result: string;
  notes: string;
  steps: { title: string; content: string }[];
};

export type ConceptCard = { sign: string; title: string; desc: string; color: string };

export function SolverPageShell({
  title,
  highlight,
  badgeText = "Free, No Sign-up",
  intro,
  widget,
  formulaCard,
  conceptTitle,
  conceptBody,
  conceptCards,
  examplesHeading = "Five problems, solved step by step",
  examplesIntro,
  examples,
  extraSection,
  seoSections,
  cta = {
    title: "Got a photo of a math problem?",
    body: "Skip the typing , upload a photo and get a step-by-step solution in seconds.",
    button: "Try the Photo Solver",
  },
}: {
  title: string;
  highlight: string;
  badgeText?: string;
  intro: string;
  widget: React.ReactNode;
  formulaCard?: { label: string; formula: React.ReactNode; caption?: string };
  conceptTitle: string;
  conceptBody: React.ReactNode;
  conceptCards?: ConceptCard[];
  examplesHeading?: string;
  examplesIntro?: string;
  examples: WorkedExample[];
  extraSection?: React.ReactNode;
  seoSections: { title: string; body: string }[];
  cta?: { title: string; body: string; button: string };
}) {
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
            <span className="text-gray-600">{title}</span>
          </div>
        </div>

        {/* Hero */}
        <section className="gradient-hero-subtle py-10 md:py-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {badgeText}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              {title}{" "}
              <span className="gradient-text">{highlight}</span>
            </h1>
            <p className="text-base md:text-lg text-muted mt-3 max-w-2xl mx-auto leading-relaxed">{intro}</p>
          </div>
        </section>

        {/* Widget */}
        <section className="py-8 md:py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {widget}
            <p className="text-center text-xs text-muted mt-5">
              For complex problems, use the{" "}
              <Link href="/" className="text-primary font-semibold hover:underline">photo solver</Link>.
            </p>
          </div>
        </section>

        {/* Concept */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{conceptTitle}</h2>
            </div>
            {formulaCard && (
              <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-6 text-center">
                <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-3">{formulaCard.label}</p>
                <div className="font-mono text-2xl md:text-3xl text-center text-gray-900 py-4">
                  {formulaCard.formula}
                </div>
                {formulaCard.caption && (
                  <p className="text-sm text-muted max-w-xl mx-auto leading-relaxed">{formulaCard.caption}</p>
                )}
              </div>
            )}
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8 prose prose-sm md:prose-base max-w-none">{conceptBody}</div>
            {conceptCards && conceptCards.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                {conceptCards.map((c) => (
                  <div key={c.title} className="bg-white rounded-xl border border-border p-5">
                    <div className={`inline-flex items-center justify-center px-3 h-8 rounded-lg bg-${c.color}-50 text-${c.color}-600 font-mono text-sm font-bold mb-3`}>{c.sign}</div>
                    <p className="font-bold text-foreground text-sm">{c.title}</p>
                    <p className="text-xs text-muted mt-1.5 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Optional extra section */}
        {extraSection && <section className="py-10 bg-white">{extraSection}</section>}

        {/* Worked examples */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">Worked Examples</p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{examplesHeading}</h2>
              {examplesIntro && <p className="text-muted mt-3 text-base max-w-xl mx-auto">{examplesIntro}</p>}
            </div>
            <div className="space-y-6">
              {examples.map((ex, i) => (
                <article key={i} className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-cyan-50 border-b border-border flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-primary font-semibold">{ex.title}</p>
                      <p className="text-lg md:text-xl font-bold font-mono text-gray-900 mt-1">{ex.problem}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-mono font-semibold text-gray-900">{ex.result}</span>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <ol className="space-y-3">
                      {ex.steps.map((s, si) => (
                        <li key={si} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{si + 1}</span>
                          <div>
                            <p className="text-sm font-medium text-gray-700">{s.title}</p>
                            <code className="font-mono text-sm text-gray-500 mt-0.5 block">{s.content}</code>
                          </div>
                        </li>
                      ))}
                    </ol>
                    <div className="mt-5 flex items-start gap-2.5 p-3 rounded-lg bg-amber-50 border border-amber-100">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">{ex.notes}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SEO content */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              {seoSections.map((s, i) => (
                <div key={i}>
                  {i === 0 ? (
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{s.title}</h2>
                  ) : (
                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4">{s.title}</h3>
                  )}
                  <p>{s.body}</p>
                </div>
              ))}
            </article>
            <div className="mt-8 p-5 rounded-2xl bg-white border border-border flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground text-sm">Need help with a more complex problem?</p>
                <p className="text-sm text-muted mt-1 leading-relaxed">
                  Upload a photo or type your question on our{" "}
                  <Link href="/" className="text-primary font-semibold hover:underline">main solver</Link>, our AI handles algebra, calculus, geometry, statistics, and word problems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold">{cta.title}</h2>
            <p className="text-white/85 mt-3 text-base max-w-xl mx-auto">{cta.body}</p>
            <Link href="/#solver" className="inline-flex items-center gap-2 mt-7 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-gray-50 transition-colors">
              <Camera className="w-5 h-5" />
              {cta.button}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
