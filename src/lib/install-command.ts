export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun'

export type InstallCommands = {
  npm: string
  pnpm: string
  yarn: string
  bun: string
}

export const REGISTRY_NAMESPACE = '@usespaceui'
export const REGISTRY_BASE_URL = 'https://www.spaceui.one/r'

/**
 * Format a component or primitive name with the unified registry namespace
 */
export function formatRegistryItem(name: string): string {
  if (!name) return REGISTRY_NAMESPACE
  if (name.includes(' ')) {
    return name
      .split(/\s+/)
      .filter(Boolean)
      .map((item) => formatRegistryItem(item))
      .join(' ')
  }

  let clean = name
    .replace(/^https?:\/\/[^/]+\/r\//, '')
    .replace(/\.json$/, '')
    .replace(/^@[\w.-]+\//, '')
    .replace(/^@[\w.-]+\//, '') // handle any nested scope like @usespaceui/@space/
    .trim()

  return `${REGISTRY_NAMESPACE}/${clean}`
}

/**
 * Clean up registry import paths for clean end-user code display and copy
 */
export function formatCodeForDisplay(inputCode?: string | null): string {
  if (!inputCode) return ''

  return inputCode.replace(/(['"])([\s\S]*?)\1/g, (match, quote, content) => {
    if (content.startsWith('@/registry/')) {
      const rest = content.slice('@/registry/'.length)
      if (rest.startsWith('lib/')) {
        return `${quote}@/${rest}${quote}`
      }
      if (rest.startsWith('hooks/')) {
        return `${quote}@/${rest}${quote}`
      }
      if (rest.startsWith('primitives/')) {
        const primitiveName = rest.slice('primitives/'.length)
        return `${quote}@/components/ui/${primitiveName}${quote}`
      }
      if (rest.startsWith('components/space/')) {
        const compName = rest.slice('components/space/'.length)
        return `${quote}@/components/spaceui/${compName}${quote}`
      }
      if (rest.startsWith('components/')) {
        const compName = rest.slice('components/'.length)
        return `${quote}@/components/spaceui/${compName}${quote}`
      }
      return `${quote}@/${rest}${quote}`
    } else if (content.startsWith('@workspace/ui/')) {
      const rest = content.slice('@workspace/ui/'.length)
      return `${quote}@/${rest}${quote}`
    }
    return match
  })
}

/**
 * Generate shadcn CLI add commands for all package managers
 */
export function getShadcnAddCommands(name: string): InstallCommands {
  const item = formatRegistryItem(name)
  return {
    npm: `npx shadcn@latest add ${item}`,
    pnpm: `pnpm dlx shadcn@latest add ${item}`,
    yarn: `npx shadcn@latest add ${item}`,
    bun: `bunx --bun shadcn@latest add ${item}`,
  }
}

/**
 * Generate package installation commands (npm, pnpm, yarn, bun)
 */
export function getPackageInstallCommands(packageName: string, isDev = false): InstallCommands {
  const devFlag = isDev ? ' -D' : ''
  const yarnDevFlag = isDev ? ' --dev' : ''
  return {
    npm: `npm install ${packageName}${devFlag}`,
    pnpm: `pnpm add ${packageName}${devFlag}`,
    yarn: `yarn add ${packageName}${yarnDevFlag}`,
    bun: `bun add ${packageName}${devFlag}`,
  }
}

/**
 * Get direct JSON URL for a component
 */
export function getRegistryJsonUrl(name: string): string {
  const clean = name
    .replace(/^https?:\/\/[^/]+\/r\//, '')
    .replace(/\.json$/, '')
    .replace(/^@[\w.-]+\//, '')
    .replace(/^@[\w.-]+\//, '')
    .trim()
  return `${REGISTRY_BASE_URL}/${clean}.json`
}
