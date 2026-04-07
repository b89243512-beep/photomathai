"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Camera,
  Upload,
  Sparkles,
  BookOpen,
  Zap,
  Brain,
  Shield,
  Globe,
  ChevronDown,
  ChevronUp,
  Image,
  CheckCircle,
  Users,
  SendHorizonal,
  Star,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Snap & Solve Instantly",
    description:
      "Take a photo of any math problem — handwritten or printed — and our AI will recognize it instantly. No tedious typing required.",
  },
  {
    icon: BookOpen,
    title: "Step-by-Step Explanations",
    description:
      "Don't just get the answer. Understand the full solution process with clear, detailed breakdowns of every step along the way.",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Results",
    description:
      "Get accurate solutions in seconds, not minutes. Our AI processes even complex equations almost instantly so you can keep learning.",
  },
  {
    icon: Brain,
    title: "AI-Powered Accuracy",
    description:
      "Built on advanced AI models trained with millions of math problems, delivering reliable and precise solutions you can trust.",
  },
  {
    icon: Shield,
    title: "100% Free, No Sign-Up",
    description:
      "Use Free PhotoMath AI without creating an account. No hidden costs, no subscriptions, no limits on the number of problems you solve.",
  },
  {
    icon: Globe,
    title: "Works on Any Device",
    description:
      "Access Free PhotoMath AI from your phone, tablet, or computer. Just open your browser and start solving — no app download needed.",
  },
];

const steps = [
  {
    number: 1,
    title: "Upload Your Math Problem",
    description:
      "Take a photo, upload an image, or drag & drop a file with your math problem. We support JPG, PNG, and PDF formats.",
    icon: Upload,
  },
  {
    number: 2,
    title: "AI Analyzes Your Problem",
    description:
      "Our advanced AI reads the problem using cutting-edge OCR technology, accurately detecting equations from handwritten or printed sources.",
    icon: Sparkles,
  },
  {
    number: 3,
    title: "Get Step-by-Step Solutions",
    description:
      "Receive a complete solution with every step clearly explained. Understand the method behind the answer and learn as you solve.",
    icon: BookOpen,
  },
];

const subjects = [
  { name: "Algebra", emoji: "📐", description: "Equations, inequalities, polynomials" },
  { name: "Calculus", emoji: "📊", description: "Derivatives, integrals, limits" },
  { name: "Geometry", emoji: "📏", description: "Shapes, areas, volumes, proofs" },
  { name: "Trigonometry", emoji: "📐", description: "Sin, cos, tan, identities" },
  { name: "Statistics", emoji: "📈", description: "Probability, distributions, tests" },
  { name: "Linear Algebra", emoji: "🔢", description: "Matrices, vectors, spaces" },
  { name: "Number Theory", emoji: "🔣", description: "Primes, divisibility, modular" },
  { name: "Word Problems", emoji: "📝", description: "Real-world math applications" },
];

const faqs = [
  {
    question: "Is Free PhotoMath AI really free to use?",
    answer:
      "Yes, Free PhotoMath AI is completely free. You can solve unlimited math problems without any hidden fees, subscriptions, or sign-up requirements. Our mission is to make math education accessible to everyone.",
  },
  {
    question: "What types of math problems can Free PhotoMath AI solve?",
    answer:
      "Free PhotoMath AI handles a broad range of mathematics including algebra, calculus, geometry, trigonometry, statistics, linear algebra, number theory, and word problems. It works with basic arithmetic all the way up to advanced university-level mathematics.",
  },
  {
    question: "How accurate is Free PhotoMath AI?",
    answer:
      "Free PhotoMath AI leverages advanced AI models that have been trained on millions of math problems. It delivers highly accurate solutions with detailed step-by-step explanations. For complex or ambiguous problems, we recommend double-checking the solution steps.",
  },
  {
    question: "Can I use Free PhotoMath AI on my phone?",
    answer:
      "Absolutely! Free PhotoMath AI works seamlessly on any device with a web browser — smartphones, tablets, laptops, and desktop computers. You can even take photos directly from your phone camera and upload them.",
  },
  {
    question: "Does Free PhotoMath AI work with handwritten math?",
    answer:
      "Yes, our AI uses cutting-edge OCR (Optical Character Recognition) technology that can accurately detect and interpret both handwritten and printed math problems. For best results, ensure your handwriting is clear and the photo is well-lit.",
  },
  {
    question: "Can I ask follow-up questions about a solution?",
    answer:
      "Yes! After receiving your solution, you can ask clarifying questions about specific steps, request alternative solution methods, or ask for related practice problems to strengthen your understanding of the concept.",
  },
];

