export default function Experience() {
  const experiences = [
    {
      role: 'AI Engineer Intern',
      company: 'Aligned Automation',
      period: 'Jul 2026 – Oct 2026',
      location: 'Bengaluru, Karnataka, India',
      accent: '#E6A335',
      bullets: [
        'Contributed to the Bug Investigation Council, a multi-agent agentic AI pipeline that automates bug detection, root-cause investigation, and fix recommendation using coordinated LLM agents.',
        'Developed a domain-specific Small Language Model (SLM) for efficient, low-latency inference, covering data preparation, fine-tuning, and model evaluation.',
      ],
      tags: ['Multi-Agent LLMs', 'SLM Fine-Tuning', 'Low-Latency Inference', 'Model Evaluation'],
    },
  ]

  const education = [
    {
      degree: 'M.Tech, Computer Science and Engineering',
      institution: 'Amrita School of Computing, Amrita Vishwa Vidyapeetham, Bengaluru',
      period: 'Jul 2025 – Present',
      score: 'CGPA 8.22/10',
      accent: '#2C8585',
    },
    {
      degree: 'B.Tech, Computer Science and Engineering',
      institution: 'Parul Institute of Engineering and Technology, Vadodara',
      period: 'Dec 2021 – May 2025',
      score: 'CGPA 7.47/10',
      accent: '#D9503A',
    },
  ]

  return (
    <section id="experience" aria-label="Work experience and education" className="section">
      <div className="container">
        {/* Eyebrow & Title */}
        <p className="eyebrow">// EXPERIENCE & EDUCATION</p>
        <h2 className="section-title">
          Where I&apos;ve <span className="gradient-text">built & deployed</span>.
        </h2>
        <p className="section-sub">
          Industrial experience in agentic AI pipelines and formal computer science training.
        </p>

        {/* Experience Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2.5rem' }}>
          {experiences.map((exp) => (
            <div
              key={exp.company}
              style={{
                background: '#fff',
                borderRadius: '1.125rem',
                border: '1px solid rgba(20, 22, 26, 0.08)',
                borderLeft: `5px solid ${exp.accent}`,
                padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                boxShadow: '0 2px 18px rgba(0, 0, 0, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontSize: 'clamp(1.35rem, 2.2vw, 1.85rem)',
                      fontWeight: 600,
                      color: 'var(--ink-primary)',
                      margin: '0 0 0.35rem',
                    }}
                  >
                    {exp.role} · <span style={{ color: exp.accent }}>{exp.company}</span>
                  </h3>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.875rem',
                      color: 'var(--ink-secondary)',
                      margin: 0,
                    }}
                  >
                    {exp.location}
                  </p>
                </div>

                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: exp.accent,
                    background: 'rgba(230, 163, 53, 0.09)',
                    border: '1px solid rgba(230, 163, 53, 0.25)',
                    borderRadius: '4px',
                    padding: '0.3rem 0.75rem',
                  }}
                >
                  {exp.period}
                </span>
              </div>

              <ul
                style={{
                  margin: '1.25rem 0',
                  paddingLeft: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                {exp.bullets.map((bullet, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '1.0625rem',
                      lineHeight: 1.7,
                      color: 'var(--ink-secondary)',
                    }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.8125rem',
                      fontWeight: 500,
                      color: 'var(--ink-secondary)',
                      background: 'rgba(20, 22, 26, 0.04)',
                      border: '1px solid rgba(20, 22, 26, 0.1)',
                      borderRadius: '4px',
                      padding: '0.25rem 0.65rem',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education Row */}
        <div style={{ marginTop: '3.5rem' }}>
          <p
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '0.8125rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--ink-meta)',
              marginBottom: '1.25rem',
            }}
          >
            // EDUCATION
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: '1.5rem',
            }}
          >
            {education.map((edu) => (
              <div
                key={edu.degree}
                style={{
                  background: '#fff',
                  borderRadius: '1rem',
                  border: '1px solid rgba(20, 22, 26, 0.08)',
                  borderTop: `4px solid ${edu.accent}`,
                  padding: '1.75rem',
                  boxShadow: '0 2px 14px rgba(0, 0, 0, 0.035)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--ink-primary)',
                        margin: 0,
                      }}
                    >
                      {edu.degree}
                    </h4>
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: edu.accent,
                        background: 'rgba(20, 22, 26, 0.04)',
                        border: '1px solid rgba(20, 22, 26, 0.1)',
                        borderRadius: '4px',
                        padding: '0.2rem 0.55rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {edu.score}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "'IBM Plex Sans', sans-serif",
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: 'var(--ink-secondary)',
                      margin: 0,
                    }}
                  >
                    {edu.institution}
                  </p>
                </div>

                <p
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8125rem',
                    color: 'var(--ink-meta)',
                    margin: 0,
                  }}
                >
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
