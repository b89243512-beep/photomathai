import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { InlineCalculator } from "@/components/InlineCalculator";

export const metadata: Metadata = {
  title: "Derivative Calculator , Free Step-by-Step Differentiation",
  description:
    "Free online derivative calculator. Compute derivatives using power, chain, product, and quotient rules with step-by-step solutions. Five worked examples.",
  alternates: { canonical: "/solvers/derivative-calculator" },
  keywords: ["derivative calculator", "differentiation calculator", "find derivative online", "step by step derivative", "calculus derivative", "power rule calculator", "chain rule calculator", "product rule"],
};

const examples = [
  { title: "Example 1, Power rule", problem: "d/dx(x³)", result: "3x²", notes: "Power rule: d/dx(xⁿ) = n·xⁿ⁻¹.", steps: [
    { title: "Apply power rule", content: "n = 3, so d/dx(x³) = 3·x³⁻¹" },
    { title: "Simplify", content: "= 3x²" },
  ]},
  { title: "Example 2, Sum and constant rule", problem: "d/dx(2x³ + 5x − 7)", result: "6x² + 5", notes: "Derivative of a sum = sum of derivatives. Constants vanish.", steps: [
    { title: "Differentiate term by term", content: "d/dx(2x³) + d/dx(5x) + d/dx(−7)" },
    { title: "Apply each rule", content: "6x² + 5 + 0" },
    { title: "Result", content: "6x² + 5" },
  ]},
  { title: "Example 3, Chain rule", problem: "d/dx(sin(x²))", result: "2x·cos(x²)", notes: "Chain rule: derivative of outer × derivative of inner.", steps: [
    { title: "Identify outer and inner", content: "Outer = sin(u), inner = u = x²" },
    { title: "Derivatives", content: "d/du(sin(u)) = cos(u), d/dx(x²) = 2x" },
    { title: "Multiply", content: "cos(x²) · 2x = 2x·cos(x²)" },
  ]},
  { title: "Example 4, Product rule", problem: "d/dx(x²·sin(x))", result: "2x·sin(x) + x²·cos(x)", notes: "Product rule: (fg)' = f'g + fg'.", steps: [
    { title: "Identify", content: "f = x², g = sin(x)" },
    { title: "Derivatives", content: "f' = 2x, g' = cos(x)" },
    { title: "Apply formula", content: "2x · sin(x) + x² · cos(x)" },
  ]},
  { title: "Example 5, Quotient rule", problem: "d/dx(x / (x² + 1))", result: "(1 − x²) / (x² + 1)²", notes: "Quotient rule: (f/g)' = (f'g − fg') / g².", steps: [
    { title: "Identify", content: "f = x, g = x² + 1" },
    { title: "Derivatives", content: "f' = 1, g' = 2x" },
    { title: "Apply formula", content: "(1·(x² + 1) − x·2x) / (x² + 1)²" },
    { title: "Simplify", content: "= (x² + 1 − 2x²) / (x² + 1)² = (1 − x²) / (x² + 1)²" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Derivative Calculator"
      highlight="d/dx with Steps"
      badgeText="Power · Chain · Product · Quotient"
      intro="Find the derivative of any function using the power, chain, product, and quotient rules. Worked examples walk you through each technique step by step."
      widget={<InlineCalculator placeholder="Evaluate: 3·(2)^2" />}
      formulaCard={{
        label: "The Four Differentiation Rules",
        formula: <span>(xⁿ)&apos; = nxⁿ⁻¹ &nbsp; · &nbsp; (fg)&apos; = f&apos;g + fg&apos; &nbsp; · &nbsp; (f(g))&apos; = f&apos;(g) · g&apos;</span>,
        caption: "Power, product, and chain. With the quotient rule, these four cover almost every derivative you'll meet.",
      }}
      examplesHeading="Five derivatives, every rule covered"
      examplesIntro="Power rule, sum rule, chain rule, product rule, quotient rule, one example each."
      cta={{ title: "Stuck on a derivative?", body: "Photo solver handles implicit differentiation, partial derivatives, and higher-order derivatives.", button: "Open Photo Solver" }}
      conceptTitle="The rules of differentiation"
      conceptBody={<>
        <p>The derivative measures the rate of change of a function. The five core rules cover almost every problem you&apos;ll meet: power rule (xⁿ → nxⁿ⁻¹), sum rule (linearity), product rule, quotient rule, and chain rule. Combined with the standard derivatives of trig, exponential, and log functions, these rules let you differentiate anything you can write down.</p>
        <p>The most error-prone is the chain rule, when one function is inside another, multiply by the derivative of the inner part. Forgetting this is the most common calculus mistake.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Step-by-step derivative calculator", body: "Derivatives are the heart of calculus, they measure slope, velocity, growth rate, marginal cost, and anything else that changes. This page covers the standard differentiation rules with worked examples for each. The calculator above evaluates numerical expressions for verification, the examples walk through symbolic differentiation by hand." },
        { title: "Power rule and basic derivatives", body: "The power rule, d/dx(xⁿ) = nxⁿ⁻¹, applies to any real exponent n. Combined with the sum rule (derivatives distribute over addition) and the constant multiple rule (constants pass through), this handles all polynomial differentiation. Standard derivatives like d/dx(sin x) = cos x, d/dx(eˣ) = eˣ, and d/dx(ln x) = 1/x round out the toolkit." },
        { title: "Chain rule, the most important rule", body: "If a function is built from another function (composition), the chain rule says: differentiate the outer, evaluate at the inner, then multiply by the derivative of the inner. For sin(x²), the outer is sin and inner is x², giving cos(x²)·2x. Almost every nontrivial calculus problem uses chain rule somewhere." },
        { title: "Product and quotient rules", body: "The product rule (fg)' = f'g + fg' is needed when neither factor is constant. The quotient rule (f/g)' = (f'g − fg')/g² applies to ratios. Both can be derived from chain rule but are worth memorizing as separate formulas because they appear so often." },
        { title: "When and how to use this page", body: "Plug numerical values into the calculator to verify that a specific function's derivative gives the slope you expect. The worked examples below show the full algebraic derivation for the five most important differentiation patterns. For symbolic derivatives of arbitrary functions, use the photo solver." },
      ]}
    />
  );
}
