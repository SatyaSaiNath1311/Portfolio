/** Floating pill-shaped header — not full-width, centered island */
export default function Header() {
  const navLinks = [
    { label: 'Experience', href: '#experience' },
    { label: 'Work', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Journey', href: '#journey' },
  ]

  return (
    <header className="floating-header">
      <nav className="floating-nav" aria-label="Main navigation">
        {/* Name / logo */}
        <a href="#hero" className="nav-name">Teeparthi Satya Sai Nath</a>

        {/* Section links */}
        {navLinks.map(link => (
          <a key={link.href} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}

        {/* CTA */}
        <a href="#contact" className="btn-get-in-touch">Get in touch</a>
      </nav>
    </header>
  )
}
