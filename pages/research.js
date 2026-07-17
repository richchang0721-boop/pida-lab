import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'

const MAP_DATA = {
  heb:      { color: '#ff4757', code: 'HEB · L0',          name: 'Human Experience Boundary',                     desc: 'Non-optimizable constraint layer. Constrains all other layers when outputs violate human experience integrity, autonomy, or developmental capacity. No layer can override it.' },
  psp:      { color: '#e8ff47', code: 'PSP · L1',          name: 'Persona Sovereignty Protocol',                  desc: 'Governance and authority layer. Defines ownership, lifecycle rules, and post-user governance. Authority flows: Primary User → Successor → System Authority → Exception Access.' },
  fcfa:     { color: '#4ecdc4', code: 'FCFA · Core',       name: 'Foundational Cognitive Formation Architecture', desc: 'Cognitive formation layer. Comprises IC (Interaction Core), IMC (Irreversible Memory Complex), and QPE (Qualia & PersEvo Engine). Experiential formation without explicit instruction; identity persistence is irreversible anchoring.' },
  scl:      { color: '#4ecdc4', code: 'SCL · Core',        name: 'Search Constraint Layer',                       desc: 'Search space governance. Projects constraints from HEB, PSP, and FCFA. Enforces multi-perspective, counter-examples, and boundary cases. Prevents single-narrative bias and drift.' },
  stmeCore: { color: '#4ecdc4', code: 'STME · Core',       name: 'Structured Multi-State Transition',             desc: 'Decision-state framework. Maintains multiple concurrent decision states and evolves them through a transition grammar — preventing premature collapse of the decision space.' },
  ndf:      { color: '#4ecdc4', code: 'NDF · Core',        name: 'Non-Dominant Interaction Framework',            desc: 'Long-horizon interaction governance. Treats dependency, behavioral convergence, and disengagement erosion as cumulative interaction-state conditions, enforced before output. Source of the HEB concept.' },
  pe:       { color: '#34d399', code: 'PE · Tool',         name: 'Problem Explorer',                              desc: 'Step 1 of the toolchain. Clarifies what problem you actually have before asking AI. Tracks 6 dimensions of problem clarity. Neutral by design — outputs only your words, never adds AI assumptions.' },
  stmeTool: { color: '#4ecdc4', code: 'STME · Tool',       name: 'Structured Multi-State Transition',             desc: 'Step 2 of the toolchain. Decomposes decision problems into structured states and transitions without making decisions for you. Five demo versions (V1–V5). USPTO provisional patent pending.' },
  rsta:     { color: '#a78bfa', code: 'RSTA · Framework',  name: 'Recursive State Transition Architecture',       desc: 'Step 3 of the toolchain. Theoretical framework on semantic state transitions in LLMs. Preprint on Zenodo with valid DOI. Provides the semantic stability layer for long-horizon AI interaction.' },
  osd:      { color: '#a78bfa', code: 'OSD · Framework',   name: 'Observable Semantic Dynamics',                  desc: 'Observation layer alongside RSTA. Makes semantic state evolution visible in real time. Distinct from drift detection and mechanistic interpretability — visibility is the core contribution. Preprint on Zenodo with DOI.' },
}

