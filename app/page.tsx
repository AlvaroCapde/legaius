import SceneWrapper from './components/SceneWrapper'

export default function HomePage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050508]">
      {/* ── Background Gradients & Noise ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(139, 92, 246, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 80%,  rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 70%,  rgba(167, 139, 250, 0.08) 0%, transparent 50%),
            #050508
          `,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── 3D Scene Layer ── */}
      <div className="absolute inset-0 z-10">
        <SceneWrapper />
      </div>

      {/* ── UI Layer ── */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between">
        <header className="w-full flex flex-col md:flex-row justify-between items-center px-6 py-6 md:px-12 md:py-8 pointer-events-auto gap-4 md:gap-0">
          <div className="flex items-center">
            <span
              className="text-2xl font-bold tracking-widest uppercase"
              style={{
                background: 'linear-gradient(135deg, #f5f3ff 0%, #a78bfa 50%, #6366f1 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              LEGAIUS
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <span className="text-xs md:text-sm font-medium tracking-[0.2em] text-[#c4b5fd] uppercase text-center">
              AI Industry Disruptor Solutions
            </span>
            <a
              href="https://wa.me/523318497494"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-[#f5f3ff]/10 hover:bg-[#f5f3ff]/20 border border-white/10 text-[#f5f3ff] text-xs font-bold tracking-widest uppercase transition-all hover:scale-105 backdrop-blur-md"
            >
              Contact
            </a>
          </div>
        </header>

        {/* ── Horizontal Scroll / Swipe Hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-12 opacity-40 pointer-events-none">
          <svg className="w-5 h-5 text-[#c4b5fd] animate-[pulse_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <svg className="w-5 h-5 text-[#c4b5fd] animate-[pulse_2s_ease-in-out_infinite_1s]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </main>
  )
}
