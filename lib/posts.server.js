const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.join(process.cwd(), 'posts')

function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return { id, ...matterResult.data }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(f => f.endsWith('.md'))
    .map(fileName => ({ params: { id: fileName.replace(/\.md$/, '') } }))
}

async function getPostData(id) {
  const { remark } = await import('remark')
  const { default: remarkHtml } = await import('remark-html')

  const fullPath = path.join(postsDirectory, `${id}.md`)
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
    `<div class="ad-slot"><div class="ad-slot-inner"><p>廣告版位 · 聯繫合作</p><a href="mailto:ad@pida-lab.com">ad@pida-lab.com</a></div></div>`
  )

  return { id, contentHtml, ...matterResult.data }
}

function getPostsByCategory(category) {
  return getSortedPostsData().filter(p => p.category === category)
}

module.exports = { getSortedPostsData, getAllPostIds, getPostData, getPostsByCategory }