function FrameworkMap() {
  const [active, setActive] = useState(null)
  const d = active ? MAP_DATA[active] : null

  const govNode = (id, code, label, color, tag) => (
    <div
      key={id}
      className={`fm-gov-node fm-gov-${id}`}
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
      style={{ borderColor: color + '55' }}
    >
      <div className="fm-node-left">
        <div className="fm-dot" style={{ background: color }} />
        <div className="fm-code">{code}</div>
        <div className="fm-name">{label}</div>
      </div>
      <div className="fm-tag" style={{ color, borderColor: color + '44' }}>{tag}</div>
    </div>
  )

  const coreNode = (id, code, label) => (
    <div
      key={id}
      className="fm-core-node"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
    >
      <div className="fm-core-code">{code}</div>
      <div className="fm-core-name">{label}</div>
    </div>
  )

  const toolNode = (id, code, label, sub, color, dim) => (
    <div
      key={id}
      className="fm-tool-node"
      onMouseEnter={() => setActive(id)}
      onMouseLeave={() => setActive(null)}
      style={{ borderColor: color + (dim ? '33' : '4d'), opacity: dim ? 0.7 : 1 }}
    >
      <div className="fm-tool-code" style={{ color: color + (dim ? '66' : '99') }}>{code}</div>
      <div className="fm-tool-name">{label}</div>
      <div className="fm-tool-sub">{sub}</div>
    </div>
  )

  return (
    <div className="fm-wrap">
      <div className="fm-eyebrow">
        <div className="fm-ey-label">Framework Map</div>
        <div className="fm-ey-hint">Hover to explore</div>
      </div>

      <div className="fm-map">
        <div className="fm-tier-label">Governance layer</div>
        <div className="fm-gov-row">
          {govNode('heb', 'L0', 'HEB', '#ff4757', 'Human Experience Boundary')}
          {govNode('psp', 'L1', 'PSP', '#e8ff47', 'Persona Sovereignty Protocol')}
        </div>

        <div className="fm-connector">
          <div className="fm-conn-v" />
          <div className="fm-conn-mid">
            <div className="fm-conn-h" />
            <div className="fm-conn-label">constrains</div>
            <div className="fm-conn-h" />
          </div>
        </div>

        <div className="fm-tier-label">Core architecture (L2)</div>
        <div className="fm-core-row">
          {coreNode('fcfa',     'FCFA', 'Cognitive formation')}
          {coreNode('scl',      'SCL',  'Search constraint')}
          {coreNode('stmeCore', 'STME', 'Multi-state transition')}
          {coreNode('ndf',      'NDF',  'Non-dominant interaction')}
        </div>

        <div className="fm-divider">
          <div className="fm-div-line" />
          <div className="fm-div-label">Decision toolchain</div>
          <div className="fm-div-line" />
        </div>

        <div className="fm-tier-label">Research tools — sequential flow</div>
        <div className="fm-tools-row">
          {toolNode('pe',       'PE',   'Problem Explorer',   'Clarify',   '#34d399', false)}
          <div className="fm-tool-arrow">→</div>
          {toolNode('stmeTool', 'STME', 'Decision Explorer',  'Structure', '#4ecdc4', false)}
          <div className="fm-tool-arrow">→</div>
          {toolNode('rsta',     'RSTA', 'Semantic stability', 'Stabilize', '#a78bfa', false)}
          <div className="fm-tool-arrow" style={{ fontSize: '9px', color: '#2a2a38' }}>↗</div>
          {toolNode('osd',      'OSD',  'Semantic observer',  'Observe',   '#a78bfa', true)}
        </div>
      </div>

      <div className="fm-tooltip">
        {d ? (
          <>
            <div className="fm-tt-code" style={{ color: d.color }}>{d.code}</div>
            <div className="fm-tt-name">{d.name}</div>
            <div className="fm-tt-desc">{d.desc}</div>
          </>
        ) : (
          <div className="fm-tt-empty">Hover any node to preview</div>
        )}
      </div>
    </div>
  )
}

