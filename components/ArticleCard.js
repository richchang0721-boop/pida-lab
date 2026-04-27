import Link from 'next/link'
import { CATEGORY_LABEL, TAG_CLASS } from '../lib/categories'

export default function ArticleCard({ post }) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="article-card">
        <div className="article-card-label">
          <span className={`article-tag ${TAG_CLASS[post.category] || ''}`}>
            {CATEGORY_LABEL[post.category] || post.category}
          </span>
          <span className="article-date">{post.date}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="article-card-footer">Read</div>
      </div>
    </Link>
  )
}
