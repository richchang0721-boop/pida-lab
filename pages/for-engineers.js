import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ForEngineers() {
  return (
    <>
      <Head>
        <title>For Engineers — PIDA-LAB</title>
        <meta
          name="description"
          content="PE → STME → RSTA → OSD as a state-transition pipeline: architecture, tooling, repos, and empirical before/after results."
        />
      </Head>
      <Nav />

      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">For Engineers</div>
        <h1 className="static-h1">
          This is not a prompt framework.<br />It's a state-transition pipeline.
        </h1>
        <p className="static-lead">
          PE → STME → RSTA → OSD is a sequential toolchain: clarify the problem, structure
          the decision space, stabilize semantic continuity, then observe drift — with each
          stage producing structured output the next stage consumes.
        </p>

        <div className="static-divider" />

        {/* ── THE PIPELINE ── */}
        <div className="static-section">
          <h2>The Pipeline</h2>
          <p>
            Each stage has a single responsibility and a bounded output contract. None of the
            stages make the decision for the user — they constrain and expose the structure the
            decision happens inside.
          </p>

          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '1px',
            background: 'var(--border)', marginTop: '1.5rem'
          }}>
            {[
              {
                tag: 'INPUT', tagClass: 'tag-internal',
                name: 'PE — Problem Explorer',
                desc: 'Clarifies the problem before any decision logic runs. Tracks six dimensions of problem clarity. Outputs only what the user stated — no AI-inserted assumptions.',
                io: 'in: raw question · out: clarified problem statement (6-dim)'
              },
              {
                tag: 'STRUCTURE', tagClass: 'tag-structural',
                name: 'STME — Structured Multi-State Transition & Evaluation',
                desc: 'Decomposes the clarified problem into states and transitions, flags structural pressure, and ranks transitions. Does not output a recommendation.',
                io: 'in: clarified problem · out: state graph + transition ranking'
              },
              {
                tag: 'STABILIZE', tagClass: 'tag-external',
                name: 'RSTA — Recursive State Transition Architecture',
                desc: 'Formal model of how semantic states transition across turns. Provides the theoretical constraints that keep a long interaction from drifting off its own state graph.',
                io: 'in: state graph · out: semantic stability constraints'
              },
              {
                tag: 'OBSERVE', tagClass: 'tag-internal',
                name: 'OSD — Observable Semantic Dynamics',
                desc: 'Makes semantic state evolution visible in real time — not prediction, observation. Distinct from drift detection, intent tracking, and mechanistic interpretability.',
                io: 'in: live interaction · out: SAI trace + case classification'
              },
            ].map((step, i) => (
              <div key={i} style={{
                background: 'var(--bg)', padding: '1.4rem 1.6rem', flex: '1 1 240px'
              }}>
                <span className={`demo-badge ${step.tagClass}`} style={{ marginBottom: '10px', display: 'inline-block' }}>
                  {step.tag}
                </span>
                <h3 style={{
                  fontFamily: 'var(--mono)', fontSize: '0.82rem', fontWeight: 700,
                  color: 'var(--text)', margin: '6px 0 10px', letterSpacing: '0.02em'
                }}>{step.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '10px' }}>
                  {step.desc}
                </p>
                <p style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                  {step.io}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="static-divider" />

        {/* ── OSD PROBE ── */}
        <div className="static-section">
          <h2>OSD Probe — the observability tool</h2>
          <p>
            OSD Probe is the empirical instrument behind the OSD framework. It runs a
            <strong> multi-judge pipeline</strong> (GPT / Claude / Gemini) against a target
            conversation, computes an <strong>SAI</strong> (semantic stability indicator) trace
            turn-by-turn, and classifies observed behavior against a growing library of
            documented case types.
          </p>
          <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li>Multi-judge scoring across three independent model families, reducing single-model judge bias</li>
            <li>SAI display per turn, so drift is visible at the point it happens, not reconstructed after the fact</li>
            <li>JSONL import / export for reproducible offline analysis</li>
            <li>Subject Consistency Check — flags when the same probed subject behaves inconsistently across repeated runs</li>
          </ul>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://github.com/richchang0721-boop/osd-behavioral-probe" target="_blank" rel="noreferrer" className="demo-open-btn">
              [ GitHub · osd-behavioral-probe ]
            </a>
            <a href="https://osd-behavioral-probe.vercel.app" target="_blank" rel="noreferrer" className="demo-open-btn">
              [ Live Tool · osd-behavioral-probe.vercel.app ]
            </a>
          </div>
        </div>

        <div className="static-divider" />

        {/* ── BEFORE / AFTER ── */}
        <div className="static-section">
          <h2>Before / After</h2>
          <p>What changes when OSD + RSTA sit on top of a normal decision or agent pipeline:</p>

          <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', marginTop: '1.2rem' }}>
            <div className="contact-card">
              <div className="contact-card-label" style={{ color: 'var(--accent2)' }}>BEFORE</div>
              <ul style={{ paddingLeft: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '8px' }}>
                <li>Semantic drift is noticed only after an output fails or a user complains</li>
                <li>No turn-level record of how the state changed — only the final output</li>
                <li>Judge bias from relying on a single model to evaluate itself</li>
                <li>Decision structure and decision content are entangled in one response</li>
              </ul>
            </div>
            <div className="contact-card">
              <div className="contact-card-label" style={{ color: 'var(--accent)' }}>AFTER</div>
              <ul style={{ paddingLeft: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginTop: '8px' }}>
                <li>SAI trace shows drift turn-by-turn, before it reaches an observable failure</li>
                <li>Every state transition is logged and reconstructable, not just the endpoint</li>
                <li>Three independent judge models cross-check each observation</li>
                <li>PE/STME separate problem structure from problem content, RSTA/OSD separate state from output</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="static-divider" />

        {/* ── REPOS & LIVE TOOLS ── */}
        <div className="static-section">
          <h2>Repos &amp; Live Tools</h2>
          <div className="demo-version-section" style={{ marginBottom: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>

              <div className="demo-version-card">
                <h3 className="demo-version-card-title">STME</h3>
                <p className="demo-version-card-desc">
                  Decision structuring engine. Preprint on SSRN + USPTO provisional patent pending.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6548019" target="_blank" rel="noreferrer" className="demo-open-btn">[ SSRN ]</a>
                  <a href="https://github.com/richchang0721-boop/STME" target="_blank" rel="noreferrer" className="demo-open-btn">[ GitHub ]</a>
                  <Link href="/demo" className="demo-open-btn">[ Demo ]</Link>
                </div>
              </div>

              <div className="demo-version-card">
                <h3 className="demo-version-card-title">RSTA</h3>
                <p className="demo-version-card-desc">
                  Semantic state transition theory. Preprint on Zenodo, DOI: 10.5281/zenodo.20603119.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="https://zenodo.org/records/20603119" target="_blank" rel="noreferrer" className="demo-open-btn">[ Zenodo · DOI ]</a>
                  <a href="https://github.com/richchang0721-boop/rsta-v2-demo-" target="_blank" rel="noreferrer" className="demo-open-btn">[ GitHub ]</a>
                </div>
              </div>

              <div className="demo-version-card">
                <h3 className="demo-version-card-title">OSD</h3>
                <p className="demo-version-card-desc">
                  Observability layer. Preprint on Zenodo, DOI: 10.5281/zenodo.20758240.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="https://doi.org/10.5281/zenodo.20758240" target="_blank" rel="noreferrer" className="demo-open-btn">[ Zenodo · DOI ]</a>
                  <a href="https://github.com/richchang0721-boop/osd-behavioral-probe" target="_blank" rel="noreferrer" className="demo-open-btn">[ GitHub ]</a>
                  <a href="https://osd-behavioral-probe.vercel.app" target="_blank" rel="noreferrer" className="demo-open-btn">[ Live Tool ]</a>
                </div>
              </div>

              <div className="demo-version-card">
                <h3 className="demo-version-card-title">PE</h3>
                <p className="demo-version-card-desc">
                  Problem Explorer. Supports Claude, GPT, and local Ollama models.
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a href="https://richchang0721-boop.github.io/Problem-Explorer-PE-/" target="_blank" rel="noreferrer" className="demo-open-btn">[ Launch ]</a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="static-divider" />

        {/* ── INTEGRATION NOTES ── */}
        <div className="static-section">
          <h2>Integration notes</h2>
          <p>Practical detail for anyone wiring this into their own pipeline:</p>
          <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li>OSD Probe's judge pipeline currently targets <strong>claude-sonnet-4-6</strong> as the primary evaluation model, cross-checked against GPT and Gemini judges</li>
            <li>Case data is stored and exchanged as JSONL — each line is one turn-level observation, making diffing and replay straightforward</li>
            <li>STME's state/transition output is a plain structured object — it can sit in front of any agent loop as a pre-decision structuring step without touching the agent's own reasoning</li>
            <li>None of the tools require the target model to be instrumented internally — OSD observes at the output/interaction layer, not inside model weights. It complements, but does not replace, mechanistic interpretability</li>
          </ul>
        </div>

        <div className="static-divider" />

        <div className="static-footer-note">
          <span>PIDA Lab</span> · Rethinking AI Systems, Decision &amp; Responsibility
        </div>
      </div>

      <Footer />
    </>
  )
}
