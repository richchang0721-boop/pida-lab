import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ArticleCard from '../../components/ArticleCard'
import { CATEGORIES } from '../../lib/categories'

export async function getStaticPaths() {
  return { paths: CATEGORIES.map(c => ({ params: { slug: c.slug } })), fallback: false }
}

export async function getStaticProps({ params }) {
  const { getPostsByCategory } = require('../../lib/posts.server')
  const cat = CATEGORIES.find(c => c.slug === params.slug)
  const posts = getPostsByCategory(params.slug)
  return { props: { cat, posts } }
}

export default function CategoryPage({ cat, posts }) {
  return (
    <>
      <Head><title>{cat.name} — PIDA-LAB</title></Head>
      <Nav />
      <div className="categories-page">
        <Link href="/categories" className="back-link">← Categories</Link>
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{cat.icon}</span>
            <div>
              <div className="section-title">{cat.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{cat.desc}</div>
            </div>
          </div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: '0.65rem', color: 'var(--text-dim)' }}>{posts.length} articles</span>
        </div>
        {posts.length > 0 ? (
          <div className="articles-grid">
            {posts.map(post => <ArticleCard key={post.id} post={post} />)}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem', marginTop: '2rem' }}>
            No posts yet in this category.
          </p>
        )}
      </div>
      <Footer />
    </>
  )
}
