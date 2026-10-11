import { useRef, useState, useEffect } from 'react'
import { useJourneyScroll } from '../hooks/useJourneyScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface TimelineClip {
  title: string
  subtitle: string
  date: string
  badge?: string
  color: string
  tintBg: string
  borderColor: string
  bullets: string[]
  metrics?: string
  waveBars: number[]
}

const clips: TimelineClip[] = [
  {
    title: 'B.Tech, CSE',
    subtitle: 'Parul Institute of Engineering and Technology, Vadodara',
    date: 'Dec 2021 – May 2025',
    badge: 'CGPA 7.47 / 10',
    color: '#60A5FA', // cool tone
    tintBg: 'rgba(30, 48, 77, 0.45)',
    borderColor: 'rgba(96, 165, 250, 0.35)',
    bullets: [
      'Bachelor of Technology in Computer Science and Engineering, Parul Institute of Engineering and Technology, Vadodara',
      'Built foundations in Data Structures and Algorithms, OOP, SDLC, Operating Systems, and Computer Networks',
      'Developed hands-on predictive machine learning models, exploratory data analysis, and feature engineering workflows',
      'Graduated with CGPA 7.47/10.00',
    ],
    waveBars: [40, 65, 30, 80, 50, 70, 45, 60],
  },
  {
    title: 'M.Tech, CSE',
    subtitle: 'Amrita School of Computing, Bengaluru',
    date: 'Jul 2025 – Present',
    badge: 'CGPA 8.22 / 10',
    color: '#2C8585', // teal
    tintBg: 'rgba(23, 62, 62, 0.45)',
    borderColor: '#2C8585',
    bullets: [
      'Master of Technology in Computer Science and Engineering, Amrita Vishwa Vidyapeetham, Bengaluru',
      'Built OmniBug: a cascading dual-agent LLM bug detection pipeline spanning 9+ languages with FastMCP RAG and 10 bug categories',
      'Built PromptGuard: a real-time prompt injection detection framework combining fine-tuned DistilBERT with regex heuristics (0.93 macro F1)',
      'Current CGPA: 8.22/10.00',
    ],
    waveBars: [70, 95, 60, 100, 85, 90, 75, 95],
  },
  {
    title: 'AI Engineer Intern',
    subtitle: 'Aligned Automation',
    date: 'Jul 2026 – Oct 2026',
    badge: 'Internship',
    color: '#E6A335', // marigold
    tintBg: 'rgba(74, 52, 18, 0.55)',
    borderColor: '#E6A335',
    bullets: [
      'Contributed to the Bug Investigation Council, a multi-agent agentic AI pipeline that automates bug detection, root-cause investigation, and fix recommendation using coordinated LLM agents',
      'Developed a domain-specific Small Language Model (SLM) for efficient, low-latency inference, covering data preparation, fine-tuning, and model evaluation',
    ],
    waveBars: [55, 75, 40, 90, 60, 45, 80, 50],
  },
  {
    title: 'Next chapter',
    subtitle: 'Open to new opportunities',
    date: 'Immediate / 2026',
    badge: 'Available',
    color: '#D9503A', // coral
    tintBg: 'rgba(84, 30, 24, 0.45)',
    borderColor: 'rgba(217, 80, 58, 0.5)',
    bullets: [
      'Seeking an internship or entry-level role in data, analytics, or AI engineering',
      'Passionate about end-to-end ownership of projects, from data cleaning and model evaluation to deployable APIs',
    ],
    waveBars: [45, 70, 85, 60, 75, 90, 65, 80],
  },
]

