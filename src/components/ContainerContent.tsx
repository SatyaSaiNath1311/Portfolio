import type { RefObject } from 'react'

interface ContentProps {
  containerId: number
  color: string
  visible: boolean
  headingRef?: RefObject<HTMLHeadingElement | null>
  baseUrl: string
}

export default function ContainerContent({
  containerId,
  color,
  visible,
  headingRef,
  baseUrl,
}: ContentProps) {
  const kickers = [
    '01 / HELLO',
    '02 / SELECTED WORK',
    '03 / ABOUT ME',
    '04 / EXPERIENCE',
    '05 / TOOLKIT',
    '06 / WHAT I DO',
    '07 / SAY HELLO',
  ]

  return (
    <div
      className={`inner-content ${visible ? 'visible' : ''}`}
    >
      <div className="content-kicker font-cabinet" style={{ color }}>
        {kickers[containerId - 1]}
      </div>
      {renderContent(containerId, color, headingRef, baseUrl)}
    </div>
  )
}

function renderContent(
  id: number,
  color: string,
  headingRef: RefObject<HTMLHeadingElement | null> | undefined,
  baseUrl: string,
) {
  switch (id) {
    case 1:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            Hi, I'm <span className="font-accent accent-word" style={{ color }}>Satya.</span>
          </h2>
          <p className="content-text font-cabinet">
            M.Tech Computer Science student building machine learning, deep learning
            and multi-agent LLM systems with RAG. Every container in the pile holds
            a piece of my work.
          </p>
        </div>
      )

    case 2:
      return (
        <div className="content-body scroll-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            The <span className="font-accent accent-word" style={{ color }}>work.</span>
          </h2>
          <ul className="content-list font-cabinet">
            <li>
              <strong>OmniBug</strong>
              <span className="sub">Agentic bug detection across 9+ languages</span>
            </li>
            <li>
              <strong>PromptGuard</strong>
              <span className="sub">DistilBERT + regex prompt injection detector, 0.93 macro F1</span>
            </li>
            <li>
              <strong>Multi-Agentic RAG System</strong>
              <span className="sub">Multi-agent retrieval-augmented generation for intelligent document processing and question answering</span>
            </li>
            <li>
              <strong>SeverityNet</strong>
              <span className="sub">CNN benchmarking framework for skin lesion severity grading across 4 architectures</span>
            </li>
            <li>
              <strong>Smart Agriculture IoT</strong>
              <span className="sub">IoT-based agriculture monitoring with real-time sensor data analysis and automated irrigation</span>
            </li>
            <li>
              <strong>GAN Face Generation</strong>
              <span className="sub">Generative Adversarial Network for realistic face image generation</span>
            </li>
            <li>
              <strong>Interactive 3D Portfolio</strong>
              <span className="sub">Interactive portfolio website built with React and dynamic animations</span>
            </li>
          </ul>
        </div>
      )

    case 3:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            A little <span className="font-accent accent-word" style={{ color }}>about</span> me.
          </h2>
          <ul className="content-list font-cabinet">
            <li>
              <strong>M.Tech, Computer Science and Engineering</strong>
              <span className="sub">Amrita School of Computing, Amrita Vishwa Vidyapeetham, Bengaluru · Jul 2025 – Present · CGPA 8.22/10</span>
            </li>
            <li>
              <strong>B.Tech, Computer Science and Engineering</strong>
              <span className="sub">Parul Institute of Engineering and Technology, Vadodara · 2021 – 2025 · CGPA 7.47/10</span>
            </li>
            <li>
              <strong>NPTEL Certified in Software Engineering</strong>
            </li>
          </ul>
        </div>
      )

    case 4:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            Where I've <span className="font-accent accent-word" style={{ color }}>worked.</span>
          </h2>
          <ul className="content-list font-cabinet">
            <li>
              <strong>Associate Consultant · Aligned Automation</strong>
              <span className="sub">Oct 2026 – Present</span>
            </li>
            <li>
              <strong>AI Engineer Intern · Aligned Automation</strong>
              <span className="sub">Jul 2026 – Oct 2026 · Contributed to a multi-agent agentic AI pipeline for bug detection, root-cause investigation and fix recommendation, and developed a domain-specific Small Language Model for low-latency inference.</span>
            </li>
          </ul>
        </div>
      )

    case 5:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            What's in the <span className="font-accent accent-word" style={{ color }}>box.</span>
          </h2>
          <div className="pill-grid">
            {[
              'Python',
              'SQL',
              'PyTorch',
              'TensorFlow',
              'Scikit-learn',
              'Hugging Face',
              'LlamaIndex',
              'FastMCP',
              'Docker',
              'MongoDB',
              'Git',
              'GitHub Actions',
            ].map(skill => (
              <span key={skill} className="pill-chip font-cabinet">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )

    case 6:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            What I <span className="font-accent accent-word" style={{ color }}>do.</span>
          </h2>
          <div className="pill-grid">
            {[
              'Machine learning',
              'Deep learning',
              'Multi-agent LLM systems',
              'RAG',
              'NLP security',
              'Model evaluation',
            ].map(item => (
              <span key={item} className="pill-chip font-cabinet">
                {item}
              </span>
            ))}
          </div>
        </div>
      )

    case 7:
      return (
        <div className="content-body">
          <h2
            className="content-heading font-clash"
            ref={headingRef}
            tabIndex={-1}
          >
            Got an <span className="font-accent accent-word" style={{ color }}>idea?</span>
          </h2>
          <p className="content-text font-cabinet">
            Have a project in mind, a question, or just want to say hi?
          </p>
          <div style={{ marginTop: '0.6em', marginBottom: '0.4em' }}>
            <a
              className="contact-btn font-cabinet"
              href="mailto:satyasainathteeparthi@gmail.com"
              style={{ backgroundColor: color }}
            >
              satyasainathteeparthi@gmail.com ↗
            </a>
          </div>
          <div className="contact-links">
            <a
              className="contact-link font-cabinet"
              href="https://linkedin.com/in/satyasainathteeparthi"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
            <a
              className="contact-link font-cabinet"
              href="https://github.com/SatyaSaiNath1311"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </a>
            <a
              className="contact-link font-cabinet"
              href={`${baseUrl}Teeparthi_Satya_Sai_Nath_Resume.pdf`}
              download="Teeparthi_Satya_Sai_Nath_Resume.pdf"
            >
              Download Resume ↓
            </a>
          </div>
        </div>
      )

    default:
      return null
  }
}
