import type { Metadata } from "next";
import { Playfair_Display, Open_Sans, Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/content/projects";
import Layout from "@/components/Layout";
import Analytics from "@/components/Analytics";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-canela",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.oneLiner,
  keywords: [
    "art director",
    "brand strategist",
    "creative strategist",
    "brand identity",
    "campaign strategy",
    "luxury brand",
    "advertising",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.oneLiner,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.oneLiner,
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://kriyashah.com"),
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${openSans.variable} ${cormorantGaramond.variable}`}>
      <body className="font-sans">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Layout>{children}</Layout>
        <Analytics />
      </body>
    </html>
  );
}
