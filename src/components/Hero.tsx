import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import photoCutout from '../assets/photo_cutout.webp'
import { useReducedMotion } from '../hooks/useReducedMotion'

const HeroCanvas = lazy(() => import('./canvas/HeroCanvas'))

// ─── Floating role tag with directional pointer arrow ─────────────────────────

interface TagProps {
  label: string
  style: React.CSSProperties
  delay: number
  reducedMotion: boolean
  className?: string
  arrowDirection?: 'left' | 'right' | 'top'
  arrowColor?: string
}

function FloatingTag({
  label,
  style,
  delay,
  reducedMotion,
  className = '',
  arrowDirection = 'left',
  arrowColor,
}: TagProps) {
  return (
    <motion.div
      className={`float-tag ${className}`}
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
        minHeight: 'calc(100dvh - 72px)',
        display: 'flex',
        alignItems: 'center',
        padding: '2.5rem 0 0',
        overflow: 'hidden',
      }}
    >
      {/* ── Local 3D canvas (behind everything, clipped to hero) ── */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

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
        <div style={{ flex: 1.1, minWidth: 0, paddingBottom: 'clamp(2rem, 5vw, 5rem)' }}>
          {/* Status pill */}
          <div className="status-pill" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
            <span className="status-dot" aria-hidden="true" />
            <span>Teeparthi Satya Sai Nath · Bengaluru, Karnataka, India</span>
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
              fontSize: 'clamp(2.25rem, 5vw, 4.25rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              color: 'var(--ink-primary)',
              margin: '0 0 1.5rem',
            }}
          >
            I build systems that{' '}
            <span className="gradient-text">catch what shouldn&apos;t&nbsp;be there</span>.
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
            M.Tech Computer Science student building machine learning, deep learning, and multi-agent LLM systems with RAG. I like end-to-end ownership of projects, from data cleaning and model evaluation to deployable APIs. Looking for an internship or entry-level role in data, analytics, or AI engineering.
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}>
            <a href="#work" className="btn-primary" style={{ minHeight: '44px', minWidth: '44px' }}>
              Explore the work &rarr;
            </a>
            <a
              href="/Portfolio/Teeparthi_Satya_Sai_Nath_Resume.pdf"
              download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              aria-label="Download resume PDF"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Resume
            </a>
          </div>
        </div>

        {/* ── Right: Seamless Cutout Portrait + Pointer Tags ───────────── */}
        <div
          style={{
            position: 'relative',
            flexShrink: 0,
            width: 'clamp(260px, 42vw, 560px)',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            alignSelf: 'flex-end',
            marginBottom: '-1px',
          }}
          aria-label="Portrait photo with role labels"
        >
          {/* Floating tag 1: AI Engineer */}
          <FloatingTag
            label="AI Engineer"
            className="hero-tag-1"
            arrowDirection="left"
            arrowColor="#E6A335"
            reducedMotion={reducedMotion}
            delay={0}
            style={{
              position: 'absolute',
              top: '14%',
              right: '0px',
              background: '#FFF8E6',
              border: '1px solid #E6A335',
              color: '#7D5215',
            }}
          />

          {/* Floating tag 2: ML Researcher */}
          <FloatingTag
            label="ML Researcher"
            className="hero-tag-2"
            arrowDirection="right"
            arrowColor="#2C8585"
            reducedMotion={reducedMotion}
            delay={1.2}
            style={{
              position: 'absolute',
              top: '48%',
              left: '0px',
              background: '#EAF4F4',
              border: '1px solid #2C8585',
              color: '#1A5555',
            }}
          />

          {/* Floating tag 3: Systems Builder */}
          <FloatingTag
            label="Systems Builder"
            className="hero-tag-3"
            arrowDirection="left"
            arrowColor="#D9503A"
            reducedMotion={reducedMotion}
            delay={2.1}
            style={{
              position: 'absolute',
              bottom: '22%',
              right: '0px',
              background: '#FBEEEC',
              border: '1px solid #D9503A',
              color: '#7C2418',
            }}
          />

          {/* Cutout Portrait Image — crisp, fluid scaling, never crops face */}
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
              width="1254"
              height="1254"
              fetchPriority="high"
              decoding="async"
              style={{
                width: '100%',
                maxWidth: '100%',
                maxHeight: 'min(640px, 75dvh)',
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
          #hero { padding-top: 1.5rem; }
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
            max-width: min(100%, 360px) !important;
          }
        }
        @media (max-width: 480px) {
          .hero-tag-1 { top: 6% !important; right: 0 !important; font-size: 0.75rem !important; padding: 0.3rem 0.65rem !important; }
          .hero-tag-2 { top: 45% !important; left: 0 !important; font-size: 0.75rem !important; padding: 0.3rem 0.65rem !important; }
          .hero-tag-3 { bottom: 16% !important; right: 0 !important; font-size: 0.75rem !important; padding: 0.3rem 0.65rem !important; }
        }
      `}</style>
    </section>
  )
}
