import type { Metadata } from "next";
import { siteConfig } from "@/content/projects";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}, ${siteConfig.title}. Multidisciplinary brand professional—strategy, creative development, and experience-led brand building.`,
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
