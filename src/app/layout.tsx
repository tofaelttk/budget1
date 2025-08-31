import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Finance Dashboard | Budget.SigmaPointPi.com",
  description: "Comprehensive personal finance management with smart calculations, beautiful visualizations, and automated insights. Track credit cards, income, expenses, and achieve your financial goals.",
  keywords: "personal finance, budget tracker, credit card management, expense tracking, financial dashboard",
  authors: [{ name: "SigmaPointPi" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
