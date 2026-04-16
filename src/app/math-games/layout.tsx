import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Math Games Online - 9 Playable Math Games for All Ages",
  description:
    "Play 9 free math games online instantly — Quick Math, Memory Sequence, Times Tables, Prime Hunt, and more. No download required. Fun way to practice mental math for kids, students, and adults.",
  keywords: [
    "math games online", "free math games", "math games for kids",
    "mental math games", "math practice games", "quick math game",
    "times tables game", "prime number game", "math games free online",
    "brain training math", "math games no download", "math learning games",
    "arithmetic games online", "math puzzle games",
  ],
  alternates: {
    canonical: "https://photomathai.com/math-games",
  },
  openGraph: {
    title: "Free Math Games Online - 9 Playable Games",
    description: "Play 9 free math games instantly in your browser. Quick math, memory, times tables, and more.",
    url: "https://photomathai.com/math-games",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Math Games Online - 9 Playable Games",
    description: "Play 9 free math games instantly in your browser. Quick math, memory, times tables, and more.",
  },
};

const GAMES_FOR_SCHEMA = [
  { name: "Quick Math", desc: "60-second arithmetic challenge" },
  { name: "Memory Sequence", desc: "Memorize growing number sequences" },
  { name: "Times Tables", desc: "Multiplication practice for tables 2-12" },
  { name: "Odd or Even Rush", desc: "Classify numbers in 30 seconds" },
  { name: "Prime or Not", desc: "Identify prime numbers" },
  { name: "Number Guesser", desc: "Binary search guessing game 1-100" },
  { name: "Math Trivia", desc: "10-question multiple choice quiz" },
  { name: "Equation Builder", desc: "Combine numbers and operators to hit target" },
  { name: "Number Slide Puzzle", desc: "Classic 8-puzzle with numbered tiles" },
];

const FAQS = [
  { q: "Are these math games really free?", a: "Yes, 100% free. All 9 games run directly in your browser without any sign-up, payment, or download. Play as many times as you want." },
  { q: "Are the games suitable for kids?", a: "Yes. Games like Quick Math, Times Tables, Odd or Even, and Number Guesser are perfect for elementary and middle school kids." },
  { q: "Do I need to install anything?", a: "No. Every game runs instantly in your browser. Works on desktop, tablet, and mobile." },
  { q: "Can I play these games on my phone?", a: "Yes, all games are fully mobile-optimized with touch support." },
  { q: "Are scores saved?", a: "Best scores are remembered within your browser session. Close the tab and they reset. We do not store any personal data." },
  { q: "Which game is best for mental math practice?", a: "Quick Math is the most effective for general arithmetic speed. Times Tables is ideal for multiplication mastery." },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Math Games",
    description: "Collection of 9 free online math games playable in the browser.",
    itemListElement: GAMES_FOR_SCHEMA.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Game",
        name: g.name,
        description: g.desc,
        genre: "Educational",
        url: `https://photomathai.com/math-games#${g.name.toLowerCase().replace(/\s+/g, "-")}`,
        playMode: "SinglePlayer",
        applicationCategory: "Game",
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://photomathai.com" },
      { "@type": "ListItem", position: 2, name: "Math Games", item: "https://photomathai.com/math-games" },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
