import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InlineCalculator } from "@/components/InlineCalculator";
import {
  Camera,
  Sparkles,
  Calculator,
  BookOpen,
  Zap,
  Brain,
  Check,
  X,
  ChevronDown,
  Globe,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Microsoft Math Solver Online , Free AI Math Solver with Steps",
  description:
    "Looking for a Microsoft Math Solver alternative? Solve algebra, calculus, trigonometry, geometry, and word problems online for free with step-by-step solutions. No download, no sign-up.",
  alternates: { canonical: "/microsoft-math-solver" },
  keywords: [
    "microsoft math solver",
    "microsoft math solver online",
    "microsoft math solver alternative",
    "microsoft math solver download",
    "microsoft math solver app",
    "free math solver",
    "math solver online",
    "step by step math solver",
    "algebra solver",
    "calculus solver",
    "math problem solver",
    "ai math solver",
    "photo math solver",
    "equation solver",
    "math homework solver",
    "math solver with steps",
    "online math calculator",
  ],
  openGraph: {
    title: "Microsoft Math Solver Online , Free Alternative with Step-by-Step Solutions",
    description:
      "Free AI math solver , algebra, calculus, trigonometry, geometry. Step-by-step solutions in seconds. A modern alternative to Microsoft Math Solver, fully online.",
    type: "website",
  },
};

const features = [
  { icon: Brain, title: "AI-Powered Step-by-Step Solver", desc: "Like Microsoft Math Solver, every solution comes with detailed steps. Our AI shows you exactly how the answer is reached , algebra, calculus, trigonometry, geometry, statistics." },
  { icon: Camera, title: "Solve Math from Photo", desc: "Snap a photo of any math problem , handwritten or printed , and get an instant solution. No typing, no manual input." },
  { icon: Calculator, title: "Scientific Calculator Built-in", desc: "Full scientific keypad with trig, logs, exponents, square roots, factorials, and constants. Works for everything Microsoft Math Solver's keypad does." },
  { icon: BookOpen, title: "Graphing & Word Problems", desc: "Linear, quadratic, exponential , solve and visualize. Plus, full word-problem support with reasoning, not just numbers." },
  { icon: Zap, title: "Instant Results", desc: "Under three seconds for most problems. No app to download, no account to make , just open and solve, on any device." },
  { icon: Globe, title: "Works in Any Browser", desc: "Microsoft Math Solver is mobile-only on Android/iOS. Our solver runs in your browser , desktop, phone, tablet , wherever you study." },
];

const comparison = [
  { label: "Platform", ms: "Android, iOS app", us: "Web (any device)" },
  { label: "Account required", ms: "Optional Microsoft account", us: "None" },
  { label: "Photo input", ms: "Yes", us: "Yes" },
  { label: "Handwriting recognition", ms: "Yes", us: "Yes" },
  { label: "Step-by-step solutions", ms: "Yes", us: "Yes" },
  { label: "Worded problem support", ms: "Limited", us: "Full AI reasoning" },
  { label: "Graphing", ms: "Yes (basic)", us: "Yes" },
  { label: "Browser version", ms: "math.microsoft.com (legacy)", us: "Always-on web app" },
  { label: "Free", ms: "Yes", us: "Yes (Pro tier available)" },
];

