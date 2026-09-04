export const Mode = {
  split: 'split',
  standard: 'standard',
  both: 'both',
} as const

export type Mode = (typeof Mode)[keyof typeof Mode]

export const LayoutMode = {
  split: Mode.split,
  standard: Mode.standard,
} as const

export type LayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode]

export interface PageLayoutConstraint {
  mode?: Mode
  defaultMode?: LayoutMode
}

export interface PreviewOptions {
  name: string
  iframe?: boolean
  bigScreen?: boolean
  title?: string
  description?: string
  variant?: 'default' | 'showcase' | 'card'
  restart?: boolean
  open?: boolean
  allowCopy?: boolean
  contained?: boolean
  container?: boolean
  align?: 'start' | 'center' | 'end'
  className?: string
}

export function normalizePreviewConfig(preview?: string | PreviewOptions | null): PreviewOptions | null {
  if (!preview) return null
  if (typeof preview === 'string') {
    return { name: preview }
  }
  return preview
}

export interface ComponentCategoryConfig {
  isUncontained: boolean
  defaultLayoutMode?: LayoutMode
  allowedMode?: Mode
}

/**
 * Checks if a component belongs to uncontained categories:
 * - Shaders
 * - Gradients (gradient backgrounds, liquid-metal, etc.)
 * - Blocks
 */
export function isUncontainedComponent(name?: string, componentGroup?: string | null): boolean {
  if (!name && !componentGroup) return false
  const lowerName = (name || '').toLowerCase()
  const lowerGroup = (componentGroup || '').toLowerCase()

  const isShader =
    lowerName.includes('shader') || lowerGroup.includes('shader') || lowerName.startsWith('demo-components-shader-')

  const isGradient = lowerName.includes('gradient') || lowerGroup.includes('gradient')

  const isBlock = lowerName.includes('block') || lowerGroup.includes('block')

  const isTemplate = lowerName.includes('templates') || lowerGroup.includes('templates')

  return isShader || isGradient || isBlock || isTemplate
}

/**
 * Returns the effective `contained` boolean for a component.
 * - If explicitly passed via `contained` or `container` prop, respects that value.
 * - Otherwise: ONLY shaders, gradients, and blocks are `false`. All other components are `true`.
 */
export function getEffectiveContained(
  containedProp?: boolean,
  containerProp?: boolean,
  name?: string,
  componentGroup?: string | null,
): boolean {
  const explicit = containedProp !== undefined ? containedProp : containerProp
  if (explicit !== undefined) return explicit

  return !isUncontainedComponent(name, componentGroup)
}

/**
 * Resolves the initial route-level layout constraint and default mode synchronously.
 * Prevents flashing in standard mode for split-preferred routes like shaders and blocks.
 *
 * Rules:
 * - Shaders (/ui-kit/components/shader/*): defaultMode 'split' (can be locked via frontmatter)
 * - Individual Block pages (/ui-kit/blocks/[slug]): defaultMode 'split', mode 'both' (not locked to dual)
 * - Catalog index pages (/ui-kit/blocks, /ui-kit/components/shader): standard
 */
export function getRouteLayoutDefaults(pathname?: string | null): {
  mode: LayoutMode
  constraint: PageLayoutConstraint
} | null {
  if (!pathname) return null

  // Exclude catalog index pages
  const isCatalog =
    pathname === '/ui-kit/primitives' ||
    pathname === '/ui-kit/primitives/' ||
    pathname === '/ui-kit/components' ||
    pathname === '/ui-kit/components/' ||
    pathname === '/ui-kit/components/shader' ||
    pathname === '/ui-kit/components/shader/' ||
    pathname === '/ui-kit/blocks' ||
    pathname === '/ui-kit/blocks/' ||
    pathname === '/ui-kit/templates' ||
    pathname === '/ui-kit/templates/'

  if (isCatalog) {
    return {
      mode: Mode.standard,
      constraint: { mode: Mode.both, defaultMode: Mode.standard },
    }
  }

  // Shaders detail pages (/ui-kit/components/shader/...)
  if (pathname.includes('/components/shader')) {
    return {
      mode: Mode.split,
      constraint: { mode: Mode.both, defaultMode: Mode.split },
    }
  }

  // Individual Blocks detail pages (/ui-kit/blocks/...)
  if (pathname.includes('/blocks/') || pathname.startsWith('/ui-kit/blocks/')) {
    return {
      mode: Mode.split,
      constraint: { mode: Mode.split, defaultMode: Mode.split },
    }
  }

  // Individual Templates detail pages (/ui-kit/templates/...)
  if (pathname.includes('/templates/') || pathname.startsWith('/ui-kit/templates/')) {
    return {
      mode: Mode.split,
      constraint: { mode: Mode.split, defaultMode: Mode.split },
    }
  }

  return null
}

export type ThemeOverride = 'system' | 'light' | 'dark'

/**
 * Resolves the visual theme ('dark' | 'light') for a preview based on
 * its local override and the global site theme.
 */
export function getEffectivePreviewTheme(themeOverride?: ThemeOverride, siteResolvedTheme?: string): 'dark' | 'light' {
  if (themeOverride === 'dark') return 'dark'
  if (themeOverride === 'light') return 'light'
  return siteResolvedTheme === 'dark' ? 'dark' : 'light'
}
