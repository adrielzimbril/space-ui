import type { PageTreeBuilderContext, PageTreeTransformer } from 'fumadocs-core/source'

export const attachFile: NonNullable<PageTreeTransformer['file']> = function (
  this: PageTreeBuilderContext,
  node,
  file,
) {
  if (!file) return node
  const loaded = this.storage.read(file)
  const data = loaded?.data

  if (data) {
    ;(node as any).frontmatter = data
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
