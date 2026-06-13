import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const FRAMEWORKS = [
  {
    id: 'pida',
    code: 'PIDA',
    name: 'Primordial Indeterminate Developmental AI',
    color: '#e8ff47',
    status: 'Patent Pending',
    statusType: 'patent',
    question: 'How does AI personality form through environmental exposure rather than direct instruction — and what does long-term interaction with a fully compliant entity do to the human?',
    contribution: 'Flagship framework. Proposes that stable AI identity must be established before capability acquisition, not after. Holds a mirror to human behavior in AI interaction.',
    links: [
      { label: 'USPTO · No. 64/045,009', href: null },
    ],
  },
  {
    id: 'rsta',
    code: 'RSTA',
    name: 'Recursive State Transition Architecture',
    color: '#4ecdc4',
    status: 'Published · DOI',
    statusType: 'published',
    question: 'How do semantic states transition in LLMs — and can that process be modeled formally enough to enable reproducible research?',
    contribution: 'Theoretical framework on semantic state transitions. Accepted and published on Zenodo with a valid DOI, equivalent in citability to preprint servers.',
    links: [
      { label: 'Zenodo · Published with DOI', href: 'https://zenodo.org' },
    ],
  },
  {
    id: 'osd',
    code: 'OSD',
    name: 'Observable Semantic Dynamics',
    color: '#a78bfa',
    status: 'In Development',
    statusType: 'draft',
    question: 'Can semantic state evolution in LLMs be made visible — not just predicted, but observed in real time?',
    contribution: 'Framework for making high-level semantic emergence visible. Visibility is the core contribution; prediction is a potential bonus. Distinct from drift detection, intent tracking, and mechanistic interpretability.',
    links: [
      { label: 'GitHub · osd-behavioral-probe', href: 'https://github.com/richchang0721-boop/osd-behavioral-probe' },
      { label: 'Live Tool · osd-behavioral-probe.vercel.app', href: 'https://osd-behavioral-probe.vercel.app' },
    ],
  },
  {
    id: 'cip',
    code: 'CIP',
    name: 'Cognitive Integrity Protocol',
    color: '#f97316',
    status: 'Published · SSRN',
    statusType: 'published',
    question: 'How should AI systems maintain cognitive integrity under adversarial or manipulative interaction — and what structural protocol enforces it?',
    contribution: 'Published on SSRN. Cited by an Argentine professor. Defines the structural conditions under which AI cognitive integrity can be verified and maintained.',
    links: [
      { label: 'SSRN · Published', href: 'https://ssrn.com' },
    ],
  },
  {
    id: 'fcfa',
    code: 'FCFA',
    name: 'Foundational Cognitive Formation Architecture',
    color: '#ff4757',
    status: 'Draft 0.2',
    statusType: 'draft',
    question: 'When AI causes harm but no structural actor bears accountability, who is responsible — and how do we design governance structures that prevent this collapse?',
    contribution: 'Incorporates the "Responsibility Collapse" concept: the governance vacuum where AI causes harm but no structural actor bears accountability. Paper at Draft 0.2.',
    links: [],
  },
  {
    id: 'stme',
    code: 'STME',
    name: 'Structured Multi-State Transition & Evaluation',
    color: '#34d399',
    status: 'Published · SSRN',
    statusType: 'published',
    question: 'How can decision problems be decomposed into structured states and transitions — without the system making the decision for the user?',
    contribution: 'Decision framework that maps states, identifies structural pressure, and ranks transitions. Five demo versions available. USPTO provisional patent pending.',
    links: [
      { label: 'SSRN · abstract_id=6548019', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6548019' },
      { label: 'GitHub · STME', href: 'https://github.com/richchang0721-boop/STME' },
      { label: 'Live Demo', href: '/demo' },
    ],
  },
]

const STATUS_COLORS = {
  patent:    { color: '#e8ff47', bg: 'rgba(232,255,71,0.08)', border: 'rgba(232,255,71,0.25)' },
  published: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)',  border: 'rgba(78,205,196,0.25)' },
  submitted: { color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.25)' },
  draft:     { color: '#7a7a95', bg: 'rgba(122,122,149,0.08)', border: 'rgba(122,122,149,0.25)' },
}

