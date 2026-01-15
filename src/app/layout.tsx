import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNav from "@/components/ConditionalNav";
import ConditionalFooter from "@/components/ConditionalFooter";
import ConditionalBackground from "@/components/ConditionalBackground";
import { XPProvider } from "@/context/XPContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World of ML | Hack Club",
  description: "Build your first AI model from start to finish. A project-based machine learning program for motivated high school students by Hack Club.",
  keywords: ["machine learning", "AI", "Hack Club", "education", "programming", "data science"],
  authors: [{ name: "Hack Club" }],
  openGraph: {
    title: "World of ML | Hack Club",
    description: "Build your first AI model from start to finish. A project-based machine learning program for motivated high school students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0a0e1a] overscroll-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-x-hidden overscroll-none`}
      >
        <XPProvider>
          <ConditionalBackground />
          <ConditionalNav />
          <main>
            {children}
          </main>
          <ConditionalFooter />
        </XPProvider>
      </body>
    </html>
  );
}
