export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(20, 22, 26, 0.09)',
        background: 'rgba(246, 246, 242, 0.95)',
        padding: '3.5rem 0 2.5rem',
        marginTop: '2rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2rem',
            flexWrap: 'wrap',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(20, 22, 26, 0.06)',
          }}
        >
          {/* Identity & Bio */}
          <div style={{ maxWidth: '480px' }}>
            <p
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: '1.375rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                margin: '0 0 0.5rem',
              }}
            >
              Teeparthi Satya Sai Nath
            </p>
            <p
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '0.9375rem',
                color: 'var(--ink-secondary)',
                lineHeight: 1.6,
                margin: '0 0 0.75rem',
              }}
            >
              Applied Deep Learning & Agentic AI Systems Engineer. M.Tech Computer Science student at Amrita School of Computing.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8125rem',
                color: 'var(--c-teal)',
                background: 'rgba(44, 133, 133, 0.08)',
                padding: '0.3rem 0.75rem',
                borderRadius: '9999px',
                border: '1px solid rgba(44, 133, 133, 0.2)',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#2C8585',
                }}
              />
              Open to ML / AI Engineering roles & research collaborations
            </div>
          </div>

          {/* Quick Links & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'var(--ink-secondary)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              // Connect & Reach
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a
                href="mailto:satyasainathteeparthi@gmail.com"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--ink-primary)',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#E6A335')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
              >
                satyasainathteeparthi@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/satyasainathteeparthi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--ink-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
              >
                LinkedIn &rarr;
              </a>
              <a
                href="https://github.com/SatyaSaiNath1311"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--ink-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
              >
                GitHub &rarr;
              </a>
              <a
                href="./resume.pdf"
                download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.9375rem',
                  color: 'var(--ink-secondary)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
              >
                Download Resume (PDF) &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '1.75rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8125rem',
              color: 'var(--ink-secondary)',
              margin: 0,
            }}
          >
            &copy; {currentYear} Teeparthi Satya Sai Nath. All rights reserved.
          </p>

          <a
            href="#hero"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8125rem',
              color: 'var(--ink-secondary)',
              textDecoration: 'none',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              border: '1px solid rgba(20, 22, 26, 0.12)',
              background: 'rgba(20, 22, 26, 0.03)',
              transition: 'background 0.15s, color 0.15s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(20, 22, 26, 0.08)'
              e.currentTarget.style.color = 'var(--ink-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(20, 22, 26, 0.03)'
              e.currentTarget.style.color = 'var(--ink-secondary)'
            }}
          >
            Back to top &uarr;
          </a>
        </div>
      </div>
    </footer>
  )
}
