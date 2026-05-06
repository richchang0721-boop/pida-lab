import { getSortedPostsData } from '../lib/posts.server'

export default function Sitemap() {}

export async function getServerSideProps({ res }) {
  const baseUrl = 'https://www.pida-lab.com'

  // Static pages
  const staticPages = [
    '',
    '/demo',
    '/about',
    '/contact',
    '/posts',
    '/categories',
  ]

  // Dynamic: auto-generate from all posts
  const allPosts = getSortedPostsData()
  const postPages = allPosts.map(post => `/posts/${post.id}`)

  const allPages = [...staticPages, ...postPages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
  </url>`).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}
