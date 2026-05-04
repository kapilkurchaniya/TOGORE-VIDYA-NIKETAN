import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tagore Vidya Niketan Gadarwara - Best School in Gadarwara",
    short_name: "TVN Gadarwara",
    description:
      "Tagore Vidya Niketan, Gadarwara - Premier English medium school established in 1977 offering Pre-Primary to Class 12 education in Madhya Pradesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a6fc4",
    orientation: "portrait-primary",
    categories: ["education"],
    lang: "en-IN",
    icons: [
      {
        src: "/images/logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
