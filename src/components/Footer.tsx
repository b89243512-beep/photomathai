import Link from "next/link";
import { Logo } from "@/components/Logo";

const footerLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;

const subjectLinks = [
  "Algebra",
  "Calculus",
  "Geometry",
  "Trigonometry",
  "Statistics",
  "Linear Algebra",
] as const;

export function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold mb-4">
              <Logo size={32} />
              <span>Free PhotoMath AI</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              The smartest way to solve math problems. Simply upload a photo of any math question and receive detailed, step-by-step solutions powered by advanced AI — completely free.
            </p>
          </div>

          {/* Subjects */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-gray-300">
              Subjects
            </h3>
            <ul className="space-y-2.5">
              {subjectLinks.map((subject) => (
                <li key={subject}>
                  <Link
                    href="#subjects"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {subject}
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
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
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
