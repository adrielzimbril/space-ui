'use client'

import * as React from 'react'
import { CodeBlock, Pre } from '@/components/docs/code/codeblock'
import type { HighlightOptions } from 'fumadocs-core/highlight'
import { useShiki } from 'fumadocs-core/highlight/client'
import { cn } from '@/registry/lib/utils'
import { PreviewLoading } from '@/components/shared/preview-loading'
import { formatCodeForDisplay } from '@/lib/install-command'

const getComponents = ({
  title,
  icon,
  onCopy,
  allowCopy = true,
  className,
}: {
  title?: string
  icon?: React.ReactNode
  onCopy?: () => void
  allowCopy?: boolean
  className?: string
}) =>
  ({
    pre(props) {
      return (
        <CodeBlock
          {...props}
          title={title}
          icon={icon}
          allowCopy={allowCopy}
          onCopy={onCopy}
          className={cn('my-0', props.className, className)}
        >
          <Pre>{props.children}</Pre>
        </CodeBlock>
      )
    },
  }) satisfies NonNullable<HighlightOptions['components']>

export type DynamicCodeBlockProps = {
  lang: string
  code: string
  title?: string
  icon?: React.ReactNode
  allowCopy?: boolean
  onCopy?: () => void
  options?: Omit<HighlightOptions, 'lang'>
  className?: string
}

class DynamicCodeErrorBoundary extends React.Component<
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

function DynamicCodeHighlight({
  code,
  lang,
  options,
  components,
}: {
  code: string
  lang: string
  options?: Omit<HighlightOptions, 'lang'>
  components: NonNullable<HighlightOptions['components']>
}) {
  const rendered = useShiki(code, {
    lang,
    ...options,
    components: {
      ...components,
      ...options?.components,
    },
  })

  return rendered
}

export function DynamicCodeBlock({
  lang,
  code,
  options,
  title,
  icon,
  allowCopy = true,
  onCopy,
  className,
}: DynamicCodeBlockProps) {
  const isLoading = !code
  const cleanCode = formatCodeForDisplay(isLoading ? '' : code)

  if (isLoading) {
    return <PreviewLoading className={cn('h-48', className)} />
  }

  const components = getComponents({
    title,
    icon,
    onCopy,
    allowCopy,
    className,
  })

  const fallback = (
    <CodeBlock title={title} icon={icon} allowCopy={allowCopy} onCopy={onCopy} className={cn('my-0', className)}>
      <Pre className="text-muted-foreground">{cleanCode}</Pre>
    </CodeBlock>
  )

  return (
    <DynamicCodeErrorBoundary fallback={fallback}>
      <React.Suspense fallback={fallback}>
        <DynamicCodeHighlight code={cleanCode} lang={lang} options={options} components={components} />
      </React.Suspense>
    </DynamicCodeErrorBoundary>
  )
}
