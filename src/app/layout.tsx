import type { Metadata } from "next";
import "./globals.css";

// Fallback to system fonts for better build reliability
const fontVariables = "--font-geist-sans --font-geist-mono";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
