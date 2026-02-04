import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects in brand strategy, creative campaigns, and experience design.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
