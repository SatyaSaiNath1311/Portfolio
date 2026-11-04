import { useState, useEffect, useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasWebGL, setHasWebGL] = useState(true)
  const [inView, setInView] = useState(true)
  const [isTabVisible, setIsTabVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    setHasWebGL(isWebGLAvailable())

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    // Pause rendering when tab is hidden
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Pause rendering when canvas is scrolled off-screen
    let observer: IntersectionObserver | null = null
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting)
        },
        { threshold: 0.05 }
      )
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (observer) observer.disconnect()
    }
  }, [])

  // If WebGL is not available or user prefers reduced motion, render static soft gradient
  if (!hasWebGL || reducedMotion) {
    return (
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          touchAction: 'pan-y',
          background:
            'radial-gradient(ellipse 65% 55% at 75% 50%, rgba(230, 163, 53, 0.08) 0%, rgba(44, 133, 133, 0.04) 40%, transparent 70%)',
        }}
      />
    )
  }

  const shouldAnimate = inView && isTabVisible

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        touchAction: 'pan-y',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50, near: 0.1, far: 50 }}
        dpr={[1, 1.5]}
        frameloop={shouldAnimate ? 'always' : 'never'}
        gl={{ alpha: true, antialias: !isMobile, powerPreference: 'low-power' }}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <DustParticles
          reducedMotion={reducedMotion}
          isMobile={isMobile}
          isTouch={isTouch}
        />
      </Canvas>
    </div>
  )
}
