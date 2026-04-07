import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Free PhotoMath AI - Solve Any Math Problem from a Photo Instantly",
  description:
    "Free PhotoMath AI solves math problems from photos instantly with step-by-step solutions. Upload a photo of any algebra, calculus, geometry or statistics problem and get detailed explanations for free.",
  keywords: [
    "free photomath ai",
    "photo math solver",
    "math problem solver from photo",
    "ai math solver",
    "step by step math solutions",
    "math homework helper",
    "solve math from picture",
    "algebra solver",
    "calculus solver",
    "geometry solver",
    "free math solver online",
    "photomath alternative",
    "ai homework helper",
    "math photo scanner",
  ],
  openGraph: {
    title: "Free PhotoMath AI - Solve Any Math Problem from a Photo",
    description:
      "Upload a photo of any math problem and get instant step-by-step solutions powered by AI. Completely free, no sign-up required.",
    type: "website",
    url: "https://photomathai.com",
    siteName: "Free PhotoMath AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PhotoMath AI - Solve Any Math Problem from a Photo",
    description:
      "Upload a photo of any math problem and get instant step-by-step solutions powered by AI. Completely free, no sign-up required.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://photomathai.com",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Free PhotoMath AI",
              applicationCategory: "EducationalApplication",
              operatingSystem: "Web",
              description:
                "Free AI-powered math problem solver that reads photos of math problems and provides step-by-step solutions instantly.",
              url: "https://photomathai.com",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              creator: {
                "@type": "Organization",
                name: "PhotoMath AI",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Is Free PhotoMath AI really free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Free PhotoMath AI is completely free. You can solve unlimited math problems without any hidden fees, subscriptions, or sign-up requirements.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What types of math problems can Free PhotoMath AI solve?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free PhotoMath AI can solve a wide range of math problems including algebra, calculus, geometry, trigonometry, statistics, and more. It works with both printed and handwritten problems.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How accurate is Free PhotoMath AI?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free PhotoMath AI uses advanced AI models trained on millions of math problems. It delivers highly accurate solutions with detailed step-by-step explanations for each problem.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can I use Free PhotoMath AI on my phone?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, Free PhotoMath AI works seamlessly on any device including smartphones, tablets, and desktop computers. Simply open the website in your browser and upload or take a photo.",
                  },
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
