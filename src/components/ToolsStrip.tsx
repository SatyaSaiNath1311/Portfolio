export default function ToolsStrip() {
  const tools = [
    'Python',
    'PyTorch',
    'TensorFlow',
    'Hugging Face',
    'Docker',
    'MongoDB',
    'Git',
    'FastMCP',
  ]

  return (
    <section
      aria-label="Technologies and frameworks"
      style={{
        borderTop: '1px solid rgba(20, 22, 26, 0.08)',
        borderBottom: '1px solid rgba(20, 22, 26, 0.08)',
        padding: '1.75rem 0',
        background: 'rgba(246, 246, 242, 0.65)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <span
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '0.8125rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-secondary)',
          }}
        >
          WORKING WITH
        </span>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3.5vw, 3rem)',
            flexWrap: 'wrap',
          }}
        >
          {tools.map((tool) => (
            <span
              key={tool}
              style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: '1.0625rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                letterSpacing: '-0.01em',
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
