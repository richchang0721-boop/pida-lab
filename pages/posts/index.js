import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ArticleCard from '../../components/ArticleCard'

export async function getStaticProps() {
  const { getSortedPostsData } = require('../../lib/posts.server')
  return { props: { allPosts: getSortedPostsData() } }
}

export default function AllPosts({ allPosts }) {
  return (
    <>
      <Head><title>All Posts — PIDA-LAB</title></Head>
      <Nav />
      <div className="categories-page">
        <Link href="/" className="back-link">← Home</Link>
        <div className="section-header">
          <span className="section-title">所有文章 · All Posts ({allPosts.length})</span>
        </div>
        <div className="articles-grid">
          {allPosts.map(post => <ArticleCard key={post.id} post={post} />)}
        </div>
      </div>
      <Footer />
    </>
  )
}
