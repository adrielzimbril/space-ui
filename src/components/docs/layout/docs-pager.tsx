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
    <div className={cn('flex justify-between items-center gap-4 mt-10 mb-6 not-prose w-full', className)}>
      {prev ? (
        <Link
          href={prev.url}
          prefetch={false}
          className="group relative w-fit flex items-center gap-3 p-2 rounded-2xl border-[.25rem] border-muted bg-muted transition-all duration-300"
        >
          <IconArrowLeft className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-all" />
          <div className="flex flex-col gap-1.5 min-w-0">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {prev.name}
            </span>
          </div>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={next.url}
          prefetch={false}
          className="group relative w-fit place-self-end flex items-center justify-between text-right gap-3 p-2 rounded-2xl border-[.25rem] border-muted bg-muted transition-all duration-300 sm:col-start-2"
        >
          <div className="flex flex-col items-end text-right gap-1.5 min-w-0 flex-1">
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
              {next.name}
            </span>
          </div>
          <IconArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground transition-all" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
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
