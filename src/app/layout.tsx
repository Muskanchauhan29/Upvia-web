import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "./globals.css";
import { LayoutShell } from "@/components/layout-shell";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPVIA – AI Career Coach & Job Application Agent",
  description: "Cute, modern, friendly career assistant. Analyze resumes, find skill gaps, get role recommendations, prep interviews, and track applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en" className="bg-background">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-dvh`}>
        {/* Glassmorphism background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-background/80" />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-112 w-3xl -translate-x-1/2 rounded-full bg-linear-to-r from-chart-2/20 to-chart-1/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-88 w-xl rounded-full bg-linear-to-r from-chart-1/15 to-chart-2/15 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 h-72 w-md rounded-full bg-linear-to-r from-chart-2/12 to-chart-1/12 blur-3xl" />
          </div>
        </div>
          <LayoutShell>{children}</LayoutShell>
          <Toaster richColors position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
