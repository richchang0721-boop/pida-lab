import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { CATEGORIES } from '../../lib/categories'

export async function getStaticProps() {
  return { props: {} }
}

export default function CategoriesIndex() {
  return (
    <>
      <Head><title>Categories — PIDA-LAB</title></Head>
      <Nav />
      <div className="categories-page">
        <Link href="/" className="back-link">← Home</Link>
        <div className="section-header">
          <span className="section-title">分類 · Categories</span>
        </div>
        <div className="categories-grid">
          {CATEGORIES.map(cat => (
            <Link key={cat.slug} href={`/categories/${cat.slug}`}>
              <div className="category-card">
                <div className="category-card-icon">{cat.icon}</div>
                <h2>{cat.name}</h2>
                <p>{cat.desc}</p>
                <div className="category-card-count">Browse →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