const RELATIONS = [
  { from: 'PIDA', to: 'FCFA', label: 'Identity → Governance' },
  { from: 'RSTA', to: 'OSD',  label: 'State model → Observation layer' },
  { from: 'OSD',  to: 'RSTA', label: 'Empirical evidence → Theory validation' },
  { from: 'CIP',  to: 'PIDA', label: 'Integrity protocol → Identity design' },
  { from: 'STME', to: 'RSTA', label: 'Decision states → Semantic states' },
]

export default function Research() {
  return (
    <>
      <Head>
        <title>Research — PIDA-LAB</title>
        <meta name="description" content="Six interconnected frameworks exploring AI identity formation, semantic stability, decision responsibility, and governance architecture." />
      </Head>
      <Nav />
      <div className="static-page research-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">Research</div>
        <h1 className="static-h1">Six frameworks. One unifying question.</h1>
        <p className="static-lead">How can AI systems develop stable identity and internalized responsibility before acquiring capabilities — and how does long-term human-AI interaction change the human?</p>

        <div className="static-divider" />

        {/* FRAMEWORK MAP */}
        <div className="research-map-label">Framework relationships</div>
        <div className="research-relations">
          {RELATIONS.map((r, i) => (
            <div key={i} className="research-relation-row">
              <span className="research-rel-from">{r.from}</span>
              <span className="research-rel-arrow">→</span>
              <span className="research-rel-to">{r.to}</span>
              <span className="research-rel-label">{r.label}</span>
            </div>
          ))}
        </div>

        <div className="static-divider" />

        {/* FRAMEWORK CARDS */}
        <div className="research-grid">
          {FRAMEWORKS.map(fw => {
            const sc = STATUS_COLORS[fw.statusType]
            return (
              <div key={fw.id} className="research-card" style={{ borderLeftColor: fw.color }}>
                <div className="research-card-top">
                  <div className="research-card-code" style={{ color: fw.color }}>{fw.code}</div>
                  <div
                    className="research-card-status"
                    style={{ color: sc.color, background: sc.bg, border: `1px solid ${sc.border}` }}
                  >
                    {fw.status}
                  </div>
                </div>
                <div className="research-card-name">{fw.name}</div>
                <div className="research-card-section-label">Core question</div>
                <div className="research-card-question">{fw.question}</div>
                <div className="research-card-section-label">Contribution</div>
                <div className="research-card-contribution">{fw.contribution}</div>
                {fw.links.length > 0 && (
                  <div className="research-card-links">
                    {fw.links.map((l, i) =>
                      l.href ? (
                        <a
                          key={i}
                          href={l.href}
                          className="research-card-link"
                          target={l.href.startsWith('/') ? '_self' : '_blank'}
                          rel="noopener noreferrer"
                        >
                          {l.label} →
                        </a>
                      ) : (
                        <span key={i} className="research-card-link-static">{l.label}</span>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="static-divider" />

        {/* TOOLS */}
        <div className="static-section">
          <h2>Research tools & demos</h2>
          <p>Active tooling built to support empirical observation of the frameworks above.</p>
          <div className="research-tools">
            <div className="research-tool-row">
              <span className="research-tool-name">OSD Behavioral Probe</span>
              <span className="research-tool-desc">Multi-judge pipeline (GPT / Claude / Gemini), SAI display, JSONL import/export, Subject Consistency Check</span>
              <a href="https://osd-behavioral-probe.vercel.app" target="_blank" rel="noopener noreferrer" className="research-tool-link">Launch →</a>
            </div>
            <div className="research-tool-row">
              <span className="research-tool-name">STME Demo (V1–V5)</span>
              <span className="research-tool-desc">Structured decision explorer. Five progressive demo versions, no API key required in Demo Mode</span>
              <Link href="/demo" className="research-tool-link">Launch →</Link>
            </div>
          </div>
        </div>

        <div className="static-section">
          <h2>Collaborate</h2>
          <p>If your work touches AI governance, semantic stability, human-AI interaction structure, or accountability design — reach out.</p>
          <Link href="/contact" className="hero-cta" style={{ display: 'inline-flex', marginTop: '0.75rem' }}>Contact →</Link>
        </div>

        <div className="static-divider" />
        <div className="static-footer-note">
          <span>PIDA-LAB</span> · Rethinking AI Systems, Decision &amp; Responsibility
        </div>
      </div>
      <Footer />
    </>
  )
}
