export default function Impact() {
  const stats = [
    {
      number: '0.93',
      desc: 'Macro F1 score, prompt injection detection',
      tag: 'PromptGuard · ~43K prompts',
      borderColor: '#D9503A', // coral
    },
    {
      number: '9+',
      desc: 'Languages covered by one detection pipeline',
      tag: 'OmniBug · Detector + Describer',
      borderColor: '#E6A335', // marigold
    },
    {
      number: '10',
      desc: 'Structured bug categories, auto-classified',
      tag: 'OmniBug',
      borderColor: '#2C8585', // teal
    },
    {
      number: '4',
      desc: 'CNN architectures benchmarked',
      tag: 'SeverityNet · DermaMNIST',
      borderColor: '#7A8394', // neutral tone
    },
  ]

  return (
    <section id="impact" aria-label="Impact and metrics" className="section">
      <div className="container">
        {/* Eyebrow */}
        <p className="eyebrow">// THE IMPACT</p>

        {/* Headline */}
        <h2 className="section-title">
          <span className="gradient-text">Numbers</span> over adjectives.
        </h2>

        {/* Subheading */}
        <p className="section-sub">
          No &ldquo;passionate&rdquo; or &ldquo;rockstar&rdquo; — just what the work actually measures.
        </p>

        {/* 4 Stat Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '2.5rem',
          }}
        >
          {stats.map((item) => (
            <div
              key={item.number + item.tag}
              className="stat-card"
              style={{
                borderTop: `4px solid ${item.borderColor}`,
              }}
            >
              <p className="stat-number">{item.number}</p>
              <p className="stat-desc">{item.desc}</p>
              <span className="stat-tag">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
