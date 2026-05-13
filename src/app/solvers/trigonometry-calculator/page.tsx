import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { TrigonometryCalculator } from "@/components/solvers/TrigonometryCalculator";

export const metadata: Metadata = {
  title: "Trigonometry Calculator , Sin Cos Tan with Steps",
  description:
    "Free trigonometry calculator for sin, cos, tan and their inverses. Supports degrees and radians with step-by-step solutions. Includes 5 worked examples.",
  alternates: { canonical: "/solvers/trigonometry-calculator" },
  keywords: ["trigonometry calculator", "sin cos tan calculator", "trig calculator", "inverse trig calculator", "sin calculator", "cos calculator", "tan calculator", "trigonometric functions"],
};

const examples = [
  { title: "Example 1, sin(30°)", problem: "Find sin(30°)", result: "0.5", notes: "30°, 45°, 60° give exact values you should memorize.", steps: [
    { title: "Convert to radians (optional)", content: "30° × π/180 = π/6 rad" },
    { title: "Recall the special value", content: "sin(30°) = sin(π/6) = 1/2" },
    { title: "Result", content: "0.5" },
  ]},
  { title: "Example 2, cos(60°)", problem: "Find cos(60°)", result: "0.5", notes: "Cosine of complement: cos(60°) = sin(30°) = 0.5.", steps: [
    { title: "Special angle", content: "cos(60°) = cos(π/3)" },
    { title: "Exact value", content: "cos(π/3) = 1/2" },
    { title: "Result", content: "0.5" },
  ]},
  { title: "Example 3, tan(45°)", problem: "Find tan(45°)", result: "1", notes: "When sine and cosine are equal, tangent is 1.", steps: [
    { title: "Identity", content: "tan(θ) = sin(θ) / cos(θ)" },
    { title: "Substitute", content: "tan(45°) = sin(45°) / cos(45°) = (√2/2) / (√2/2)" },
    { title: "Result", content: "1" },
  ]},
  { title: "Example 4, Inverse sine", problem: "Find sin⁻¹(0.5)", result: "30°", notes: "Inverse trig functions return angles. Domain is restricted, sin⁻¹ ∈ [−90°, 90°].", steps: [
    { title: "Question", content: "What angle has sin = 0.5?" },
    { title: "Recall", content: "sin(30°) = 0.5" },
    { title: "Result", content: "sin⁻¹(0.5) = 30° (or π/6 rad)" },
  ]},
  { title: "Example 5, Trig at non-standard angle", problem: "Find sin(75°)", result: "≈ 0.9659", notes: "For angles outside the special set, use the calculator, you can also derive via sum formulas.", steps: [
    { title: "Decompose", content: "sin(75°) = sin(45° + 30°)" },
    { title: "Sum formula", content: "= sin(45°)cos(30°) + cos(45°)sin(30°)" },
    { title: "Substitute", content: "= (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2)/4" },
    { title: "Result", content: "≈ 0.9659" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Trigonometry Calculator"
      highlight="sin · cos · tan"
      badgeText="Degrees & Radians, 6 Functions"
      intro="Evaluate sin, cos, tan and their inverses for any angle, in degrees or radians, with step-by-step explanations and common special values."
      widget={<TrigonometryCalculator />}
      formulaCard={{
        label: "Unit Circle Definitions",
        formula: <span>sin(θ) = y &nbsp; cos(θ) = x &nbsp; tan(θ) = y/x</span>,
        caption: "On the unit circle (radius 1), the point at angle θ has coordinates (cos θ, sin θ). Tangent is their ratio.",
      }}
      examplesHeading="Five trigonometry computations, from special angles to inverse"
      examplesIntro="Special-value angles you should memorize, plus inverse functions and angle-sum decomposition."
      cta={{ title: "Triangle problem with trig?", body: "Take a photo of the triangle or trig equation and get the full solution.", button: "Open Photo Solver" }}
      conceptTitle="Trig functions at a glance"
      conceptBody={<>
        <p>The three primary trigonometric functions, sine, cosine, and tangent, relate the angles of a right triangle to the ratios of its sides. <code>sin = opposite/hypotenuse</code>, <code>cos = adjacent/hypotenuse</code>, <code>tan = opposite/adjacent</code>.</p>
        <p>For arbitrary angles, the functions are defined via the unit circle. Calculator inputs accept both degrees (e.g. 45°) and radians (e.g. π/4). Inverse functions (arcsin, arccos, arctan) take a ratio and return the angle.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Free online trigonometry calculator with step-by-step solutions", body: "Whether you are learning trig for the first time, prepping for the SAT or ACT, or working through an engineering problem, this calculator gives you sine, cosine, and tangent values quickly, in both degrees and radians, with the full reasoning shown. Inverse functions (arcsin, arccos, arctan) are also supported." },
        { title: "Sine, cosine, and tangent explained", body: "In a right triangle with hypotenuse h, opposite side o, and adjacent side a, the sine of the angle is o/h, cosine is a/h, and tangent is o/a. On the unit circle (radius 1), the x-coordinate of a point is cos(θ) and the y-coordinate is sin(θ), tan(θ) is the slope of the line from origin to that point." },
        { title: "Degrees and radians", body: "Degrees split a circle into 360 parts, radians split it into 2π parts. To convert: degrees × π/180 = radians; radians × 180/π = degrees. Calculus and higher math almost always use radians, applied geometry and engineering often use degrees. This calculator handles both seamlessly." },
        { title: "Inverse trigonometric functions", body: "The inverse functions, sin⁻¹, cos⁻¹, tan⁻¹ (also called arcsin, arccos, arctan), take a ratio and return the angle that produces it. Because trig functions are periodic, the inverses return a value within a restricted range. For sin⁻¹, the output is between −90° and 90°. For cos⁻¹, between 0° and 180°. For tan⁻¹, strictly between −90° and 90°." },
        { title: "Special values worth memorizing", body: "Sin and cos of 0°, 30°, 45°, 60°, and 90° are exact values that appear constantly: 0, 1/2, √2/2, √3/2, and 1 respectively. Knowing these by heart speeds up algebra and lets you spot when a calculator answer looks wrong. The calculator above will help build that intuition by showing how exact values relate to decimal approximations." },
      ]}
    />
  );
}
