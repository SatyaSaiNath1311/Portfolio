import { useState } from 'react'
import photo from '../assets/photo.jpg'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '10eeebaa-38b6-4b4a-8e4f-9c65560e66e7',
          name,
          email,
          message,
          subject: `Portfolio Message from ${name}`,
          from_name: `${name} (via Portfolio)`,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Failed to send message. Please check your connection or email directly.')
    }
  }

  return (
    <section id="contact" aria-label="Contact and connect" className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <p className="eyebrow">// OPEN A THREAD</p>
        <h2 className="section-title">
          Let's <span className="gradient-text">build</span> the next thing.
        </h2>

        {/* Chat / Composer Card */}
        <div className="contact-card" style={{ marginTop: '2.5rem' }}>
          {/* Avatar + Status Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid rgba(20, 22, 26, 0.08)',
              marginBottom: '1.5rem',
            }}
          >
            <img
              src={photo}
              alt="Satya avatar"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #E6A335',
              }}
            />
            <div>
              <p
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--ink-primary)',
                  margin: 0,
                }}
              >
                Teeparthi Satya Sai Nath
              </p>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.875rem',
                  color: 'var(--ink-secondary)',
                  margin: '0.15rem 0 0',
                }}
              >
                M.Tech CSE · Amrita School of Computing
              </p>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--c-teal)',
                  margin: '0.25rem 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#2C8585',
                    display: 'inline-block',
                  }}
                />
                Open to ML / Agentic AI roles
              </p>
            </div>
          </div>

          {/* Friendly Greeting */}
          <p
            style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'var(--ink-secondary)',
              margin: '0 0 1.75rem',
            }}
          >
            👋 Hey! Whether you&apos;re hiring for ML or agentic AI roles, want to collaborate on a
            project, or just want to talk about multi-agent systems, my inbox is open.
          </p>

          {/* Composer Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-secondary)',
                    marginBottom: '0.45rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Ada Lovelace"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="contact-input"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    color: 'var(--ink-secondary)',
                    marginBottom: '0.45rem',
                    textTransform: 'uppercase',
                  }}
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="ada@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="contact-input"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: 'block',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--ink-secondary)',
                  marginBottom: '0.45rem',
                  textTransform: 'uppercase',
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                placeholder="What are you working on?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="contact-input"
              />
            </div>

            {status === 'success' && (
              <div
                style={{
                  padding: '0.875rem 1.125rem',
                  background: 'rgba(34, 197, 94, 0.08)',
                  border: '1px solid rgba(34, 197, 94, 0.28)',
                  borderRadius: '0.625rem',
                  color: '#15803d',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Message sent successfully! Thanks for reaching out, I'll reply to your email soon.</span>
              </div>
            )}

            {status === 'error' && (
              <div
                style={{
                  padding: '0.875rem 1.125rem',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.28)',
                  borderRadius: '0.625rem',
                  color: '#b91c1c',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{errorMessage || 'Failed to send. Please try again or email me at satyasainathteeparthi@gmail.com'}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-send"
              style={{
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'wait' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {status === 'loading' ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                  </svg>
                  Sending message...
                </>
              ) : status === 'success' ? (
                'Message sent ✓'
              ) : (
                'Send message'
              )}
            </button>
          </form>
        </div>

        {/* Direct Links Below Card */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.875rem',
            marginTop: '2rem',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="mailto:satyasainathteeparthi@gmail.com"
            className="contact-pill"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            satyasainathteeparthi@gmail.com
          </a>

          <a
            href="https://linkedin.com/in/satyasainathteeparthi"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>

          <a
            href="https://github.com/SatyaSaiNath1311"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            GitHub
          </a>

          <a
            href="./resume.pdf"
            download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-pill"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Resume.pdf
          </a>
        </div>
      </div>
    </section>
  )
}
