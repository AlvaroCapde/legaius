'use client'

import { useRef, useCallback, useState } from 'react'
import { useFrame, ThreeEvent, useThree } from '@react-three/fiber'
import { ScrollControls, useScroll, useCursor } from '@react-three/drei'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import ProjectBubble from './ProjectBubble'
import { PROJECTS, type Project } from '../data/projects'

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const SPACING      = 3.8   // World-unit gap between bubble centres
const DEPTH_FACTOR = 2.2   // How far inactive bubbles recede on Z
const SCALE_ACTIVE   = 1.35  // Active bubble scale — noticeably larger
const SCALE_INACTIVE = 0.32  // Inactive scale — small, clearly subordinate
const LERP_SPEED = 7.0       // Transition speed (higher = snappier)

// ─────────────────────────────────────────────────────────────────────────────
// BubbleNode — a single bubble that reads scroll directly and animates itself
// NO Html/DOM inside — label lives in the DOM layer (SceneWrapper)
// ─────────────────────────────────────────────────────────────────────────────

interface BubbleNodeProps {
  project: Project
  index: number
  count: number
  onFocus: (index: number) => void
}

function BubbleNode({ project, index, count, onFocus }: BubbleNodeProps) {
  const groupRef = useRef<THREE.Group>(null!)
  const scroll   = useScroll()
  const [hovered, setHovered] = useState(false)
  useCursor(hovered)

  const { viewport } = useThree()
  const isMobile = viewport.width < 6 // Rough cutoff for mobile in world units

  const currentScaleActive = isMobile ? 1.0 : SCALE_ACTIVE
  const currentScaleInactive = isMobile ? 0.25 : SCALE_INACTIVE

  // Persistent lerp targets — avoids jitter from per-render allocation
  const lerpedX = useRef(index * SPACING)
  const lerpedZ = useRef(index === 0 ? 0 : -DEPTH_FACTOR)
  const lerpedS = useRef(index === 0 ? currentScaleActive : currentScaleInactive)

  useFrame((_state, delta) => {
    // floatIndex ∈ [0, count-1] — the exact fractional "current" bubble
    const floatIndex = scroll.offset * (count - 1)
    const dist       = index - floatIndex

    // Parabolic depth — further from centre = deeper recession
    const absDist  = Math.abs(dist)
    const falloff  = Math.max(0, 1 - absDist)

    const targetX = dist * SPACING
    const targetZ = -DEPTH_FACTOR * absDist * absDist * 0.5
    const targetS = THREE.MathUtils.lerp(currentScaleInactive, currentScaleActive, falloff * falloff)

    const k = 1 - Math.exp(-LERP_SPEED * delta)
    lerpedX.current = THREE.MathUtils.lerp(lerpedX.current, targetX, k)
    lerpedZ.current = THREE.MathUtils.lerp(lerpedZ.current, targetZ, k)
    lerpedS.current = THREE.MathUtils.lerp(lerpedS.current, targetS, k)

    if (groupRef.current) {
      groupRef.current.position.x = lerpedX.current
      groupRef.current.position.z = lerpedZ.current
      groupRef.current.scale.setScalar(lerpedS.current)
    }
  })

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      const floatIndex = scroll.offset * (count - 1)
      if (Math.abs(index - floatIndex) < 0.5) {
        // Bubble is currently active/centered
        window.open(project.href, '_blank')
      } else {
        // Bubble is off-center, focus it
        onFocus(index)
      }
    },
    [index, count, scroll.offset, project.href, onFocus],
  )

  return (
    <group ref={groupRef} position={[index * SPACING, 0, 0]}>
      {/* Transparent hit sphere — easier to click than the glass mesh itself */}
      <mesh 
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        renderOrder={-1}
      >
        <sphereGeometry args={[1.3, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <ProjectBubble
        textureSrc={project.textureSrc}
        position={[0, 0, 0]}
        scale={1}
        floatPhase={project.floatPhase}
        floatAmplitude={0.08}
        floatFrequency={0.35}
        rotationSpeed={0.07}
      />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BubbleTrack — layout container, also drives the active-index callback
// ─────────────────────────────────────────────────────────────────────────────

interface BubbleTrackProps {
  projects: Project[]
  onActiveChange: (index: number) => void
  onFocus: (index: number) => void
}

function BubbleTrack({ projects, onActiveChange, onFocus }: BubbleTrackProps) {
  const scroll     = useScroll()
  const prevActive = useRef(-1)

  useFrame(() => {
    const snapped = Math.round(scroll.offset * (projects.length - 1))
    if (snapped !== prevActive.current) {
      prevActive.current = snapped
      if (onActiveChange) onActiveChange(snapped)
    }
  })

  return (
    <>
      {projects.map((project, i) => (
        <BubbleNode
          key={project.id}
          project={project}
          index={i}
          count={projects.length}
          onFocus={onFocus}
        />
      ))}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// BubbleGallery — public export. Accepts onActiveChange so the parent can
// render the label card as a DOM overlay outside the <Canvas>.
// ─────────────────────────────────────────────────────────────────────────────

interface BubbleGalleryProps {
  onActiveChange: (index: number) => void
}

export default function BubbleGallery({ onActiveChange }: BubbleGalleryProps) {
  // We use standard React state to detect mobile on the client side
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // When the user clicks a bubble we want to scroll to it.
  // ScrollControls exposes its container via useScroll — but we need the
  // el ref which is only available inside the Scroll tree. We use a simple
  // snap by setting the scroll container's scrollLeft directly.
  const scrollContainerRef = useRef<HTMLElement | null>(null)

  const handleFocus = useCallback(
    (index: number) => {
      // Scroll the ScrollControls container to the target bubble
      if (scrollContainerRef.current) {
        const target = (index / (PROJECTS.length - 1)) * scrollContainerRef.current.scrollWidth
        scrollContainerRef.current.scrollTo({ left: target, behavior: 'smooth' })
      }
    },
    [],
  )

  return (
    <ScrollControls
      horizontal
      pages={PROJECTS.length - 1}
      damping={isMobile ? 0.2 : 0.3} // Slightly stronger damping on mobile
      distance={isMobile ? 2.0 : 1.2} // Higher distance = requires more swipe to move = less jumpy
      enabled
    >
      <Suspense fallback={null}>
        <BubbleTrack
          projects={PROJECTS}
          onActiveChange={onActiveChange}
          onFocus={handleFocus}
        />
      </Suspense>
    </ScrollControls>
  )
}
