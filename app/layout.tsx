import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Best — Builder & Founder",
  description:
    "Portfolio of Best — a self-taught builder shipping AI products, SaaS tools, and real startups. Still in high school. Not waiting.",
  keywords: ["developer", "portfolio", "AI", "startup founder", "web development", "builder", "Thailand"],
  openGraph: {
    title: "Best — Builder & Founder",
    description: "I build real products. Not homework. Not excuses.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      style={{ background: "#000" }}
    >
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div className="noise-bg" />
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