const FRAMEWORKS = [
  {
    id: 'pida',
    code: 'PIDA',
    name: 'Primordial Indeterminate Developmental AI',
    color: '#e8ff47',
    status: 'Patent Pending',
    statusType: 'patent',
    question: 'How does AI personality form through environmental exposure rather than direct instruction — and how can that formation remain stable without collapsing over long-horizon interaction?',
    contribution: 'Flagship governance architecture. Proposes that stable AI identity must be established before capability acquisition, not after. Long-horizon human-AI interaction is the observation window for whether that identity holds.',
    links: [
      { label: 'USPTO · No. 64/045,009', href: null },
    ],
  },
  {
    id: 'rsta',
    code: 'RSTA',
    name: 'Recursive State Transition Architecture',
    color: '#4ecdc4',
    status: 'Preprint · DOI',
    statusType: 'published',
    question: 'How do semantic states transition in LLMs — and can that process be modeled formally enough to enable reproducible research?',
    contribution: 'Theoretical framework on semantic state transitions. Posted as a preprint on Zenodo with a valid DOI, citable and open for review.',
    links: [
      { label: 'Zenodo · Preprint · DOI 10.5281/zenodo.20603119', href: 'https://zenodo.org/records/20603119' },
    ],
  },
  {
    id: 'osd',
    code: 'OSD',
    name: 'Observable Semantic Dynamics',
    color: '#a78bfa',
    status: 'Preprint · DOI',
    statusType: 'published',
    question: 'Can semantic state evolution in LLMs be made visible — not just predicted, but observed in real time?',
    contribution: 'Framework for making high-level semantic emergence visible. Visibility is the core contribution; prediction is a potential bonus. Distinct from drift detection, intent tracking, and mechanistic interpretability.',
    links: [
      { label: 'Zenodo · DOI 10.5281/zenodo.20758240', href: 'https://doi.org/10.5281/zenodo.20758240' },
      { label: 'GitHub · osd-behavioral-probe', href: 'https://github.com/richchang0721-boop/osd-behavioral-probe' },
      { label: 'Live Tool · osd-behavioral-probe.vercel.app', href: 'https://osd-behavioral-probe.vercel.app' },
    ],
  },
  {
    id: 'cip',
    code: 'CIP',
    name: 'Cognitive Integrity Protocol',
    color: '#f97316',
    status: 'Preprint · SSRN',
    statusType: 'published',
    question: 'How should AI systems maintain cognitive integrity under adversarial or manipulative interaction — and what structural protocol enforces it?',
    contribution: 'Posted as a preprint on SSRN. Cited by an Argentine professor. Defines five non-negotiable red lines for brain-computer interfaces and the structural conditions under which cognitive integrity can be verified and maintained.',
    links: [
      { label: 'SSRN · Preprint', href: 'https://ssrn.com' },
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
    contribution: 'The cognitive formation core of PIDA, comprising IC, IMC, and QPE. Incorporates the "Responsibility Collapse" concept: the governance vacuum where AI causes harm but no structural actor bears accountability. Paper at Draft 0.2.',
    links: [],
  },
  {
    id: 'stme',
    code: 'STME',
    name: 'Structured Multi-State Transition',
    color: '#34d399',
    status: 'Preprint · SSRN',
    statusType: 'published',
    question: 'How can decision problems be decomposed into structured states and transitions — without the system making the decision for the user?',
    contribution: 'Decision framework that maps states, identifies structural pressure, and ranks transitions while preventing premature collapse of the decision space. Five demo versions available. USPTO provisional patent pending.',
    links: [
      { label: 'SSRN · abstract_id=6548019', href: 'https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6548019' },
      { label: 'GitHub · STME', href: 'https://github.com/richchang0721-boop/STME' },
      { label: 'Live Demo', href: '/demo' },
    ],
  },
  {
    id: 'ndf',
    code: 'NDF',
    name: 'Non-Dominant Interaction Framework',
    color: '#4ecdc4',
    status: 'SSRN Rejected · Considering Zenodo',
    statusType: 'draft',
    question: 'How do we govern cumulative interaction effects — dependency, behavioral convergence, disengagement erosion — that emerge across long-horizon interaction rather than in any single output?',
    contribution: 'Long-horizon interaction governance via pre-execution constraints. Introduces the Human Experience Boundary (HEB): domains of human experience that must not be compressed, replaced, simulated, or eliminated through optimization-driven AI.',
    links: [],
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
  { from: 'NDF',  to: 'HEB',  label: 'Interaction governance → Boundary concept' },
]

export default function Research() {
  return (
    <>
      <Head>
        <title>Research — PIDA-LAB</title>
        <meta name="description" content="Interconnected frameworks exploring AI identity formation, semantic stability, decision responsibility, and governance architecture." />
      </Head>
      <Nav />
      <div className="static-page research-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">Research</div>
        <h1 className="static-h1">Interconnected frameworks. One unifying question.</h1>
        <p className="static-lead">Can an AI self that grows but does not collapse exist — and how do we observe its formation through long-horizon human-AI interaction?</p>

        <div className="static-divider" />

        <FrameworkMap />

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
          <p>Active tooling built to support empirical observation of the frameworks above. The three decision tools form a sequential chain: clarify the problem, structure the decision space, then stabilize semantic continuity.</p>
          <div className="research-toolchain">
            <div className="research-chain-item">
              <span className="research-chain-label" style={{color:'#34d399'}}>PE</span>
              <span className="research-chain-arrow">→</span>
              <span className="research-chain-label" style={{color:'#4ecdc4'}}>STME</span>
              <span className="research-chain-arrow">→</span>
              <span className="research-chain-label" style={{color:'#a78bfa'}}>RSTA</span>
            </div>
            <div className="research-chain-desc">Clarify → Structure → Stabilize</div>
          </div>
          <div className="research-tools">
            <div className="research-tool-row">
              <span className="research-tool-name">Problem Explorer (PE)</span>
              <span className="research-tool-desc">Problem clarification before decision-making. Tracks six dimensions of problem clarity. Neutral by design — outputs only what the user stated, never adds AI assumptions. Supports Claude, GPT, and local Ollama models.</span>
              <a href="https://richchang0721-boop.github.io/Problem-Explorer-PE-/" target="_blank" rel="noopener noreferrer" className="research-tool-link">Launch →</a>
            </div>
            <div className="research-tool-row">
              <span className="research-tool-name">STME Demo (V1–V5)</span>
              <span className="research-tool-desc">Structured decision explorer. Maps states, identifies structural pressure, and ranks transitions — without making the decision for you. Five progressive demo versions, no API key required in Demo Mode.</span>
              <Link href="/demo" className="research-tool-link">Launch →</Link>
            </div>
            <div className="research-tool-row">
              <span className="research-tool-name">OSD Behavioral Probe</span>
              <span className="research-tool-desc">Multi-judge pipeline (GPT / Claude / Gemini), SAI display, JSONL import/export, Subject Consistency Check. Empirical observation tool for semantic state collapse.</span>
              <a href="https://osd-behavioral-probe.vercel.app" target="_blank" rel="noopener noreferrer" className="research-tool-link">Launch →</a>
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
