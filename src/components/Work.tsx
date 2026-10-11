import { useRef, useCallback, useState, useEffect } from 'react'

// ─── Infographic Sub-components ─────────────────────────────────────────────

function OmniBugDiagram() {
  const c = '#E6A335'
  return (
    <div className="infographic-box">
      <svg width="100%" height="34" viewBox="0 0 240 34" aria-label="Detector to Describer pipeline diagram">
        <rect x="2" y="4" width="76" height="26" rx="4" fill="rgba(230,163,53,0.08)" stroke="#E6A335" strokeWidth="1" />
        <text x="40" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill={c} fontFamily="IBM Plex Mono, monospace">Detector</text>
        <line x1="80" y1="17" x2="124" y2="17" stroke="#E6A335" strokeWidth="1.5" strokeDasharray="3 2" />
        <polygon points="124,13 132,17 124,21" fill="#E6A335" />
        <rect x="136" y="4" width="100" height="26" rx="4" fill="rgba(230,163,53,0.08)" stroke="#E6A335" strokeWidth="1" />
        <text x="186" y="21" textAnchor="middle" fontSize="11" fontWeight="600" fill={c} fontFamily="IBM Plex Mono, monospace">Describer</text>
      </svg>
    </div>
  )
}

function PromptGuardRing() {
  const c = '#D9503A'
  const r = 20
  const circ = 2 * Math.PI * r
  const filled = 0.93 * circ
  return (
    <div className="infographic-box" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <svg width="50" height="50" viewBox="0 0 50 50" aria-label="Radial indicator showing 93% macro F1 score">
        <circle cx="25" cy="25" r={r} fill="none" stroke="rgba(217, 80, 58, 0.15)" strokeWidth="4.5" />
        <circle
          cx="25"
          cy="25"
          r={r}
          fill="none"
          stroke={c}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeDasharray={`${filled} ${circ - filled}`}
          transform="rotate(-90 25 25)"
        />
        <text x="25" y="29" textAnchor="middle" fontSize="10.5" fontWeight="600" fill={c} fontFamily="IBM Plex Mono, monospace">
          93%
        </text>
      </svg>
      <div>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6875rem', color: 'var(--ink-meta)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Macro F1 Score
        </span>
        <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.25rem', fontWeight: 600, color: c, margin: '0.1rem 0 0', lineHeight: 1 }}>
          0.93
        </p>
      </div>
    </div>
  )
}

