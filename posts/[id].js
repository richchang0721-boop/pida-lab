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
  const { getPostData, getSortedPostsData } = require('../../lib/posts.server')
  const postData = await getPostData(params.id)

  // Find next recommended post (same category first, then any)
  const allPosts = getSortedPostsData()
  const currentIndex = allPosts.findIndex(p => p.id === params.id)
  
  // Try same category first, excluding current
  const sameCat = allPosts.filter(p => p.id !== params.id && p.category === postData.category)
  const others = allPosts.filter(p => p.id !== params.id && p.category !== postData.category)
  
  // Pick: next in same category, or next overall
  const nextPost = sameCat[0] || others[0] || null

  return { props: { postData, nextPost: nextPost || null } }
}

export default function Post({ postData, nextPost }) {
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

        {/* NEXT POST */}
        {nextPost && (
          <div className="next-post-wrap">
            <div className="next-post-label">下一篇推薦 · Next Read</div>
            <Link href={`/posts/${nextPost.id}`}>
              <div className="next-post-card">
                <div className="next-post-meta">
                  <span className={`article-tag ${TAG_CLASS[nextPost.category] || ''}`}>
                    {CATEGORY_LABEL[nextPost.category] || nextPost.category}
                  </span>
                  <span className="article-read">{nextPost.date}</span>
                </div>
                <div className="next-post-title">{nextPost.title}</div>
                <div className="next-post-excerpt">{nextPost.excerpt}</div>
                <div className="next-post-cta">Read →</div>
              </div>
            </Link>
          </div>
        )}
      </article>
      <Footer />
    </>
  )
}
