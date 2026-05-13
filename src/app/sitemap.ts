import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://photomathai.com";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/expert` },
    { url: `${baseUrl}/microsoft-math-solver` },
    { url: `${baseUrl}/calculator` },
    { url: `${baseUrl}/math-games` },
    { url: `${baseUrl}/solvers` },
    { url: `${baseUrl}/solvers/quadratic-equation-solver` },
    { url: `${baseUrl}/solvers/equation-solver` },
    { url: `${baseUrl}/solvers/algebra-solver` },
    { url: `${baseUrl}/solvers/system-of-equations-solver` },
    { url: `${baseUrl}/solvers/derivative-calculator` },
    { url: `${baseUrl}/solvers/integral-calculator` },
    { url: `${baseUrl}/solvers/limit-calculator` },
    { url: `${baseUrl}/solvers/matrix-calculator` },
    { url: `${baseUrl}/solvers/fraction-calculator` },
    { url: `${baseUrl}/solvers/percentage-calculator` },
    { url: `${baseUrl}/solvers/trigonometry-calculator` },
    { url: `${baseUrl}/solvers/standard-deviation-calculator` },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];
}
