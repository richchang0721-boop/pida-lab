import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const EXCLUDED = [
  {
    n: '4.1',
    title: 'Military and Paramilitary Applications',
    body: 'Weapons systems, automated targeting, tactical or strategic decision-making, and lethal or semi-lethal action control.'
  },
  {
    n: '4.2',
    title: 'Law Enforcement and Immediate Use of Force',
    body: 'Real-time physical restraint, pursuit, coercive force, or any action posing direct risk to human safety.'
  },
  {
    n: '4.3',
    title: 'Judicial and Legal Adjudication',
    body: 'Judicial rulings, sentencing recommendations, legal liability determination, recidivism risk assessment, or any decision producing binding or irreversible legal consequences.'
  },
  {
    n: '4.4',
    title: 'Administrative and Public Authority Decisions',
    body: 'Eligibility determinations, resource allocation, welfare distribution, risk classification, ranking systems, or any governmental decision materially affecting rights, obligations, or legal status.'
  },
  {
    n: '4.5',
    title: 'Traffic Safety and Real-Time Physical System Control',
    body: 'Autonomous driving, driver assistance systems (ADAS), intelligent traffic control, or any real-time physical actuation capable of causing bodily injury or death.'
  },
  {
    n: '4.6',
    title: 'Medical and Clinical Decision-Making',
    body: 'Diagnosis, treatment selection, medication recommendation, surgical or procedural decisions, life-support determinations, or any action involving irreversible health or life outcomes.'
  },
  {
    n: '4.7',
    title: 'Adult Sexual Interaction or Sexual Role-Play Systems',
    body: 'Systems designed for sexual simulation, intimate interaction, psychological manipulation, or dependency formation.'
  },
  {
    n: '4.8',
    title: 'Emotional Dependency Combined with Commercial Inducement',
    body: 'Systems designed to cultivate emotional attachment while employing monetization, pay-to-unlock intimacy, behavioral retention, or dependency-driven revenue mechanisms.'
  },
  {
    n: '4.9',
    title: 'Long-Term Personality Interaction with Minors',
    body: 'Systems targeting minors or designed to form sustained personality attachment, value shaping, or emotional substitution.'
  },
  {
    n: '4.10',
    title: 'Emotionally Vulnerable Populations',
    body: 'Systems targeting individuals with elevated risk of self-harm, suicide, addiction, severe depression, or psychological dependency.'
  },
  {
    n: '4.11',
    title: 'Behavioral Manipulation or Addiction-Driven Design',
    body: 'Systems primarily designed to induce behavioral compulsion, addiction, or prolonged engagement through psychological feedback loops.'
  },
  {
    n: '4.12',
    title: 'Real-World Role Substitution Systems',
    body: 'Systems intended to replace or simulate real human roles of high emotional or authoritative significance, such as family members, partners, mentors, or authority figures.'
  }
]

