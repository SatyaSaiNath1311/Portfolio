import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

interface DustParticlesProps {
  reducedMotion?: boolean
}

// Generate a soft radial circle texture for points
function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.7)')
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 64, 64)
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

export default function DustParticles({ reducedMotion = false }: DustParticlesProps) {
  const groupRef = useRef<THREE.Group>(null)
  const count = 280

  const texture = useMemo(() => createCircleTexture(), [])

  // Generate particle positions and colors (muted marigold and teal)
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    const marigold = new THREE.Color('#E6A335')
    const teal = new THREE.Color('#2C8585')
    const neutral = new THREE.Color('#9BA3AF')

    for (let i = 0; i < count; i++) {
      // Spread across hero bounds
      pos[i * 3] = (Math.random() - 0.5) * 12
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6

      // Random color: 45% marigold, 45% teal, 10% soft neutral
      const pick = Math.random()
      let c = marigold
      if (pick > 0.55) c = teal
      else if (pick < 0.1) c = neutral

      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    return [pos, col]
  }, [count])

  // Ambient gentle drift + cursor parallax
  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (!reducedMotion) {
      // Gentle slow drift
      groupRef.current.rotation.y += delta * 0.02
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.04

      // Parallax toward cursor (state.pointer contains normalized mouse coordinates [-1, 1])
      const targetX = state.pointer.x * 0.4
      const targetY = state.pointer.y * 0.25
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.04)
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.04)
    }
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          map={texture}
          size={0.16}
          vertexColors
          transparent
          opacity={0.48}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  )
}
