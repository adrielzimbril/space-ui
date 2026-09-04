import { findNeighbour } from 'fumadocs-core/page-tree'
import { baseOptions } from '@/app/layout.config'
import type { NavItem } from '@/components/docs/layout/docs-pager'

export function getDocsNeighbours(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any,
  pageUrl: string,
): { prev?: NavItem; next?: NavItem } {
  const tree = source.getPageTree()
  const { previous, next: nextPage } = findNeighbour(tree, pageUrl)

  type GuideLink = { text: string; url: string }
  const isGuideLink = (l: unknown): l is GuideLink => {
    if (typeof l !== 'object' || l === null) return false
    const obj = l as Record<string, unknown>
    return typeof obj.url === 'string' && typeof obj.text === 'string'
  }
  const guideItems = (baseOptions.links ?? []).filter(isGuideLink)
  const guideIndex = guideItems.findIndex((it) => it.url === pageUrl)

  const prev = (() => {
    if (guideIndex >= 0 && guideItems.length > 0) {
      if (guideIndex > 0) {
        return {
          url: guideItems[guideIndex - 1].url,
          name: guideItems[guideIndex - 1].text,
        }
      }
      return undefined
    }

    if (previous) {
      return {
        url: previous.url,
        name: String(previous.name ?? 'Previous'),
      }
    }

    if (pageUrl.startsWith('/docs/components/')) {
      return { url: '/docs/components', name: 'Components' }
    }
    if (pageUrl.startsWith('/docs/primitives/')) {
      return { url: '/docs/primitives', name: 'Primitives' }
    }

    const isSectionRoot =
      pageUrl === '/docs/components' || pageUrl === '/docs/primitives' || pageUrl === '/docs/icons/get-started'
    if (isSectionRoot && guideItems.length > 0) {
      const last = guideItems[guideItems.length - 1]
      return { url: last.url, name: last.text }
    }

    return undefined
  })()

  const next =
    guideIndex >= 0 && guideItems.length > 0
      ? guideIndex < guideItems.length - 1
        ? {
            url: guideItems[guideIndex + 1].url,
            name: guideItems[guideIndex + 1].text,
          }
        : { url: '/docs/components', name: 'Components' }
      : nextPage
        ? { url: nextPage.url, name: String(nextPage.name ?? 'Next') }
        : undefined

  return { prev, next }
}
