import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { remarkInclude } from 'fumadocs-mdx/config'
import type { Page } from '@/lib/source'
import fs from 'node:fs/promises'
import { siteConfig } from '@/lib/space-config'

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm)

export async function getLLMText(page: Page | any) {
  if (!page.absolutePath) {
    throw new Error(`Missing absolutePath for ${page.url}`)
  }

  const processed = await processor.process({
    path: page.absolutePath,
    value: await fs.readFile(page.absolutePath),
  })

  // note: it doesn't escape frontmatter, it's up to you.
  return `# ${page.data.title}
URL: ${siteConfig.url}${page.url}

${processed.value}`
}
