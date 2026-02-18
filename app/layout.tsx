import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripSheetz — Your survival kit for every country",
  description: "Practical country information for international travelers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <a href="/" className="shrink-0 font-medium text-gray-900">
              <span className="font-bold">Trip</span>
              <span className="font-normal">Sheetz</span>
            </a>
            <div className="hidden flex-1 justify-center sm:flex">
              <input
                type="search"
                placeholder="Search countries..."
                className="w-full max-w-xs rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                aria-label="Search"
              />
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <a
                href="/compare"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Compare
              </a>
              <a
                href="/sign-in"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign in
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
