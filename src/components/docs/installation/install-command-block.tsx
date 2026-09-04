'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/registry/primitives/tabs'
import { CopyButton } from '@/registry/components/spaceui/copy'
import { cn } from '@/registry/lib/utils'
import { IconTerminal } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { ShikiRenderer } from '@/components/docs/code/shiki-renderer'
import { usePackageManager, type PackageManager } from '@/components/providers/package-manager-provider'
import { bloomSound, slideSound } from '@/components/providers/sound-provider'
import { getShadcnAddCommands, getPackageInstallCommands } from '@/lib/install-command'

export interface InstallCommandBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  packages?: string | string[]
  command?: string
  commands?: Partial<Record<PackageManager, string>>
  title?: string
  isDev?: boolean
  isShadcn?: boolean
}

export function InstallCommandBlock({
  packages,
  command,
  commands: customCommands,
  title = 'Bash',
  isDev = false,
  isShadcn = false,
  className,
  ...props
}: InstallCommandBlockProps) {
  const [activePm, setActivePm] = usePackageManager()
  const packageManagers: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun']

  const packageList = React.useMemo(() => {
    if (!packages) return ''
    return Array.isArray(packages) ? packages.join(' ') : packages
  }, [packages])

  const resolvedCommands: Record<PackageManager, string> = React.useMemo(() => {
    if (customCommands) {
      const fallback = getPackageInstallCommands(packageList || '@base-ui/react', isDev)
      return {
        pnpm: customCommands.pnpm || fallback.pnpm,
        npm: customCommands.npm || fallback.npm,
        yarn: customCommands.yarn || fallback.yarn,
        bun: customCommands.bun || fallback.bun,
      }
    }

    if (command) {
      return {
        pnpm: `pnpm ${command}`,
        npm: `npm ${command}`,
        yarn: `yarn ${command}`,
        bun: `bun ${command}`,
      }
    }

    if (isShadcn) {
      return getShadcnAddCommands(packageList)
    }

    return getPackageInstallCommands(packageList || '@base-ui/react', isDev)
  }, [customCommands, command, packageList, isDev, isShadcn])

  return (
    <div className={cn('rounded-2xl bg-muted w-full p-2 my-4 not-prose', className)} {...props}>
      <Tabs
        value={activePm}
        onValueChange={(val) => {
          if (val && ['pnpm', 'npm', 'yarn', 'bun'].includes(val as string)) {
            bloomSound()
            slideSound('in')
            setActivePm(val as PackageManager)
          }
        }}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1 pt-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
              <IconTerminal className="size-4 text-muted-foreground" />
            </Badge>
            <span>{title}</span>
          </div>
          <div className="flex flex-wrap items-center">
            <TabsList
              className="flex items-center rounded-lg bg-background p-1 font-medium relative z-0"
              aria-label="Package Manager"
            >
              {packageManagers.map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  onClick={() => {
                    bloomSound()
                    slideSound('in')
                    setActivePm(pm)
                  }}
                  className="relative z-10 px-2.5 py-1.5 text-[.6875rem] font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground outline-none cursor-pointer transition-all duration-300 data-active:bg-muted rounded-sm"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-[0.875rem] bg-background p-3">
          {packageManagers.map((pm) => (
            <TabsContent key={pm} value={pm} className="outline-none mt-0">
              <div className="relative flex items-center justify-between gap-3 rounded-lg bg-muted px-0 py-2 [&_code_.line]:px-0! [&_code]:text-sm!">
                <ShikiRenderer
                  code={resolvedCommands[pm]}
                  lang="bash"
                  className="flex items-center"
                  lineNumbers={false}
                  scrollbarGutter={false}
                />

                <CopyButton
                  content={resolvedCommands[pm]}
                  variant="ghost"
                  size="xs"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 hover:rounded-lg transition-all duration-300"
                />
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
