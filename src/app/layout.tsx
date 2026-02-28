import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Navbar from "@/components/Navbar";


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
        <body className={`${GeistSans.className} min-h-full antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
