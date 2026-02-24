import type { Metadata } from "next";
import { siteConfig } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.name}, ${siteConfig.title}.`,
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
