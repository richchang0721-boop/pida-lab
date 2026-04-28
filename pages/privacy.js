import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — PIDA-LAB</title>
      </Head>
      <Nav />
      <div className="static-page">
        <Link href="/" className="back-link">← Home</Link>

        <div className="static-label">Legal</div>
        <h1 className="static-h1">Privacy Policy</h1>
        <p className="static-lead">Last updated: April 2026</p>

        <div className="static-divider" />

        <div className="static-section">
          <h2>Overview</h2>
          <p>PIDA-LAB is a static content site. We are committed to protecting your privacy and being transparent about what data, if any, is collected when you visit this site.</p>
        </div>

        <div className="static-section">
          <h2>Data We Collect</h2>
          <p>This site does not collect personally identifiable information directly. We do not require registration, login, or any form submission to access content.</p>
          <p>However, this site is hosted on <strong>Vercel</strong>, which may collect standard server logs including IP addresses, browser type, and pages visited for infrastructure purposes. Please refer to <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel's Privacy Policy</a> for details.</p>
        </div>

        <div className="static-section">
          <h2>Cookies</h2>
          <p>This site does not set any first-party cookies. Third-party services (such as Google Fonts) may set cookies in accordance with their own privacy policies.</p>
        </div>

        <div className="static-section">
          <h2>Third-Party Services</h2>
          <p>This site uses <strong>Google Fonts</strong> for typography, which may log font request data. We use <strong>Vercel Analytics</strong> (if enabled) for anonymous traffic analysis with no personal data stored.</p>
        </div>

        <div className="static-section">
          <h2>Advertising</h2>
          <p>This site contains sponsored content slots. Advertisers are disclosed within the content. We do not share visitor data with advertisers.</p>
        </div>

        <div className="static-section">
          <h2>Your Rights</h2>
          <p>Since we do not collect personal data, there is nothing to request deletion of. If you have concerns about data processed by our hosting provider, please contact Vercel directly.</p>
        </div>

        <div className="static-section">
          <h2>Changes to This Policy</h2>
          <p>This policy may be updated as the site evolves. Changes will be reflected by updating the date at the top of this page.</p>
        </div>

        <div className="static-section">
          <h2>Contact</h2>
          <p>For privacy-related questions, please reach out via the <Link href="/contact" style={{color:'var(--accent)'}}>Contact page</Link>.</p>
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
