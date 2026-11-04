interface NavbarProps {
  onNavClick: (label: string) => void
  activeId: number | null
}

const NAV_ITEMS = ['Work', 'About', 'Experience', 'Contact']
const NAV_MAP: Record<string, number> = {
  Work: 2,
  About: 3,
  Experience: 4,
  Contact: 7,
}

export default function Navbar({ onNavClick, activeId }: NavbarProps) {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      {/* Left: wordmark */}
      <div className="nav-wordmark font-clash">SATYA</div>

      {/* Centre: navigation buttons */}
      <div className="nav-links">
        {NAV_ITEMS.map((item) => {
          const targetId = NAV_MAP[item]
          const isActive = activeId === targetId
          return (
            <button
              key={item}
              type="button"
              className={`nav-btn font-cabinet ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick(item)}
              aria-label={`Fetch ${item} container`}
            >
              {item}
            </button>
          )
        })}
      </div>

      {/* Right: Let's Talk link */}
      <a
        className="nav-cta font-clash"
        href="mailto:satyasainathteeparthi@gmail.com"
        aria-label="Send email to satyasainathteeparthi@gmail.com"
      >
        Let's Talk ↗
      </a>
    </nav>
  )
}
