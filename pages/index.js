import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import ArticleCard from '../components/ArticleCard'
import { CATEGORIES } from '../lib/categories'

const START_HERE = [
  { step: '01', label: 'Entry Point', title: 'PIDA Entry Point — This Is Not a Blog. This Is a System.', href: '/posts/pida-entry-point' },
  { step: '02', label: 'Responsibility Layer', title: '當 AI 做錯決策，誰來負責？', href: '/posts/ai-decision-responsibility' },
  { step: '03', label: 'Relationship Layer', title: '你信任 AI，但你從未設計過這段關係', href: '/posts/ai-trust-relationship' },
  { step: '04', label: 'System Layer', title: '大多數 AI 系統失敗，不是因為模型太爛', href: '/posts/ai-system-design-failure' },
]

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
        <Link href="/posts/pida-entry-point" className="hero-cta">Read the Entry Point →</Link>
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

      <section className="section">
        <div className="section-header">
          <span className="section-title">Start Here · 從這裡開始</span>
          <Link href="/posts/pida-entry-point" className="section-link">Entry Point →</Link>
        </div>
        <div className="start-here-grid">
          {START_HERE.map(item => (
            <Link key={item.step} href={item.href}>
              <div className="start-here-card">
                <div className="start-here-step">{item.step}</div>
                <div className="start-here-label">{item.label}</div>
                <div className="start-here-title">{item.title}</div>
                <div className="start-here-arrow">→</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="divider" />

      <section className="section">
        <div className="section-header">
          <span className="section-title">最新文章 · Latest Posts</span>
          <Link href="/posts" className="section-link">View All →</Link>
        </div>
        <div className="articles-grid">
          {latestPosts.map(post => <ArticleCard key={post.id} post={post} />)}
        </div>
      </section>

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
