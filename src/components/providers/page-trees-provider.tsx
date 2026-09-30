'use client'

import * as React from 'react'
import type { Root } from 'fumadocs-core/page-tree'

/**
 * The docs, library and resources navigation trees.
 *
 * Built once on the server (root layout) and handed down through context, so client navigation
 * (command menu, sidebars, mobile drawer) never imports `@/lib/source`, which would ship every
 * compiled MDX page and the whole icon set to the browser.
 */
export interface PageTrees {
  docs: Root
  library: Root
  resources: Root
}

const PageTreesContext = React.createContext<PageTrees | null>(null)

export function PageTreesProvider({ trees, children }: { trees: PageTrees; children: React.ReactNode }) {
  return <PageTreesContext.Provider value={trees}>{children}</PageTreesContext.Provider>
}

export function usePageTrees(): PageTrees {
  const trees = React.useContext(PageTreesContext)
  if (!trees) throw new Error('usePageTrees must be used inside <PageTreesProvider>.')
  return trees
}

/** The three trees in navigation order: docs, library, resources. */
export function usePageTreeList(): Root[] {
  const { docs, library, resources } = usePageTrees()
  return React.useMemo(() => [docs, library, resources], [docs, library, resources])
}
