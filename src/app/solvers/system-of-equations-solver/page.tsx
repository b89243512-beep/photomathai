import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { SystemOfEquationsSolver } from "@/components/solvers/SystemOfEquationsSolver";

export const metadata: Metadata = {
  title: "System of Equations Solver , 2 Variables with Steps",
  description:
    "Free solver for systems of linear equations in two variables. Uses Cramer's rule with full step-by-step solutions. Includes 5 worked examples.",
  alternates: { canonical: "/solvers/system-of-equations-solver" },
  keywords: ["system of equations solver", "linear system solver", "2x2 linear system", "Cramer's rule calculator", "substitution method", "elimination method", "simultaneous equations", "linear equations solver"],
};

const examples = [
  { title: "Example 1, Two-variable linear system", problem: "{ 2x + 3y = 12, x − y = 1 }", result: "x = 3, y = 2", notes: "Standard textbook problem solvable by substitution or Cramer's rule.", steps: [
    { title: "Determinant", content: "det = (2)(−1) − (1)(3) = −5" },
    { title: "x via Cramer", content: "x = (12·(−1) − 1·3) / −5 = −15/−5 = 3" },
    { title: "y via Cramer", content: "y = (2·1 − 1·12) / −5 = −10/−5 = 2" },
    { title: "Verify", content: "Plug back: 2(3)+3(2)=12 ✓, 3−2=1 ✓" },
  ]},
  { title: "Example 2, System with negative solutions", problem: "{ x + 2y = 5, 3x − y = 1 }", result: "x = 1, y = 2", notes: "Substitution: from eq1, x = 5 − 2y; substitute into eq2.", steps: [
    { title: "Determinant", content: "det = (1)(−1) − (3)(2) = −7" },
    { title: "x", content: "x = (5·(−1) − 1·2) / −7 = −7/−7 = 1" },
    { title: "y", content: "y = (1·1 − 3·5) / −7 = −14/−7 = 2" },
  ]},
  { title: "Example 3, No solution (parallel lines)", problem: "{ 2x + 4y = 6, x + 2y = 5 }", result: "No solution", notes: "Determinant is zero AND right-hand sides don't satisfy the ratio.", steps: [
    { title: "Determinant", content: "det = (2)(2) − (1)(4) = 0" },
    { title: "Check consistency", content: "Eq1 says 2(x + 2y) = 6 → x + 2y = 3, but Eq2 says x + 2y = 5" },
    { title: "Contradiction", content: "Lines are parallel and distinct, no solution" },
  ]},
  { title: "Example 4, Infinite solutions (same line)", problem: "{ 2x + 4y = 8, x + 2y = 4 }", result: "Infinite solutions", notes: "Determinant is zero AND right-hand sides are proportional.", steps: [
    { title: "Determinant", content: "det = (2)(2) − (1)(4) = 0" },
    { title: "Check ratio", content: "Eq1 / 2 = Eq2 exactly" },
    { title: "Conclusion", content: "Same line, infinitely many solutions, all points on x + 2y = 4" },
  ]},
  { title: "Example 5, Decimal coefficients", problem: "{ 0.5x + y = 4, 2x − y = 1 }", result: "x = 2, y = 3", notes: "Decimal coefficients work the same way as integers.", steps: [
    { title: "Determinant", content: "det = (0.5)(−1) − (2)(1) = −0.5 − 2 = −2.5" },
    { title: "x via Cramer", content: "x = (4·(−1) − 1·1) / −2.5 = −5/−2.5 = 2" },
    { title: "y via Cramer", content: "y = (0.5·1 − 2·4) / −2.5 = −7.5/−2.5 = 3" },
    { title: "Verify", content: "0.5(2) + 3 = 4 ✓; 2(2) − 3 = 1 ✓" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="System of Equations Solver"
      highlight="Linear, 2 Variables"
      badgeText="Cramer's Rule, Live"
      intro="Solve any 2×2 system of linear equations using Cramer's rule. Get x, y, and the determinant with each step shown clearly."
      widget={<SystemOfEquationsSolver />}
      formulaCard={{
        label: "Cramer's Rule (2×2)",
        formula: <span>x = (c₁b₂ − c₂b₁)/D, &nbsp; y = (a₁c₂ − a₂c₁)/D</span>,
        caption: "D = a₁b₂ − a₂b₁ is the determinant of the coefficient matrix. The system has a unique solution exactly when D ≠ 0.",
      }}
      examplesHeading="Five linear systems, all degeneracies covered"
      examplesIntro="Unique solutions, no solution (parallel lines), infinitely many solutions, and decimal coefficients."
      cta={{ title: "Larger systems or word problem?", body: "Photo solver handles 3×3 systems, matrix form, and translation from words.", button: "Try Photo Solver" }}
      conceptTitle="Two equations, two unknowns"
      conceptBody={<>
        <p>A system of two linear equations in two variables has the form <code>a₁x + b₁y = c₁</code>, <code>a₂x + b₂y = c₂</code>. Three classical methods solve it: substitution, elimination, and Cramer&apos;s rule. The calculator uses Cramer&apos;s rule because it gives the result in one direct formula.</p>
        <p>Each equation is a line in the plane. Solutions correspond to intersection points: one solution = lines cross at a single point, no solution = parallel lines, infinitely many = the same line written two ways.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Linear system solver, free with step-by-step solutions", body: "Two-variable linear systems are the building block of more advanced linear algebra. This solver handles any 2×2 system: integer, fractional, or decimal coefficients, positive or negative, with a unique solution or one of the degenerate cases. Each solve shows the determinant, applies Cramer's rule, and gives a quick verification." },
        { title: "Cramer's rule explained", body: "For a system [a₁x + b₁y = c₁; a₂x + b₂y = c₂], Cramer's rule gives x = (c₁b₂ − c₂b₁) / det and y = (a₁c₂ − a₂c₁) / det, where det = a₁b₂ − a₂b₁. It's a direct formula that works whenever the determinant is nonzero. When det = 0, the system has either zero solutions or infinitely many." },
        { title: "Substitution and elimination methods", body: "Substitution: solve one equation for one variable, plug into the other. Elimination: scale equations so a variable cancels when you add or subtract them. Both produce the same answer as Cramer's rule but show different aspects of the structure. Most algebra courses cover all three." },
        { title: "Interpreting no solution vs infinite solutions", body: "When the determinant is zero, the two lines are parallel or identical. If their constant terms aren't proportional to the same ratio as their coefficients, the lines are distinct and parallel: no solution. If everything is proportional, they're the same line drawn twice: infinitely many solutions, all points on that line." },
        { title: "Practical applications", body: "Linear systems appear everywhere: balancing chemical reactions, computing equilibrium prices in economics, fitting lines to data, computer graphics transformations, robotic arm kinematics. Mastering 2×2 systems is the gateway to higher-dimensional systems and matrix methods used throughout science and engineering." },
      ]}
    />
  );
}
