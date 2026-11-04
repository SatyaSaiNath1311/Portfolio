import type { ReactNode } from 'react'
import type { ContainerData } from '../App'

interface Container3DProps {
  data: ContainerData
  style: React.CSSProperties
  doorsOpen: boolean
  isLifted: boolean
  labelFontSize: number
  onClick: () => void
  children: ReactNode
}

export default function Container3D({
  data,
  style,
  doorsOpen,
  isLifted,
  labelFontSize,
  onClick,
  children,
}: Container3DProps) {
  const { id, color, darkColor, label, tag } = data
  const className = `container-3d container-${id}${isLifted ? ' lifted' : ''}`

  const ribStyle = (bg: string): React.CSSProperties => ({
    backgroundColor: bg,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.12) 0px,
      rgba(255, 255, 255, 0.12) 3px,
      rgba(0, 0, 0, 0.08) 3px,
      rgba(0, 0, 0, 0.08) 6px,
      rgba(255, 255, 255, 0.05) 6px,
      rgba(255, 255, 255, 0.05) 9px,
      rgba(0, 0, 0, 0.06) 9px,
      rgba(0, 0, 0, 0.06) 12px
    )`,
  })

  const endRibStyle = (bg: string): React.CSSProperties => ({
    backgroundColor: bg,
    backgroundImage: `repeating-linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.08) 0px,
      rgba(255, 255, 255, 0.08) 3px,
      rgba(0, 0, 0, 0.07) 3px,
      rgba(0, 0, 0, 0.07) 6px
    )`,
  })

  return (
    <div
      className={className}
      style={style}
    >
      {/* Front Face: Real Button with clear aria-label */}
      <button
        type="button"
        className="container-face container-front"
        aria-label={`${label[0]} ${label[1]} container, click to open`}
        aria-expanded={isLifted && doorsOpen}
        onClick={onClick}
      >
        {/* Left door */}
        <div
          className={`door door-left ${doorsOpen ? 'open' : 'closed'}`}
        >
          <div className="door-face door-outer" style={ribStyle(color)}>
            <div className="door-label-clip door-label-clip-left">
              <div
                className="container-label font-clash"
                style={{ fontSize: `${labelFontSize}px` }}
              >
                {label[0]}<br />{label[1]}
              </div>
            </div>
          </div>
          <div className="door-face door-inner" />
        </div>

        {/* Right door */}
        <div
          className={`door door-right ${doorsOpen ? 'open' : 'closed'}`}
        >
          <div className="door-face door-outer" style={ribStyle(color)}>
            <div className="door-label-clip door-label-clip-right">
              <div
                className="container-label font-clash"
                style={{ fontSize: `${labelFontSize}px` }}
              >
                {label[0]}<br />{label[1]}
              </div>
            </div>
            {/* Small tag at bottom-right of right door */}
            <div className="container-tag font-cabinet">{tag}</div>
          </div>
          <div className="door-face door-inner" />
        </div>
      </button>

      {/* Back face */}
      <div className="container-face container-back" style={ribStyle(color)} />

      {/* Top face */}
      <div className="container-face container-top" style={ribStyle(color)} />

      {/* Bottom face */}
      <div className="container-face container-bottom" style={ribStyle(color)} />

      {/* Left end */}
      <div className="container-face container-left" style={endRibStyle(darkColor)}>
        <div className="end-seam" />
      </div>

      {/* Right end */}
      <div className="container-face container-right" style={endRibStyle(darkColor)}>
        <div className="end-seam" />
      </div>

      {/* Inner wall with content (inert when not lifted) */}
      <div
        className="container-face inner-wall"
        inert={!isLifted || !doorsOpen ? true : undefined}
      >
        {children}
      </div>
    </div>
  )
}
