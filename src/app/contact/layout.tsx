import type { Metadata } from "next";
import { siteConfig } from "@/content/projects";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}. Email, LinkedIn, and location.`,
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
