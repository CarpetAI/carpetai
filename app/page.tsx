import Link from "next/link";
import { ActionIdsChart } from "@/components/ActionIdsChart";
import Image from "next/image";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
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
    metadataBase: new URL('https://trycarpetai.com'),
    alternates: {
      canonical: '/',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://trycarpetai.com',
      siteName: 'CartpetAI',
      title: 'CartpetAI – AI-Powered Session Replay & Analytics',
      description: 'Replay user sessions, analyze user behavior, and get AI-powered insights for your web app. Instantly understand what your users do and why.',
      images: [
        {
          url: 'https://trycarpetai.com/home_render.png',
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
      images: ['https://trycarpetai.com/home_ir.png'],
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
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#18162a] flex flex-col">
      <header className="w-full px-8 py-4 flex items-center justify-between bg-[#18162a] border-b border-[#23213a]">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <Image src="/logo.jpg" alt="CarpetAI Logo" width={32} height={32} className="w-8 h-8 rounded-full object-contain bg-white" />
            <span className="text-xl font-bold tracking-tight text-white">CarpetAI</span>
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <a href="/projects" className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">User Access</a>
          <a 
            href="https://github.com/CarpetAI/carpetai-rrwebrecorder" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 text-white/70 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-[#3b1c6d] via-[#4f2e91] to-[#18162a]">
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl py-16">
          <div className="mb-6">
            <span className="inline-block bg-white/10 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-sm border border-white/20">AI-Powered User Insights</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight text-center drop-shadow-lg">
            The analytics platform that builds itself.
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl text-center">
            CarpetAI watches how people use your site and gives you insights on how to improve it. See exactly how users interact with your product. Instantly discover what to fix, improve, or build next.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <a
              href="/projects"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:from-blue-700 hover:to-purple-700 transition"
            >
              Get Started
            </a>
            <a
              href="#explore"
              className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-white/20 transition"
            >
              Explore More
            </a>
          </div>
        </div>
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mb-20 mt-8">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-black">
            <iframe
              src="https://www.youtube.com/embed/ZXLdtYngS7A"
              title="CarpetAI Demo"
              className="w-full h-full min-h-[220px]"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        <section id="explore" className="relative z-10 w-full max-w-5xl mx-auto mb-20 px-2 flex flex-col gap-20">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-2">
                <span>AI Insights</span>
                <span className="inline-block align-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3a7 7 0 00-4.95 11.95c.36.36.57.86.57 1.38v.17a2.25 2.25 0 002.25 2.25h2.16a2.25 2.25 0 002.25-2.25v-.17c0-.52.21-1.02.57-1.38A7 7 0 0012 3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 21h4.5" />
                  </svg>
                </span>
              </h3>
              <p className="text-white/80 mb-4">Get automatic, actionable insights—see what to fix and what to build next, based on real user behavior.</p>
              <a href="/projects" className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">View Insights</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1 text-center md:text-left w-full">
              <h3 className="text-2xl font-bold text-white mb-3">Dashboards That Build Themselves</h3>
              <p className="text-white/80 mb-4">CarpetAI automatically creates dashboards from user actions—see how many users saw a page, performed an action, or completed a funnel. No manual setup required.</p>
              <div className="my-6">
                <ActionIdsChart actionIds={[
                  { id: "page_view", count: 120 },
                  { id: "typed_search", count: 75 },
                  { id: "signup_clicked", count: 30 },
                ]} />
              </div>
              <a href="/projects" className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">See Your Dashboard</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <Image src="/replay.png" alt="Session Replay and AI Chat" width={600} height={400} className="w-full md:w-1/2 rounded-2xl shadow-lg border border-white/10" />
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3">Watch Session Replays & Ask AI</h3>
              <p className="text-white/80 mb-4">See exactly how users interact with your product by watching real session replays, then ask AI questions like &quot;Why aren&apos;t users using this feature?&quot; or &quot;Where are users dropping off?&quot; to get instant, actionable answers.</p>
              <a href="/projects" className="inline-block mt-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">Try Replay & AI Chat</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-center md:justify-start gap-2">
                <span>Install in 2 Minutes</span>
                <span className="inline-block align-middle">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-green-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </h3>
              <p className="text-white/80 mb-6">Get started with just one line of code. No complex setup required.</p>
              
              <div className="space-y-4">
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-2">React</div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                    npm install @carpetai/rrweb-recorder
                  </div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-blue-400 mt-2">
                    &lt;SessionRecorder apiKey="your-key" /&gt;
                  </div>
                </div>
                
                <div className="bg-black/20 border border-white/10 rounded-lg p-4">
                  <div className="text-white/60 text-sm mb-2">Next.js</div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-green-400">
                    npm install @carpetai/rrweb-recorder-nextjs
                  </div>
                  <div className="bg-gray-900 rounded p-3 font-mono text-sm text-blue-400 mt-2">
                    &lt;SessionRecorder apiKey="your-key" /&gt;
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center md:text-left">
                <a href="/projects" className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">Get Your API Key</a>
                <a 
                  href="https://github.com/CarpetAI/carpetai-rrwebrecorder" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block ml-4 px-6 py-2 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition"
                >
                  View Docs
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 bg-[#18162a] border-t border-[#23213a] mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/60 text-sm">© {new Date().getFullYear()} CarpetAI. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="https://github.com/CarpetAI/carpetai-rrwebrecorder" target="_blank" rel="noopener noreferrer" className="hover:underline text-white/60 text-sm">GitHub</a>
            <a href="https://calendly.com/prince-hodonou/30min" target="_blank" rel="noopener noreferrer" className="hover:underline text-white/60 text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
