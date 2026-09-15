import { motion } from 'framer-motion'
import photoCutout from '../assets/photo_cutout.png'
import HeroCanvas from './canvas/HeroCanvas'
import { useReducedMotion } from '../hooks/useReducedMotion'

// ─── Floating role tag with directional pointer arrow ─────────────────────────

interface TagProps {
  label: string
  style: React.CSSProperties
  delay: number
  reducedMotion: boolean
  arrowDirection?: 'left' | 'right' | 'top'
  arrowColor?: string
}

function FloatingTag({
  label,
  style,
  delay,
  reducedMotion,
  arrowDirection = 'left',
  arrowColor,
}: TagProps) {
  return (
    <motion.div
      className="float-tag"
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: '0.4rem 0.875rem',
        borderRadius: '9999px',
        fontWeight: 600,
        fontSize: '0.875rem',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}
      animate={reducedMotion ? {} : { y: [0, -6, 0] }}
      transition={
        reducedMotion
          ? {}
          : {
              duration: 3.4,
              delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
    >
      {arrowDirection === 'left' && (
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: `6px solid ${arrowColor || 'currentColor'}`,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
      {arrowDirection === 'top' && (
        <span
          style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: `6px solid ${arrowColor || 'currentColor'}`,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
      {arrowDirection === 'right' && (
        <span
          style={{
            width: 0,
            height: 0,
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: `6px solid ${arrowColor || 'currentColor'}`,
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}

// ─── Hero Component ───────────────────────────────────────────────────────────

export default function Hero() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex',
        alignItems: 'center',
        padding: '3rem 0 0',
        overflow: 'hidden',
      }}
    >
      {/* ── Local 3D canvas (behind everything, clipped to hero) ── */}
      <HeroCanvas />

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '2.5rem',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Left: text zone ─────────────────────────────────────────── */}
        <div style={{ flex: 1.1, minWidth: 0, paddingBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          {/* Status pill */}
          <div className="status-pill" style={{ marginBottom: '1.75rem', width: 'fit-content' }}>
            <span className="status-dot" aria-hidden="true" />
            Teeparthi Satya Sai Nath · M.Tech CSE @ Amrita · Open to ML / Agentic AI roles
          </div>

          {/* Eyebrow Introduction */}
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.9375rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              color: 'var(--c-teal)',
              margin: '0 0 0.75rem',
            }}
          >
            // TEEPARTHI SATYA SAI NATH — APPLIED ML & AGENTIC AI
          </p>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 'clamp(2.5rem, 5.2vw, 4.25rem)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.025em',
              color: 'var(--ink-primary)',
              margin: '0 0 1.5rem',
            }}
          >
            I build systems that{' '}
            <span className="gradient-text">catch what shouldn't&nbsp;be there</span>.
          </h1>

          {/* Paragraph */}
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'var(--ink-secondary)',
              margin: '0 0 2.25rem',
              maxWidth: '52ch',
            }}
          >
            M.Tech Computer Science researcher & engineer at Amrita School of Computing, working on applied
            deep learning, agentic AI, and NLP security — a multi-agent bug detector, a
            prompt-injection detector, and a medical imaging model that explains its own calls.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <a href="#work" className="btn-primary">
              Explore the work &rarr;
            </a>
            <a
              href="./resume.pdf"
              download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="Download resume PDF"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download resume
            </a>
          </div>
        </div>

        {/* ── Right: Seamless Cutout Portrait + Pointer Tags ───────────── */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 'clamp(360px, 42vw, 560px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            marginBottom: '-1px',
          }}
          aria-label="Portrait photo with role labels"
        >
          {/* Floating tag 1: AI Engineer (top-right, points left toward portrait) */}
          <FloatingTag
            label="AI Engineer"
            arrowDirection="left"
            arrowColor="#E6A335"
            reducedMotion={reducedMotion}
            delay={0}
            style={{
              position: 'absolute',
              top: '14%',
              right: '-4px',
              background: '#FFF8E6',
              border: '1px solid #E6A335',
              color: '#7D5215',
            }}
          />

          {/* Floating tag 2: ML Researcher (mid-left, points right toward portrait) */}
          <FloatingTag
            label="ML Researcher"
            arrowDirection="right"
            arrowColor="#2C8585"
            reducedMotion={reducedMotion}
            delay={1.2}
            style={{
              position: 'absolute',
              top: '48%',
              left: '-20px',
              background: '#EAF4F4',
              border: '1px solid #2C8585',
              color: '#1A5555',
            }}
          />

          {/* Floating tag 3: Systems Builder (lower-right, points left toward portrait) */}
          <FloatingTag
            label="Systems Builder"
            arrowDirection="left"
            arrowColor="#D9503A"
            reducedMotion={reducedMotion}
            delay={2.1}
            style={{
              position: 'absolute',
              bottom: '22%',
              right: '-10px',
              background: '#FBEEEC',
              border: '1px solid #D9503A',
              color: '#7C2418',
            }}
          />

          {/* Cutout Portrait Image — crisp, solid, zero white fade */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <img
              src={photoCutout}
              alt="Teeparthi Satya Sai Nath"
              style={{
                width: '100%',
                maxHeight: 'min(640px, 82vh)',
                objectFit: 'contain',
                objectPosition: 'bottom center',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Mobile responsiveness ────────────────────────────────────── */}
      <style>{`
        @media (max-width: 860px) {
          #hero { padding-top: 2rem; }
          #hero .container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
          }
          #hero .container > div:first-child {
            width: 100% !important;
            padding-bottom: 0 !important;
          }
          #hero .container > div:last-child {
            width: 100% !important;
            max-width: 340px !important;
          }
        }
      `}</style>
    </section>
  )
}
