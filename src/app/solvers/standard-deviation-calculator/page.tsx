import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { StandardDeviationCalculator } from "@/components/solvers/StandardDeviationCalculator";

export const metadata: Metadata = {
  title: "Standard Deviation Calculator , Mean, Variance, Sigma with Steps",
  description:
    "Free standard deviation calculator. Compute mean, variance, and standard deviation for sample or population data, with step-by-step solutions and 5 worked examples.",
  alternates: { canonical: "/solvers/standard-deviation-calculator" },
  keywords: ["standard deviation calculator", "variance calculator", "mean calculator", "sample standard deviation", "population standard deviation", "sigma calculator", "statistics calculator", "data spread calculator"],
};

const examples = [
  { title: "Example 1, Small data set (population)", problem: "Data: 2, 4, 4, 4, 5, 5, 7, 9", result: "σ = 2", notes: "Classic textbook example. Use population formula (divide by N).", steps: [
    { title: "Mean", content: "μ = (2+4+4+4+5+5+7+9) / 8 = 40/8 = 5" },
    { title: "Squared deviations", content: "(2−5)² + (4−5)²×3 + (5−5)²×2 + (7−5)² + (9−5)² = 9+3+0+4+16 = 32" },
    { title: "Variance (population)", content: "σ² = 32 / 8 = 4" },
    { title: "Std deviation", content: "σ = √4 = 2" },
  ]},
  { title: "Example 2, Sample standard deviation", problem: "Sample: 10, 12, 23, 23, 16, 23, 21, 16", result: "s ≈ 5.24", notes: "Sample formula divides by (n − 1), called Bessel's correction.", steps: [
    { title: "Mean", content: "x̄ = 144/8 = 18" },
    { title: "Squared deviations", content: "Σ(x − x̄)² = 192" },
    { title: "Sample variance", content: "s² = 192 / (8 − 1) = 27.43" },
    { title: "Std deviation", content: "s = √27.43 ≈ 5.24" },
  ]},
  { title: "Example 3, Equal values", problem: "Data: 7, 7, 7, 7, 7", result: "σ = 0", notes: "When all values are identical, there is zero spread.", steps: [
    { title: "Mean", content: "μ = 7" },
    { title: "Squared deviations", content: "All (x − 7)² = 0" },
    { title: "Variance", content: "σ² = 0" },
    { title: "Std deviation", content: "σ = 0" },
  ]},
  { title: "Example 4, Test score spread", problem: "Test scores: 78, 85, 88, 92, 95", result: "σ ≈ 6.0", notes: "Helps interpret how varied a class's performance was.", steps: [
    { title: "Mean", content: "μ = 438/5 = 87.6" },
    { title: "Squared deviations", content: "Σ(x − 87.6)² ≈ 181.2" },
    { title: "Variance (population)", content: "σ² = 181.2 / 5 ≈ 36.24" },
    { title: "Std deviation", content: "σ ≈ 6.02" },
  ]},
  { title: "Example 5, Negative values", problem: "Data: −5, −2, 0, 2, 5", result: "σ ≈ 3.41", notes: "Standard deviation is always non-negative.", steps: [
    { title: "Mean", content: "μ = 0/5 = 0" },
    { title: "Squared deviations", content: "25 + 4 + 0 + 4 + 25 = 58" },
    { title: "Variance (population)", content: "σ² = 58 / 5 = 11.6" },
    { title: "Std deviation", content: "σ = √11.6 ≈ 3.41" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Standard Deviation Calculator"
      highlight="μ · σ² · σ"
      badgeText="Sample & Population Modes"
      intro="Enter your data and instantly see the mean, variance, and standard deviation, with the full computation shown step by step. Supports both sample and population formulas."
      widget={<StandardDeviationCalculator />}
      formulaCard={{
        label: "Standard Deviation Formula",
        formula: <span>σ = √( Σ(xᵢ − μ)² / N )</span>,
        caption: "Take each value's distance from the mean, square it, average those squared distances, then take the square root. For samples, divide by N−1 instead of N.",
      }}
      examplesHeading="Five datasets with full standard deviation work"
      examplesIntro="Population vs sample, zero spread, test scores, and signed data covered."
      cta={{ title: "Got a stats homework page?", body: "Snap a photo and our AI walks through frequency tables, z-scores, and hypothesis tests too.", button: "Open Photo Solver" }}
      conceptTitle="Mean, variance, and standard deviation"
      conceptBody={<>
        <p>The <strong>mean</strong> is the average of your data. The <strong>variance</strong> measures how spread out the values are from the mean, it&apos;s the average of the squared distances. The <strong>standard deviation</strong> is the square root of the variance, expressed in the original units.</p>
        <p>The key distinction: for an entire population, divide by N. For a sample drawn from a larger population, divide by N − 1 (Bessel&apos;s correction). The calculator handles both modes.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "Standard deviation calculator with worked steps", body: "Standard deviation tells you how spread out a set of values is. A small standard deviation means values are clustered near the mean, a large one means they're more variable. This calculator computes the mean, variance, and standard deviation for any dataset, with every step shown so you understand the method, not just the number." },
        { title: "Sample vs population standard deviation", body: "If your data represents an entire population (every member you care about), divide by N. If it's a sample drawn from a larger population to estimate that population's variability, divide by N − 1. This adjustment (Bessel's correction) compensates for the fact that a sample underestimates true variability. Most real-world stats problems use the sample formula." },
        { title: "How to compute standard deviation by hand", body: "Step 1: find the mean of the data. Step 2: subtract the mean from each value and square the result. Step 3: sum those squared deviations. Step 4: divide by N (population) or N − 1 (sample) to get the variance. Step 5: take the square root to get the standard deviation. The calculator walks through these five steps with your data." },
        { title: "Why squared deviations?", body: "Squaring serves two purposes: it eliminates negative differences (so they don't cancel positives), and it weighs larger deviations more heavily than smaller ones. Taking the square root at the end brings the result back to the original units of measurement, making it interpretable." },
        { title: "Real-world uses", body: "Standard deviation appears in quality control, finance (volatility), test scoring, scientific measurement, A/B testing, and survey analysis. A risk-averse investor prefers assets with lower standard deviation. A teacher uses it to spot test scores that are unusually high or low. Any time you need to summarize variability in a number, standard deviation is the standard tool." },
      ]}
    />
  );
}
