import SceneWrapper from './components/SceneWrapper'

export default function HomePage() {
  return (
    <main className="relative w-full h-full overflow-hidden">
      {/* ── Deep dark radial background ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%,   rgba(139, 92, 246, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 80%,  rgba(99, 102, 241, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 70%,  rgba(167, 139, 250, 0.08) 0%, transparent 50%),
            #050508
          `,
        }}
      />

      {/* ── Noise texture overlay for depth ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      {/* ── R3F Canvas ── */}
      <div className="absolute inset-0 z-10">
        <SceneWrapper />
      </div>

      {/* ── UI overlay: wordmark ── */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 pt-8">
        <div className="flex items-center gap-3">
          <span
            className="text-2xl font-bold tracking-[0.3em] uppercase"
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
        <nav
          className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide"
          style={{ color: 'var(--text-muted)' }}
        >
          {['Platform', 'Solutions', 'About', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors duration-200 hover:text-white"
            >
              {item}
            </a>
          ))}
        </nav>
      </header>

      {/* ── Hero copy ── */}
      <section className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-6">
        <p
          className="text-xs font-semibold tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--accent-violet)' }}
        >
          Legal Intelligence Platform
        </p>
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #c4b5fd 60%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          The Future of
          <br />
          Legal Tech
        </h1>
        <p
          className="text-base md:text-lg max-w-md leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Intelligent automation and AI-powered insights designed for modern
          legal professionals.
        </p>
      </section>

      {/* ── Bottom scroll hint ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{ color: 'var(--text-muted)' }}
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <div
          className="w-px h-10 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(167,139,250,0.6), transparent)',
          }}
        />
      </div>
    </main>
  )
}
