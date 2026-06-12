const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'posts')

// Recursively collect all .md files under postsDirectory
// Returns array of { id, fullPath }
// id is the relative path without .md, using '/' as separator
// e.g. posts/ai-decision-illusions/ai-decision-illusions.md → id = 'ai-decision-illusions/ai-decision-illusions'
// e.g. posts/about-pida.md → id = 'about-pida'
function collectAllMdFiles(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let results = []
  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results = results.concat(collectAllMdFiles(fullPath, relPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      const id = relPath.replace(/\.md$/, '')
      results.push({ id, fullPath })
    }
  }
  return results
}

// id is always the full relative path (e.g. 'series/part-1' or 'flat-post')
// ArticleCard uses /posts/${post.id} → works with [...id] catch-all route
function getSortedPostsData() {
  const files = collectAllMdFiles(postsDirectory)
  return files
    .map(({ id, fullPath }) => {
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return { id, ...matterResult.data }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

// For pages/posts/[...id].js (catch-all route)
// params.id is an array of path segments
// e.g. 'responsibility-structure/part-1' → params: { id: ['responsibility-structure', 'part-1'] }
// e.g. 'flat-post' → params: { id: ['flat-post'] }
function getAllPostIds() {
  const files = collectAllMdFiles(postsDirectory)
  return files.map(({ id }) => ({
    params: { id: id.split('/') }
  }))
}

// id received from params.id (array) → join back to string for file lookup
// e.g. ['responsibility-structure', 'part-1'] → 'responsibility-structure/part-1'
async function getPostData(id) {
  const { remark } = await import('remark')
  const { default: remarkHtml } = await import('remark-html')

  // id may be array (from catch-all params) or string
  const idStr = Array.isArray(id) ? id.join('/') : id

  // Try exact path first
  let fullPath = path.join(postsDirectory, `${idStr}.md`)
  if (!fs.existsSync(fullPath)) {
    // Fallback: search all files for matching id
    const files = collectAllMdFiles(postsDirectory)
    const match = files.find(f => f.id === idStr)
    if (!match) throw new Error(`Post not found: ${idStr}`)
    fullPath = match.fullPath
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const paragraphs = matterResult.content.split('\n\n').filter(p => p.trim())
  const adIndex = Math.round(paragraphs.length * 0.5)
  const withAd = [
    ...paragraphs.slice(0, adIndex),
    '<!-- AD_SLOT -->',
    ...paragraphs.slice(adIndex),
  ].join('\n\n')

  const processedContent = await remark().use(remarkHtml).process(withAd)
  let contentHtml = processedContent.toString()

  contentHtml = contentHtml.replace(
    '<p><!-- AD_SLOT --></p>',
    `<div class="ad-slot"><div class="ad-slot-inner"><p>廣告版位 · 聯繫合作</p><a href="mailto:richchang0721@gmail.com">richchang0721@gmail.com</a></div></div>`
  )

  return { id: idStr, contentHtml, ...matterResult.data }
}

function getPostsByCategory(category) {
  return getSortedPostsData().filter(p => p.category === category)
}

module.exports = { getSortedPostsData, getAllPostIds, getPostData, getPostsByCategory }
