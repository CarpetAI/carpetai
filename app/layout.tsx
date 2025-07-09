import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { SessionRecorder } from '@carpetai/rrweb-recorder-nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CartpetAI – AI-Powered Session Replay & Analytics",
  description: "Replay user sessions, analyze user behavior, and get AI-powered insights for your web app. Instantly understand what your users do and why.",
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
        <ClerkProvider>
          {children}
        </ClerkProvider>
        {process.env.NEXT_PUBLIC_CARPETAI_API_KEY && (
          <SessionRecorder apiKey={process.env.NEXT_PUBLIC_CARPETAI_API_KEY} />
        )}
      </body>
    </html>
  );
}
