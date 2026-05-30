const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'posts')

// Recursively collect all .md files under postsDirectory
// Returns array of { id, fullPath }
// id is the relative path without .md, using '/' as separator
// e.g. posts/ai-decision-illusions/ai-decision-illusions-1.md → id = 'ai-decision-illusions/ai-decision-illusions-1'
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

function getAllPostIds() {
  const files = collectAllMdFiles(postsDirectory)
  // Next.js dynamic route [id] needs to support nested paths via catch-all
  // Since pages/posts/[id].js uses a single segment, we encode '/' as '--'
  // OR we return ids with slash — Next.js [id] won't match, so we use encodeURIComponent-safe slugs
  // Best approach: flatten subfolder files using their filename only (no folder prefix)
  // so ai-decision-illusions/ai-decision-illusions-1.md → id = 'ai-decision-illusions-1'
  // and ai-decision-illusions/ai-decision-illusions.md → id = 'ai-decision-illusions'
  return files.map(({ id }) => ({
    params: { id: id.includes('/') ? id.split('/').pop() : id }
  }))
}

async function getPostData(id) {
  const { remark } = await import('remark')
  const { default: remarkHtml } = await import('remark-html')

  // Try root first, then search subdirectories
  let fullPath = path.join(postsDirectory, `${id}.md`)
  if (!fs.existsSync(fullPath)) {
    // Search in subdirectories by filename
    const files = collectAllMdFiles(postsDirectory)
    const match = files.find(f => f.id.split('/').pop() === id)
    if (match) fullPath = match.fullPath
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

  return { id, contentHtml, ...matterResult.data }
}

function getPostsByCategory(category) {
  return getSortedPostsData().filter(p => p.category === category)
}

module.exports = { getSortedPostsData, getAllPostIds, getPostData, getPostsByCategory }
