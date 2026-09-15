interface SkillCategory {
  category: string
  items: string[]
}

const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'JavaScript (basic)'],
  },
  {
    category: 'ML / AI',
    items: [
      'Deep Learning',
      'NLP',
      'Supervised Learning',
      'Model Evaluation',
      'Hyperparameter Tuning',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
    ],
  },
  {
    category: 'Agentic AI / LLM Systems',
    items: [
      'Multi-Agent Architectures',
      'Retrieval-Augmented Generation',
      'Model Context Protocol',
      'LlamaIndex',
      'HuggingFace Transformers',
      'Prompt Engineering',
      'Gemini API',
      'Groq API',
    ],
  },
  {
    category: 'Data & Databases',
    items: ['MongoDB', 'SQL', 'Data Cleaning', 'EDA', 'Feature Engineering'],
  },
  {
    category: 'Tools & Deployment',
    items: ['Docker', 'Git', 'FastAPI', 'Linux', 'VS Code', 'JupyterLab'],
  },
]

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills and competencies" className="section">
      <div className="container">
        <p className="eyebrow">// TECHNICAL ARSENAL</p>
        <h2 className="section-title">
          Tools, frameworks, and <span className="gradient-text">systems knowledge</span>.
        </h2>
        <p className="section-sub">
          Grouped by functional domain, practical experience, and architecture patterns.
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem',
            marginTop: '2.5rem',
            width: '100%',
          }}
        >
          {skillsData.map((group) => (
            <div
              key={group.category}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(180px, 220px) 1fr',
                gap: '1.25rem',
                alignItems: 'baseline',
                paddingBottom: '1.25rem',
                borderBottom: '1px solid rgba(20, 22, 26, 0.07)',
              }}
            >
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--ink-primary)',
                  textTransform: 'uppercase',
                }}
              >
                {group.category}
              </span>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                {group.items.map((item) => (
                  <span key={item} className="skill-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #skills .container > div > div {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </section>
  )
}
