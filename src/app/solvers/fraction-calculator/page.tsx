import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { FractionCalculator } from "@/components/solvers/FractionCalculator";

export const metadata: Metadata = {
  title: "Fraction Calculator , Add, Subtract, Multiply, Divide with Steps",
  description:
    "Free online fraction calculator with step-by-step solutions. Add, subtract, multiply, divide and simplify fractions. Includes 5 worked examples.",
  alternates: { canonical: "/solvers/fraction-calculator" },
  keywords: ["fraction calculator", "adding fractions calculator", "subtracting fractions", "multiplying fractions calculator", "dividing fractions calculator", "simplify fraction calculator", "fraction with steps", "mixed number calculator"],
};

const examples = [
  { title: "Example 1, Adding fractions", problem: "1/2 + 2/3 = ?", result: "7/6", notes: "Always find a common denominator before adding.", steps: [
    { title: "Common denominator", content: "LCD(2, 3) = 6" },
    { title: "Rewrite each", content: "1/2 = 3/6, 2/3 = 4/6" },
    { title: "Add numerators", content: "3/6 + 4/6 = 7/6" },
    { title: "Already in lowest terms", content: "GCD(7, 6) = 1, so 7/6 is simplified" },
  ]},
  { title: "Example 2, Subtracting fractions", problem: "5/6 − 1/4 = ?", result: "7/12", notes: "Same process as addition with a minus sign.", steps: [
    { title: "Common denominator", content: "LCD(6, 4) = 12" },
    { title: "Rewrite each", content: "5/6 = 10/12, 1/4 = 3/12" },
    { title: "Subtract numerators", content: "10/12 − 3/12 = 7/12" },
    { title: "Simplify", content: "GCD(7, 12) = 1, so 7/12 is already simplified" },
  ]},
  { title: "Example 3, Multiplying fractions", problem: "3/4 × 8/9 = ?", result: "2/3", notes: "Multiply numerators and denominators directly, then simplify.", steps: [
    { title: "Multiply across", content: "(3 × 8) / (4 × 9) = 24/36" },
    { title: "Find GCD", content: "GCD(24, 36) = 12" },
    { title: "Simplify", content: "24/36 = 2/3" },
  ]},
  { title: "Example 4, Dividing fractions", problem: "2/5 ÷ 4/7 = ?", result: "7/10", notes: "Dividing by a fraction = multiplying by its reciprocal.", steps: [
    { title: "Flip the second fraction", content: "4/7 → 7/4" },
    { title: "Multiply", content: "2/5 × 7/4 = 14/20" },
    { title: "Simplify", content: "GCD(14, 20) = 2 → 7/10" },
  ]},
  { title: "Example 5, Simplifying improper fractions", problem: "Simplify 18/24", result: "3/4", notes: "Always divide both parts by their greatest common divisor.", steps: [
    { title: "Find GCD", content: "GCD(18, 24) = 6" },
    { title: "Divide both", content: "18 ÷ 6 = 3, 24 ÷ 6 = 4" },
    { title: "Result", content: "18/24 = 3/4" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Fraction Calculator"
      highlight="+ − × ÷"
      badgeText="4 Operations, Auto-Simplify"
      intro="Add, subtract, multiply, divide and simplify fractions instantly, with the full step-by-step working so you can learn the method, not just copy the answer."
      widget={<FractionCalculator />}
      formulaCard={{
        label: "Quick Reference",
        formula: <span>a/b + c/d = (ad + bc) / bd</span>,
        caption: "Common denominator first, then add numerators. Multiplication is straight across. Division flips the second fraction.",
      }}
      examplesHeading="Five fraction problems, fully worked"
      examplesIntro="One example per operation, plus a bonus on simplification."
      cta={{ title: "Got a homework page full of fractions?", body: "Snap a photo, our AI handles algebraic fractions, mixed numbers, and word problems too.", button: "Photo Solver" }}
      conceptTitle="Working with fractions"
      conceptBody={<>
        <p>A fraction <code>a/b</code> represents <code>a</code> parts of a whole divided into <code>b</code> equal pieces. The four basic operations on fractions each follow a simple recipe: addition and subtraction require a common denominator, multiplication is straight across, and division flips the second fraction.</p>
        <p>Simplification means dividing the numerator and denominator by their greatest common divisor (GCD). A fraction is in &quot;lowest terms&quot; when the GCD is 1. This calculator handles every step automatically.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Fraction calculator with full step-by-step explanations", body: "Fractions are one of the most-used concepts in math, from measuring ingredients to algebra to engineering. This free fraction calculator does the four basic operations, addition, subtraction, multiplication, and division, plus automatic simplification, with the work shown out clearly. Use it as both a fast answer tool and a learning resource." },
        { title: "Adding and subtracting fractions", body: "Adding or subtracting two fractions requires a common denominator. Find the least common denominator (LCD), rewrite each fraction with that denominator, then add or subtract the numerators. The result usually needs to be simplified, the calculator handles this automatically." },
        { title: "Multiplying and dividing fractions", body: "Multiplication is straightforward: multiply the two numerators and the two denominators. Division uses a clever trick, multiply the first fraction by the reciprocal of the second (flip the numerator and denominator). Always simplify the result." },
        { title: "Simplifying and reducing fractions", body: "A fraction is in lowest terms when the greatest common divisor (GCD) of the numerator and denominator is 1. To simplify, divide both top and bottom by their GCD. The Euclidean algorithm finds the GCD efficiently for any pair of integers." },
        { title: "Tips and common pitfalls", body: "Enter only integer numerators and denominators. Negative fractions work, put the minus sign in either the numerator or write the entire fraction as negative. For mixed numbers like 2 1/3, convert to improper form first (2 1/3 = 7/3) before entering. For more complex algebraic fractions, use the photo solver." },
      ]}
    />
  );
}
