import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/scripts/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/images/",
      },
    ],
    sitemap: "https://tagorevidyaniketan.edu.in/sitemap.xml",
    host: "https://tagorevidyaniketan.edu.in",
  };
}
