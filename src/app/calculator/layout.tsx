import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Photo Math Calculator - Step-by-Step Math Solver Online",
  description:
    "Free Photo Math Calculator solves any math expression instantly with step-by-step solutions. Supports algebra, trigonometry, logarithms, calculus and more. 100% free, no sign-up needed.",
  keywords: [
    "free photo math calculator",
    "math calculator online",
    "step by step calculator",
    "scientific calculator free",
    "algebra calculator",
    "trigonometry calculator",
    "math solver with steps",
    "online math calculator",
  ],
  alternates: {
    canonical: "https://photomathai.com/calculator",
  },
  openGraph: {
    title: "Free Photo Math Calculator - Step-by-Step Math Solver",
    description:
      "Solve any math expression instantly with step-by-step solutions. Algebra, trigonometry, logarithms and more — completely free.",
    url: "https://photomathai.com/calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Photo Math Calculator - Step-by-Step Math Solver",
    description: "Solve any math expression instantly with step-by-step solutions.",
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Free Photo Math Calculator",
            applicationCategory: "EducationalApplication",
            operatingSystem: "Web",
            description:
              "Free online math calculator with step-by-step solutions for algebra, trigonometry, logarithms, and more.",
            url: "https://photomathai.com/calculator",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      {children}
    </>
  );
}
