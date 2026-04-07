import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Free PhotoMath AI - Math Problem Solver",
    short_name: "PhotoMath AI",
    description:
      "Solve any math problem from a photo instantly with step-by-step solutions. Free, no sign-up required.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
