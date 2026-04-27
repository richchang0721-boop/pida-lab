import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import { CATEGORY_LABEL, TAG_CLASS } from '../../lib/categories'

export async function getStaticPaths() {
  const { getAllPostIds } = require('../../lib/posts.server')
  return { paths: getAllPostIds(), fallback: false }
}

export async function getStaticProps({ params }) {
  const { getPostData } = require('../../lib/posts.server')
  const postData = await getPostData(params.id)
  return { props: { postData } }
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} — PIDA-LAB</title>
        <meta name="description" content={postData.excerpt} />
      </Head>
      <Nav />
      <article className="article-page">
        <Link href="/posts" className="back-link">← All Posts</Link>
        <div className="article-meta">
          <span className={`article-tag ${TAG_CLASS[postData.category] || ''}`}>
            {CATEGORY_LABEL[postData.category] || postData.category}
          </span>
          <span className="article-read">{postData.date}</span>
          {postData.readTime && (
            <span className="article-read">{postData.readTime} min read</span>
          )}
        </div>
        <h1>{postData.title}</h1>
        {postData.excerpt && <p className="article-subtitle">{postData.excerpt}</p>}
        <div className="article-body" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <Footer />
    </>
  )
}
