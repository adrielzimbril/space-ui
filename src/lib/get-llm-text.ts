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

function getAppRoot(): string {
  if (existsSync(path.join(process.cwd(), 'apps', 'www'))) {
    return path.join(process.cwd(), 'apps', 'www')
  }
  return process.cwd()
}

function resolveContentPath(filePath: string): string {
  if (path.isAbsolute(filePath) && existsSync(filePath)) {
    return filePath
  }
  const appRoot = getAppRoot()
  const candidates = [
    filePath,
    path.resolve(appRoot, filePath),
    path.resolve(appRoot, 'src', filePath.replace(/^src[\\/]/, '')),
    path.resolve(process.cwd(), filePath),
    path.resolve(process.cwd(), 'apps/www', filePath),
  ]
  for (const c of candidates) {
    if (existsSync(c)) return c
  }
  return path.resolve(appRoot, filePath)
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
