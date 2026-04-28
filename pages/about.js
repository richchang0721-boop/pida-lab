import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About — PIDA-LAB</title>
        <meta name="description" content="PIDA is a framework for defining interaction, decision, and responsibility in AI systems." />
      </Head>
      <Nav />
      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">About</div>
        <h1 className="static-h1">This site is not a personal blog.</h1>
        <p className="static-lead">It is a structured exploration of how humans interact with AI.</p>

        <div className="static-divider" />

        <div className="static-section">
          <h2>Who is behind this</h2>
          <p>This work is developed by an independent observer and system builder.</p>
          <p>The focus is not on building more capable AI systems, but on understanding the structure in which AI operates.</p>
        </div>

        <div className="static-section">
          <h2>Why this exists</h2>
          <p>Most discussions about AI focus on capability, intelligence, and alignment. These are important.</p>
          <p>But they do not address a more fundamental question:</p>
          <blockquote>What is the structure of interaction between humans and AI?</blockquote>
          <p>PIDA was created to explore this gap.</p>
        </div>

        <div className="static-section">
          <h2>What PIDA is</h2>
          <p>PIDA is not a model. It is not an alignment technique.</p>
          <blockquote>A framework for defining interaction, decision, and responsibility.</blockquote>
        </div>

        <div className="static-section">
          <h2>Direction</h2>
          <p>This system is evolving. It is not designed to provide immediate answers, but to expose the structural questions that current approaches ignore.</p>
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