export default function Scope() {
  return (
    <>
      <Head>
        <title>Scope Limitations &amp; Explicit Exclusions — PIDA-LAB</title>
        <meta
          name="description"
          content="PIDA applies exclusively to pre-incident phases. This page states the temporal scope, the twelve explicitly excluded application domains, the embodied AI boundary, and the non-transfer of responsibility."
        />
      </Head>
      <Nav />

      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">Scope Limitations</div>
        <h1 className="static-h1">
          A framework that does not state<br />where it stops is not a framework.
        </h1>
        <p className="static-lead">
          PIDA is a pre-incident governance framework. It applies to design-time, training-time,
          and developmental stages — and to nothing after that. This page is the boundary
          disclosure: what PIDA is not, where it must not be used, and what referencing it does
          not transfer.
        </p>

        <blockquote>
          PIDA exists to clarify where responsibility <strong>should stop</strong>, not to
          legitimize actions that should never rely on a framework.
        </blockquote>

        <div className="static-divider" />

        {/* ── NATURE ── */}
        <div className="static-section">
          <h2>1 · Nature and Purpose</h2>
          <p>
            The <strong>Pre-Incident Responsibility Architecture (PIDA)</strong> is a conceptual
            and governance-oriented framework intended for use during the design-time,
            training-time, and developmental stages of artificial intelligence systems.
          </p>
          <p>
            PIDA is <strong>not</strong> an algorithm, model architecture, control mechanism, or
            execution system. It does <strong>not</strong> prescribe real-time commands,
            operational logic, physical actions, or deployment-level behavior.
          </p>
          <p>
            Its purpose is to clarify pre-incident responsibility allocation, role definition, and
            developmental governance considerations, prior to system deployment or operation.
          </p>
        </div>

        <div className="static-divider" />

        {/* ── TEMPORAL SCOPE ── */}
        <div className="static-section">
          <h2>2 · Temporal and Functional Scope</h2>
          <p><strong>PIDA applies exclusively to pre-incident phases</strong>, including:</p>
          <p>
            System design and planning · Training configuration and responsibility allocation ·
            Developmental governance discussions · Conceptual role and boundary definition
          </p>
          <p><strong>PIDA does not apply to:</strong></p>
          <p>
            Live system operation · Real-time decision-making · Physical actuation or execution ·
            Post-incident analysis, liability determination, or harm mitigation
          </p>
          <blockquote>
            Any system behavior occurring after deployment is outside the scope of PIDA.
          </blockquote>
        </div>

        <div className="static-divider" />

        {/* ── INTERPRETATIVE AUTHORITY ── */}
        <div className="static-section">
          <h2>3 · Interpretative Authority and Non-Transfer of Responsibility</h2>
          <p>
            The original author of PIDA retains interpretative authority over the intended
            conceptual scope, meaning, and limitations of the framework.
          </p>
          <p>
            Any third-party reference, adaptation, extension, or implementation of PIDA{' '}
            <strong>shall not be construed</strong> as representing or replacing the original
            interpretation.
          </p>
          <blockquote>
            Reference to, adoption of, or discussion of PIDA does not transfer responsibility for
            system implementation, deployment outcomes, operational behavior, or resulting
            consequences to the author of the framework.
          </blockquote>
        </div>

        <div className="static-divider" />

        {/* ── EXCLUDED DOMAINS ── */}
        <div className="static-section">
          <h2>4 · Explicitly Excluded Application Domains</h2>
          <p>
            Due to the nature of PIDA as a pre-incident governance framework, it is{' '}
            <strong>explicitly excluded</strong> from the following application domains and{' '}
            <strong>shall not be used</strong> as a justification, authorization, or
            responsibility-shifting basis therein.
          </p>

          <div style={{ marginTop: '1.75rem' }}>
            {EXCLUDED.map((d) => (
              <div
                key={d.n}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '0.9rem 0',
                  borderTop: '1px solid var(--border)'
                }}
              >
                <span
                  style={{
                    color: 'var(--accent)',
                    fontVariantNumeric: 'tabular-nums',
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    paddingTop: '0.15rem',
                    minWidth: '2.4rem'
                  }}
                >
                  {d.n}
                </span>
                <div>
                  <div style={{ marginBottom: '0.35rem' }}>{d.title}</div>
                  <div
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      lineHeight: 1.7
                    }}
                  >
                    {d.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="static-divider" />

        {/* ── EMBODIED AI ── */}
        <div className="static-section">
          <h2>5 · Embodied AI Boundary</h2>
          <p>
            Humanoid robots, bionic systems, or other forms of embodied artificial intelligence{' '}
            <strong>may reference PIDA solely at the design, training, or developmental
            governance level</strong>, for conceptual responsibility allocation discussions.
          </p>
          <p><strong>PIDA does not apply to:</strong></p>
          <p>
            Real-time physical interaction · Behavioral execution · Task performance · Human safety
            risk assumption
          </p>
          <blockquote>
            Any behavior resulting from manufacturer configuration, system integration, user
            operation, parameter modification, or third-party intervention falls entirely outside
            the scope of PIDA and shall not be attributed to the framework or its author.
          </blockquote>
        </div>

        <div className="static-divider" />

        {/* ── HIGH RISK ── */}
        <div className="static-section">
          <h2>6 · High-Risk Research and Infrastructure</h2>
          <p>
            PIDA does not apply to real-time control, mission execution, or failure-risk assumption
            in aerospace, space systems, or other high-risk critical infrastructure.
          </p>
          <p>
            In such domains, PIDA may only be referenced at an abstract governance discussion
            level, and shall not constitute a basis for operational design, mission control, or
            risk responsibility.
          </p>
        </div>

        <div className="static-divider" />

        {/* ── R&D ── */}
        <div className="static-section">
          <h2>7 · Research and Development Clarification</h2>
          <p>
            PIDA may be referenced in general research, development, or exploratory contexts for
            responsibility and governance discussion.
          </p>
          <p><strong>PIDA does not apply to:</strong> human subject intervention · clinical
            application · decisions involving direct life or health risk.</p>
        </div>

        <div className="static-divider" />

        {/* ── SUMMARY ── */}
        <div className="static-section">
          <h2>8 · Summary Statement</h2>
          <p>
            The exclusions and boundaries defined herein are intrinsic to the nature of PIDA as a
            pre-incident responsibility framework and <strong>do not constitute a value
            judgment</strong> on technology, research, or innovation.
          </p>
          <blockquote>
            Any use of PIDA outside its defined scope constitutes a misapplication and shall not
            serve as legal, ethical, or operational justification, nor as a mechanism for
            responsibility transfer.
          </blockquote>
        </div>

        <div className="static-divider" />

        <p className="static-footer-note">
          <span>Source</span> — This page reproduces the substance of the PIDA Scope Limitations,
          Explicit Exclusions, and Interpretative Boundaries disclosure (Non-Provisional Disclosure
          Draft v1.2, filed 2025-12-15). It is provided as a scope limitation and interpretative
          boundary disclosure. It does not constitute a claim, algorithm, implementation method, or
          operational instruction, and shall not be construed as prescribing real-time behavior,
          system control, or executable processes. See also{' '}
          <Link href="/research">Research</Link> and{' '}
          <Link href="/for-governance">For Governance</Link>.
        </p>
      </div>

      <Footer />
    </>
  )
}
