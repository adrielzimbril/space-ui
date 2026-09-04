'use client'

import * as React from 'react'
import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/primitives/button'
import { IconLayoutGrid, IconLayoutList, IconMenu } from '@tabler/icons-react'
import { useLayoutMode } from '@/components/providers/layout-mode-provider'

interface ShowcaseGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2
  showLayoutToggle?: boolean
}

export function ShowcaseGrid({
  children,
  className,
  columns: defaultColumns = 2,
  showLayoutToggle = true,
  ...props
}: ShowcaseGridProps) {
  const [columns, setColumns] = React.useState<1 | 2>(defaultColumns)
  const { isSplit } = useLayoutMode()

  // In split or canvas mode, force single-column full width layout
  const effectiveColumns = isSplit ? 1 : columns

  return (
    <div className="w-full my-6 flex flex-col gap-3 not-prose">
      {showLayoutToggle && !isSplit && (
        <div className="flex items-center justify-end gap-1 px-1">
          <div className="flex items-center gap-0.5 rounded-lg bg-muted p-0.5">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setColumns(1)}
              className={cn('rounded-md size-6.5 cursor-pointer', effectiveColumns === 1 && 'bg-background')}
              title="Single column"
              aria-label="Single column view"
            >
              <IconLayoutList className="size-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setColumns(2)}
              className={cn('rounded-md size-6.5 cursor-pointer', effectiveColumns === 2 && 'bg-background')}
              title="Two columns"
              aria-label="Two columns view"
            >
              <IconLayoutGrid className="size-3.5" />
            </Button>
          </div>
        </div>
      )}

      <div
        className={cn(
          'w-full grid gap-4 transition-all duration-200',
          effectiveColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1',
          '[html[data-layout-mode=split]_&]:grid-cols-1! [html[data-layout-mode=canvas]_&]:grid-cols-1!',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}