const faqs = [
  {
    q: "What is Microsoft Math Solver?",
    a: "Microsoft Math Solver is a free math problem solver from Microsoft that allows users to enter equations by typing, scanning a photo, or drawing on screen. It returns step-by-step solutions across algebra, calculus, trigonometry, statistics, and more. It is available as a mobile app on Android and iOS, and historically had a web version at math.microsoft.com.",
  },
  {
    q: "Is there an online version of Microsoft Math Solver?",
    a: "Microsoft's official solver is primarily distributed as a mobile app. If you want a fully browser-based solver that works on desktop and mobile without downloading anything, you can use Free PhotoMath AI as a modern online alternative , it covers the same problem types and offers step-by-step solutions.",
  },
  {
    q: "Is Free PhotoMath AI the same as Microsoft Math Solver?",
    a: "No, they are different products. Microsoft Math Solver is built by Microsoft. Free PhotoMath AI is an independent AI-powered math solver that offers similar functionality , photo input, step-by-step solutions, scientific calculator , but runs entirely in your browser with no download required.",
  },
  {
    q: "What math subjects are supported?",
    a: "Algebra (linear and quadratic equations, polynomials, factoring), calculus (derivatives, integrals, limits), trigonometry (identities, equations, conversions), geometry (areas, volumes, proofs), statistics (probability, distributions), linear algebra (matrices, vectors), and word problems.",
  },
  {
    q: "Do I need to download anything?",
    a: "No. Unlike the Microsoft Math Solver app, this solver runs entirely in your browser. No installation, no account, no permissions required. Just open the page and start solving.",
  },
  {
    q: "Can I solve math problems by taking a picture?",
    a: "Yes. Use the photo upload feature on our main solver , upload an image of any printed or handwritten math problem and our AI will read it and produce a complete step-by-step solution.",
  },
  {
    q: "Is the solver free?",
    a: "Yes, the core solver and calculator are free for everyone. There is an optional Pro plan for unlimited solves and advanced features, but you can solve thousands of standard problems without paying.",
  },
  {
    q: "How accurate are the solutions?",
    a: "Our AI is built on large-scale models trained on millions of math problems, with rigorous step-checking. For standard high school and university-level mathematics, accuracy is consistently above 95%. For complex proofs or ambiguous problems, we recommend double-checking the steps.",
  },
];

