import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import Container3D from './components/Container3D'
import Navbar from './components/Navbar'
import Claw from './components/Claw'
import ContainerContent from './components/ContainerContent'

/* ── Container Data ── */
export interface ContainerData {
  id: number
  color: string
  darkColor: string
  label: [string, string]
  tag: string
}

export const CONTAINERS: ContainerData[] = [
  { id: 1, color: '#e5322d', darkColor: '#a91f1b', label: ['PORT', 'FOLIO'], tag: 'SATYA' },
  { id: 2, color: '#f26a1f', darkColor: '#b84a10', label: ['THE', 'WORK'], tag: '02' },
  { id: 3, color: '#1d55d8', darkColor: '#123a9c', label: ['ABOUT', 'ME'], tag: '03' },
  { id: 4, color: '#f6b919', darkColor: '#c08a0a', label: ['EXPERI', 'ENCE'], tag: '04' },
  { id: 5, color: '#97a1ad', darkColor: '#6c7682', label: ['TOOL', 'KIT'], tag: '05' },
  { id: 6, color: '#e5322d', darkColor: '#a91f1b', label: ['WHAT', 'I DO'], tag: '06' },
  { id: 7, color: '#2546b8', darkColor: '#172f80', label: ['SAY', 'HELLO'], tag: '07' },
]

/* ── Pile Positions (x, y fractions of stage; rx, ry, rz in degrees) ── */
interface PilePos {
  x: number
  y: number
  rx: number
  ry: number
  rz: number
}

const PILE_DESKTOP: PilePos[] = [
  { x: 0.48, y: 0.66, rx: -14, ry: -24, rz: 6 },
  { x: 0.13, y: 0.86, rx: -16, ry: 28, rz: 16 },
  { x: 0.36, y: 0.90, rx: -12, ry: -20, rz: -10 },
  { x: 0.60, y: 0.88, rx: -14, ry: 24, rz: 12 },
  { x: 0.86, y: 0.86, rx: -16, ry: -30, rz: -14 },
  { x: 0.25, y: 0.68, rx: -14, ry: 30, rz: -12 },
  { x: 0.73, y: 0.68, rx: -14, ry: -26, rz: 16 },
]

const PILE_MOBILE: PilePos[] = [
  { x: 0.50, y: 0.64, rx: -14, ry: -24, rz: 6 },
  { x: 0.17, y: 0.91, rx: -16, ry: 28, rz: 16 },
  { x: 0.50, y: 0.93, rx: -12, ry: -20, rz: -10 },
  { x: 0.84, y: 0.90, rx: -14, ry: 24, rz: 12 },
  { x: 0.20, y: 0.77, rx: -16, ry: -30, rz: -14 },
  { x: 0.52, y: 0.79, rx: -14, ry: 30, rz: -12 },
  { x: 0.82, y: 0.76, rx: -14, ry: -26, rz: 16 },
]

