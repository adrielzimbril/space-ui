'use client'

import * as React from 'react'
import { Badge } from '@/registry/primitives/badge'
import { cn } from '@/registry/lib/utils'
import { format } from 'date-fns/format'

const KIND_STYLE: Record<string, string> = {
  new: 'bg-emerald-500/10 text-emerald-500',
  improved: 'bg-blue-500/10 text-blue-500',
  fixed: 'bg-amber-500/10 text-amber-500',
  Icons: 'bg-emerald-500/10 text-emerald-500',
  Components: 'bg-blue-500/10 text-blue-500',
  Primitives: 'bg-purple-500/10 text-purple-500',
  Docs: 'bg-amber-500/10 text-amber-500',
}

const KIND_LABEL: Record<string, string> = {
  new: 'New',
  improved: 'Improved',
  fixed: 'Fixed',
  Icons: 'Icons',
  Components: 'Components',
  Primitives: 'Primitives',
  Docs: 'Docs',
}

export function Changelog({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-10 w-full max-w-full pb-12', className)} {...props}>
      {children}
    </div>
  )
}

interface ChangelogItemProps extends React.ComponentProps<'section'> {
  version: string
  date: string
  title?: string
  summary?: string
  major?: boolean
}

export function ChangelogItem({
  version,
  date,
  title,
  summary,
  major,
  children,
  className,
  ...props
}: ChangelogItemProps) {
  return (
    <section
      id={`v${version.replace(/\./g, '-')}`}
      data-page-section
      className={cn(
        'w-full max-w-full flex flex-col gap-3 border-t border-muted first:border-0 nth-[2]:border-0 pt-6',
        className,
      )}
      {...props}
    >
      {/* PageSectionHeader */}
      <div className="flex items-center gap-2">
        <Badge size="lg" variant="secondary" className="rounded-full">
          {version === 'next' ? 'Up next' : `v${version}`}
        </Badge>
        <h2 className="text-base font-[550] m-0!">{format(new Date(date), 'MMMM d, yyyy')}</h2>
      </div>

      {/* PageSectionContent */}
      <div className="rounded-3xl p-2 overflow-hidden bg-muted text-sm mt-2">
        {(title || summary) && (
          <div className="relative px-2">
            {title && <h3 className="font-semibold mt-2 mb-1">{title}</h3>}
            {summary && <p className="text-sm text-muted-foreground text-pretty mb-3">{summary}</p>}
          </div>
        )}
        <div className="rounded-2xl flex flex-col overflow-hidden">{children}</div>
      </div>
    </section>
  )
}

interface ChangelogChangeProps extends React.ComponentProps<'div'> {
  kind: string
}

export function ChangelogChange({ kind, children, className, ...props }: ChangelogChangeProps) {
  const style = KIND_STYLE[kind] || 'bg-emerald-500/10 text-emerald-500'
  const label = KIND_LABEL[kind] || kind

  return (
    <div
      className={cn(
        'grid grid-cols-[100px_1fr] gap-4 px-5 py-4 bg-background border-t border-muted items-start first:border-t-0',
        className,
      )}
      {...props}
    >
      <Badge size="sm" className={cn('rounded-full w-fit font-semibold', style)}>
        {label}
      </Badge>
      <div className="text-[.8125rem] text-muted-foreground leading-relaxed [&>ul]:m-0 [&>ul]:pl-5 [&>ul]:list-disc [&_li]:mb-1 [&>p]:m-0 [&_a]:text-foreground [&_a]:underline">
        {children}
      </div>
    </div>
  )
}
