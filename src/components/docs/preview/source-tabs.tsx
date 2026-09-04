'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/primitives/tabs'
import { CopyButton } from '@/registry/components/spaceui/copy'
import { IconFileCode2 } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { ShikiRenderer } from '@/components/docs/code/shiki-renderer'
import { PreviewLoading } from '@/components/shared/preview-loading'
import { bloomSound, slideSound } from '@/components/providers/sound-provider'
import { ScrollArea, ScrollAreaPrimitive } from '@/registry/primitives/scroll-area'
import { cn } from '@/registry/lib/utils'

export type ResolvedSource = {
  id: string
  title: string
  tabLabel: string
  code: string
  language: string
}

export function ComponentSourceTabs({
  sources,
  allowCopy = true,
  className,
}: {
  sources: ResolvedSource[]
  allowCopy?: boolean
  className?: string
}) {
  const [activeId, setActiveId] = React.useState<string>(sources[0]?.id ?? '')
  const [viewedTabs, setViewedTabs] = React.useState<Set<string>>(() => new Set([sources[0]?.id ?? '']))
  const activeSource = sources.find((s) => s.id === activeId) ?? sources[0]

  React.useEffect(() => {
    if (activeId) {
      setViewedTabs((prev) => {
        if (prev.has(activeId)) return prev
        const next = new Set(prev)
        next.add(activeId)
        return next
      })
    }
  }, [activeId])

  return (
    <div className={cn('rounded-2xl bg-muted w-full p-2 my-4 not-prose fd-codeblock group', className)}>
      <Tabs value={activeId} onValueChange={setActiveId} className="w-full gap-0">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1 pt-1">
          <div className="flex items-center text-sm font-semibold text-foreground shrink-0">
            <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
              <IconFileCode2 className="size-4 text-muted-foreground" />
            </Badge>
            <span className="font-mono text-xs">/{activeSource?.title}</span>
          </div>

          {sources.length > 1 && (
            <div className="flex items-center min-w-0 max-w-full">
              <ScrollArea
                className="w-full whitespace-nowrap **:data-[slot=scroll-area-scrollbar]:opacity-100 **:data-[slot=scroll-area-thumb]:bg-foreground/25 hover:**:data-[slot=scroll-area-thumb]:bg-foreground/45"
                scrollbarGutter
              >
                <div className="w-max rounded-lg bg-background p-1">
                  <TabsList
                    className="flex items-center bg-background p-0 font-medium relative z-0 w-fit"
                    aria-label="Files"
                  >
                    {sources.map((s) => (
                      <TabsTrigger
                        key={s.id}
                        value={s.id}
                        onClick={() => {
                          bloomSound()
                          slideSound('in')
                        }}
                        className="relative z-10 px-2.5 py-1.5 text-[.6875rem] font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground outline-none cursor-pointer transition-all duration-300 data-active:bg-muted rounded-sm shrink-0"
                      >
                        {s.tabLabel}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="rounded-[0.875rem] bg-background py-1.5 mt-2">
          {sources.map((s) => {
            const isViewed = viewedTabs.has(s.id)
            return (
              <TabsContent key={s.id} value={s.id} className="w-full mt-0 outline-none">
                <div className="relative text-foreground overflow-hidden">
                  {isViewed ? (
                    <ShikiRenderer code={s.code} lang={s.language} lineNumbers={true} className="max-h-150" />
                  ) : (
                    <PreviewLoading className="h-48" />
                  )}

                  {allowCopy && (
                    <CopyButton
                      content={s.code}
                      variant="ghost"
                      className="absolute right-2 top-2 rounded-md bg-muted text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300 z-10"
                    />
                  )}
                </div>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </div>
  )
}
