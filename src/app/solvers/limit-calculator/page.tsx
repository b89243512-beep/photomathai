import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { InlineCalculator } from "@/components/InlineCalculator";

export const metadata: Metadata = {
  title: "Limit Calculator , Free Step-by-Step Limits with L'Hôpital",
  description:
    "Free online limit calculator. Compute limits at finite points, at infinity, one-sided limits, and indeterminate forms using L'Hôpital's rule. Five worked examples.",
  alternates: { canonical: "/solvers/limit-calculator" },
  keywords: ["limit calculator", "limits calculator", "calculus limit", "L'Hopital rule calculator", "one-sided limit", "limit at infinity", "indeterminate form calculator", "step by step limits"],
};

const examples = [
  { title: "Example 1, Direct substitution", problem: "lim x→2 (x² + 3)", result: "7", notes: "If the function is continuous at the point, just plug in.", steps: [
    { title: "Substitute x = 2", content: "(2)² + 3 = 4 + 3" },
    { title: "Result", content: "7" },
  ]},
  { title: "Example 2, Factor and cancel", problem: "lim x→3 (x² − 9)/(x − 3)", result: "6", notes: "Direct substitution gives 0/0 (indeterminate); factor to simplify.", steps: [
    { title: "Factor numerator", content: "x² − 9 = (x − 3)(x + 3)" },
    { title: "Cancel (x − 3)", content: "lim x→3 (x + 3)" },
    { title: "Substitute", content: "= 3 + 3 = 6" },
  ]},
  { title: "Example 3, Limit at infinity", problem: "lim x→∞ (3x² + 1)/(2x² + 5x)", result: "3/2", notes: "Divide top and bottom by the highest power of x.", steps: [
    { title: "Divide by x²", content: "(3 + 1/x²) / (2 + 5/x)" },
    { title: "As x → ∞", content: "1/x² → 0, 5/x → 0" },
    { title: "Result", content: "3 / 2" },
  ]},
  { title: "Example 4, L'Hôpital's rule", problem: "lim x→0 sin(x) / x", result: "1", notes: "0/0 form, differentiate top and bottom separately.", steps: [
    { title: "Confirm 0/0", content: "sin(0)/0 = 0/0 indeterminate" },
    { title: "Differentiate", content: "d/dx(sin x) = cos x, d/dx(x) = 1" },
    { title: "New limit", content: "lim x→0 cos(x)/1 = cos(0) = 1" },
  ]},
  { title: "Example 5, One-sided limit", problem: "lim x→0⁺ 1/x", result: "+∞", notes: "Approaching from the right side only.", steps: [
    { title: "Consider x > 0 approaching 0", content: "1/x grows without bound" },
    { title: "Compare to left side", content: "From left (x < 0), 1/x → −∞" },
    { title: "Conclusion", content: "Right limit = +∞, two-sided limit does not exist" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Limit Calculator"
      highlight="lim x→a f(x)"
      badgeText="Finite · Infinite · One-sided"
      intro="Evaluate limits at finite points and at infinity, including indeterminate forms via L'Hôpital's rule. Step-by-step solutions for five common limit types."
      widget={<InlineCalculator placeholder="Evaluate sin(0) / 1" />}
      formulaCard={{
        label: "L'Hôpital's Rule",
        formula: <span>lim f/g = lim f&apos;/g&apos; &nbsp; (when 0/0 or ∞/∞)</span>,
        caption: "When direct substitution gives an indeterminate form, differentiate the top and bottom separately, then try the limit again. Apply repeatedly if needed.",
      }}
      examplesHeading="Five limits across every common type"
      examplesIntro="Direct substitution, factor-and-cancel, infinity, L'Hôpital's rule, and one-sided limits."
      cta={{ title: "Limit with squeeze theorem or piecewise function?", body: "Photo solver handles ε-δ proofs, sequence limits, and uniform convergence.", button: "Open Photo Solver" }}
      conceptTitle="What a limit means"
      conceptBody={<>
        <p>A limit asks: what value does <code>f(x)</code> approach as <code>x</code> gets arbitrarily close to some target? It might be a finite number, infinity, or might not exist. Limits are the foundation that makes derivatives and integrals rigorous.</p>
        <p>When direct substitution gives an indeterminate form (0/0, ∞/∞, 0·∞, ∞ − ∞, 1^∞, 0⁰, ∞⁰), use algebraic manipulation (factor, rationalize) or L&apos;Hôpital&apos;s rule (differentiate top and bottom separately) to resolve it.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Free limit calculator with step-by-step solutions", body: "Limits are the gateway to calculus, every derivative and every definite integral is defined in terms of a limit. This calculator helps you evaluate limits with the full reasoning shown. The worked examples cover the five most common limit types: direct substitution, factor-and-cancel, limits at infinity, L'Hôpital's rule, and one-sided limits." },
        { title: "When direct substitution works", body: "If a function is continuous at the target point, the limit equals the function value, just plug in. This is the easiest case and covers polynomials, exponentials, sines, cosines at all points in their domain. If substitution gives a well-defined number, you're done." },
        { title: "Indeterminate forms and how to resolve them", body: "Common indeterminate forms include 0/0, ∞/∞, 0·∞, and ∞ − ∞. They don't have a fixed value, the actual limit depends on which functions are producing them. Tools to resolve: factoring and cancelation, rationalizing (multiply by conjugate), and L'Hôpital's rule. The goal is to transform the expression into something where substitution works." },
        { title: "L'Hôpital's rule, the calculus shortcut", body: "If lim f/g gives 0/0 or ∞/∞, then lim f/g = lim f'/g' (provided the second limit exists). Differentiate the numerator and denominator separately (NOT using the quotient rule), then try the limit again. Apply repeatedly if needed. The famous lim x→0 sin(x)/x = 1 is the textbook example." },
        { title: "Limits at infinity and one-sided limits", body: "For lim x→∞, divide top and bottom by the highest power of x to see what dominates. For one-sided limits (x → a⁺ or x → a⁻), consider only values approaching from the specified side, this matters for functions with jumps, vertical asymptotes, or piecewise definitions. The two-sided limit exists only if both one-sided limits agree." },
      ]}
    />
  );
}
