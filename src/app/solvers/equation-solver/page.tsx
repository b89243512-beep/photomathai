import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { InlineCalculator } from "@/components/InlineCalculator";

export const metadata: Metadata = {
  title: "Equation Solver Online , Free Step-by-Step Math Solver",
  description:
    "Free online equation solver. Solve linear, quadratic, and rational equations with full step-by-step solutions. Five worked examples included.",
  alternates: { canonical: "/solvers/equation-solver" },
  keywords: ["equation solver", "math equation solver", "solve equations online", "free equation solver", "linear equation solver", "step by step equation solver", "algebra equation solver", "solve for x"],
};

const examples = [
  { title: "Example 1, Linear equation", problem: "2x + 5 = 13", result: "x = 4", notes: "Basic two-step equation, isolate x by reversing operations.", steps: [
    { title: "Subtract 5", content: "2x = 13 − 5 = 8" },
    { title: "Divide by 2", content: "x = 8 / 2 = 4" },
  ]},
  { title: "Example 2, Equation with variables on both sides", problem: "3x + 4 = x + 12", result: "x = 4", notes: "Move all x terms to one side, all constants to the other.", steps: [
    { title: "Subtract x", content: "3x − x + 4 = 12 → 2x + 4 = 12" },
    { title: "Subtract 4", content: "2x = 8" },
    { title: "Divide by 2", content: "x = 4" },
  ]},
  { title: "Example 3, Equation with fractions", problem: "(x + 1)/3 = 4", result: "x = 11", notes: "Clear the fraction by multiplying both sides by the denominator.", steps: [
    { title: "Multiply both sides by 3", content: "x + 1 = 12" },
    { title: "Subtract 1", content: "x = 11" },
  ]},
  { title: "Example 4, Quadratic equation", problem: "x² − 7x + 10 = 0", result: "x = 2, x = 5", notes: "Quadratic that factors cleanly.", steps: [
    { title: "Factor", content: "(x − 2)(x − 5) = 0" },
    { title: "Set each factor to zero", content: "x − 2 = 0 or x − 5 = 0" },
    { title: "Solutions", content: "x = 2 or x = 5" },
  ]},
  { title: "Example 5, Rational equation", problem: "1/x + 1/2 = 3/4", result: "x = 4", notes: "Clear denominators by multiplying both sides by the LCD.", steps: [
    { title: "Multiply by 4x", content: "4 + 2x = 3x" },
    { title: "Solve for x", content: "4 = x → x = 4" },
    { title: "Check x ≠ 0", content: "Valid since 4 ≠ 0" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Equation Solver"
      highlight="Linear, Quadratic, Rational"
      badgeText="Universal Equation Solver"
      intro="Solve linear, quadratic, and rational equations online. Type your expression and get an instant evaluation, or work through the five examples below."
      widget={<InlineCalculator placeholder="2x + 5 = 13" />}
      formulaCard={{
        label: "Golden Rule of Algebra",
        formula: <span>Whatever you do to one side, do to the other</span>,
        caption: "Add, subtract, multiply, divide both sides equally to isolate the variable. This single principle solves every linear equation in algebra.",
      }}
      examplesHeading="Five equation types, solved step by step"
      examplesIntro="Linear, two-sided, fractions, quadratic, and rational, the five archetypes you'll meet in coursework."
      cta={{ title: "Got a tough equation in your homework?", body: "Photo it and let the AI walk you through, including symbolic algebra and word problems.", button: "Open Photo Solver" }}
      conceptTitle="The basic idea: isolate the variable"
      conceptBody={<>
        <p>Solving an equation means finding the value(s) of the variable that make the equation true. The fundamental technique is to perform the same operation on both sides until the variable is alone on one side. Add, subtract, multiply, divide, square, take a root, whatever brings you closer to <code>x = something</code>.</p>
        <p>Linear equations have at most one solution. Quadratic equations have up to two. Rational equations may have extraneous solutions (values that satisfy the cleared equation but break the original because of division by zero), always check.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Free online equation solver with full steps", body: "An equation solver is one of the most-used math tools online. This calculator handles linear equations, quadratic equations, and simple rational equations, with the full step-by-step working shown so you can learn the technique, not just copy the answer. The calculator above accepts numerical expressions for verification, the worked examples below show the algebraic process." },
        { title: "Solving linear equations", body: "A linear equation has the form ax + b = c, with a single variable to the first power. Solve by isolating x: subtract or add constants from both sides, then divide by the coefficient of x. Equations with variables on both sides require moving terms across the equals sign first. The number of solutions is always one (unless a = 0)." },
        { title: "Solving quadratic equations", body: "Quadratic equations have the form ax² + bx + c = 0. Three classical methods: factor (when integer roots exist), apply the quadratic formula (always works), or complete the square. Use our dedicated Quadratic Equation Solver for a specialized step-by-step tool." },
        { title: "Solving rational equations", body: "Rational equations contain fractions with variables in the denominator. Multiply both sides by the least common denominator to clear the fractions, then solve the resulting polynomial equation. Always check your answers against the original equation, values that make any original denominator zero are extraneous and must be discarded." },
        { title: "Tips for using this solver", body: "Type an expression to evaluate it numerically (e.g. type 13 − 5 then divide by 2). For full algebraic solving with symbolic variables, use the photo solver on the homepage, the AI handles symbolic math natively. The five worked examples above show the methodology for each major equation type." },
      ]}
    />
  );
}
