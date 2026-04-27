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
        <meta name="description" content="AI is not a capability problem. It is a relationship problem." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Nav />

      <section className="hero">
        <div className="hero-label">PIDA-LAB · AI Deconstruction Station</div>
        <h1>
          AI is not a <em>capability</em> problem.<br />
          It is a <em>relationship</em> problem.
        </h1>
        <p className="hero-desc">
          我們不解讀 AI 的技術邊界，<br />
          我們解構 AI 與人之間的決策、責任與信任結構。
        </p>
        <Link href="/posts" className="hero-cta">探索所有文章 →</Link>
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
