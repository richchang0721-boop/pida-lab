import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Demo() {
  return (
    <>
      <Head>
        <title>STME Demo — PIDA-LAB</title>
        <meta name="description" content="Explore different stages of the STME framework, from core structural engine to interactive interpretation layers." />
      </Head>
      <Nav />

      <div className="demo-page">
        <div className="demo-header">
          <Link href="/" className="back-link">← Home</Link>
          <div className="static-label">Demo</div>
        </div>

        {/* Header Card */}
        <div className="demo-index-header-card">
          <div className="demo-index-copy-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </div>
          <h2 className="demo-index-title">STME Demonstrations</h2>
          <p className="demo-index-desc">
            Explore different stages of the STME framework,<br />
            from core structural engine to interactive interpretation layers.
          </p>
        </div>

        {/* V1 */}
        <div className="demo-version-section">
          <div className="demo-version-label">
            <span className="demo-version-dot dot-v1" />
            V1 卡片
          </div>
          <div className="demo-version-card">
            <div className="demo-index-copy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            <h3 className="demo-version-card-title">STME V1 — Core Engine</h3>
            <p className="demo-version-card-desc">
              Pure structural representation of decision states and transitions.<br />
              No interpretation layer. No guidance.
            </p>
            <p className="demo-version-card-best">Best for understanding the core framework.</p>
            <Link href="/demo/v1" target="_blank" className="demo-open-btn">
              [ Open Demo ]
            </Link>
            <p className="demo-version-note">
              This version reflects the raw STME engine output. No interpretation is provided.
            </p>
          </div>
        </div>

        {/* V2 */}
        <div className="demo-version-section">
          <div className="demo-version-label">
            <span className="demo-version-dot dot-v2" />
            V2 卡片
          </div>
          <div className="demo-version-card">
            <div className="demo-index-copy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            <h3 className="demo-version-card-title">STME V2 — Interactive Demo</h3>
            <p className="demo-version-card-desc">
              Adds interpretation and user guidance.<br />
              Designed to make decision structures understandable.
            </p>
            <p className="demo-version-card-best">Best for first-time users.</p>
            <Link href="/demo/v2" target="_blank" className="demo-open-btn">
              [ Open Demo ]
            </Link>
            <p className="demo-version-note">
              This version includes an interpretation layer for usability.
            </p>
          </div>
        </div>

        {/* V3 */}
        <div className="demo-version-section">
          <div className="demo-version-label">
            <span className="demo-version-dot dot-v3" />
            V3 卡片
          </div>
          <div className="demo-version-card">
            <div className="demo-index-copy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            <h3 className="demo-version-card-title">STME V3 — Condition-Based Analysis</h3>
            <p className="demo-version-card-desc">
              Validates user-provided conditions and maps them into decision constraints.<br />
              Classifies each condition before generating states and transitions.
            </p>
            <p className="demo-version-card-best">Best for decisions with known real-world constraints.</p>
            <Link href="/demo/v3" target="_blank" className="demo-open-btn">
              [ Open Demo ]
            </Link>
            <p className="demo-version-note">
              This version models reality through conditions before entering STME analysis.
            </p>
          </div>
        </div>

        {/* V4 */}
        <div className="demo-version-section">
          <div className="demo-version-label">
            <span className="demo-version-dot dot-v4" />
            V4 卡片
          </div>
          <div className="demo-version-card">
            <div className="demo-index-copy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            <h3 className="demo-version-card-title">STME V4 — Guided Scenario Demo</h3>
            <p className="demo-version-card-desc">
              Choose a scenario, load example conditions, run STME analysis.<br />
              Supports Demo Mode (no API key) or Full Analysis (with API key).
            </p>
            <p className="demo-version-card-best">Best for exploring STME without setup.</p>
            <Link href="/demo/v4" target="_blank" className="demo-open-btn">
              [ Open Demo ]
            </Link>
            <p className="demo-version-note">
              This version includes preset scenarios and mock data. No API key required in Demo Mode.
            </p>
          </div>
        </div>

        {/* V5 */}
        <div className="demo-version-section">
          <div className="demo-version-label">
            <span className="demo-version-dot dot-v5" />
            V5 卡片
          </div>
          <div className="demo-version-card">
            <div className="demo-index-copy-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="18" height="18">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </div>
            <h3 className="demo-version-card-title">STME V5 — Full Production</h3>
            <p className="demo-version-card-desc">
              Complete product architecture. Decision Builder, Condition Engine,<br />
              upgraded Interpretation, Decision History, and Export / Audit.
            </p>
            <p className="demo-version-card-best">Best for full structured decision analysis with history tracking.</p>
            <Link href="/demo/v5" target="_blank" className="demo-open-btn">
              [ Open Demo ]
            </Link>
            <p className="demo-version-note">
              This version includes all six product layers. Requires OpenAI API key. Decision history is saved locally in your browser.
            </p>
          </div>
        </div>


        <div className="static-divider" />

        {/* Research block */}
        <div className="demo-research-block">
          <div className="demo-research-label">Research</div>
          <div className="demo-research-rows">
            <div className="demo-research-row">
              <span className="demo-research-key">SSRN</span>
              <a
                className="demo-research-link"
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6548019"
                target="_blank"
                rel="noopener noreferrer"
              >
                papers.ssrn.com · abstract_id=6548019
              </a>
            </div>
            <div className="demo-research-row">
              <span className="demo-research-key">GitHub</span>
              <a
                className="demo-research-link"
                href="https://github.com/richchang0721-boop/STME"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/richchang0721-boop/STME
              </a>
            </div>
            <div className="demo-research-row">
              <span className="demo-research-key">Patent</span>
              <span className="demo-research-val">
                Provisional Patent Pending (USPTO) · Application No.: 64/045,009
              </span>
            </div>
          </div>
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
