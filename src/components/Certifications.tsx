export default function Certifications() {
  const certifications = [
    {
      title: 'NPTEL Certified in Software Engineering',
      issuer: 'National Programme on Technology Enhanced Learning (NPTEL)',
      badge: 'Verified Credential',
      accent: '#E6A335',
      description:
        'Demonstrated foundational and advanced knowledge in Software Engineering principles, lifecycle models, agile methodologies, requirements engineering, design patterns, testing, and maintenance.',
    },
  ]

  return (
    <section id="certifications" aria-label="Professional Certifications" className="section">
      <div className="container">
        <p className="eyebrow">// CREDENTIALS & CERTIFICATIONS</p>
        <h2 className="section-title">
          Recognized <span className="gradient-text">competence</span>.
        </h2>
        <p className="section-sub">
          Standardized coursework and verified technical credentials.
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {certifications.map((cert) => (
            <div
              key={cert.title}
              style={{
                background: '#fff',
                borderRadius: '1.125rem',
                border: '1px solid rgba(20, 22, 26, 0.08)',
                borderLeft: `5px solid ${cert.accent}`,
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                boxShadow: '0 2px 18px rgba(0, 0, 0, 0.035)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(230, 163, 53, 0.12)',
                      border: '1px solid rgba(230, 163, 53, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: cert.accent,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
                        fontWeight: 600,
                        color: 'var(--ink-primary)',
                        margin: 0,
                      }}
                    >
                      {cert.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'IBM Plex Sans', sans-serif",
                        fontSize: '0.875rem',
                        color: 'var(--ink-secondary)',
                        margin: '0.15rem 0 0',
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: cert.accent,
                    background: 'rgba(230, 163, 53, 0.08)',
                    border: '1px solid rgba(230, 163, 53, 0.22)',
                    borderRadius: '4px',
                    padding: '0.25rem 0.65rem',
                  }}
                >
                  {cert.badge}
                </span>
              </div>

              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1rem',
                  lineHeight: 1.68,
                  color: 'var(--ink-secondary)',
                  margin: '0.25rem 0 0',
                }}
              >
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
