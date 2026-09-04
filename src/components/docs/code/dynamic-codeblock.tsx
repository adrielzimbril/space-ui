'use client'

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
  const components = getComponents({
    title,
    icon,
    onCopy,
    allowCopy,
    className,
  })

  const rendered = useShiki(cleanCode, {
    lang,
    ...options,
    components: {
      ...components,
      ...options?.components,
    },
  })

  if (isLoading) {
    return <PreviewLoading className={cn('h-48', className)} />
  }

  return rendered
}