const stats = [
  { value: "10M+", label: "Problems Solved", icon: CheckCircle },
  { value: "5M+", label: "Happy Students", icon: Users },
  { value: "4.9/5", label: "User Rating", icon: Star },
  { value: "<3s", label: "Avg. Solve Time", icon: Clock },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
        aria-expanded={open}
      >
        <span className="font-semibold text-foreground pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-muted text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="gradient-hero-subtle py-8 md:py-10" id="solver">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
              Free PhotoMath AI{" "}
              <span className="gradient-text">Math Problem Solver</span>
            </h1>
            <p className="text-sm md:text-base text-muted mt-2 max-w-xl mx-auto leading-relaxed">
              Snap a photo of any math problem and get instant, step-by-step solutions. Algebra, calculus, geometry, trigonometry and more — free, no sign-up needed.
            </p>

            {/* Chat Bar & Upload Area */}
            <div className="mt-4 max-w-2xl mx-auto space-y-3">
              {/* Search-style Input Bar */}
              <div className="bg-white/70 backdrop-blur-sm rounded-full border border-border/80 shadow-lg px-5 py-2.5 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type or upload your question"
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted/50 focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  <button
                    className="w-10 h-10 rounded-full flex items-center justify-center text-muted/60 hover:text-primary hover:bg-primary/5 transition-colors"
                    aria-label="Math keyboard"
                    title="Math keyboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h12"/></svg>
                  </button>
                  <div className="w-px h-6 bg-border/60" />
                  <button
                    className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center text-white hover:bg-foreground/80 transition-colors"
                    aria-label="Send"
                  >
                    <SendHorizonal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drop Zone */}
              <div className="upload-area rounded-2xl py-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center">
                    <Image className="w-5 h-5 text-muted/40" />
                  </div>
                  <p className="text-muted text-sm">
                    Drag Image or{" "}
                    <span className="font-semibold text-foreground cursor-pointer hover:text-primary transition-colors">
                      Click Here
                    </span>{" "}
                    to upload
                  </p>
                  <p className="text-muted/50 text-xs flex items-center gap-1.5">
                    Command{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">&#8984;</kbd>
                    {" "}+{" "}
                    <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono">V</kbd>
                    {" "}to paste
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-4 gap-3 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center py-3">
                  <stat.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-xl md:text-2xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-muted mt-0.5 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white" id="features">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose <span className="gradient-text">Free PhotoMath AI</span>?
              </h2>
              <p className="text-muted mt-4 max-w-2xl mx-auto text-lg">
                The most powerful AI-driven math solver available online — designed to help students learn, not just find answers.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">{feature.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16 bg-surface" id="how-it-works">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                How <span className="gradient-text">Free PhotoMath AI</span> Works
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">
                Solving math problems has never been this simple. Just three easy steps.
              </p>
            </div>
            <div className="space-y-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-start gap-6 bg-white rounded-2xl p-6 border border-border"
                >
                  <div className="step-number shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">
                      {step.title}
                    </h3>
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <article className="prose prose-lg max-w-none text-muted leading-relaxed">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                The Ultimate Free PhotoMath AI Tool for Students and Learners
              </h2>
              <p>
                Mathematics remains one of the most challenging subjects for students at every level, from middle school through university. Whether you are struggling with a tricky algebra equation, trying to make sense of calculus derivatives, or working through a complex geometry proof, having access to the right tools can transform your learning experience. Free PhotoMath AI was built to be that tool — a smart, reliable, and completely free math problem solver that turns any photo of a math question into a clear, step-by-step solution.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                How Free PhotoMath AI Transforms Your Study Sessions
              </h3>
              <p>
                Traditional math tutoring can be expensive and difficult to schedule. Textbook answer keys rarely show the work behind the solution. Free PhotoMath AI bridges this gap by providing instant, detailed explanations for every problem you encounter. Simply take a photo of your homework, paste it into the solver, or type the equation directly — and within seconds you will receive a complete breakdown of the solution method. This is not just about getting answers; it is about understanding the reasoning behind each step so you can apply the same logic to future problems.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Advanced OCR Technology That Reads Any Math Problem
              </h3>
              <p>
                One of the most powerful features of Free PhotoMath AI is its advanced Optical Character Recognition technology. Unlike basic text scanners, our AI is specifically trained to interpret mathematical notation, symbols, fractions, exponents, integrals, matrices, and handwritten expressions. Whether you snap a picture of a printed textbook page or a handwritten problem on notebook paper, Free PhotoMath AI can accurately parse the equation and deliver the correct solution. This technology supports a wide range of mathematical formats, ensuring that virtually any problem you encounter in your studies can be processed and solved.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Covering Every Branch of Mathematics
              </h3>
              <p>
                Free PhotoMath AI is not limited to simple arithmetic. The platform handles problems across the full spectrum of mathematics, including elementary algebra, pre-calculus, differential and integral calculus, trigonometric identities and equations, probability and statistics, linear algebra and matrix operations, number theory, and real-world word problems. This broad coverage makes it an ideal companion for students at any academic level, whether you are preparing for a middle school test or tackling graduate-level coursework. Each solution is tailored to the complexity of the problem, providing explanations that match the depth of understanding required.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Learn by Understanding, Not Just Memorizing
              </h3>
              <p>
                The core philosophy behind Free PhotoMath AI is education, not shortcuts. Every solution generated by our platform includes a detailed walkthrough of the steps involved. You will see how the problem is set up, which formulas or theorems are applied, how intermediate calculations are performed, and why each step logically follows the previous one. This approach helps you build genuine mathematical intuition rather than simply memorizing procedures. Over time, you will notice patterns across different types of problems, strengthening your ability to solve similar questions independently.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Accessible Anytime, Anywhere, on Any Device
              </h3>
              <p>
                Free PhotoMath AI is a web-based platform that requires no downloads, installations, or account registrations. It runs smoothly on smartphones, tablets, laptops, and desktop computers. This means you can access your math solver wherever you are — at home, in the library, on the bus, or right before an exam. The responsive design ensures a seamless experience regardless of screen size, and the fast processing times mean you spend more time learning and less time waiting. Because there are no subscription fees or usage limits, you can rely on Free PhotoMath AI as your go-to study companion throughout the entire school year and beyond.
              </p>

              <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                Why Millions of Students Trust Free PhotoMath AI
              </h3>
              <p>
                With millions of problems solved and a growing community of satisfied users worldwide, Free PhotoMath AI has established itself as one of the most trusted online math tools available. Students appreciate the accuracy, the speed, and the clarity of explanations. Teachers recognize it as a valuable supplement that encourages independent learning. Parents value the fact that it is completely free and safe to use. Whether you need help with tonight&apos;s homework, want to review a concept before a quiz, or are looking for a reliable resource to support long-term academic growth, Free PhotoMath AI is designed to meet your needs and help you succeed in mathematics.
              </p>
            </article>
          </div>
        </section>

        {/* Subjects Section */}
        <section className="py-12 md:py-16 bg-white" id="subjects">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Math Subjects <span className="gradient-text">We Cover</span>
              </h2>
              <p className="text-muted mt-4 max-w-xl mx-auto text-lg">
                Free PhotoMath AI supports a wide range of mathematical topics, from elementary arithmetic to university-level courses.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {subjects.map((subject) => (
                <div key={subject.name} className="subject-badge flex-col items-start gap-1 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{subject.emoji}</span>
                    <span className="font-semibold text-foreground">{subject.name}</span>
                  </div>
                  <p className="text-xs text-muted mt-1">{subject.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 gradient-hero text-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Solve Math Problems Effortlessly?
            </h2>
            <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
              Join millions of students who use Free PhotoMath AI to ace their homework, prepare for exams, and truly understand mathematics.
            </p>
            <a
              href="#solver"
              className="inline-flex items-center gap-2 mt-8 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-lg"
            >
              <Camera className="w-5 h-5" />
              Start Solving for Free
            </a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16 bg-surface" id="faq">
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-muted mt-4 text-lg">
                Everything you need to know about Free PhotoMath AI.
              </p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <FAQItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
