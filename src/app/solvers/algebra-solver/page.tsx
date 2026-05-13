import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { InlineCalculator } from "@/components/InlineCalculator";

export const metadata: Metadata = {
  title: "Algebra Solver Online , Free Step-by-Step Algebra Calculator",
  description:
    "Free online algebra solver. Simplify expressions, factor polynomials, and solve equations with step-by-step solutions. Includes 5 worked examples.",
  alternates: { canonical: "/solvers/algebra-solver" },
  keywords: ["algebra solver", "algebra calculator", "free algebra solver", "factor calculator", "simplify expression", "polynomial solver", "algebra help", "step by step algebra"],
};

const examples = [
  { title: "Example 1, Combine like terms", problem: "Simplify 3x + 5 + 2x − 7", result: "5x − 2", notes: "Group x-terms together and constants together.", steps: [
    { title: "Group like terms", content: "(3x + 2x) + (5 − 7)" },
    { title: "Combine", content: "5x + (−2)" },
    { title: "Result", content: "5x − 2" },
  ]},
  { title: "Example 2, Distribute", problem: "Simplify 3(x + 4) − 2(x − 1)", result: "x + 14", notes: "Distribute first, then combine like terms.", steps: [
    { title: "Distribute", content: "3x + 12 − 2x + 2" },
    { title: "Combine", content: "(3x − 2x) + (12 + 2)" },
    { title: "Result", content: "x + 14" },
  ]},
  { title: "Example 3, Factor a quadratic", problem: "Factor x² + 5x + 6", result: "(x + 2)(x + 3)", notes: "Find two numbers that multiply to 6 and add to 5: 2 and 3.", steps: [
    { title: "Identify product/sum", content: "Need ab = 6 and a + b = 5" },
    { title: "Find the pair", content: "a = 2, b = 3 (since 2·3 = 6 and 2 + 3 = 5)" },
    { title: "Write as product", content: "(x + 2)(x + 3)" },
  ]},
  { title: "Example 4, Difference of squares", problem: "Factor x² − 16", result: "(x + 4)(x − 4)", notes: "Pattern: a² − b² = (a + b)(a − b).", steps: [
    { title: "Identify pattern", content: "x² − 16 = x² − 4²" },
    { title: "Apply formula", content: "(x + 4)(x − 4)" },
  ]},
  { title: "Example 5, Factor by grouping", problem: "Factor x³ + 2x² + 3x + 6", result: "(x + 2)(x² + 3)", notes: "Pair terms and look for a common factor.", steps: [
    { title: "Group", content: "(x³ + 2x²) + (3x + 6)" },
    { title: "Factor each group", content: "x²(x + 2) + 3(x + 2)" },
    { title: "Common factor", content: "(x + 2)(x² + 3)" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Algebra Solver"
      highlight="Simplify · Factor · Solve"
      badgeText="Full Algebra Toolkit"
      intro="Simplify expressions, distribute parentheses, factor polynomials, and solve algebraic equations, all with detailed step-by-step solutions."
      widget={<InlineCalculator placeholder="2(x + 3) − x" />}
      formulaCard={{
        label: "Three Algebra Patterns",
        formula: <span>a² − b² = (a+b)(a−b) &nbsp; · &nbsp; (a+b)² = a² + 2ab + b²</span>,
        caption: "Difference of squares and perfect square trinomial, the two most-used factoring patterns. Memorize them; they appear constantly.",
      }}
      examplesHeading="Five core algebra moves, demonstrated"
      examplesIntro="From combining like terms to factor by grouping, the five techniques that cover most algebra homework."
      cta={{ title: "Got a multi-step algebra problem?", body: "Snap a photo, the AI handles long expressions, systems, and inequalities.", button: "Open Photo Solver" }}
      conceptTitle="The toolkit of algebra"
      conceptBody={<>
        <p>Algebra is the art of manipulating expressions while preserving their value. The core moves are: combine like terms, distribute over parentheses, factor (the reverse of distribution), expand products, simplify fractions, and solve equations.</p>
        <p>Factoring is the most subtle move, given a polynomial, rewrite it as a product. Common techniques: greatest common factor first, then look for difference of squares (a² − b²), perfect squares (a² ± 2ab + b²), trinomial pattern (find two numbers that multiply/add correctly), or grouping for four-term polynomials.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Free algebra solver with step-by-step explanations", body: "Algebra is the foundation of higher math, mastery here pays off in calculus, statistics, physics, and beyond. This solver covers simplification, distribution, factoring, and equation solving with the complete work shown. Each worked example demonstrates a different core technique so you can recognize patterns in your own problems." },
        { title: "Combining like terms", body: "Terms with the same variable raised to the same power can be added or subtracted by combining their coefficients. 3x + 5x = 8x, but 3x + 5x² cannot be combined further. Constants combine with constants. This is the first step in nearly every algebraic simplification." },
        { title: "Distributing and expanding", body: "Distribution is the rule a(b + c) = ab + ac. Use it to clear parentheses before combining like terms. When distributing a negative, every sign inside the parentheses flips. For products of two binomials like (x + 2)(x + 3), use FOIL (First, Outer, Inner, Last) or the general distributive property." },
        { title: "Factoring polynomials", body: "Factoring undoes distribution, rewrite a sum as a product. Always check first for a greatest common factor across all terms. Then identify special patterns: difference of squares, perfect square trinomials, sum/difference of cubes. For general trinomials ax² + bx + c, find two numbers that multiply to ac and add to b." },
        { title: "When to use this solver", body: "Use the calculator above to evaluate numerical expressions step by step. For symbolic algebra, like factoring a specific polynomial or simplifying a long expression, the worked examples above demonstrate the methodology. For instant symbolic algebra on any problem, use the photo solver on the homepage." },
      ]}
    />
  );
}
