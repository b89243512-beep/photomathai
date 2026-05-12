import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://photomathai.com";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/expert` },
    { url: `${baseUrl}/microsoft-math-solver` },
    { url: `${baseUrl}/calculator` },
    { url: `${baseUrl}/math-games` },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];
}
