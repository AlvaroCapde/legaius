'use client'

/**
 * Client boundary wrapper for the R3F Scene.
 *
 * In Next.js 16, `next/dynamic` with `ssr: false` can only be called
 * from within a Client Component. This file establishes that boundary,
 * allowing `app/page.tsx` (a Server Component) to import this wrapper safely.
 */
import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { PROJECTS } from '../data/projects'
import LabelCard from './LabelCard'

const Scene = dynamic(() => import('./Scene'), {
  ssr: false,
  loading: () => null,
})

export default function SceneWrapper() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index)
  }, [])

  return (
    <div className="relative w-full h-full">
      {/* The 3D Scene */}
      <Scene onActiveChange={handleActiveChange} />

      {/* 
        The Label Cards rendered as standard DOM elements overlaying the canvas.
        We map over all projects and render a card for each, but only the active one
        is visible. This allows for smooth cross-fade CSS transitions.
      */}
      {PROJECTS.map((project, index) => (
        <LabelCard
          key={project.id}
          project={project}
          visible={index === activeIndex}
        />
      ))}
    </div>
  )
}
