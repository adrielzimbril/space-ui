export type DocDependency = {
  name: string
  label: string
  url: string
  npmUrl?: string
}

export type RelatedComponent = {
  name: string
  title: string
  description?: string
  url: string
  category: string
  categories?: string[]
}

export type DocMetadata = {
  title?: string
  description?: string
  createdAt?: string
  updatedAt?: string
  size?: string
  rawSize?: number
  directSize?: string
  fileCount?: number
  dependencies: DocDependency[]
  registryDependencies: string[]
  relatedComponents: RelatedComponent[]
}

const KNOWN_DEPENDENCIES: Record<string, { label: string; url: string }> = {
  react: {
    label: 'react.dev',
    url: 'https://react.dev',
  },
  'react-dom': {
    label: 'react.dev',
    url: 'https://react.dev',
  },
  'lucide-react': {
    label: 'lucide.dev',
    url: 'https://lucide.dev',
  },
  motion: {
    label: 'motion.dev',
    url: 'https://motion.dev',
  },
  'framer-motion': {
    label: 'motion.dev',
    url: 'https://motion.dev',
  },
  '@base-ui/react': {
    label: 'base-ui.com',
    url: 'https://base-ui.com',
  },
  '@base-ui-components/react': {
    label: 'base-ui.com',
    url: 'https://base-ui.com',
  },
  tailwindcss: {
    label: 'tailwindcss.com',
    url: 'https://tailwindcss.com',
  },
  cn: {
    label: 'github.com/shadcn-ui/cn',
    url: 'https://github.com/shadcn-ui/cn',
  },
  'class-variance-authority': {
    label: 'cva.style',
    url: 'https://cva.style',
  },
  'date-fns': {
    label: 'date-fns.org',
    url: 'https://date-fns.org',
  },
  recharts: {
    label: 'recharts.org',
    url: 'https://recharts.org',
  },
  'embla-carousel-react': {
    label: 'embla-carousel.com',
    url: 'https://www.embla-carousel.com',
  },
  '@tanstack/react-table': {
    label: 'tanstack.com/table',
    url: 'https://tanstack.com/table',
  },
  '@tanstack/react-virtual': {
    label: 'tanstack.com/virtual',
    url: 'https://tanstack.com/virtual',
  },
  '@dnd-kit/core': {
    label: 'dndkit.com',
    url: 'https://dndkit.com',
  },
  '@dnd-kit/sortable': {
    label: 'dndkit.com',
    url: 'https://dndkit.com',
  },
  'hugeicons-react': {
    label: 'hugeicons.com',
    url: 'https://hugeicons.com',
  },
  '@phosphor-icons/react': {
    label: 'phosphoricons.com',
    url: 'https://phosphoricons.com',
  },
  '@tabler/icons-react': {
    label: 'tabler.io/icons',
    url: 'https://tabler.io/icons',
  },
  '@remixicon/react': {
    label: 'remixicon.com',
    url: 'https://remixicon.com',
  },
  'canvas-confetti': {
    label: 'npmjs.com/canvas-confetti',
    url: 'https://www.npmjs.com/package/canvas-confetti',
  },
  three: {
    label: 'threejs.org',
    url: 'https://threejs.org',
  },
  cmdk: {
    label: 'cmdk.paco.me',
    url: 'https://cmdk.paco.me',
  },
  vaul: {
    label: 'vaul.emilkowal.ski',
    url: 'https://vaul.emilkowal.ski',
  },
  sonner: {
    label: 'sonner.emilkowal.ski',
    url: 'https://sonner.emilkowal.ski',
  },
  'input-otp': {
    label: 'input-otp.js.org',
    url: 'https://input-otp.js.org',
  },
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const val = parseFloat((bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1))
  return `${val} ${sizes[i]}`
}

import metaMapData from '@/__registry__/meta.json'

const metaMap = metaMapData as unknown as Record<string, any>