export default function Journey() {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useJourneyScroll(sectionRef)
  const reducedMotion = useReducedMotion()

  const [activeIdx, setActiveIdx] = useState(2) // default to M.Tech (current)
  const [manualOverride, setManualOverride] = useState(false)

  // Derive active index from scroll progress unless user explicitly clicked
  useEffect(() => {
    if (!manualOverride) {
      const idx = Math.min(3, Math.max(0, Math.floor(progress * 4)))
      setActiveIdx(idx)
    }
  }, [progress, manualOverride])

  const handleClipClick = (idx: number) => {
    setManualOverride(true)
    setActiveIdx(idx)

    const el = sectionRef.current
    if (el) {
      const totalScrollable = el.offsetHeight - window.innerHeight
      if (totalScrollable > 0) {
        const targetScroll = el.offsetTop + (idx / 3.5) * totalScrollable
        window.scrollTo({
          top: targetScroll,
          behavior: reducedMotion ? 'auto' : 'smooth',
        })
      }
    }

    // Reset manual override after scroll finishes
    setTimeout(() => setManualOverride(false), 800)
  }

  const activeClip = clips[activeIdx]
  const progressPercent = Math.round(progress * 100)

  return (
    <section
      ref={sectionRef}
      id="journey"
      aria-label="Academic and professional journey"
      className="section"
      style={{
        position: 'relative',
        minHeight: '260vh', // scrollable track for the timeline scrub
        padding: '6rem 0',
      }}
    >
      {/* Sticky container that remains pinned while scrolling through Journey */}
      <div
        style={{
          position: 'sticky',
          top: '5rem',
          zIndex: 10,
        }}
      >
        <div className="container">
          {/* Eyebrow */}
          <p className="eyebrow">// THE JOURNEY</p>

          {/* Headline */}
          <h2 className="section-title">
            A path, <span className="gradient-text">logged like commits</span>.
          </h2>

          {/* Subheading */}
          <p className="section-sub">
            The playhead follows your scroll — click an entry to open it.
          </p>

          {/* Terminal Widget */}
          <div className="terminal-widget">
            {/* Chrome Header */}
            <div className="chrome-bar">
              <div style={{ display: 'flex', gap: '7px' }}>
                <span className="chrome-dot" style={{ background: '#FF5F56' }} />
                <span className="chrome-dot" style={{ background: '#FFBD2E' }} />
                <span className="chrome-dot" style={{ background: '#27C93F' }} />
              </div>

              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: 'rgba(237, 237, 230, 0.85)',
                  marginLeft: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                satya_timeline.log
              </div>

              {/* Live scroll readout */}
              <div
                style={{
                  marginLeft: 'auto',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--c-marigold)',
                  background: 'rgba(230, 163, 53, 0.12)',
                  padding: '0.25rem 0.7rem',
                  borderRadius: '4px',
                  border: '1px solid rgba(230, 163, 53, 0.3)',
                }}
              >
                POSITION: {progressPercent}%
              </div>
            </div>

            {/* Main Content Area: Active Clip Details */}
            <div
              style={{
                padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
                background: 'rgba(15, 18, 25, 0.95)',
                minHeight: '220px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 'clamp(1.5rem, 2.5vw, 2.15rem)',
                      fontWeight: 600,
                      color: 'var(--c-offwhite)',
                      margin: '0 0 0.4rem',
                    }}
                  >
                    {activeClip.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '1.125rem',
                      color: 'rgba(237, 237, 230, 0.88)',
                      margin: 0,
                    }}
                  >
                    {activeClip.subtitle}
                  </p>
                </div>

                <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'flex-end' }}>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.9375rem',
                      color: 'rgba(237, 237, 230, 0.75)',
                    }}
                  >
                    {activeClip.date}
                  </span>
                  {activeClip.badge && (
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: activeClip.color,
                        background: 'rgba(255, 255, 255, 0.08)',
                        padding: '0.25rem 0.65rem',
                        borderRadius: '4px',
                        border: `1px solid ${activeClip.borderColor}`,
                        width: 'fit-content',
                      }}
                    >
                      {activeClip.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Bullet points */}
              <ul
                style={{
                  margin: '1.5rem 0 0',
                  paddingLeft: '1.35rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {activeClip.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '1.0625rem',
                      lineHeight: 1.68,
                      color: 'rgba(237, 237, 230, 0.95)',
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            {/* Scrubber & Timeline Clips Bar */}
            <div
              style={{
                position: 'relative',
                background: '#0B0D13',
                borderTop: '1px solid rgba(237, 237, 230, 0.08)',
                padding: '1.35rem 1.25rem 1.125rem',
              }}
            >
              {/* Scrubber Track & Playhead */}
              <div
                style={{
                  position: 'relative',
                  height: '4px',
                  background: 'rgba(237, 237, 230, 0.12)',
                  borderRadius: '2px',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: `${progressPercent}%`,
                    background: 'linear-gradient(90deg, #E6A335, #D9503A)',
                    borderRadius: '2px',
                    transition: reducedMotion ? 'none' : 'width 0.15s ease-out',
                  }}
                />
                {/* Playhead thumb marker */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${progressPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#E6A335',
                    boxShadow: '0 0 8px #E6A335',
                    transition: reducedMotion ? 'none' : 'left 0.15s ease-out',
                  }}
                />
              </div>

              {/* 4 Clickable Clip Blocks */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.75rem',
                }}
              >
                {clips.map((clip, idx) => {
                  const isActive = activeIdx === idx
                  return (
                    <button
                      key={clip.title}
                      type="button"
                      onClick={() => handleClipClick(idx)}
                      style={{
                        background: clip.tintBg,
                        border: `1px solid ${isActive ? clip.borderColor : 'rgba(237, 237, 230, 0.08)'}`,
                        borderRadius: '0.5rem',
                        padding: '0.75rem 0.875rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isActive ? `0 0 16px ${clip.borderColor}40` : 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '80px',
                        outline: 'none',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            fontFamily: "'IBM Plex Sans', sans-serif",
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            color: isActive ? clip.color : 'rgba(237, 237, 230, 0.85)',
                            margin: '0 0 0.2rem',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {clip.title}
                        </p>
                        <p
                          style={{
                            fontFamily: "'IBM Plex Mono', monospace",
                            fontSize: '0.78125rem',
                            color: 'rgba(237, 237, 230, 0.65)',
                            margin: 0,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {clip.date.split('–')[0].trim()}
                        </p>
                      </div>

                      {/* Small Waveform bars decoration */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: '2px',
                          height: '14px',
                          marginTop: '0.4rem',
                        }}
                        aria-hidden="true"
                      >
                        {clip.waveBars.map((h, bi) => (
                          <span
                            key={bi}
                            style={{
                              flex: 1,
                              height: `${h}%`,
                              background: isActive ? clip.color : 'rgba(237, 237, 230, 0.2)',
                              borderRadius: '1px',
                              opacity: isActive ? 0.9 : 0.35,
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
