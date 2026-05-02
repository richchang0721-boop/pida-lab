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
            <span className="hero-stat-label">深度分析</span>
          </div>
          <div>
            <span className="hero-stat-num">{CATEGORIES.length}</span>
            <span className="hero-stat-label">核心分類</span>
          </div>
          <div>
            <span className="hero-stat-num">0%</span>
            <span className="hero-stat-label">廢話含量</span>
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

      {/* LATEST ARTICLES */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">最新文章 · Latest Posts</span>
          <Link href="/posts" className="section-link">View All →</Link>
        </div>
        <div className="articles-grid">
          {latestPosts.map(post => <ArticleCard key={post.id} post={post} />)}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header">
          <span className="section-title">分類 · Categories</span>
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

      <Footer />
    </>
  )
}
