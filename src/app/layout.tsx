import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://photomathai.com"),
  title: {
    default: "Free PhotoMath AI Online - Solve Any Math Problem from a Photo Instantly",
    template: "%s | Free PhotoMath AI",
  },
  description:
    "Free PhotoMath AI Online solves math problems from photos instantly with step-by-step solutions. Upload a photo of any algebra, calculus, geometry or statistics problem and get detailed explanations for free.",
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
    title: "Free PhotoMath AI Online - Solve Any Math Problem from a Photo",
    description:
      "Upload a photo of any math problem and get instant step-by-step solutions powered by AI. Completely free, no sign-up required.",
    type: "website",
    url: "https://photomathai.com",
    siteName: "Free PhotoMath AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free PhotoMath AI Online - Solve Any Math Problem from a Photo",
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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  verification: {
    google: "8rh_cBIlxp37XQQjMzvem6y8pivxlaqyK4TUFLamiAM",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;var d=(t==='dark')||(!t&&m);if(d)document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PhotoMath AI",
              alternateName: "Free PhotoMath AI",
              url: "https://photomathai.com",
              logo: "https://photomathai.com/logo.svg",
              description:
                "PhotoMath AI is a free AI-powered math problem solver that provides step-by-step solutions from photos or text input.",
              sameAs: [],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Free PhotoMath AI",
              applicationCategory: "EducationalApplication",
              applicationSubCategory: "MathSolver",
              operatingSystem: "Web, iOS, Android",
              description:
                "Free AI-powered math problem solver that reads photos of math problems and provides step-by-step solutions instantly. Supports algebra, calculus, geometry, trigonometry, and more.",
              url: "https://photomathai.com",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                ratingCount: "5000",
                bestRating: "5",
                worstRating: "1",
              },
              author: {
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
              "@type": "WebSite",
              name: "Free PhotoMath AI",
              url: "https://photomathai.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://photomathai.com/?q={search_term_string}",
                "query-input": "required name=search_term_string",
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
        <ThemeProvider>
          <SessionProvider>{children}</SessionProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-0EM8F8J07P" />
      {/* Google Ads (AW-18087268476) */}
      <Script
        id="google-ads-tag"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18087268476"
        strategy="afterInteractive"
      />
      <Script id="google-ads-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18087268476');
          gtag('event', 'conversion', {
            'send_to': 'AW-18087268476/DvZNCMPtqJscEPyg17BD',
            'value': 1.0,
            'currency': 'USD'
          });
        `}
      </Script>
    </html>
  );
}
