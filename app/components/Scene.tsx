'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Preload } from '@react-three/drei'
import { Suspense } from 'react'
import BubbleGallery from './BubbleGallery'

interface SceneProps {
  onActiveChange?: (index: number) => void
}

export default function Scene({ onActiveChange }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
      style={{ width: '100%', height: '100%' }}
    >
      {/* ── Lighting ── */}
      <ambientLight intensity={0.4} color="#c4b5fd" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.8}
        color="#e0d4ff"
        castShadow
      />
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.6}
        color="#818cf8"
      />

      {/* ── Environment reflections + Gallery ── */}
      <Suspense fallback={null}>
        <Environment preset="city" resolution={256} />
        {/* We pass the onActiveChange callback down to the gallery */}
        <BubbleGallery onActiveChange={onActiveChange!} />
        {/* Precompile all materials and textures immediately to prevent scroll stuttering */}
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
