'use client'

import * as React from 'react'
import { useShiki } from 'fumadocs-core/highlight/client'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { PreviewLoading } from '@/components/shared/preview-loading'
import { cn } from '@/registry/lib/utils'

export interface ShikiRendererProps {
  code: string
  lang: string
  className?: string
  lineNumbers?: boolean
  scrollable?: boolean
  scrollFade?: boolean
  showScrollbar?: boolean
  scrollbarGutter?: boolean
  overscrollContain?: boolean
}

export function ShikiRenderer({
  code,
  lang,
  className,
  lineNumbers = true,
  scrollable = true,
  scrollbarGutter = true,
  showScrollbar = true,
  scrollFade = false,
  overscrollContain = false,
}: ShikiRendererProps) {
  const isLoading = !code

  const rendered = useShiki(
    isLoading ? '' : code,
    {
      lang,
      components: {
        pre: (props) => (
          <pre
            className="w-max min-w-full text-[.8125rem] font-mono leading-6 p-0 m-0 bg-transparent! border-none!"
            {...props}
          />
        ),
        code: (props) => {
          if (!lineNumbers) {
            return <code className="w-max min-w-full block text-[.8125rem] font-mono" {...props} />
          }

          let lineNumber = 1
          const children = React.Children.toArray(props.children)

          return (
            <code className="grid w-max min-w-full text-[.8125rem] font-mono">
              {children.map((child, index) => {
                if (React.isValidElement(child)) {
                  const currentLine = lineNumber++
                  return (
                    <div key={index} className="flex items-center leading-6 w-auto min-w-auto">
                      <span
                        className="sticky left-0 select-none content-center bg-background pr-4 text-right text-xs font-mono text-muted-foreground/35 w-9 h-full z-1 shrink-0 tabular-nums nd-copy-ignore"
                        data-slot="code-line"
                      >
                        {currentLine}
                      </span>
                      <span className="flex-1 min-w-0 pr-4">{child}</span>
                    </div>
                  )
                }
                return null
              })}
            </code>
          )
        },
      },
    },
    [lang, code, lineNumbers],
  )

  if (isLoading) {
    return <PreviewLoading className={cn('h-48', className)} />
  }

  const content = rendered || (
    <pre className="font-mono text-[.8125rem] p-0 m-0 leading-6 text-muted-foreground">{code}</pre>
  )

  if (!scrollable) {
    return content
  }

  return (
    <ScrollArea
      clampContentMinWidth={false}
      scrollbarGutter={scrollbarGutter}
      scrollFade={scrollFade}
      overscrollContain={overscrollContain}
      showScrollbar={showScrollbar}
      fill
      className={cn('px-3 py-1.5 text-sm', className)}
    >
      {content}
    </ScrollArea>
  )
}
