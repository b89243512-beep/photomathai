import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://photomathai.com";

  return [
    { url: baseUrl },
    { url: `${baseUrl}/calculator` },
    { url: `${baseUrl}/solve` },
    { url: `${baseUrl}/privacy` },
    { url: `${baseUrl}/terms` },
  ];
}
