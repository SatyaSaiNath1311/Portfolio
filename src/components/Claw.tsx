interface ClawProps {
  clawX: number
  rodLength: number
  fingersOpen: boolean
  containerWidth: number
  isMobile: boolean
}

export default function Claw({
  clawX,
  rodLength,
  fingersOpen,
  containerWidth,
  isMobile,
}: ClawProps) {
  const railTop = isMobile ? 96 : 88
  const carriageTop = railTop - 9

  // Span between vertical fingers = 1.06 * containerWidth
  const halfSpan = (containerWidth * 1.06) / 2

  return (
    <div
      className="claw-assembly"
      aria-hidden="true"
      style={{
        left: `${clawX}px`,
        top: `${carriageTop}px`,
      }}
    >
      {/* Carriage: 68 x 34px rounded white block */}
      <div className="carriage">
        <div className="carriage-wheel left-wheel" />
        <div className="carriage-wheel right-wheel" />
      </div>

      {/* Chrome rod hanging from carriage */}
      <div className="rod" style={{ height: `${rodLength}px` }} />

      {/* Grip head: 72 x 34px rounded white block */}
      <div className="grip-head">
        {/* Horizontal arms extending outwards past each end of the container */}
        <div
          className="horizontal-arm arm-left"
          style={{ width: `${halfSpan}px` }}
        >
          {/* Vertical finger hanging down to clamp the left end */}
          <div
            className={`vertical-finger finger-left ${fingersOpen ? 'open' : 'closed'}`}
          />
        </div>

        <div
          className="horizontal-arm arm-right"
          style={{ width: `${halfSpan}px` }}
        >
          {/* Vertical finger hanging down to clamp the right end */}
          <div
            className={`vertical-finger finger-right ${fingersOpen ? 'open' : 'closed'}`}
          />
        </div>
      </div>
    </div>
  )
}