function SeverityNetChips() {
  const archs = ['EfficientNet-B2', 'ResNet50', 'ConvNeXt-Tiny', 'DenseNet121']
  return (
    <div className="infographic-box">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
        {archs.map((name) => (
          <span
            key={name}
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: '#1E6666',
              background: 'rgba(44, 133, 133, 0.08)',
              border: '1px solid rgba(44, 133, 133, 0.22)',
              borderRadius: '4px',
              padding: '0.25rem 0.6rem',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Project Data ────────────────────────────────────────────────────────────

const featuredProjects = [
  {
    name: 'OmniBug',
    subtitle: 'Agentic Multi-Language Bug Detection Framework (2026)',
    accent: '#E6A335',
    metric: '9+ languages · 10 bug categories',
    body: 'Cascading dual-agent LLM pipeline (Detector and Describer agents) that localizes, categorizes, and explains bugs across 9+ languages (Python, Java, JavaScript, TypeScript, Go, Rust, C, C++, SQL). Custom FastMCP backend API service for RAG, injecting domain-specific documentation into agent context to improve accuracy on niche APIs and hardware-constrained code. Cascading model-fallback strategy with automatic escalation on rate limits; classifies issues into 10 structured bug categories and exports CSV reports.',
    tags: ['LLM Agents', 'FastMCP', 'RAG', 'Multi-Language'],
    link: 'https://github.com/SatyaSaiNath1311/OmniBug',
    Infographic: OmniBugDiagram,
  },
  {
    name: 'PromptGuard',
    subtitle: 'Hybrid Transformer-Based Prompt Injection Detection System (2026)',
    accent: '#D9503A',
    metric: '0.93 macro F1 · ~43K samples',
    body: 'Real-time prompt injection detection combining a fine-tuned DistilBERT transformer with rule-based regex heuristics, trained on ~43K samples from six public datasets. 0.93 macro F1 with low false positives through adversarial data augmentation and threshold calibration; deployable as an API layer for LLM safety pipelines.',
    tags: ['DistilBERT', 'NLP Security', 'Regex Heuristics', 'API'],
    link: 'https://github.com/SatyaSaiNath1311/PromptGuard',
    Infographic: PromptGuardRing,
  },
]

const extraProjects = [
  {
    name: 'SeverityNet',
    subtitle: 'CNN Benchmarking Framework for Skin Lesion Severity Grading',
    accent: '#2C8585',
    metric: '4 architectures benchmarked',
    body: "An ongoing research project benchmarking EfficientNet-B2, ResNet50, ConvNeXt-Tiny, and DenseNet121 on DermaMNIST for skin lesion severity grading, with two-stage fine-tuning, focal loss, and class-balancing techniques. Includes extensive ablation studies, k-fold cross-validation, and Grad-CAM explainability so predictions can actually be inspected, not just trusted. Being written up for submission to IEEE Access. There's also a small Gradio demo app.",
    link: 'https://github.com/SatyaSaiNath1311/SeverityNet',
    Infographic: SeverityNetChips,
  },
]

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [activeSlide, setActiveSlide] = useState(0)

  // Track scroll position to update dots
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    const onScroll = () => {
      const scrollPos = el.scrollLeft
      const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 380
      const idx = Math.min(featuredProjects.length - 1, Math.max(0, Math.round(scrollPos / cardWidth)))
      setActiveSlide(idx)
    }

    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSlide = (idx: number) => {
    if (!trackRef.current) return
    const card = trackRef.current.children[idx] as HTMLElement
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
      setActiveSlide(idx)
    }
  }

  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const firstCard = trackRef.current.firstElementChild as HTMLElement
    const cardWidth = firstCard ? firstCard.offsetWidth : 380
    const gap = 20
    const step = cardWidth + gap
    trackRef.current.scrollBy({ left: direction === 'right' ? step : -step, behavior: 'smooth' })
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return
    dragState.current = { active: true, startX: e.clientX, scrollLeft: trackRef.current.scrollLeft }
    trackRef.current.setPointerCapture(e.pointerId)
    trackRef.current.style.cursor = 'grabbing'
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.active || !trackRef.current) return
    trackRef.current.scrollLeft = dragState.current.scrollLeft - (e.clientX - dragState.current.startX)
  }, [])

  const onPointerUp = useCallback(() => {
    if (!trackRef.current) return
    dragState.current.active = false
    trackRef.current.style.cursor = 'grab'
  }, [])

  return (
    <section id="work" aria-label="Selected engineering projects" className="section">
      <div className="container">
        {/* Section Header Row with Carousel Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <div>
            <p className="eyebrow">// SELECTED WORK</p>
            <h2 className="section-title" style={{ margin: 0 }}>
              Projects that <span className="gradient-text">scale &amp; defend</span>.
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button
              type="button"
              className="btn-carousel"
              onClick={() => scrollByAmount('left')}
              aria-label="Scroll projects left"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              type="button"
              className="btn-carousel"
              onClick={() => scrollByAmount('right')}
              aria-label="Scroll projects right"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Featured Projects Carousel Track */}
        <div
          ref={trackRef}
          className="carousel-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          tabIndex={0}
          aria-label="Featured projects carousel"
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            paddingBottom: '1rem',
            outline: 'none',
          }}
        >
          {featuredProjects.map((proj) => {
            const Info = proj.Infographic
            return (
              <article
                key={proj.name}
                className="project-card"
                style={{
                  width: 'clamp(280px, 84vw, 540px)',
                  maxWidth: '100%',
                  borderTop: `4px solid ${proj.accent}`,
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  scrollSnapAlign: 'start',
                }}
              >
                <div className="project-card-body">
                  {/* Title and subtitle */}
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 'clamp(1.35rem, 3vw, 1.625rem)',
                        fontWeight: 600,
                        color: 'var(--ink-primary)',
                        margin: '0 0 0.35rem',
                      }}
                    >
                      {proj.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: '0.9375rem',
                        color: 'var(--ink-secondary)',
                        margin: 0,
                      }}
                    >
                      {proj.subtitle}
                    </p>
                  </div>

                  {/* Headline Metric + Infographic */}
                  <div style={{ margin: '0.25rem 0' }}>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: proj.accent,
                        letterSpacing: '0.04em',
                        margin: '0 0 0.5rem',
                      }}
                    >
                      {proj.metric}
                    </p>
                    <Info />
                  </div>

                  {/* Description Body */}
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '1.0625rem',
                      lineHeight: 1.7,
                      color: 'var(--ink-secondary)',
                      margin: 0,
                    }}
                  >
                    {proj.body}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: proj.accent,
                          background: `${proj.accent}14`,
                          border: `1px solid ${proj.accent}30`,
                          borderRadius: '4px',
                          padding: '0.2rem 0.55rem',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* GitHub Action Link */}
                  <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-pill"
                      style={{
                        display: 'inline-flex',
                        padding: '0.5rem 1.125rem',
                        minHeight: '44px',
                        minWidth: '44px',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Visible Pagination Dots Fallback for Touch & Keyboard */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.625rem',
            marginTop: '1rem',
          }}
          aria-label="Carousel pagination"
        >
          {featuredProjects.map((proj, idx) => (
            <button
              key={proj.name}
              type="button"
              onClick={() => scrollToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${proj.name}`}
              style={{
                width: activeSlide === idx ? '28px' : '12px',
                height: '12px',
                borderRadius: '9999px',
                background: activeSlide === idx ? proj.accent : 'rgba(20, 22, 26, 0.22)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        {/* ── Smaller "More work" row below featured projects ── */}
        <div style={{ marginTop: '3.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <p
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.8125rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--ink-meta)',
                margin: '0 0 0.35rem',
              }}
            >
              // MORE WORK
            </p>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                margin: 0,
              }}
            >
              Additional research &amp; benchmarking
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {extraProjects.map((proj) => {
              const Info = proj.Infographic
              return (
                <article
                  key={proj.name}
                  style={{
                    background: '#fff',
                    borderRadius: '1rem',
                    border: '1px solid rgba(20, 22, 26, 0.08)',
                    borderLeft: `4px solid ${proj.accent}`,
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    boxShadow: '0 2px 14px rgba(0, 0, 0, 0.035)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <div>
                      <h4
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: '1.35rem',
                          fontWeight: 600,
                          color: 'var(--ink-primary)',
                          margin: '0 0 0.25rem',
                        }}
                      >
                        {proj.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontSize: '0.875rem',
                          color: 'var(--ink-secondary)',
                          margin: 0,
                        }}
                      >
                        {proj.subtitle}
                      </p>
                    </div>

                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: proj.accent,
                        background: 'rgba(44, 133, 133, 0.08)',
                        border: '1px solid rgba(44, 133, 133, 0.22)',
                        borderRadius: '4px',
                        padding: '0.25rem 0.6rem',
                      }}
                    >
                      {proj.metric}
                    </span>
                  </div>

                  <Info />

                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.9375rem',
                      lineHeight: 1.68,
                      color: 'var(--ink-secondary)',
                      margin: 0,
                    }}
                  >
                    {proj.body}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-pill"
                      style={{
                        display: 'inline-flex',
                        padding: '0.5rem 1rem',
                        minHeight: '44px',
                        minWidth: '44px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      View on GitHub
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
