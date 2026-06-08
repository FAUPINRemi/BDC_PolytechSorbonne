import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BDC Polytech Sorbonne",
  description: "Association de cuisine de Polytech Sorbonne — ateliers, recettes et bonne humeur.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4">
          <Header />
          <main className="flex-1 py-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
