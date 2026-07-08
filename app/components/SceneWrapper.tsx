'use client'

/**
 * Client boundary wrapper for the R3F Scene.
 *
 * In Next.js 16, `next/dynamic` with `ssr: false` can only be called
 * from within a Client Component. This file establishes that boundary,
 * allowing `app/page.tsx` (a Server Component) to import this wrapper safely.
 */
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
})

export default function SceneWrapper() {
  return <Scene />
}
