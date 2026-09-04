import * as React from 'react'
import { Link } from '@/registry/primitives/link'
import { cn } from '@/registry/lib/utils'
import { IconHash } from '@tabler/icons-react'

export function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as React.ElementType

  const Component = ({ id, className, children, ...props }: React.ComponentPropsWithoutRef<'h1'> & { id?: string }) => {
    return (
      <Tag
        id={id}
        className={cn(
          'group relative scroll-m-24 font-semibold tracking-tight text-foreground not-prose',
          level === 1 && 'text-3xl sm:text-4xl font-semibold mb-6',
          level === 2 && 'text-xl sm:text-2xl font-semibold mt-12 mb-6 first:mt-0',
          level === 3 && 'text-base sm:text-lg font-semibold mt-8 mb-4',
          level === 4 && 'text-sm sm:text-base font-semibold mt-6 mb-2',
          level >= 5 && 'text-sm font-medium mt-4 mb-2',
          className,
        )}
        {...props}
      >
        {children}
        {id && (level === 2 || level === 3) && (
          <Link
            href={`#${id}`}
            aria-label={`Link to ${typeof children === 'string' ? children : 'section'}`}
            className="inline-flex size-5 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-60 hover:opacity-100! text-muted-foreground ms-2"
          >
            <IconHash className="size-3.5" />
          </Link>
        )}
      </Tag>
    )
  }

  Component.displayName = `Heading${level}`
  return Component
}

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)

export function Paragraph({ className, ...props }: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p
      className={cn(
        'text-sm sm:text-[15px] leading-relaxed text-muted-foreground my-3.5 [&:not(:first-child)]:mt-3.5 not-prose',
        className,
      )}
      {...props}
    />
  )
}

export function UnorderedList({ className, ...props }: React.ComponentPropsWithoutRef<'ul'>) {
  return (
    <ul
      className={cn(
        'my-3 ml-5 list-disc space-y-1.5 text-sm sm:text-[15px] text-muted-foreground marker:text-muted-foreground/60 not-prose',
        className,
      )}
      {...props}
    />
  )
}

export function OrderedList({ className, ...props }: React.ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol
      className={cn(
        'my-3 ml-5 list-decimal space-y-1.5 text-sm sm:text-[15px] text-muted-foreground marker:text-muted-foreground/60 not-prose',
        className,
      )}
      {...props}
    />
  )
}

export function ListItem({ className, ...props }: React.ComponentPropsWithoutRef<'li'>) {
  return <li className={cn('leading-relaxed', className)} {...props} />
}

export function HorizontalRule({ className, ...props }: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr className={cn('my-8 border-border/60 not-prose', className)} {...props} />
}

export function Blockquote({ className, ...props }: React.ComponentPropsWithoutRef<'blockquote'>) {
  return (
    <blockquote
      className={cn(
        'my-4 border-s-2 border-border ps-4 text-sm sm:text-[15px] italic text-muted-foreground leading-relaxed not-prose',
        className,
      )}
      {...props}
    />
  )
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<'strong'>) {
  return <strong className={cn('font-semibold text-foreground', className)} {...props} />
}
