import { motion } from 'framer-motion'
import approachDiagram from '../assets/approach_diagram.png'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function Approach() {
  const reducedMotion = useReducedMotion()

  return (
    <section id="approach" aria-label="Core engineering approach" className="section">
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
          }}
        >
          {/* Left: Text zone */}
          <div>
            <p className="eyebrow">// THE APPROACH</p>
            <h2 className="section-title">
              Don't just flag it — <span className="gradient-text">explain it</span>.
            </h2>

            <div style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: 'var(--ink-secondary)',
                  margin: 0,
                }}
              >
                I'm <strong>Teeparthi Satya Sai Nath</strong>, an M.Tech student in Computer Science and
                Engineering at Amrita School of Computing, focused on applied deep learning, agentic AI,
                and NLP security. Most of what I build follows the same core premise: <strong>don't just flag a problem, explain it.</strong>
              </p>

              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1.125rem',
                  lineHeight: 1.8,
                  color: 'var(--ink-secondary)',
                  margin: 0,
                }}
              >
                That principle drives every system: a two-agent bug detector that localizes and explains code failures across 9+ languages, a prompt-injection shield benchmarked across 43,000 samples, and a medical vision model providing interpretable Grad-CAM heatmaps so clinicians can inspect the reasoning.
              </p>

              {/* Three Pillars Pills */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.625rem',
                  marginTop: '0.75rem',
                }}
              >
                {[
                  'Multi-Agent Decomposition',
                  'Explainability & Attribution',
                  'Empirical Benchmarks',
                ].map((pillar) => (
                  <span
                    key={pillar}
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: '0.8125rem',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                      color: 'var(--c-teal)',
                      background: 'rgba(44, 133, 133, 0.08)',
                      border: '1px solid rgba(44, 133, 133, 0.22)',
                      borderRadius: '9999px',
                      padding: '0.35rem 0.85rem',
                    }}
                  >
                    {pillar}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Architecture Diagram */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.96 }}
            whileInView={reducedMotion ? {} : { opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Ambient soft glow behind the diagram */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: '75%',
                height: '75%',
                background: 'radial-gradient(circle, rgba(230, 163, 53, 0.12) 0%, rgba(217, 80, 58, 0.06) 40%, transparent 70%)',
                filter: 'blur(32px)',
                zIndex: 0,
                pointerEvents: 'none',
              }}
            />

            <img
              src={approachDiagram}
              alt="Neural network architecture and explainable AI pipeline diagram"
              style={{
                width: '100%',
                maxWidth: '560px',
                height: 'auto',
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
                filter: 'drop-shadow(0 8px 24px rgba(20, 22, 26, 0.08))',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
