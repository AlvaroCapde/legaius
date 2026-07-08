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
      <div className="absolute inset-10 z-20 pointer-events-none flex flex-col justify-between">
        <header className="w-full flex justify-between items-start md:items-center px-6 py-8 md:px-12 md:py-10 pointer-events-auto">
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

          <div className="hidden md:flex items-center gap-8">
            <span className="text-sm font-medium tracking-[0.2em] text-[#c4b5fd] uppercase">
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
      </div>
    </main>
  )
}