function useStageDimensions() {
  const [dims, setDims] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))

  useEffect(() => {
    const handleResize = () => {
      setDims({
        w: window.innerWidth,
        h: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = dims.w <= 700
  return { stageW: dims.w, stageH: dims.h, isMobile }
}

function useReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReduced(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReduced
}

export default function App() {
  const { stageW, stageH, isMobile } = useStageDimensions()
  const reducedMotion = useReducedMotion()

  // Sizing calculations according to specs:
  // Desktop: W between 200 and 310px (20% of stage), H=0.43W, D=0.4W
  // Phone: W up to 170px (38% of stage), H=0.6W, D=0.56W
  const pileSize = useMemo(() => {
    let cw: number
    if (isMobile) {
      cw = Math.min(170, Math.max(130, stageW * 0.38))
      return { cw, ch: cw * 0.60, cd: cw * 0.56 }
    } else {
      cw = Math.max(200, Math.min(310, stageW * 0.20))
      return { cw, ch: cw * 0.43, cd: cw * 0.40 }
    }
  }, [stageW, isMobile])

  // Lifted size: grows to about 1.95x (2.4x on phones)
  const liftedSize = useMemo(() => {
    const mult = isMobile ? 2.4 : 1.95
    return {
      cw: Math.round(pileSize.cw * mult),
      ch: Math.round(pileSize.ch * mult),
      cd: Math.round(pileSize.cd * mult),
    }
  }, [pileSize, isMobile])

  const railTop = isMobile ? 96 : 88

  // Held container state:
  // activeId: currently lifted container (1..7)
  // inMotionId: container currently transitioning (for lift or lower)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [inMotionId, setInMotionId] = useState<number | null>(null)
  const [isLifting, setIsLifting] = useState(false)
  const [doorsOpen, setDoorsOpen] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  // Claw state:
  const [clawX, setClawX] = useState<number>(() => stageW * 0.48)
  const [rodLength, setRodLength] = useState<number>(44)
  const [fingersOpen, setFingersOpen] = useState(false)
  const [clawSpanWidth, setClawSpanWidth] = useState<number>(pileSize.cw)

  const isBusyRef = useRef(false)
  const queuedPickRef = useRef<number | null>(null)
  const contentHeadingRef = useRef<HTMLHeadingElement | null>(null)

  const pilePositions = isMobile ? PILE_MOBILE : PILE_DESKTOP

  // Helper: wait ms unless prefers-reduced-motion is enabled; pauses when tab is hidden
  const wait = useCallback(
    (ms: number) => {
      if (reducedMotion) return Promise.resolve()
      return new Promise<void>((resolve) => {
        if (document.hidden) {
          const handleVisibility = () => {
            if (!document.hidden) {
              document.removeEventListener('visibilitychange', handleVisibility)
              setTimeout(resolve, ms)
            }
          }
          document.addEventListener('visibilitychange', handleVisibility)
        } else {
          setTimeout(resolve, ms)
        }
      })
    },
    [reducedMotion]
  )

  // Calculate pile coordinate for container index
  const getPilePos = useCallback(
    (idx: number) => {
      const p = pilePositions[idx]
      return {
        left: Math.round(p.x * stageW - pileSize.cw / 2),
        top: Math.round(p.y * stageH - pileSize.ch / 2),
        rx: p.rx,
        ry: p.ry,
        rz: p.rz,
      }
    },
    [pilePositions, stageW, stageH, pileSize]
  )

  // Calculate lifted coordinate at top centre
  const getLiftedPos = useCallback(() => {
    const liftedTop = railTop + (isMobile ? 54 : 64)
    return {
      left: Math.round(stageW / 2 - liftedSize.cw / 2),
      top: liftedTop,
      rx: -7,
      ry: -11,
      rz: 0,
    }
  }, [stageW, liftedSize, railTop, isMobile])

  // The Pick Sequence
  const runPick = useCallback(
    async (targetId: number) => {
      if (isBusyRef.current) {
        queuedPickRef.current = targetId
        return
      }

      isBusyRef.current = true
      const targetIdx = targetId - 1
      const targetPile = getPilePos(targetIdx)
      const liftedPos = getLiftedPos()

      // Step 1: If claw is holding a container, close doors, lower it, open fingers
      if (activeId !== null && activeId !== targetId) {
        const heldIdx = activeId - 1
        const heldPile = getPilePos(heldIdx)

        // 1a. Close doors (0.45s)
        setContentVisible(false)
        setDoorsOpen(false)
        await wait(450)

        // 1b. Lower held container back to its spot in the pile, shrinking (0.85s)
        setIsLifting(false)
        setInMotionId(activeId)
        setActiveId(null)

        // Claw follows container down
        setClawX(heldPile.left + pileSize.cw / 2)
        setRodLength(Math.max(24, heldPile.top - (railTop - 9) - 34))
        setClawSpanWidth(pileSize.cw)
        await wait(850)

        // 1c. Open fingers to release it
        setFingersOpen(true)
        setInMotionId(null)
        await wait(200)
      }

      // Step 2: Claw travels along rail to above chosen container (0.75s), fingers open
      const targetCenterX = targetPile.left + pileSize.cw / 2
      setFingersOpen(true)
      setClawSpanWidth(pileSize.cw)
      setRodLength(36) // Retracted rod while travelling
      setClawX(targetCenterX)
      await wait(750)

      // Step 3: Claw drops onto container (0.56s)
      const targetTop = targetPile.top
      const dropLength = Math.max(24, targetTop - (railTop - 9) - 34)
      setRodLength(dropLength)
      await wait(560)

      // Step 4: Fingers close and grip it (0.24s)
      setFingersOpen(false)
      await wait(240)

      // Step 5: Claw lifts it to top centre (0.95s), straightens to tilt, grows to 1.95x/2.4x
      setIsLifting(true)
      setInMotionId(targetId)
      setActiveId(targetId)

      setClawX(stageW / 2)
      const liftedRodLength = Math.max(24, liftedPos.top - (railTop - 9) - 34)
      setRodLength(liftedRodLength)
      setClawSpanWidth(liftedSize.cw)
      await wait(950)

      setInMotionId(null)

      // Step 6: Doors swing open to -122° and +122° with soft spring over 0.75s
      setDoorsOpen(true)
      await wait(400)
      setContentVisible(true)
      await wait(350)

      // Step 7: Move keyboard focus to content heading
      if (contentHeadingRef.current) {
        contentHeadingRef.current.focus()
      }

      isBusyRef.current = false

      // Process any queued request
      if (queuedPickRef.current !== null) {
        const nextId = queuedPickRef.current
        queuedPickRef.current = null
        if (nextId !== targetId) {
          runPick(nextId)
        }
      }
    },
    [
      activeId,
      getPilePos,
      getLiftedPos,
      pileSize,
      liftedSize,
      railTop,
      stageW,
      wait,
    ]
  )

  // Auto-pick PORTFOLIO container (id: 1) on page load after 0.5s
  const initialLoadRef = useRef(false)
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true
      const timer = setTimeout(() => {
        runPick(1)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [runPick])

  // Escape key brings back PORTFOLIO container (id: 1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        runPick(1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [runPick])

  // Container click handler
  const handleContainerClick = useCallback(
    (id: number) => {
      if (activeId !== id) {
        runPick(id)
      }
    },
    [activeId, runPick]
  )

  // Nav item click handler
  const handleNavClick = useCallback(
    (label: string) => {
      const navMap: Record<string, number> = {
        Work: 2,
        About: 3,
        Experience: 4,
        Contact: 7,
      }
      const targetId = navMap[label]
      if (targetId) {
        runPick(targetId)
      }
    },
    [runPick]
  )

  // Dynamic CSS style for each container cuboid
  const getContainerStyle = useCallback(
    (idx: number): React.CSSProperties => {
      const id = idx + 1
      const isCurrentlyActive = activeId === id
      const isMoving = inMotionId === id

      if (isCurrentlyActive && (!isMoving || isLifting)) {
        // Lifted position at top centre
        const lp = getLiftedPos()
        return {
          '--cw': `${liftedSize.cw}px`,
          '--ch': `${liftedSize.ch}px`,
          '--cd': `${liftedSize.cd}px`,
          '--move-dur': '0.95s',
          left: `${lp.left}px`,
          top: `${lp.top}px`,
          transform: `rotateX(${lp.rx}deg) rotateY(${lp.ry}deg) rotateZ(${lp.rz}deg)`,
          zIndex: 100,
        } as React.CSSProperties
      }

      // Pile position
      const pp = getPilePos(idx)
      // Lower containers sit in front: compute zIndex based on pilePos.y
      const zIndex = Math.round(pilePositions[idx].y * 100)
      const pileTransform = `rotateX(${pp.rx}deg) rotateY(${pp.ry}deg) rotateZ(${pp.rz}deg)`

      return {
        '--cw': `${pileSize.cw}px`,
        '--ch': `${pileSize.ch}px`,
        '--cd': `${pileSize.cd}px`,
        '--move-dur': '0.85s',
        '--pile-transform': pileTransform,
        left: `${pp.left}px`,
        top: `${pp.top}px`,
        transform: pileTransform,
        zIndex: isMoving ? 95 : zIndex,
      } as React.CSSProperties
    },
    [
      activeId,
      inMotionId,
      isLifting,
      getLiftedPos,
      getPilePos,
      liftedSize,
      pileSize,
      pilePositions,
    ]
  )

  // Label font size according to specs:
  // Font size 0.28 x container height (0.25 on phones), line-height .84
  const getLabelFontSize = useCallback(
    (idx: number) => {
      const id = idx + 1
      const isLiftedState = activeId === id && (!inMotionId || isLifting)
      const currentHeight = isLiftedState ? liftedSize.ch : pileSize.ch
      const ratio = isMobile ? 0.25 : 0.28
      return Math.round(currentHeight * ratio)
    },
    [activeId, inMotionId, isLifting, liftedSize.ch, pileSize.ch, isMobile]
  )

  return (
    <div className="stage" role="main">
      {/* Behind everything: huge white word "PORTFOLIO" in Clash Display 700 */}
      <div className="backdrop-word font-clash" aria-hidden="true">
        PORTFOLIO
      </div>

      {/* Top-left of the stage: 11px spaced line */}
      <div className="depot-line font-cabinet" aria-hidden="true">
        SATYA'S DEPOT · <span className="yellow-highlight">7 CONTAINERS</span> · 2026
      </div>

      {/* 02 / NAVIGATION BAR (72px tall) */}
      <Navbar onNavClick={handleNavClick} activeId={activeId} />

      {/* 03 / RAIL AND CLAW */}
      <div className="rail" aria-hidden="true" />
      <Claw
        clawX={clawX}
        rodLength={rodLength}
        fingersOpen={fingersOpen}
        containerWidth={clawSpanWidth}
        isMobile={isMobile}
      />

      {/* 04 / CONTAINERS (CSS 3D cuboids) */}
      {CONTAINERS.map((container, idx) => {
        const isCurrentActive = activeId === container.id
        return (
          <Container3D
            key={container.id}
            data={container}
            style={getContainerStyle(idx)}
            doorsOpen={doorsOpen && isCurrentActive}
            isLifted={isCurrentActive}
            labelFontSize={getLabelFontSize(idx)}
            onClick={() => handleContainerClick(container.id)}
          >
            <ContainerContent
              containerId={container.id}
              color={container.color}
              visible={contentVisible && isCurrentActive}
              headingRef={isCurrentActive ? contentHeadingRef : undefined}
              baseUrl={import.meta.env.BASE_URL}
            />
          </Container3D>
        )
      })}

      {/* Frosted pill at bottom centre: "PICK A CONTAINER ↓" */}
      <div
        className="pick-pill font-cabinet"
        style={{
          opacity: activeId ? 0 : 1,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        PICK A CONTAINER ↓
      </div>
    </div>
  )
}
