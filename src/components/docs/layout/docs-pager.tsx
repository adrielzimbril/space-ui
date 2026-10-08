import React from 'react'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { cn } from '@/registry/lib/utils'

export type NavItem = {
  url: string
  name: string
}

export interface DocsPagerProps {
  prev?: NavItem
  next?: NavItem
  className?: string
}

export function DocsPager({ prev, next, className }: DocsPagerProps) {
  if (!prev && !next) return null

  return (
    <div className={cn('grid grid-cols-2 gap-2 sm:gap-4 mt-10 mb-6 not-prose w-full min-w-0', className)}>
      {prev ? (
        <Link
          href={prev.url}
          prefetch={false}
          className="group relative flex items-center gap-2 px-3 py-2 rounded-2xl border-[.25rem] border-muted bg-muted transition-all duration-300 min-w-0 w-full"
        >
          <IconArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-all" />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate min-w-0 flex-1">
            {prev.name}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.url}
          prefetch={false}
          className="group relative flex items-center justify-end text-right gap-2 px-3 py-2 rounded-2xl border-[.25rem] border-muted bg-muted transition-all duration-300 min-w-0 w-full"
        >
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate min-w-0 flex-1">
            {next.name}
          </span>
          <IconArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-all" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

export function DocsMobileNav({ prev, next, className }: { prev?: NavItem; next?: NavItem; className?: string }) {
  if (!prev && !next) return null

  return (
    <div className={cn('flex items-center gap-1.5 sm:hidden', className)}>
      {prev && (
        <Button variant="outline" size="icon" className="size-8">
          <Link href={prev.url} prefetch={false}>
            <IconArrowLeft className="size-4" />
            <span className="sr-only">Previous</span>
          </Link>
        </Button>
      )}
      {next && (
        <Button variant="outline" size="icon" className="size-8">
          <Link href={next.url} prefetch={false}>
            <IconArrowRight className="size-4" />
            <span className="sr-only">Next</span>
          </Link>
        </Button>
      )}
    </div>
  )
}
