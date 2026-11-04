import { useState, useEffect } from 'react'

/** Floating pill-shaped header on desktop; responsive hamburger menu on mobile (< 768px) */
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Journey', href: '#journey' },
    { label: 'Impact', href: '#impact' },
  ]

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Lock body scroll when mobile overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)

  return (
    <>
      <header className="floating-header">
        {/* ── Desktop Navigation (hidden below 768px via CSS) ── */}
        <nav className="floating-nav desktop-nav" aria-label="Main navigation">
          {/* Name / logo */}
          <a href="#hero" className="nav-name">
            Teeparthi Satya Sai Nath
          </a>

          {/* Section links */}
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}

          {/* CTA */}
          <a href="#contact" className="btn-get-in-touch">
            Get in touch
          </a>
        </nav>

        {/* ── Mobile Header Bar (visible below 768px via CSS) ── */}
        <div className="mobile-header-bar" aria-label="Mobile navigation header">
          <a href="#hero" className="nav-name" onClick={closeMenu}>
            Satya Sai Nath
          </a>

          <button
            type="button"
            className="btn-hamburger"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile Fullscreen Glassy Navigation Overlay ── */}
      {isOpen && (
        <div
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Top Bar inside Overlay */}
          <div className="mobile-overlay-header">
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '1.125rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
              }}
            >
              Teeparthi Satya Sai Nath
            </span>
            <button
              type="button"
              className="btn-hamburger"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav Links Stack with large touch targets */}
          <nav className="mobile-nav-links" aria-label="Mobile site links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-item"
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <span className="mobile-nav-arrow" aria-hidden="true">&rarr;</span>
              </a>
            ))}

            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <a
                href="#contact"
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  minHeight: '48px',
                  fontSize: '1.0625rem',
                }}
                onClick={closeMenu}
              >
                Get in touch
              </a>
              <a
                href="/Portfolio/Teeparthi_Satya_Sai_Nath_Resume.pdf"
                download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  minHeight: '48px',
                  fontSize: '1.0625rem',
                }}
                onClick={closeMenu}
              >
                Download Resume (PDF)
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
