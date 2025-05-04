import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elysia",
    short_name: "Elysia",
    description: "Курсовая работа Бороодина Никита гр №90",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "512x512",
        type: "image/svg",
      },
    ],
  };
}
