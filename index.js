import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ArticleCard from '../components/ArticleCard'
import { CATEGORIES } from '../lib/categories'

export async function getStaticProps() {
  const { getSortedPostsData } = require('../lib/posts.server')
  const allPosts = getSortedPostsData()
  return { props: { latestPosts: allPosts.slice(0, 6) } }
}

function PidaArchitecture() {
  const layers = [
    {
      id: 'heb',
      code: 'L0',
      name: 'HEB — Human Experience Boundary',
      tag: 'Constraint Layer',
      color: '#ff4757',
      borderColor: '#ff4757',
      desc: 'Non-optimizable domain constraint layer. Pre-execution override: constraints all layers when outputs violate human experience integrity, autonomy, or developmental capacity.',
      modules: ['Non-optimizable domains', 'Boundary enforcement', 'Human autonomy first', 'Transparency & audit'],
      principle: 'AI has no authority to override human will. Must not replace, manipulate, exploit, or reductively measure human experience.',
    },
    {
      id: 'psp',
      code: 'L1',
      name: 'PSP — Persona Sovereignty Protocol',
      tag: 'Governance Layer',
      color: '#e8ff47',
      borderColor: '#e8ff47',
      desc: 'Governance & authority layer. Defines ownership, control, lifecycle rules, and post-user governance. Authority hierarchy: Primary User → Successor → System Authority → Exception Access → Aggregate Retention.',
      modules: ['Primary user authority', 'Successor designated', 'Lifecycle governance', 'Sealed state mechanism', 'Exception access protocol'],
      principle: 'Interaction memory is user-controlled and policy-driven. Identity is immutable and separable.',
    },
    {
      id: 'core',
      code: 'L2',
      name: 'Core — Structure & Intelligence',
      tag: 'Architecture Layer',
      color: '#4ecdc4',
      borderColor: '#4ecdc4',
      desc: 'Five integrated subsystems operating under PSP governance. Each subsystem is constrained by HEB and governed by PSP rules before execution.',
      modules: ['FCFA — Cognitive formation', 'SCL — Search constraint', 'IC — Interaction memory', 'STME — Self-task modeling', 'NDF — Non-doable filtering'],
      principle: 'Development sandbox: experiential formation without explicit instruction. Identity persistence is irreversible anchoring and continuity.',
    },
    {
      id: 'qpe',
      code: 'L3',
      name: 'QPE — Qualia & PersEvo Engine',
      tag: 'Evolution Layer',
      color: '#a78bfa',
      borderColor: '#a78bfa',
      desc: 'Cross-layer support system. Generates internal subjective experience representations. Evolves persona across time and interactions. Bridges qualia, evolution, and memory layers.',
      modules: ['Qualia generation', 'PersEvo evolution', 'Memory integration', 'Continuity & coherence'],
      principle: 'Maintain identity and behavioral consistency across time. Bridge the gap between single-session interaction and persistent personhood.',
    },
    {
      id: 'flow',
      code: 'L4',
      name: 'Lifecycle Flow — Governed by PSP',
      tag: 'State Machine',
      color: '#f97316',
      borderColor: '#f97316',
      desc: 'Five lifecycle states governing the entire existence of an AI-associated persona. All transitions are rule-enforced by PSP. No state can be bypassed or self-initiated by the AI.',
      modules: ['Active state', 'Transfer state', 'Termination — no successor', 'Termination — with successor', 'Exception & post-lifecycle'],
      principle: 'IC sealed on termination. Interaction memory encrypted and non-readable. Post-lifecycle aggregate state: non-identifiable, not reconstructable.',
      isFlow: true,
    },
  ]

  return (
    <div className="pida-arch">
      <div className="pida-arch-header">
        <div className="pida-arch-eyebrow">PIDA v3.0</div>
        <div className="pida-arch-title">Persona-Integrated Dual-layer Architecture</div>
        <div className="pida-arch-sub">Sovereignty and Evolution of AI-associated Entities</div>
        <div className="pida-arch-eq">
          <span>PIDA =</span> Governance (PSP) + Structure (FCFA/STME/NDF/SCL) + Intelligence (QPE) <span>under</span> HEB
        </div>
      </div>

      <div className="pida-layers">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <details className={`pida-layer pida-layer-${layer.id}`} style={{ '--layer-color': layer.color }}>
              <summary className="pida-layer-header">
                <div className="pida-layer-dot" style={{ background: layer.color }} />
                <div className="pida-layer-code">{layer.code}</div>
                <div className="pida-layer-name">{layer.name}</div>
                <div className="pida-layer-tag">{layer.tag}</div>
                <div className="pida-layer-chevron">▶</div>
              </summary>
              <div className="pida-layer-body">
                <div className="pida-layer-desc">{layer.desc}</div>
                <div className="pida-modules">
                  {layer.modules.map(m => (
                    <span key={m} className="pida-module" style={{ borderColor: layer.color + '40', color: layer.color, background: layer.color + '0f' }}>
                      {m}
                    </span>
                  ))}
                </div>
                {layer.isFlow && (
                  <div className="pida-flow-states">
                    {[
                      { num: '1', label: 'Active State' },
                      { num: '2', label: 'Transfer State' },
                      { num: '3A', label: 'Termination · No Successor' },
                      { num: '3B', label: 'Termination · With Successor' },
                      { num: '4+5', label: 'Exception & Post-lifecycle' },
                    ].map(s => (
                      <div key={s.num} className={`pida-flow-state${s.num === '1' ? ' pida-flow-active' : ''}`}>
                        <span className="pida-flow-num" style={{ color: layer.color }}>{s.num}</span>
                        {s.label}
                      </div>
                    ))}
                  </div>
                )}
                <div className="pida-principle">{layer.principle}</div>
              </div>
            </details>
            {i < layers.length - 1 && (
              <div className="pida-connector">
                <div className="pida-conn-line" />
                <div className="pida-conn-dot" />
                <div className="pida-conn-line" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pida-arch-footer">
        <div className="pida-legend">
          {[
            { color: '#ff4757', label: 'HEB' },
            { color: '#e8ff47', label: 'PSP' },
            { color: '#4ecdc4', label: 'Core' },
            { color: '#a78bfa', label: 'QPE' },
            { color: '#f97316', label: 'Lifecycle' },
          ].map(l => (
            <div key={l.label} className="pida-leg-item">
              <div className="pida-leg-dot" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
        <div className="pida-hint">Click layers to expand</div>
      </div>
    </div>
  )
}

export default function Home({ latestPosts }) {
  return (
    <>
      <Head>
        <title>PIDA-LAB — Rethinking AI Systems, Decision &amp; Responsibility</title>
        <meta name="description" content="AI alignment is solving the wrong problem. AI is not a capability problem. It is a relationship structure failure." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://www.pida-lab.com/" />
        <meta property="og:url" content="https://www.pida-lab.com/" />
      </Head>
      <Nav />

      <section className="hero">
        <div className="hero-label">PIDA-LAB · AI Deconstruction Station</div>
        <h1>
          AI alignment is solving<br />
          the <em>wrong problem.</em>
        </h1>
        <p className="hero-desc">
          AI is not a capability problem.<br />
          It is a <span style={{color:'var(--text)', fontWeight:500}}>relationship structure failure.</span>
        </p>
        <div className="hero-cta-wrap">
          <p className="hero-cta-label">If this is your first time here:</p>
          <div className="hero-cta-row">
            <span className="hero-cta-side">Start Here →</span>
            <Link href="/posts/pida-entry-point" className="hero-cta">PIDA Entry Point</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div>
            <span className="hero-stat-num">{latestPosts.length}+</span>
            <span className="hero-stat-label">In-depth analyses</span>
          </div>
          <div>
            <span className="hero-stat-num">{CATEGORIES.length}</span>
            <span className="hero-stat-label">Core categories</span>
          </div>
          <div>
            <span className="hero-stat-num">0%</span>
            <span className="hero-stat-label">Filler content</span>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* START HERE */}
      <section className="section">
        <div className="section-header">
          <span className="section-title" style={{color:"var(--text)", fontWeight:700, fontSize:"0.95rem", letterSpacing:"0.1em"}}>⬤ START HERE</span>
        </div>
        <div className="start-here-block">
          <div className="start-here-group">
            <p className="start-here-intro">If this is your first time here:</p>
            <Link href="/posts/pida-entry-point" className="start-here-link">→ PIDA Entry Point</Link>
          </div>
          <div className="start-here-group">
            <p className="start-here-intro">If you want to understand AI decision failure:</p>
            <Link href="/posts/ai-decision-illusions" className="start-here-link">→ AI Decision Illusions</Link>
          </div>
          <div className="start-here-group">
            <p className="start-here-intro">If you want to understand responsibility:</p>
            <Link href="/posts/responsibility-structure" className="start-here-link">→ Responsibility Structure</Link>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* DEMO BANNER */}
      <section className="section">
        <Link href="/demo">
          <div className="demo-banner">
            <div className="demo-banner-left">
              <div className="demo-banner-label">Live Demo</div>
              <div className="demo-banner-title">Try STME — Structured Decision Explorer</div>
              <div className="demo-banner-desc">Enter a decision question. STME maps the states, identifies structural pressure, and ranks transitions — without making the decision for you.</div>
            </div>
            <div className="demo-banner-cta">Launch Demo →</div>
          </div>
        </Link>
      </section>

      <div className="divider" />

      {/* PIDA ARCHITECTURE */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">PIDA Architecture</span>
          <Link href="/posts/pida-entry-point" className="section-link">Learn More →</Link>
        </div>
        <PidaArchitecture />
      </section>

      <div className="divider" />

      {/* LATEST ARTICLES */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">Latest Posts</span>
          <Link href="/posts" className="section-link">View All →</Link>
        </div>
        <div className="articles-grid">
          {latestPosts.map(post => <ArticleCard key={post.id} post={post} />)}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">Categories</span>
          <Link href="/categories" className="section-link">All →</Link>
        </div>
        <div className="categories-row">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <div className="category-chip">
                <span className="category-chip-icon">{cat.icon}</span>
                <span className="category-chip-name">{cat.name}</span>
                <span className="category-chip-count">{cat.desc}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">Contact</span>
          <Link href="/contact" className="section-link">View All →</Link>
        </div>
        <div className="contact-index-block">
          <p className="contact-index-desc">For discussions, collaborations, or research alignment.</p>
          <div className="contact-index-rows">
            <div className="contact-index-row">
              <span className="contact-index-key">Email</span>
              <a href="mailto:richchang0721@gmail.com" className="contact-index-val">richchang0721@gmail.com</a>
            </div>
            <div className="contact-index-row">
              <span className="contact-index-key">Research</span>
              <Link href="/contact" className="contact-index-val">→ Contact Page</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
