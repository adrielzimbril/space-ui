import type { PageTreeBuilderContext, PageTreeTransformer } from 'fumadocs-core/source'

const NAV_FIELDS = [
  'title',
  'description',
  'icon',
  'status',
  'beta',
  'isPro',
  'pro',
  'createdAt',
  'releaseDate',
  'updatedAt',
] as const

export const attachFile: NonNullable<PageTreeTransformer['file']> = function (
  this: PageTreeBuilderContext,
  node,
  file,
) {
  if (!file) return node
  const loaded = this.storage.read(file)
  // Frontmatter shape varies per collection; read it as a plain record.
  const data = loaded?.data as Record<string, any> | undefined

  if (data) {
    // Only the fields navigation reads (badges, Pro flag, dates). The full page data holds the
    // compiled MDX, the TOC and functions: attached here it would bloat every tree sent to the client.
    ;(node as any).frontmatter = Object.fromEntries(
      NAV_FIELDS.filter((key) => data[key] !== undefined).map((key) => [key, data[key]]),
    )
    if (data.status) {
      ;(node as any).badge = data.status
    } else if (data.beta) {
      ;(node as any).badge = 'beta'
    }
    if (data.icon) {
      ;(node as any).iconName = data.icon
    }
  }

  return node
}
