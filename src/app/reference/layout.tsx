import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Reference",
  description: "LORE Fragrances design reference for inspiration.",
};

export default function ReferenceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
