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

class ShikiErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  override render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

function CodeFallback({ code, lineNumbers }: { code: string; lineNumbers: boolean }) {
  if (!lineNumbers) {
    return (
      <pre className="w-max min-w-full text-[.8125rem] font-mono leading-6 p-0 m-0 bg-transparent! border-none!">
        <code className="w-max min-w-full block text-[.8125rem] font-mono text-muted-foreground">{code}</code>
      </pre>
    )
  }

  const lines = code.split('\n')
  return (
    <pre className="w-max min-w-full text-[.8125rem] font-mono leading-6 p-0 m-0 bg-transparent! border-none!">
      <code className="grid w-max min-w-full text-[.8125rem] font-mono">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center leading-6 w-auto min-w-auto">
            <span
              className="sticky left-0 select-none content-center bg-background pr-4 text-right text-xs font-mono text-muted-foreground/35 w-9 h-full z-1 shrink-0 tabular-nums nd-copy-ignore"
              data-slot="code-line"
            >
              {index + 1}
            </span>
            <span className="flex-1 min-w-0 pr-4 text-muted-foreground">{line || ' '}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}

function ShikiHighlight({ code, lang, lineNumbers }: { code: string; lang: string; lineNumbers: boolean }) {
  const rendered = useShiki(
    code,
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

  return rendered
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
  if (!code) {
    return <PreviewLoading className={cn('h-48', className)} />
  }

  const fallback = <CodeFallback code={code} lineNumbers={lineNumbers} />

  const content = (
    <ShikiErrorBoundary fallback={fallback}>
      <React.Suspense fallback={fallback}>
        <ShikiHighlight code={code} lang={lang} lineNumbers={lineNumbers} />
      </React.Suspense>
    </ShikiErrorBoundary>
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
