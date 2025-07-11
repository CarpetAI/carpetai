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
  keywords: ["session replay", "user analytics", "AI analytics", "user behavior", "web analytics", "product analytics"],
  authors: [{ name: "CartpetAI Team" }],
  creator: "CartpetAI",
  publisher: "CartpetAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cartpetai.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cartpetai.com',
    siteName: 'CartpetAI',
    title: 'CartpetAI – AI-Powered Session Replay & Analytics',
    description: 'Replay user sessions, analyze user behavior, and get AI-powered insights for your web app. Instantly understand what your users do and why.',
    images: [
      {
        url: '/social-card.png',
        width: 1200,
        height: 630,
        alt: 'CartpetAI - AI-Powered Session Replay & Analytics',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CartpetAI – AI-Powered Session Replay & Analytics',
    description: 'Replay user sessions, analyze user behavior, and get AI-powered insights for your web app. Instantly understand what your users do and why.',
    images: ['/social-card.png'],
    creator: '@cartpetai',
    site: '@cartpetai',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
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
