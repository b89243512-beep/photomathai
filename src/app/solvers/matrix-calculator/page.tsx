import type { Metadata } from "next";
import { SolverPageShell } from "@/components/solvers/SolverPageShell";
import { MatrixCalculator } from "@/components/solvers/MatrixCalculator";

export const metadata: Metadata = {
  title: "Matrix Calculator , Determinant, Inverse, Multiply 2×2",
  description:
    "Free matrix calculator. Compute determinant, inverse, transpose, addition, and multiplication of 2×2 matrices with step-by-step explanations and 5 worked examples.",
  alternates: { canonical: "/solvers/matrix-calculator" },
  keywords: ["matrix calculator", "determinant calculator", "matrix inverse calculator", "2x2 matrix calculator", "matrix multiplication calculator", "transpose calculator", "linear algebra calculator"],
};

const examples = [
  { title: "Example 1, 2×2 Determinant", problem: "det of [[4, 2], [3, 1]]", result: "−2", notes: "For 2×2: det = ad − bc.", steps: [
    { title: "Apply formula", content: "det = (4)(1) − (2)(3)" },
    { title: "Compute", content: "= 4 − 6" },
    { title: "Result", content: "= −2" },
  ]},
  { title: "Example 2, 2×2 Inverse", problem: "Inverse of [[4, 2], [3, 1]]", result: "[[−1/2, 1], [3/2, −2]]", notes: "Inverse exists only if determinant is nonzero.", steps: [
    { title: "Determinant", content: "det = (4)(1) − (2)(3) = −2" },
    { title: "Apply formula", content: "A⁻¹ = (1/det) × [[d, −b], [−c, a]]" },
    { title: "Plug in", content: "= (1/−2) × [[1, −2], [−3, 4]]" },
    { title: "Compute", content: "= [[−1/2, 1], [3/2, −2]]" },
  ]},
  { title: "Example 3, Singular matrix (no inverse)", problem: "Inverse of [[2, 4], [1, 2]]", result: "Does not exist", notes: "Determinant is zero, rows are linearly dependent.", steps: [
    { title: "Determinant", content: "det = (2)(2) − (4)(1) = 4 − 4 = 0" },
    { title: "Conclusion", content: "Singular matrix, inverse undefined" },
  ]},
  { title: "Example 4, Matrix multiplication", problem: "[[1, 2], [3, 4]] × [[5, 6], [7, 8]]", result: "[[19, 22], [43, 50]]", notes: "Row of left × column of right for each entry. Order matters: AB ≠ BA in general.", steps: [
    { title: "Top-left entry", content: "(1)(5) + (2)(7) = 5 + 14 = 19" },
    { title: "Top-right entry", content: "(1)(6) + (2)(8) = 6 + 16 = 22" },
    { title: "Bottom-left entry", content: "(3)(5) + (4)(7) = 15 + 28 = 43" },
    { title: "Bottom-right entry", content: "(3)(6) + (4)(8) = 18 + 32 = 50" },
  ]},
  { title: "Example 5, Transpose", problem: "Transpose of [[1, 2], [3, 4]]", result: "[[1, 3], [2, 4]]", notes: "Rows become columns and vice versa.", steps: [
    { title: "Swap rows and columns", content: "Entry (i, j) → (j, i)" },
    { title: "Result", content: "[[1, 3], [2, 4]]" },
  ]},
];

export default function Page() {
  return (
    <SolverPageShell
      title="Matrix Calculator"
      highlight="2×2 Operations"
      badgeText="5 Operations, Live"
      intro="Compute determinant, inverse, transpose, addition, and multiplication of 2×2 matrices, with step-by-step explanations of every operation."
      widget={<MatrixCalculator />}
      formulaCard={{
        label: "2×2 Inverse Formula",
        formula: <span>[[a, b], [c, d]]⁻¹ = (1/det) · [[d, −b], [−c, a]]</span>,
        caption: "Swap the diagonal entries, negate the off-diagonals, divide by the determinant. Works only when det ≠ 0.",
      }}
      examplesHeading="Five matrix operations, fully derived"
      examplesIntro="One example per supported operation, plus a singular-matrix case."
      cta={{ title: "Working with larger matrices?", body: "Photo solver handles 3×3, 4×4, eigenvalues, and row reduction with full work.", button: "Try Photo Solver" }}
      conceptTitle="Matrix operations in one place"
      conceptBody={<>
        <p>A matrix is a rectangular array of numbers. The 2×2 matrix is the simplest non-trivial case and the foundation for understanding higher dimensions. Common operations include addition (entry-wise), multiplication (row · column), the determinant (a scalar that tells you whether the matrix is invertible), the inverse (the matrix that undoes multiplication), and the transpose (rows ↔ columns).</p>
        <p>The most subtle is multiplication: it&apos;s NOT entry-wise. To get entry (i, j) of the product, take the dot product of row i of the first matrix with column j of the second. Order matters: AB ≠ BA in general.</p>
      </>}
      examples={examples}
      seoSections={[
        { title: "2×2 matrix calculator with step-by-step solutions", body: "Matrices are everywhere in math, physics, computer graphics, machine learning, and engineering. This 2×2 matrix calculator handles determinants, inverses, addition, multiplication, and transposes, each with the work shown so you can follow the logic and apply it by hand on exams." },
        { title: "Computing a 2×2 determinant", body: "The determinant of [[a, b], [c, d]] is ad − bc. It's a single number that tells you a lot: zero means the matrix is singular (no inverse), positive means the linear transformation preserves orientation, negative means it flips orientation. The absolute value gives the area scaling factor." },
        { title: "Finding the inverse of a 2×2 matrix", body: "The inverse of [[a, b], [c, d]] exists only when det ≠ 0. The formula is (1/det) × [[d, −b], [−c, a]], swap the diagonal entries, negate the off-diagonals, then divide by the determinant. Multiplying a matrix by its inverse gives the identity matrix." },
        { title: "Matrix multiplication explained", body: "To multiply two 2×2 matrices, take row 1 of the first dot product with column 1 of the second for the (1,1) entry, row 1 dot column 2 for the (1,2) entry, and so on. Each entry of the result requires four multiplications and one addition. Matrix multiplication represents the composition of linear transformations." },
        { title: "Transposing a matrix", body: "The transpose flips a matrix over its diagonal. For [[a, b], [c, d]], the transpose is [[a, c], [b, d]]. Transposes are useful in inner products, symmetric matrices (where A = Aᵀ), and many algorithms in numerical linear algebra. For larger matrices, the same rule applies: row i becomes column i." },
      ]}
    />
  );
}