export async function getDocMetadata(slug: string[] = []): Promise<DocMetadata> {
  if (!slug || slug.length === 0) {
    return {
      dependencies: [],
      registryDependencies: [],
      relatedComponents: [],
    }
  }

  const lastPart = slug[slug.length - 1]
  const joinedSlug = slug.join('-')

  let entry =
    metaMap[lastPart] ||
    metaMap[joinedSlug] ||
    metaMap['template-' + lastPart] ||
    metaMap['block-' + lastPart] ||
    metaMap[lastPart + '-default'] ||
    metaMap['blocks-' + lastPart] ||
    metaMap['use-' + lastPart] ||
    metaMap[lastPart.replace(/^use-/, '')] ||
    metaMap['primitives-' + lastPart] ||
    metaMap['components-spaceui-' + lastPart] ||
    metaMap['components-' + lastPart] ||
    metaMap['hooks-' + lastPart] ||
    // Dynamic match for numbered or variant blocks (e.g. block-[slug]-1..999, [slug]-1..999)
    Object.entries(metaMap).find(
      ([k]) =>
        k.startsWith(`block-${lastPart}-`) || k.startsWith(`${lastPart}-`) || k.startsWith(`blocks-${lastPart}-`),
    )?.[1] ||
    Object.values(metaMap).find(
      (m: any) =>
        m.category?.toLowerCase() === lastPart.toLowerCase() ||
        m.categories?.some((c: string) => c.toLowerCase() === lastPart.toLowerCase()),
    )

  const rawDeps = Array.isArray(entry?.dependencies) ? entry.dependencies : []
  const rawRegDeps = Array.isArray(entry?.registryDependencies) ? entry.registryDependencies : []

  const dependencies: DocDependency[] = rawDeps.map((dep: string) => {
    if (KNOWN_DEPENDENCIES[dep]) {
      return {
        name: dep,
        label: KNOWN_DEPENDENCIES[dep].label,
        url: KNOWN_DEPENDENCIES[dep].url,
        npmUrl: 'https://www.npmjs.com/package/' + dep,
      }
    }
    return {
      name: dep,
      label: dep,
      url: 'https://www.npmjs.com/package/' + dep,
      npmUrl: 'https://www.npmjs.com/package/' + dep,
    }
  })

  const relatedComponents: RelatedComponent[] = Array.isArray(entry?.related)
    ? entry.related.map((r: any) => {
        const directMeta = metaMap[r.name] || metaMap[r.url?.split('/').pop() || '']
        const resolvedCategories: string[] =
          Array.isArray(r.categories) && r.categories.length > 0
            ? r.categories
            : Array.isArray(directMeta?.categories) && directMeta.categories.length > 0
              ? directMeta.categories
              : []

        const cleanCategories = resolvedCategories.filter(
          (c) => c.toLowerCase() !== 'ui' && c.toLowerCase() !== 'component',
        )

        const rawCat = r.category || directMeta?.category || cleanCategories[0] || 'Component'
        const primaryCategory =
          rawCat.toLowerCase() === 'ui' || rawCat.toLowerCase() === 'component'
            ? cleanCategories[0]
              ? cleanCategories[0].charAt(0).toUpperCase() + cleanCategories[0].slice(1)
              : 'Component'
            : rawCat.charAt(0).toUpperCase() + rawCat.slice(1)

        return {
          name: r.name,
          title: r.title || directMeta?.title,
          description: r.description || directMeta?.description,
          url: r.url,
          category: primaryCategory,
          categories: cleanCategories,
        }
      })
    : []

  return {
    title: entry?.title,
    description: entry?.description,
    createdAt: entry?.createdAt,
    updatedAt: entry?.updatedAt,
    size: entry?.size,
    rawSize: entry?.rawSize,
    directSize: entry?.directSize,
    fileCount: entry?.fileCount,
    dependencies,
    registryDependencies: rawRegDeps,
    relatedComponents,
  }
}
