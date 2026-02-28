import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripSheetz — Your Survival Kit for Every Country",
  description: "Free, practical country information for international travelers. Visa requirements, currency, weather, electrical, transportation, communications, and emergency contacts for 199 countries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full bg-gray-50">
        <body className={`${jetbrainsMono.variable} min-h-full antialiased`} style={{ fontFamily: 'var(--font-jetbrains), monospace' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
