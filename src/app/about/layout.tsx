import type { Metadata } from "next";
import { siteConfig } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, ${siteConfig.title}. Brand strategy and creative direction.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
