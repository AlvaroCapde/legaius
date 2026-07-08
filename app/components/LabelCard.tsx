import { Project } from '../data/projects'

interface LabelCardProps {
  project: Project
  visible: boolean
}

export default function LabelCard({ project, visible }: LabelCardProps) {
  return (
    <div
      className="absolute left-1/2 -translate-x-0"
      style={{
        // Positioned in standard DOM coordinates: fixed near the bottom.
        bottom: '15%',
        pointerEvents: visible ? 'auto' : 'none',
        userSelect: visible ? 'auto' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        zIndex: 40,
      }}
    >
      {/* Category pill */}
      <span
        style={{
          fontSize: '9px',
          fontFamily: 'var(--font-inter, system-ui)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          fontWeight: 600,
          color: project.accentColor,
          background: `${project.accentColor}18`,
          border: `1px solid ${project.accentColor}40`,
          borderRadius: '999px',
          padding: '2px 10px',
        }}
      >
        {project.category}
      </span>

      {/* Title */}
      <span
        style={{
          fontSize: '22px',
          fontFamily: 'var(--font-inter, system-ui)',
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: '#f5f3ff',
          textShadow: `0 0 24px ${project.accentColor}60`,
        }}
      >
        {project.title}
      </span>

      {/* Description */}
      <span
        style={{
          fontSize: '12px',
          fontFamily: 'var(--font-inter, system-ui)',
          fontWeight: 400,
          color: '#9ca3af',
          maxWidth: '260px',
          whiteSpace: 'normal',
          textAlign: 'center',
          lineHeight: '1.5',
        }}
      >
        {project.description}
      </span>
    </div>
  )
}
