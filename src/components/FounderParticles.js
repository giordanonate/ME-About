'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useRef } from 'react'

function Particles({ count = 150 }) {
  const mesh = useRef()
  const dummy = new THREE.Object3D()
  const clock = useRef(new THREE.Clock())

  const particles = useRef(
    [...Array(count)].map(() => ({
      x: THREE.MathUtils.randFloatSpread(70),         // Horizontal spread
      y: THREE.MathUtils.randFloatSpread(50),         // Vertical spread
      z: THREE.MathUtils.randFloat(-2, -8),           // Depth spread
      speed: THREE.MathUtils.randFloat(0.001, 0.003), // Upward drift
      phase: Math.random() * Math.PI * 2,             // Individual animation phase
    }))
  )

  useFrame(() => {
    const time = clock.current.getElapsedTime()

    particles.current.forEach((p, i) => {
      p.y += p.speed
      if (p.y > 8) p.y = -8

      const scale = Math.sin(time * 2 + p.phase) * 0.5 + 0.8 // ~0.4–1.0 pulsing scale

      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.set(scale, scale, scale)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })

    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1} />
    </instancedMesh>
  )
}

export default function FounderParticles() {
  return (
    <div className="founder-particles-wrapper">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={1.5} />
        <Particles />
      </Canvas>
    </div>
  )
}
