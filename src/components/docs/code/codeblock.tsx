'use client'
import * as React from 'react'
import {
  type HTMLAttributes,
  type ComponentProps,
  type ReactNode,
  Children,
  isValidElement,
  forwardRef,
  useCallback,
  useRef,
} from 'react'
import { cn } from '@/registry/lib/utils'
import { ScrollArea, ScrollAreaPrimitive } from '@/registry/primitives/scroll-area'
import { IconFileCode2 } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { CopyButton } from '@/registry/components/spaceui/copy'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'

export type CodeBlockProps = React.HTMLAttributes<HTMLElement> & {
  /**
   * Code title
   */
  title?: string

  /**
   * Allow to copy code
   *
   * @defaultValue true
   */
  allowCopy?: boolean

  /**
   * Custom icon on title
   */
  icon?: React.ReactNode

  viewportProps?: React.HTMLAttributes<HTMLDivElement>

  /**
   * Called when code is copied
   */
  onCopy?: () => void
}

export const Pre = forwardRef<HTMLPreElement, React.ComponentProps<'pre'>>(({ className, children, ...props }, ref) => {
  // Ensure lines wrapped in span are properly highlighted
  children = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === 'span') {
      const spanProps = child.props as { className?: string }
      return React.cloneElement(child, {
        className: cn('line', spanProps.className),
      } as React.HTMLAttributes<HTMLSpanElement>)
    }
    return child
  })

  return (
    <pre ref={ref} className={cn('focus-visible:outline-none', className)} {...props}>
      {children}
    </pre>
  )
})

Pre.displayName = 'Pre'

export const CodeBlock = forwardRef<HTMLElement, CodeBlockProps>(
  ({ title, allowCopy = true, icon, viewportProps, onCopy: onCopyEvent, ...props }, ref) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const { copy, copied } = useClipboard({
      timeout: 3000,
      onSuccess: () => onCopyEvent?.(),
    })

    const onCopy = useCallback(
      (e?: React.MouseEvent) => {
        // Prevent default to avoid jumping or unwanted events
        e?.preventDefault()

        const pre = contentRef.current?.querySelector('pre')
        if (!pre) return

        // Clone the pre element to avoid mutating the live DOM
        const clone = pre.cloneNode(true) as HTMLElement
        clone.querySelectorAll('.nd-copy-ignore, [data-slot="code-line"]').forEach((node) => {
          node.remove()
        })

        void copy(clone.textContent ?? '')
      },
      [copy],
    )

    return (
      <div
        ref={ref}
        {...props}
        className={cn('rounded-2xl bg-muted w-full p-2 my-4 not-prose fd-codeblock group', props.className)}
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1 pt-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-background text-foreground">
              {icon ? (
                typeof icon === 'string' ? (
                  <div className="size-4 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: icon }} />
                ) : (
                  <div className="size-4 flex items-center justify-center">{icon}</div>
                )
              ) : (
                <IconFileCode2 className="size-4" />
              )}
            </Badge>
            <span>{title ?? 'Code'}</span>
          </div>

          <div className="flex flex-wrap items-center">
            {allowCopy && (
              <CopyButton
                content=""
                copied={copied}
                onClick={onCopy}
                variant="ghost"
                size="sm"
                className="bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300"
              />
            )}
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="rounded-[0.875rem] bg-background">
          <div className="w-full py-1.5 [&>pre,&_code]:bg-transparent! [&>pre,&_code]:border-none! [&>pre,&_code]:p-0! [&_code_.line]:px-0! [&>pre,&_code]:[background:transparent_!important] [&_code]:text-[.8125rem]! [&>pre]:m-0 [&_.flex.items-start]:w-max!">
            <ScrollArea className={cn('max-h-142 px-3 w-full text-sm', viewportProps?.className)} scrollbarGutter>
              {props.children}
            </ScrollArea>
          </div>
        </div>
      </div>
    )
  },
)

CodeBlock.displayName = 'CodeBlock'