export default function MicrosoftMathSolverPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="gradient-hero-subtle py-10 md:py-14">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-primary text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Free Online Math Solver
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight">
              Microsoft Math Solver Online ,{" "}
              <span className="gradient-text">Free AI Math Solver</span>
            </h1>
            <p className="text-base md:text-lg text-muted mt-3 max-w-2xl mx-auto leading-relaxed">
              Solve any math problem with step-by-step solutions. Algebra, calculus, trigonometry, geometry, statistics , a fast, free, web-based alternative to Microsoft Math Solver, with photo input and AI reasoning. No download, no sign-up.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#solver"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-90 transition shadow-lg shadow-indigo-500/20"
              >
                <Camera className="w-4 h-4" />
                Solve from Photo
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-foreground bg-white border border-border hover:border-primary/40 transition"
              >
                <Calculator className="w-4 h-4" />
                Try Calculator
              </a>
            </div>

            <div className="mt-5 flex items-center justify-center gap-5 text-xs text-muted">
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> No download</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> No sign-up</div>
              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Step-by-step</div>
            </div>
          </div>
        </section>

        {/* Embedded Calculator */}
        <section id="calculator" className="py-10 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Try the <span className="gradient-text">Math Solver</span> below
              </h2>
              <p className="text-muted mt-2 text-sm md:text-base">
                Type an expression, hit Solve, get step-by-step results , exactly like Microsoft Math Solver, in your browser.
              </p>
            </div>
            <InlineCalculator placeholder="2x + 5 = 13" />
            <p className="text-center text-xs text-muted mt-4">
              Want more power? Try the <Link href="/" className="text-primary font-semibold hover:underline">photo solver</Link> to upload images of any math problem.
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Everything Microsoft Math Solver does , <span className="gradient-text">in your browser</span>
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
                A free, fast, AI-powered alternative with photo input, step-by-step solutions, and a built-in scientific calculator.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f) => (
                <div key={f.title} className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{f.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Microsoft Math Solver <span className="gradient-text">vs Free PhotoMath AI</span>
              </h2>
              <p className="text-muted mt-4 text-lg">
                Both are free. Here&apos;s how they compare feature by feature.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-3 px-5 py-3.5 bg-slate-50 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted">
                <span>Feature</span>
                <span className="text-center">Microsoft Math Solver</span>
                <span className="text-center text-primary">Free PhotoMath AI</span>
              </div>
              {comparison.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-3 px-5 py-3.5 border-b border-border last:border-b-0 items-center"
                >
                  <span className="text-sm font-semibold text-foreground">{row.label}</span>
                  <span className="text-sm text-muted text-center">{row.ms}</span>
                  <span className="text-sm text-foreground font-medium text-center">{row.us}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted text-center mt-4 max-w-2xl mx-auto">
              Microsoft Math Solver is a product of Microsoft Corporation. Free PhotoMath AI is an independent web-based math solver. This page is a comparison and is not affiliated with or endorsed by Microsoft.
            </p>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 md:py-14 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                A complete online math solver: free, fast, and step-by-step
              </h2>
              <p>
                Microsoft Math Solver became a popular choice for students because it offered a quick way to solve math problems by photo, drawing, or typing , and showed every step of the solution rather than just the final answer. If you have been looking for that same experience but want a tool that runs directly in your browser without downloading an Android or iOS app, Free PhotoMath AI is built to be your go-to alternative.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                What can an online math solver do for you?
              </h3>
              <p>
                A good math solver removes the friction between you and a clear, well-explained solution. Whether you are stuck on a tricky algebra equation, need to evaluate a definite integral for calculus, want to verify a trigonometric identity, or are working through a multi-step word problem, an online math solver gives you the answer plus the reasoning. With Free PhotoMath AI you can type the problem into the calculator below, paste an image of your homework, or upload a PDF , and within seconds receive a step-by-step breakdown that matches what your textbook or instructor would show.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Why students choose a web-based math solver over an app
              </h3>
              <p>
                Mobile apps like Microsoft Math Solver are convenient on the go, but they have limitations: you need to download and install them, they consume phone storage, they sometimes require account login, and they only work on your phone. A web-based math solver works on any device with a browser , your laptop in the library, a tablet at home, a school computer, even a friend&apos;s phone you borrowed for a minute. There is nothing to install, nothing to update, and your work is never tied to a single device.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Step-by-step solutions for every type of math
              </h3>
              <p>
                Step-by-step explanations are what separate a real learning tool from a basic answer key. When you use the calculator above or the photo solver on our home page, you will not only get the result , you will see how the expression is parsed, which order of operations applies, where each substitution or transformation happens, and the final answer. This kind of guided walkthrough is exactly what makes Microsoft Math Solver popular among middle and high school students, and our solver delivers the same approach across algebra, geometry, trigonometry, calculus, and probability.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Algebra, calculus, trigonometry, and beyond
              </h3>
              <p>
                Our solver handles the full curriculum: linear and quadratic equations, systems of equations, polynomial factoring, rational expressions, exponential and logarithmic functions, derivatives and integrals (definite and indefinite), limits and series, sine and cosine identities, geometry proofs, matrices and vectors, probability and statistics, and word problems. If a problem can be expressed clearly, our AI can read it, parse it, and walk you through the solution , exactly the breadth you would expect from a Microsoft Math Solver alternative.
            </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Photo input: solve math just by taking a picture
              </h3>
              <p>
                For more complex problems , especially handwritten ones, multi-line equations, or full textbook pages , the fastest workflow is photo input. Snap a picture with your phone or upload an image from your computer, and the AI reads the math, identifies the operations, and produces a clean step-by-step solution. This works whether the problem is printed or handwritten, in pencil or pen, on lined paper or a whiteboard. The same photo-to-solution capability that made Microsoft Math Solver useful is built into our solver and available without installing an app.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Better than a basic calculator
              </h3>
              <p>
                The calculator above is a fully functional scientific calculator with trig functions, logarithms, exponents, square roots, factorials, π, e, and a clean keypad you can use with your mouse or by typing directly. But unlike a typical scientific calculator, it generates step-by-step explanations of how it reached the answer , so you actually learn the method, not just the result. Combined with the photo solver on our home page, it gives you everything Microsoft Math Solver does and more, in a single web interface.
              </p>
            </article>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-14 bg-white">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Frequently asked questions
              </h2>
              <p className="text-muted mt-4 text-lg">
                Everything about Microsoft Math Solver and how our free alternative works.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((f) => (
                <details key={f.q} className="group faq-item">
                  <summary className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none">
                    <span className="font-semibold text-foreground pr-4">{f.q}</span>
                    <ChevronDown className="w-5 h-5 text-muted shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-muted text-sm leading-relaxed">{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to solve math the smart way?
            </h2>
            <p className="text-white/85 mt-4 text-lg max-w-xl mx-auto">
              Upload a photo, type your problem, or use the calculator , get clear, step-by-step solutions in seconds. Free, no sign-up.
            </p>
            <Link
              href="/#solver"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
            >
              <Camera className="w-5 h-5" />
              Solve Math Free Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
