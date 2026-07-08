'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ProjectBubbleProps {
  textureSrc: string
  position?: [number, number, number]
  scale?: number
  floatPhase?: number
  floatAmplitude?: number
  floatFrequency?: number
  rotationSpeed?: number
}

// ─────────────────────────────────────────────────────────────────────────────
// InnerGlobe — a sphere *inside* the glass that displays the project texture.
//
// Key insight: wrapping the texture on a curved sphere (not a flat plane) means
// MeshTransmissionMaterial's refraction/distortion bends and lenses the curved
// surface, creating a genuine 3D depth illusion rather than a flat sticker.
//
// The inner globe counter-rotates at 60% of the outer shell's speed, giving a
// parallax effect — the image shifts independently of the glass shell rotation.
// ─────────────────────────────────────────────────────────────────────────────

interface InnerGlobeProps {
  texture: THREE.Texture
  radius: number
  rotationRef: React.MutableRefObject<number>
}

function InnerGlobe({ texture, radius, rotationRef }: InnerGlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const INNER_R = radius * 0.82  // Sits comfortably inside the glass shell

  useFrame(() => {
    if (!meshRef.current) return
    // Counter-rotate at 62% of outer shell speed → parallax
    meshRef.current.rotation.y = -rotationRef.current * 0.62
    meshRef.current.rotation.x = Math.sin(rotationRef.current * 0.18) * 0.12
  })

  return (
    <mesh ref={meshRef}>
      {/*
       * 64-segment sphere: enough resolution to show the texture curving naturally.
       * phiStart/phiLength default = full sphere — texture wraps around the globe.
       */}
      <sphereGeometry args={[INNER_R, 32, 32]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.35}
        metalness={0.0}
        // Emissive map makes the image glow softly from inside the glass
        emissiveMap={texture}
        emissive={new THREE.Color(0x8b72ff)}
        emissiveIntensity={0.22}
        // Render on the inside of the sphere so it wraps inward
        side={THREE.FrontSide}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// GlassShell — MeshTransmissionMaterial outer sphere.
// The transmission shader captures the InnerGlobe render, refracts and
// distorts it, producing the organic glass-globe look.
// ─────────────────────────────────────────────────────────────────────────────

function GlassShell({ radius }: { radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius, 48, 48]} />
      <MeshTransmissionMaterial
        samples={3}
        resolution={64}
        transmission={1.0}
        thickness={0.45}
        roughness={0.04}
        ior={1.55}
        chromaticAberration={0.07}
        anisotropicBlur={0.06}
        backside={false}
        color={new THREE.Color(0xeeeeff)}
        distortion={0.12}
        distortionScale={0.5}
        temporalDistortion={0.0}
        envMapIntensity={1.6}
        metalness={0.0}
        attenuationColor={new THREE.Color(0x9f7eff)}
        attenuationDistance={0.65}
      />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ProjectBubble — main export
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectBubble({
  textureSrc,
  position = [0, 0, 0],
  scale = 1,
  floatPhase = 0,
  floatAmplitude = 0.1,
  floatFrequency = 0.38,
  rotationSpeed = 0.1,
}: ProjectBubbleProps) {
  const outerGroupRef = useRef<THREE.Group>(null!)
  const elapsed       = useRef(0)
  // Shared rotation value: InnerGlobe reads this to counter-rotate
  const yRotation     = useRef(0)

  const texture = useTexture(textureSrc)
  // Standard wrap — the sphere UV naturally tiles the texture across the globe
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  // Slightly zoom in to avoid seam at the top/bottom poles
  texture.repeat.set(1, 1)
  texture.needsUpdate = true

  const RADIUS = 1.0 * scale

  useFrame((_state, delta) => {
    if (!outerGroupRef.current) return

    elapsed.current += delta
    const t = elapsed.current

    // Float: sinusoidal Y drift with per-bubble phase offset
    outerGroupRef.current.position.y =
      position[1] + Math.sin(t * floatFrequency * Math.PI * 2 + floatPhase) * floatAmplitude

    // Rotation: primary Y-spin + gentle X wobble
    yRotation.current += rotationSpeed * delta
    outerGroupRef.current.rotation.y = yRotation.current
    outerGroupRef.current.rotation.x = Math.sin(t * 0.25 + floatPhase) * 0.05
  })

  return (
    <group ref={outerGroupRef} position={position}>
      {/*
       * Render order:
       *  1. InnerGlobe (curved sphere with project texture) — drawn first
       *  2. GlassShell (transmission) — captures InnerGlobe in its FBO,
       *     refracts it, producing the glass-globe effect
       */}
      <InnerGlobe texture={texture} radius={RADIUS} rotationRef={yRotation} />
      <GlassShell radius={RADIUS} />
    </group>
  )
}
