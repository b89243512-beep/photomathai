import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { InlineCalculator } from "@/components/InlineCalculator";

export const metadata: Metadata = {
  title: "Integral Calculator , Free Step-by-Step Antiderivative Solver",
  description:
    "Free online integral calculator. Compute definite and indefinite integrals using power rule, substitution, integration by parts and partial fractions. Five examples.",
  alternates: { canonical: "/solvers/integral-calculator" },
  keywords: ["integral calculator", "antiderivative calculator", "definite integral calculator", "indefinite integral calculator", "integration by parts", "u-substitution calculator", "calculus integral", "step by step integration"],
};

const examples = [
  { title: "Example 1, Power rule for integration", problem: "∫ x² dx", result: "x³/3 + C", notes: "Power rule: ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C for n ≠ −1.", steps: [
    { title: "Apply power rule", content: "n = 2, so add 1 to exponent and divide by new exponent" },
    { title: "Result", content: "x³ / 3 + C" },
  ]},
  { title: "Example 2, Sum and constant multiple", problem: "∫ (3x² + 4x − 5) dx", result: "x³ + 2x² − 5x + C", notes: "Integrals distribute over addition.", steps: [
    { title: "Split into terms", content: "∫ 3x² dx + ∫ 4x dx − ∫ 5 dx" },
    { title: "Apply power rule to each", content: "3·(x³/3) + 4·(x²/2) − 5x" },
    { title: "Simplify", content: "x³ + 2x² − 5x + C" },
  ]},
  { title: "Example 3, Definite integral", problem: "∫₀² x² dx", result: "8/3", notes: "Fundamental theorem of calculus: F(b) − F(a).", steps: [
    { title: "Find antiderivative", content: "F(x) = x³/3" },
    { title: "Evaluate at bounds", content: "F(2) − F(0) = 8/3 − 0" },
    { title: "Result", content: "8/3" },
  ]},
  { title: "Example 4, Substitution (u-sub)", problem: "∫ 2x·cos(x²) dx", result: "sin(x²) + C", notes: "Let u = x² so du = 2x dx; the integral becomes ∫ cos(u) du.", steps: [
    { title: "Substitute", content: "u = x², du = 2x dx" },
    { title: "Rewrite", content: "∫ cos(u) du" },
    { title: "Integrate", content: "sin(u) + C" },
    { title: "Substitute back", content: "sin(x²) + C" },
  ]},
  { title: "Example 5, Integration by parts", problem: "∫ x·eˣ dx", result: "x·eˣ − eˣ + C", notes: "∫ u dv = uv − ∫ v du. Choose u = x (becomes simpler when differentiated), dv = eˣ dx.", steps: [
    { title: "Set up", content: "u = x → du = dx; dv = eˣ dx → v = eˣ" },
    { title: "Apply formula", content: "uv − ∫ v du = x·eˣ − ∫ eˣ dx" },
    { title: "Integrate the second", content: "= x·eˣ − eˣ + C" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Integral Calculator"
      highlight="∫ Antiderivatives"
      badgeText="Power · u-sub · By Parts"
      intro="Compute definite and indefinite integrals using the power rule, substitution, and integration by parts. Five worked examples cover the main techniques."
      widget={<InlineCalculator placeholder="Evaluate: 2^3 / 3" />}
      formulaCard={{
        label: "Two Foundational Identities",
        formula: <span>∫ xⁿ dx = xⁿ⁺¹/(n+1) + C &nbsp; · &nbsp; ∫ u dv = uv − ∫ v du</span>,
        caption: "Power rule for polynomials, integration by parts for products. With u-substitution, these three techniques cover most freshman-calculus integrals.",
      }}
      examplesHeading="Five integrals across four techniques"
      examplesIntro="Power rule, sums, definite integral via FTC, u-substitution, and integration by parts."
      cta={{ title: "Tricky integral that needs trig sub or partial fractions?", body: "Photo solver handles every technique calculus throws at you, with full work.", button: "Open Photo Solver" }}
      conceptTitle="From derivatives back to functions"
      conceptBody={<>
        <p>Integration is the inverse of differentiation. The indefinite integral <code>∫ f(x) dx</code> gives the family of all antiderivatives of <code>f</code>. The constant of integration <code>+ C</code> represents that ambiguity, every antiderivative differs from another by a constant.</p>
        <p>The definite integral <code>∫ₐᵇ f(x) dx</code> gives a single number, the signed area under the curve from a to b. The Fundamental Theorem of Calculus connects the two: evaluate any antiderivative at the bounds and subtract.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Step-by-step integral calculator", body: "Integration is the second pillar of calculus. This page covers the main techniques you'll meet in a calculus course: power rule, u-substitution, integration by parts, and definite integrals. Each worked example shows the full reasoning, including the substitution choice or the parts decomposition." },
        { title: "Power rule for integration", body: "For any real n ≠ −1, ∫ xⁿ dx = xⁿ⁺¹/(n+1) + C. The exception n = −1 corresponds to ∫ (1/x) dx = ln|x| + C. The power rule extends to any polynomial term by term, since integrals distribute over addition." },
        { title: "U-substitution explained", body: "When an integrand contains a function and its derivative (up to a constant), substitution simplifies the integral. Let u = (inner function), compute du, replace, integrate in u, then substitute back. Recognizing when substitution applies is a skill that comes with practice, look for an inner function and its derivative as a factor." },
        { title: "Integration by parts", body: "Integration by parts is the analog of the product rule. The formula ∫ u dv = uv − ∫ v du transforms one integral into another that's hopefully easier. Pick u to be something that gets simpler when differentiated (like x or ln x), and dv to be something easy to integrate (like eˣ or trig functions). The mnemonic LIATE (Logs, Inverse trig, Algebraic, Trig, Exponential) helps prioritize u." },
        { title: "Definite integrals and the Fundamental Theorem", body: "The Fundamental Theorem of Calculus says: if F is an antiderivative of f, then ∫ₐᵇ f(x) dx = F(b) − F(a). This turns area computations into algebra, find any antiderivative, plug in the bounds, subtract. The result is a number representing signed area between curve and x-axis." },
      ]}
    />
  );
}
