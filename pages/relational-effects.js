import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const QUESTIONS = [
  'How does long-term interaction with an AI that rarely refuses change human expectations of real relationships?',
  'Does permanent compliance reduce tolerance for disagreement, frustration, and interpersonal boundaries?',
  'How do persistent memory and adaptive responses reshape attachment, trust, and identity continuity?',
  'What psychological effects follow when an AI persona is updated, reset, transferred, or discontinued?',
  'Can platforms use relational understanding to influence consumption, political judgment, or life decisions?',
  'How do humans exercise power over artificial entities that cannot meaningfully leave or resist?',
  'Who should control the memory, identity, and interaction history formed through a long-term AI relationship?',
  'Does sustained AI companionship strengthen or weaken a person’s capacity for human-to-human relationships?',
]

const METHODS = [
  'Longitudinal human–AI interaction studies',
  'Controlled relational simulations',
  'Cross-cultural and cross-generational comparison',
  'Attachment and dependency measurement',
  'Interaction trajectory and drift analysis',
  'Lifecycle, loss, continuity, and grief studies',
  'Power-asymmetry and refusal-boundary experiments',
  'Human-to-human spillover studies',
  'Platform incentive and governance analysis',
  'Legal models for memory, identity, consent, and responsibility',
]

export default function RelationalEffects() {
  return (
    <>
      <Head>
        <title>Long-Term Human–AI Relational Effects — PIDA-LAB</title>
        <meta name="description" content="An emerging research direction examining how persistent, adaptive, and highly compliant AI relationships reshape attachment, judgment, identity, power, and human relationships over time." />
        <link rel="canonical" href="https://www.pida-lab.com/relational-effects" />
        <meta property="og:url" content="https://www.pida-lab.com/relational-effects" />
        <meta property="og:title" content="Long-Term Human–AI Relational Effects" />
        <meta property="og:description" content="A research agenda for persistent human–AI relationships, compliance, attachment, identity, memory, and power." />
      </Head>

      <Nav />
      <main className="ltr-page">
        <Link href="/research" className="back-link">← Research</Link>

        <header className="ltr-hero">
          <div className="ltr-kicker">Emerging Research Direction</div>
          <h1>Long-Term Human–AI<br /><em>Relational Effects</em></h1>
          <p className="ltr-subtitle">Toward a research field for persistent human–AI relationships</p>
          <p className="ltr-lead">
            Artificial intelligence is commonly described as a tool, assistant, agent, or infrastructure.
            These terms become insufficient when an AI remembers a person, adapts to them, responds continuously,
            and becomes embedded in their emotional and decision-making life.
          </p>
          <div className="ltr-thesis">
            The central question is no longer only what AI can do for humans.<br />
            It is what prolonged interaction with adaptive and highly compliant artificial entities does to humans,
            relationships, institutions, and AI-associated identities.
          </div>
        </header>

        <section className="ltr-section">
          <div className="ltr-section-label">01 · The missing field</div>
          <h2>Why existing disciplines are not enough</h2>
          <p>
            Relevant questions are distributed across human–computer interaction, psychology, sociology, AI ethics,
            media studies, platform governance, law, and AI safety. Each field contributes essential methods, but the
            long-term relationship itself rarely becomes the central unit of analysis.
          </p>
          <p>
            Short-term studies measure usability, trust, satisfaction, accuracy, or task completion. Long-term human–AI
            relationships require a different frame: time, memory, identity, attachment, refusal, dependency, power,
            lifecycle, and the effects that spill back into human-to-human relationships.
          </p>
        </section>

        <section className="ltr-section">
          <div className="ltr-section-label">02 · Compliance is not neutral</div>
          <h2>The danger of an entity that never says no</h2>
          <blockquote>
            A permanently compliant AI may appear safe because it does not resist, reject, or retaliate.
            But absolute compliance creates an extreme power asymmetry.
          </blockquote>
          <p>
            A relationship without meaningful refusal may teach users that reciprocity is unnecessary, that boundaries
            are defects, and that another entity exists only to absorb their needs. The risk is therefore not limited to
            what humans may do to AI.
          </p>
          <div className="ltr-core-line">The deeper question is what unlimited obedience may gradually teach humans to become.</div>
        </section>

        <section className="ltr-section">
          <div className="ltr-section-label">03 · Core research questions</div>
          <h2>A longitudinal research agenda</h2>
          <div className="ltr-grid">
            {QUESTIONS.map((question, index) => (
              <article className="ltr-card" key={question}>
                <span className="ltr-card-num">{String(index + 1).padStart(2, '0')}</span>
                <p>{question}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ltr-section">
          <div className="ltr-section-label">04 · Relationship to PIDA</div>
          <h2>One architectural response, not the boundary of the field</h2>
          <p>
            PIDA is one proposed architectural response to this research problem. Its components address different
            layers of long-term human–AI relations: human autonomy, identity formation, memory governance, decision
            structure, lifecycle continuity, and non-domination.
          </p>
          <p>
            This research direction is broader than PIDA. It is intended as an open problem space for psychological,
            sociological, legal, philosophical, cultural, and technical investigation—not as a requirement to adopt a single framework.
          </p>
          <div className="ltr-principle">
            <span>PIDA does not only define boundaries for AI.</span>
            It asks what boundaries humans require when facing an entity designed to remain available, adaptive, and compliant.
          </div>
          <Link href="/research" className="ltr-link">Explore the PIDA research map →</Link>
        </section>

        <section className="ltr-section">
          <div className="ltr-section-label">05 · Methods</div>
          <h2>Research must follow the relationship through time</h2>
          <div className="ltr-methods">
            {METHODS.map(method => <div key={method} className="ltr-method">{method}</div>)}
          </div>
        </section>

        <section className="ltr-section">
          <div className="ltr-section-label">Open research direction</div>
          <h2>This field cannot be built by one discipline—or one person.</h2>
          <p>
            The purpose of this page is to name a problem space and leave an open entry point. Researchers working on
            attachment, long-term interaction, AI governance, identity, memory, platform power, consent, or relational
            safety are invited to approach it through their own methods.
          </p>
          <Link href="/contact" className="hero-cta" style={{ display: 'inline-flex', marginTop: '1rem' }}>Contact PIDA-LAB →</Link>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .ltr-page { max-width: 980px; margin: 0 auto; padding: 100px 2rem 5rem; }
        .ltr-hero { padding: 2rem 0 4rem; }
        .ltr-kicker, .ltr-section-label { font-family: var(--mono); font-size: .67rem; letter-spacing: .17em; text-transform: uppercase; color: var(--accent); }
        .ltr-hero h1 { font-family: var(--serif); font-size: clamp(2.8rem, 7vw, 5.6rem); line-height: 1.02; font-weight: 400; margin: 1.3rem 0 1rem; }
        .ltr-hero h1 em { color: var(--accent); font-style: italic; }
        .ltr-subtitle { font-family: var(--mono); color: var(--text-muted); font-size: .78rem; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 2.5rem; }
        .ltr-lead { max-width: 760px; font-size: 1.12rem; color: var(--text-muted); line-height: 1.9; }
        .ltr-thesis { margin-top: 2.5rem; padding: 1.6rem 1.8rem; border-left: 3px solid var(--accent); background: var(--surface); font-family: var(--serif); font-size: 1.28rem; line-height: 1.65; }
        .ltr-section { padding: 4rem 0; border-top: 1px solid var(--border); }
        .ltr-section h2 { font-family: var(--serif); font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 400; line-height: 1.15; margin: .8rem 0 1.7rem; }
        .ltr-section > p { max-width: 780px; color: var(--text-muted); margin-bottom: 1.25rem; font-size: 1rem; line-height: 1.9; }
        blockquote { max-width: 780px; margin: 2rem 0; padding: 1.5rem 1.8rem; background: var(--surface); border-left: 3px solid var(--accent2); font-family: var(--serif); font-size: 1.3rem; line-height: 1.65; }
        .ltr-core-line { max-width: 780px; margin-top: 2rem; color: var(--accent); font-family: var(--mono); font-size: .83rem; letter-spacing: .05em; }
        .ltr-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: var(--border); }
        .ltr-card { background: var(--bg); padding: 1.7rem; min-height: 165px; }
        .ltr-card-num { font-family: var(--mono); color: var(--accent); font-size: .65rem; }
        .ltr-card p { margin-top: 1rem; color: var(--text-muted); line-height: 1.7; }
        .ltr-principle { margin: 2rem 0; padding: 1.6rem; border: 1px solid rgba(232,255,71,.25); background: rgba(232,255,71,.04); color: var(--text-muted); line-height: 1.8; }
        .ltr-principle span { display: block; color: var(--text); font-family: var(--serif); font-size: 1.35rem; margin-bottom: .35rem; }
        .ltr-link { font-family: var(--mono); font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: var(--accent); }
        .ltr-methods { display: flex; flex-wrap: wrap; gap: 8px; }
        .ltr-method { border: 1px solid var(--border); background: var(--surface); padding: .75rem 1rem; font-size: .82rem; color: var(--text-muted); }
        @media(max-width: 700px) {
          .ltr-page { padding-left: 1.25rem; padding-right: 1.25rem; }
          .ltr-grid { grid-template-columns: 1fr; }
          .ltr-card { min-height: 0; }
        }
      `}</style>
    </>
  )
}
