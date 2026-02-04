import { MetadataRoute } from "next";
import { getProjectSlugs } from "@/content/projects";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kriyashah.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = getProjectSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
    { url: `${baseUrl}/reference`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];

  const projectPages: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...projectPages];
}
