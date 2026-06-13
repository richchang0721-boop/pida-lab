import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About — PIDA-LAB</title>
        <meta name="description" content="PIDA-LAB is an independent AI research platform exploring the structural relationship between humans and AI systems." />
      </Head>
      <Nav />
      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">About</div>
        <h1 className="static-h1">This is not a blog.</h1>
        <p className="static-lead">It is a structured research platform exploring how AI systems should be governed, bounded, and held accountable — before capability outpaces structure.</p>

        <div className="static-divider" />

        <div className="static-section">
          <h2>Who is behind this</h2>
          <p>Rich Chang is an independent AI researcher based in Cambodia, operating under pida-lab.com. Background in IT management with substantial hardware engineering experience. Research is conducted as a side project alongside a full-time day job, limiting available hours to evenings.</p>
          <p>This work is intentionally counter-mainstream: not built around commercialization, rapid deployment, or scalability. The deeper research question is what happens to people who interact long-term with an entity that never refuses or resists — and what structural safeguards should exist before that interaction becomes the norm.</p>
        </div>

        <div className="static-section">
          <h2>Why this exists</h2>
          <p>Most discussions about AI focus on capability, intelligence, and alignment. These are important. But they do not address a more fundamental question:</p>
          <blockquote>What is the structure of interaction between humans and AI — and who is responsible when that structure fails?</blockquote>
          <p>PIDA-LAB was created to explore this gap. The work spans identity formation, semantic stability, decision responsibility, and governance architecture — treated not as separate problems but as interconnected structural failures waiting to happen.</p>
        </div>

        <div className="static-section">
          <h2>What PIDA is</h2>
          <p>PIDA (Primordial Indeterminate Developmental AI) is the flagship framework. It explores how AI personality forms through environmental exposure rather than direct instruction — and holds a mirror to the humans on the other side of that interaction.</p>
          <blockquote>A framework for defining interaction, decision, and responsibility in AI systems — before intelligence scales further.</blockquote>
        </div>

        <div className="static-section">
          <h2>Published research</h2>
          <p>All published frameworks carry verifiable citations:</p>
          <div className="about-pubs">
            <div className="about-pub-row">
              <span className="about-pub-key">USPTO</span>
              <span className="about-pub-val">PIDA · Provisional Patent Application No. 64/045,009 · Patent Pending</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">Zenodo</span>
              <span className="about-pub-val">RSTA (Recursive State Transition Architecture) · Published with valid DOI</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">SSRN</span>
              <span className="about-pub-val">CIP — Cognitive Integrity Protocol: The Red Lines for Brain-Computer Interfaces · Posted 13 Apr 2026 · Cited by Argentine professor</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">SSRN</span>
              <span className="about-pub-val">PIDA — A Pre-Incident Responsibility Architecture for Developmental, Role-Playing, and Embodied AI Systems · Posted 13 Jan 2026</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">SSRN</span>
              <span className="about-pub-val">STME — A Structured Multi-State Transition Framework for AI Cognitive Systems · Posted 29 Apr 2026</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">SSRN</span>
              <span className="about-pub-val">PSP — Persona Sovereignty Protocol for Long-Horizon AI Systems · Posted 09 May 2026</span>
            </div>
            <div className="about-pub-row">
              <span className="about-pub-key">In progress</span>
              <span className="about-pub-val">OSD (Observable Semantic Dynamics) · Under development</span>
            </div>
          </div>
        </div>

        <div className="static-section">
          <h2>Direction</h2>
          <p>This platform is evolving. It is not designed to provide immediate answers, but to expose the structural questions that current approaches ignore — and to build the observational and governance infrastructure that will be needed when those questions can no longer be deferred.</p>
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
