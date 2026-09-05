import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkMdx from 'remark-mdx'
import { remarkInclude } from 'fumadocs-mdx/config'
import type { Page } from '@/lib/source'
import fs from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { siteConfig } from '@/lib/space-config'

const processor = remark()
  .use(remarkMdx)
  // needed for Fumadocs MDX
  .use(remarkInclude)
  .use(remarkGfm)

function resolveContentPath(filePath: string): string {
  if (path.isAbsolute(filePath) && existsSync(filePath)) {
    return filePath
  }
  const normalized = filePath.replace(/\\/g, '/')
  const contentMatch =
    normalized.match(/(?:^|\/)src\/content\/(.+)$/) || normalized.match(/(?:^|\/)content\/(.+)$/)
  const rel = contentMatch ? contentMatch[1] : filePath.replace(/^src[\\/]/, '')

  const candidates = [
    path.join(process.cwd(), 'src', 'content', rel),
    path.join(process.cwd(), 'apps', 'www', 'src', 'content', rel),
  ]
  for (const c of candidates) {
    if (existsSync(c)) return c
  }
  return path.join(process.cwd(), 'src', 'content', rel)
}

export async function getLLMText(page: Page | any) {
  if (!page.absolutePath) {
    throw new Error(`Missing absolutePath for ${page.url}`)
  }

  const resolvedPath = resolveContentPath(page.absolutePath)

  const processed = await processor.process({
    path: resolvedPath,
    value: await fs.readFile(resolvedPath),
  })

  // note: it doesn't escape frontmatter, it's up to you.
  return `# ${page.data.title}
URL: ${siteConfig.url}${page.url}

${processed.value}`
}
