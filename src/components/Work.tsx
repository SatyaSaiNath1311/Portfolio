import { useRef, useCallback } from 'react'

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

const projects = [
  {
    name: 'OmniBug',
    subtitle: 'Agentic Multi-Language Bug Detection Framework',
    accent: '#E6A335',
    metric: '9+ languages · 10 bug categories',
    body: 'A two-agent pipeline — a Detector agent and a Describer agent — that localizes, categorizes, and explains bugs across Python, Java, JavaScript, TypeScript, Go, Rust, C, C++, SQL, and a domain-specific language called SmartRDI. It pulls in relevant documentation through a custom Retrieval-Augmented Generation server (built with FastMCP) so it can reason about niche APIs and hardware-constrained code. Under load, it automatically escalates from fast, low-latency models to larger ones to keep analysis quality high. Results are classified into 10 structured bug categories and exported as CSV reports.',
    link: 'https://github.com/SatyaSaiNath1311/OmniBug',
    Infographic: OmniBugDiagram,
  },
  {
    name: 'PromptGuard',
    subtitle: 'Hybrid Prompt Injection Detection System',
    accent: '#D9503A',
    metric: '0.93 macro F1',
    body: 'A real-time detector for prompt injection attacks against LLMs, combining a fine-tuned DistilBERT transformer with rule-based regex heuristics. Trained on roughly 43,000 samples pulled from six public datasets, it reaches a 0.93 macro F1 score with a low false-positive rate — accurate enough to sit as a deployable API layer in front of an LLM. Built as a full academic paper and presentation for a cybersecurity course.',
    link: 'https://github.com/SatyaSaiNath1311/PromptGuard',
    Infographic: PromptGuardRing,
  },
  {
    name: 'SeverityNet',
    subtitle: 'CNN Benchmarking Framework for Skin Lesion Severity Grading',
    accent: '#2C8585',
    metric: '4 architectures benchmarked',
    body: 'An ongoing research project benchmarking EfficientNet-B2, ResNet50, ConvNeXt-Tiny, and DenseNet121 on DermaMNIST for skin lesion severity grading, with two-stage fine-tuning, focal loss, and class-balancing techniques. Includes extensive ablation studies, k-fold cross-validation, and Grad-CAM explainability so predictions can actually be inspected, not just trusted. Being written up for submission to IEEE Access. There\'s also a small Gradio demo app.',
    link: 'https://github.com/SatyaSaiNath1311/SeverityNet',
    Infographic: SeverityNetChips,
  },
]

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })

  const scrollByAmount = useCallback((direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const cardWidth = 380
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
              Projects that <span className="gradient-text">scale & defend</span>.
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.625rem' }}>
            <button
              type="button"
              className="btn-carousel"
              onClick={() => scrollByAmount('left')}
              aria-label="Scroll projects left"
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
            >
              <svg viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          className="carousel-track"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          tabIndex={0}
          aria-label="Swipeable projects carousel"
          style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBottom: '1rem',
            outline: 'none',
          }}
        >
          {projects.map((proj) => {
            const Info = proj.Infographic
            return (
              <article
                key={proj.name}
                className="project-card"
                style={{
                  width: 'clamp(320px, 32vw, 420px)',
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
                        fontSize: '1.5rem',
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
                  <div style={{ margin: '0.5rem 0' }}>
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

                  {/* GitHub Action Link */}
                  <div style={{ marginTop: 'auto', paddingTop: '1.25rem' }}>
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-pill"
                      style={{
                        display: 'inline-flex',
                        padding: '0.45rem 1rem',
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
      </div>
    </section>
  )
}
