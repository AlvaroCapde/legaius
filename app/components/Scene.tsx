'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'

/**
 * Temporary placeholder mesh — will be replaced by the bubble carousel in Part 2.
 */
function ScenePlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[0.6, 64, 64]} />
      <meshPhysicalMaterial
        color="#8b5cf6"
        roughness={0.05}
        metalness={0.1}
        transmission={0.9}
        thickness={1.2}
        ior={1.45}
        transparent
      />
    </mesh>
  )
}

export default function Scene() {
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

      {/* ── Environment reflections ── */}
      <Suspense fallback={null}>
        <Environment preset="city" />
        <ScenePlaceholder />
      </Suspense>

      {/* ── Camera controls (dev helper — will be removed in Part 2) ── */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
      />
    </Canvas>
  )
}
