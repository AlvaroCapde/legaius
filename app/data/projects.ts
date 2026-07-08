// ─────────────────────────────────────────────────────────────────────────────
// Project data — single source of truth for the BubbleGallery.
// All copy is in Spanish per design requirements.
// ─────────────────────────────────────────────────────────────────────────────

export interface Project {
  id: string
  title: string
  /** Short description in Spanish (≤ 60 chars) */
  description: string
  category: string
  textureSrc: string
  href: string
  /** Accent colour shown in the label card and glow rim */
  accentColor: string
  floatPhase: number
}

export const PROJECTS: Project[] = [
  {
    id: 'caravel',
    title: 'CARAVEL',
    description: 'Gestión legal automatizada para flotillas vehiculares.',
    category: 'SaaS · Legal',
    textureSrc: '/textures/project-caravel.png',
    href: 'https://caravel.legaius.com/',
    accentColor: '#4e8eff',
    floatPhase: 0,
  },
  {
    id: 'elias',
    title: 'ELIAS',
    description: 'Asistente jurídico con IA para despachos en México.',
    category: 'AI · Legal Tech',
    textureSrc: '/textures/project-elias.png',
    href: 'https://elias.legaius.com/',
    accentColor: '#10b981',
    floatPhase: 1.2,
  },
  {
    id: 'dalia',
    title: 'DALIA',
    description: 'Mesa de regalos digital para bodas modernas.',
    category: 'FinTech · Bodas',
    textureSrc: '/textures/project-dalia.png',
    href: 'https://www.daliamx.com/',
    accentColor: '#D4AF37',
    floatPhase: 2.4,
  },
  {
    id: 'paco',
    title: 'PACO',
    description: 'Divide gastos con amigos directo desde WhatsApp.',
    category: 'FinTech · Social',
    textureSrc: '/textures/project-paco.png',
    href: 'https://pacobrar.com/',
    accentColor: '#25d366',
    floatPhase: 3.6,
  },
  {
    id: 'saul',
    title: 'SAUL',
    description: 'Tu abogado digital para eliminar multas vehiculares.',
    category: 'AI · Legal',
    textureSrc: '/textures/project-saul.png',
    href: 'https://www.saul.legal/',
    accentColor: '#f59e0b',
    floatPhase: 4.8,
  },
]
