interface SkillCategory {
  category: string
  items: string[]
}

const skillsData: SkillCategory[] = [
  {
    category: 'Programming',
    items: ['Python', 'SQL', 'JavaScript (Basic)'],
  },
  {
    category: 'CS Fundamentals',
    items: [
      'Data Structures and Algorithms',
      'OOP',
      'SDLC',
      'Agile',
      'Unit Testing and Debugging',
      'Operating Systems and Computer Networks (Basic)',
    ],
  },
  {
    category: 'ML and AI',
    items: [
      'Machine Learning',
      'Deep Learning',
      'NLP',
      'Supervised Learning',
      'Model Evaluation',
      'Hyperparameter Tuning',
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
    ],
  },
  {
    category: 'Generative AI and LLMs',
    items: [
      'LLMs',
      'Multi-Agent Systems',
      'RAG',
      'Model Context Protocol (MCP)',
      'LlamaIndex',
      'Hugging Face Transformers',
      'Prompt Engineering',
      'Google Gemini API',
      'Groq API',
    ],
  },
  {
    category: 'Data and Analytics',
    items: [
      'Data Cleaning',
      'EDA',
      'Feature Engineering',
      'Data Preprocessing',
      'Pandas',
      'NumPy',
    ],
  },
  {
    category: 'Databases and DevOps',
    items: [
      'SQL',
      'MongoDB',
      'Docker',
      'Git',
      'GitHub Actions (CI/CD)',
      'REST API and Server-Side Design (FastMCP)',
    ],
  },
  {
    category: 'Tools',
    items: ['Jupyter Notebook', 'VS Code', 'Linux', 'Microsoft Office'],
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
                gridTemplateColumns: 'minmax(200px, 260px) 1fr',
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
