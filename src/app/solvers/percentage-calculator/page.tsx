import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { PercentageCalculator } from "@/components/solvers/PercentageCalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator , Free Step-by-Step with 5 Examples",
  description:
    "Free online percentage calculator. Compute X% of Y, percentage change, percentage increase or decrease with detailed step-by-step solutions. Includes five worked examples.",
  alternates: { canonical: "/solvers/percentage-calculator" },
  keywords: ["percentage calculator", "percent calculator", "percentage change calculator", "percentage increase calculator", "percentage decrease calculator", "what is x% of y", "free percentage calculator", "percentage formula"],
};

const examples = [
  { title: "Example 1, X% of Y", problem: "What is 18% of 240?", result: "43.2", notes: "The basic form: convert percent to a decimal, then multiply.", steps: [
    { title: "Convert percent to decimal", content: "18% = 18 / 100 = 0.18" },
    { title: "Multiply", content: "0.18 × 240 = 43.2" },
    { title: "Result", content: "18% of 240 = 43.2" },
  ]},
  { title: "Example 2, Number as percent of another", problem: "30 is what percent of 120?", result: "25%", notes: "Useful for grades, statistics, and survey results.", steps: [
    { title: "Set up the ratio", content: "30 / 120 = 0.25" },
    { title: "Convert to percent", content: "0.25 × 100 = 25" },
    { title: "Result", content: "30 is 25% of 120" },
  ]},
  { title: "Example 3, Percent change", problem: "From 80 to 100, what is the percent change?", result: "+25%", notes: "Percent change is always relative to the original value, not the new one.", steps: [
    { title: "Find the difference", content: "100 − 80 = 20" },
    { title: "Divide by original", content: "20 / 80 = 0.25" },
    { title: "Convert to percent", content: "0.25 × 100 = 25%" },
  ]},
  { title: "Example 4, Percent increase", problem: "Increase 100 by 15%", result: "115", notes: "Used in pricing, taxes, and tip calculations.", steps: [
    { title: "Compute the increase", content: "100 × 15/100 = 15" },
    { title: "Add to original", content: "100 + 15 = 115" },
    { title: "Result", content: "100 increased by 15% is 115" },
  ]},
  { title: "Example 5, Percent decrease", problem: "Reduce 200 by 30%", result: "140", notes: "Common for discounts and reductions.", steps: [
    { title: "Compute the decrease", content: "200 × 30/100 = 60" },
    { title: "Subtract", content: "200 − 60 = 140" },
    { title: "Result", content: "200 decreased by 30% is 140" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Percentage Calculator"
      highlight="with Steps"
      badgeText="4 Modes, Zero Maths"
      intro="Calculate percent of a number, percent change, percentage increase or decrease, and reverse percentages, all with step-by-step solutions."
      widget={<PercentageCalculator />}
      formulaCard={{
        label: "Core Formula",
        formula: <span>X% of Y = (X / 100) × Y</span>,
        caption: "Convert the percent to a decimal, multiply, done. Every percentage problem reduces to this idea with a rearrangement.",
      }}
      examplesHeading="Five percentage problems you'll actually use"
      examplesIntro="From discounts and tips to grade calculations and percent change, every common scenario worked out below."
      cta={{ title: "Need help with a percentage word problem?", body: "Take a photo of the problem and let the AI walk you through it.", button: "Upload a Photo" }}
      conceptTitle="How percentages work"
      conceptBody={<>
        <p>A percentage is just a fraction expressed out of 100. The symbol <code>%</code> literally means &quot;per hundred,&quot; so <code>15%</code> is the same as <code>15/100</code> or <code>0.15</code>. Once you internalize that, every percentage problem becomes either a multiplication or a division.</p>
        <p>The four most common percentage problems are: finding X% of a number, finding what percent one number is of another, finding the percent change between two values, and applying a percent increase or decrease. The calculator above handles all four with one click.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "The percentage calculator that shows every step", body: "Percentages appear in shopping discounts, taxes, tips, grades, surveys, statistics, finance, science, and everyday conversation. A clean step-by-step calculator removes ambiguity, you see the formula, the substitution, and the final value, so you can verify the math yourself and learn the pattern. This page covers the four most common percentage problems and shows worked examples for each." },
        { title: "How to find X% of a number", body: "To find X% of Y, multiply Y by X divided by 100. Equivalently, write the percent as a decimal (e.g. 18% becomes 0.18) and multiply. This is the most common percent operation, used everywhere from tipping at restaurants to calculating sales tax, commissions, and discounts." },
        { title: "How to compute percentage change", body: "Percentage change measures how much one value differs from another, as a fraction of the original. The formula is (new − original) / original × 100. A positive result means an increase, a negative result means a decrease. Always divide by the original value, not the new one, this is the most common mistake students make." },
        { title: "Percentage increase and decrease", body: "Applying a percent increase means computing the increase amount (X × percent / 100) and adding it to the original. Percent decrease is the same operation with subtraction. A 20% increase followed by a 20% decrease does NOT bring you back to the original, this is a fun gotcha worth remembering." },
        { title: "Tips for using this calculator", body: "Pick the mode that matches your problem. Enter the two numbers as plain decimals (e.g. 18 for 18%). Negative percentages and negative inputs both work. For multi-step business problems like compound discounts or markup-then-discount, run the calculator multiple times feeding the result back in." },
      ]}
    />
  );
}
