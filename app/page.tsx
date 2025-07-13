import Link from "next/link";
import { ActionIdsChart } from "@/components/ActionIdsChart";
import Image from "next/image";

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
        <div className="flex gap-2">
          <a href="/projects" className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow hover:from-blue-700 hover:to-purple-700 transition">User Access</a>
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
