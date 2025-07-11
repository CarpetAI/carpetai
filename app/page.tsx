import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/logo.jpg" alt="CartpetAI Logo" className="w-8 h-8 rounded-full object-contain bg-white" />
            <span className="text-xl font-bold tracking-tight text-gray-900">CartpetAI</span>
          </Link>
        </div>
        <div className="flex gap-2">
          <a href="/projects" className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">User access</a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Blue radial background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="w-full h-full bg-white" style={{ position: 'absolute', inset: 0 }} />
          <div className="w-full h-full" style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, #3b82f680 0%, transparent 80%)',
            position: 'absolute',
            inset: 0,
            zIndex: 1,
          }} />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl py-24">
          <div className="mb-4">
            <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">#1 AI Session Replay Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Understand your users with <span className="text-blue-600">AI-powered</span> <br className="hidden sm:block" />Session Replays & Analytics
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl">
            Know what to build next with our AI-powered session replays and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="/projects"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow hover:bg-blue-700 transition"
            >
              Try for free
            </a>
          </div>
        </div>
        {/* Video Section */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mb-16">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.youtube.com/embed/ZXLdtYngS7A"
              title="CartpetAI Demo"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-4 bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-500 text-sm">© {new Date().getFullYear()} CartpetAI. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="https://github.com/CarpetAI/carpetai-rrwebrecorder" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-500 text-sm">GitHub</a>
            <a href="https://calendly.com/prince-hodonou/30min" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-500 text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
