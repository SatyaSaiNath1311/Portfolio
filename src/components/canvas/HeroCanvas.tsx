import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import DustParticles from './DustParticles'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

export default function HeroCanvas() {
  const [hasWebGL, setHasWebGL] = useState(true)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setHasWebGL(isWebGLAvailable())
  }, [])

  if (!hasWebGL) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.5} />
        <DustParticles reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
