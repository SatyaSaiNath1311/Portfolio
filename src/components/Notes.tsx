import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface NoteData {
  text: string
  tag: string
  bg: string
  border: string
  textColor: string
  tagBg: string
  tagColor: string
  rotate: number
}

const notes: NoteData[] = [
  {
    text: '0.93 macro F1 on ~43K adversarial prompts, across six public datasets.',
    tag: 'PromptGuard',
    bg: '#FEF9C3', // warm yellow
    border: '#FACC15',
    textColor: '#713F12',
    tagBg: 'rgba(113, 63, 18, 0.1)',
    tagColor: '#713F12',
    rotate: -2.5,
  },
  {
    text: 'One pipeline, two agents, 9+ languages, 10 structured bug categories.',
    tag: 'OmniBug',
    bg: '#FCE7F3', // soft pink
    border: '#F472B6',
    textColor: '#831843',
    tagBg: 'rgba(131, 24, 67, 0.1)',
    tagColor: '#831843',
    rotate: 1.8,
  },
  {
    text: 'NPTEL Certified in Software Engineering.',
    tag: 'Certification',
    bg: '#E0F2FE', // soft blue
    border: '#38BDF8',
    textColor: '#0C4A6E',
    tagBg: 'rgba(12, 74, 110, 0.1)',
    tagColor: '#0C4A6E',
    rotate: -1.4,
  },
  {
    text: 'Benchmarking 4 CNN architectures for skin lesion severity, targeting IEEE Access.',
    tag: 'SeverityNet',
    bg: '#DCFCE7', // soft mint green
    border: '#4ADE80',
    textColor: '#14532D',
    tagBg: 'rgba(20, 83, 45, 0.1)',
    tagColor: '#14532D',
    rotate: 2.8,
  },
]

export default function Notes() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  return (
    <section id="notes" aria-label="Quick notes and trivia" className="section">
      <div className="container">
        <p className="eyebrow">// QUICK NOTES</p>
        <h2 className="section-title">
          Worth knowing <span className="gradient-text">at a glance</span>.
        </h2>
        <p className="section-sub">
          A few facts about the work. Drag them around.
        </p>

        {/* Drag boundary arena */}
        <div
          ref={containerRef}
          style={{
            position: 'relative',
            marginTop: '2.5rem',
            padding: '2.5rem 1.5rem',
            borderRadius: '1.25rem',
            border: '1px dashed rgba(20, 22, 26, 0.15)',
            background: 'rgba(246, 246, 242, 0.5)',
            minHeight: '340px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
            overflow: 'visible',
          }}
        >
          {notes.map((note, idx) => (
            <motion.div
              key={idx}
              drag={!reducedMotion}
              dragConstraints={containerRef}
              dragElastic={0.08}
              whileDrag={{
                scale: 1.05,
                zIndex: 40,
                boxShadow: '0 16px 36px rgba(0, 0, 0, 0.16)',
                cursor: 'grabbing',
              }}
              whileHover={{
                scale: 1.02,
                zIndex: 20,
              }}
              className="sticky-note"
              style={{
                background: note.bg,
                border: `1px solid ${note.border}`,
                rotate: `${note.rotate}deg`,
                minHeight: '170px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              tabIndex={0}
              aria-label={`Note: ${note.text}`}
            >
              {/* Frosted tape strip detail at top */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '54px',
                  height: '18px',
                  background: 'rgba(255, 255, 255, 0.72)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  borderRadius: '2px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  backdropFilter: 'blur(2px)',
                }}
              />

              {/* Note body text */}
              <p
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: '1.0625rem',
                  fontWeight: 500,
                  lineHeight: 1.6,
                  color: note.textColor,
                  margin: '0.5rem 0 1rem',
                }}
              >
                &ldquo;{note.text}&rdquo;
              </p>

              {/* Tag pill */}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: note.tagColor,
                  background: note.tagBg,
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  width: 'fit-content',
                }}
              >
                {note.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
