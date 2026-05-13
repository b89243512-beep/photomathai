import Link from "next/link";
import { Logo } from "@/components/Logo";

const toolLinks = [
  { label: "Math Solver", href: "/" },
  { label: "PhotoMath AI Expert", href: "/expert" },
  { label: "Microsoft Math Solver Online", href: "/microsoft-math-solver" },
  { label: "Photo Math Calculator", href: "/calculator" },
  { label: "Math Games", href: "/math-games" },
] as const;

const solverLinks = [
  { label: "All Solvers", href: "/solvers" },
  { label: "Quadratic Equation Solver", href: "/solvers/quadratic-equation-solver" },
  { label: "Equation Solver", href: "/solvers/equation-solver" },
  { label: "Algebra Solver", href: "/solvers/algebra-solver" },
  { label: "System of Equations Solver", href: "/solvers/system-of-equations-solver" },
  { label: "Derivative Calculator", href: "/solvers/derivative-calculator" },
  { label: "Integral Calculator", href: "/solvers/integral-calculator" },
  { label: "Limit Calculator", href: "/solvers/limit-calculator" },
  { label: "Matrix Calculator", href: "/solvers/matrix-calculator" },
  { label: "Fraction Calculator", href: "/solvers/fraction-calculator" },
  { label: "Percentage Calculator", href: "/solvers/percentage-calculator" },
  { label: "Trigonometry Calculator", href: "/solvers/trigonometry-calculator" },
  { label: "Standard Deviation Calculator", href: "/solvers/standard-deviation-calculator" },
] as const;

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <Logo size={32} />
              <span>Free PhotoMath AI</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              The smartest way to solve math problems. Simply upload a photo of any math question and receive detailed, step-by-step solutions powered by advanced AI , completely free.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Tools
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solvers */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Solvers
            </h3>
            <ul className="space-y-2.5">
              {solverLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PhotoMath AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
