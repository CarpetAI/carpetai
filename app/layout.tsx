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
