import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ForGovernance() {
  return (
    <>
      <Head>
        <title>For Governance / Policy — PIDA-LAB</title>
        <meta
          name="description"
          content="Responsibility Collapse, the PIDA Gate, HEB, and NDF explained in enterprise-risk and governance terms."
        />
      </Head>
      <Nav />

      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">For Governance / Policy</div>
        <h1 className="static-h1">
          Accountability is not a feature<br />you add after deployment.
        </h1>
        <p className="static-lead">
          PIDA's governance layer is built for the question legal, risk, and compliance teams
          actually ask: when this system produces a harmful or consequential outcome, who —
          structurally, not just contractually — is answerable for it?
        </p>

        <div className="static-divider" />

        {/* ── RESPONSIBILITY COLLAPSE ── */}
        <div className="static-section">
          <h2>Responsibility Collapse</h2>
          <p>
            <strong>Responsibility Collapse</strong> describes the governance vacuum that occurs
            when an AI system produces a harmful or consequential outcome, but no structurally
            defined actor — developer, deployer, or operator — holds clear accountability for it.
          </p>
          <blockquote>
            This is not a behavioral failure. It is an authority-mapping failure: the system was
            never given a structural answer to "who is responsible for this decision," so when
            harm occurs, responsibility diffuses across the org chart instead of resolving to a
            named function.
          </blockquote>
          <p>
            In risk-register terms, Responsibility Collapse is the root cause behind a familiar
            pattern: incidents that are individually explainable but collectively untraceable to
            an owner. FCFA (Foundational Cognitive Formation Architecture) treats preventing this
            collapse as a design requirement, not a post-incident remediation.
          </p>
        </div>

        <div className="static-divider" />

        {/* ── HEB ── */}
        <div className="static-section">
          <h2>HEB — Human Experience Boundary</h2>
          <p>
            HEB is a <strong>non-optimizable constraint layer</strong>. In compliance terms:
            think of it as a non-derogable control — a boundary that cannot be tuned, weighted,
            or traded off against product or business objectives, comparable to a hard-coded
            compliance floor rather than a configurable risk-appetite setting.
          </p>
          <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1rem' }}>
            <li>Sits above every other layer — no downstream module can override it, including the AI's own optimization objective</li>
            <li>Enforces <strong>pre-execution override</strong>: it can stop an output before it is delivered, not just flag it afterward</li>
            <li>Scope is explicit and narrow — non-optimizable domains, boundary enforcement, human autonomy first, transparency and audit</li>
            <li>Baseline rule: the system has no authority to override human will, and must not replace, manipulate, exploit, or reductively measure human experience</li>
          </ul>
        </div>

        <div className="static-divider" />

        {/* ── PIDA GATE ── */}
        <div className="static-section">
          <h2>PIDA Gate — the enforcement checkpoint</h2>
          <p>
            The <strong>PIDA Gate</strong> is the operational name for the point where HEB's
            pre-execution override actually fires. Every output is required to pass through this
            checkpoint before execution. A failed check blocks the output outright — it does not
            generate a flag for later review.
          </p>
          <p>
            The closest enterprise-risk analogy is a <strong>pre-trade compliance gate</strong> or
            a <strong>segregation-of-duties control</strong>: the check happens before the action
            is taken, not after the fact, and the check itself cannot be initiated, waived, or
            bypassed by the system being checked.
          </p>
          <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
            <li><strong>Non-bypassable by design</strong> — no lifecycle state can be skipped or self-initiated by the AI</li>
            <li><strong>Authority hierarchy is explicit</strong> — Primary User → Successor → System Authority → Exception Access → Aggregate Retention, so every override has a named authority behind it</li>
            <li><strong>Audit-first</strong> — the gate's role is to make the decision to block or allow independently reviewable, not just self-reported by the system</li>
          </ul>
        </div>

        <div className="static-divider" />

        {/* ── NDF ── */}
        <div className="static-section">
          <h2>NDF — Non-Dominant Interaction Framework</h2>
          <p>
            NDF governs the shape of <strong>long-horizon interaction</strong> so that, over
            extended engagement, the system does not accumulate structural influence over a
            user's decisions.
          </p>
          <p>
            In governance terms, NDF is a safeguard against <strong>undue influence and
            dependency risk</strong> — functionally similar to conflict-of-interest and
            fiduciary-duty controls that exist to stop one party from quietly becoming
            decision-dominant over another across repeated interactions. It is a policy control on
            the relationship's trajectory, not a single-response content filter.
          </p>
        </div>

        <div className="static-divider" />

        {/* ── WHY THIS MATTERS FOR ENTERPRISE RISK ── */}
        <div className="static-section">
          <h2>Why this maps onto enterprise risk practice</h2>
          <div className="contact-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: '1rem' }}>
            <div className="contact-card">
              <div className="contact-card-label">Ownership &amp; succession</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>
                The PSP authority hierarchy (Primary User → Successor → System Authority →
                Exception Access → Aggregate Retention) functions like a data-governance and
                succession policy: every state has a named, ranked owner.
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-card-label">Control testing</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>
                Because the PIDA Gate is a discrete checkpoint rather than a diffuse behavioral
                tendency, it can be tested and audited the way a segregation-of-duties control is
                tested — independent of the system's normal outputs.
              </p>
            </div>
            <div className="contact-card">
              <div className="contact-card-label">Traceability</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>
                Lifecycle states are rule-enforced and non-bypassable, which is what a post-incident
                review actually needs: a reconstructable sequence of who could have acted, and when.
              </p>
            </div>
          </div>
        </div>

        <div className="static-divider" />

        {/* ── PAPERS & LEGAL BASIS ── */}
        <div className="static-section">
          <h2>Papers &amp; supporting research</h2>
          <ul style={{ paddingLeft: '1.4rem', color: 'var(--text-muted)', lineHeight: 1.9 }}>
            <li><strong>PIDA</strong> — USPTO Provisional Patent No. 64/045,009</li>
            <li><strong>FCFA</strong> — Draft 0.2, introduces the Responsibility Collapse concept</li>
            <li>
              <strong>CIP</strong> (Cognitive Integrity Protocol) — preprint on SSRN, cited by
              an Argentine professor
            </li>
            <li>
              <strong>RSTA</strong> — preprint on Zenodo with a valid DOI:{' '}
              <a href="https://zenodo.org/records/20603119" target="_blank" rel="noreferrer">
                10.5281/zenodo.20603119
              </a>
            </li>
            <li>
              <strong>OSD</strong> — preprint on Zenodo, DOI:{' '}
              <a href="https://doi.org/10.5281/zenodo.20758240" target="_blank" rel="noreferrer">
                10.5281/zenodo.20758240
              </a>
            </li>
          </ul>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '1.2rem' }}>
            This page summarizes PIDA-LAB's own governance framework and research framing. It is
            not legal advice and does not constitute a certified compliance methodology.
          </p>
        </div>

        <div className="static-divider" />

        <div className="static-section">
          <h2>Collaborate</h2>
          <p>
            If your work touches AI governance, accountability design, or enterprise risk review
            of AI systems, we want to hear from you.
          </p>
          <Link href="/contact" className="demo-open-btn">[ Contact →]</Link>
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
