import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('richchang0721@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Head>
        <title>Contact — PIDA-LAB</title>
        <meta name="description" content="Contact PIDA-LAB for discussions, collaborations, or research alignment." />
      </Head>
      <Nav />
      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">Contact</div>
        <h1 className="static-h1">Let's talk about structure.</h1>
        <p className="static-lead">For discussions, collaborations, advertising, or research alignment.</p>

        <div className="static-divider" />

        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-card-icon">✉️</div>
            <div className="contact-card-label">General Inquiry</div>
            <div className="contact-card-value">richchang0721@gmail.com</div>
            <button className="contact-copy-btn" onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy Email'}
            </button>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">📢</div>
            <div className="contact-card-label">Advertising & Sponsorship</div>
            <div className="contact-card-value">richchang0721@gmail.com</div>
            <a href="mailto:richchang0721@gmail.com" className="contact-copy-btn">Send Email</a>
          </div>

          <div className="contact-card">
            <div className="contact-card-icon">🔬</div>
            <div className="contact-card-label">Research Collaboration</div>
            <div className="contact-card-value">richchang0721@gmail.com</div>
            <a href="mailto:richchang0721@gmail.com" className="contact-copy-btn">Send Email</a>
          </div>
        </div>

        <div className="static-divider" />

        <div className="static-section">
          <h2>What we're open to</h2>
          <p>We welcome conversations around AI system design, decision responsibility frameworks, and structural approaches to human-AI interaction. If your work touches these areas, we'd like to hear from you.</p>
          <p>We are <strong>not</strong> currently accepting guest posts or unsolicited content submissions.</p>
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
