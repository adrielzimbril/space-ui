'use client'

import * as React from 'react'
import { usePagination } from '@/registry/hooks/form/use-pagination'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconChevronLeft, IconChevronRight, IconFile } from '@tabler/icons-react'

export default function Demo() {
  const { page, setPage, totalPages, range, startIndex, endIndex, total, nextPage, prevPage, hasNext, hasPrev } =
    usePagination({ total: 120, pageSize: 10, initialPage: 1, siblings: 1 })

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconFile className="size-4 text-muted-foreground" />
          </Badge>
          <span>Pages</span>
        </div>
        <Badge variant="outline" size="sm" className="font-mono tabular-nums">
          {page} / {totalPages}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Showing</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {startIndex + 1}–{endIndex} of {total}
          </span>
        </div>
        <div className="flex items-center justify-center gap-1.5">
          <Button size="icon-sm" variant="outline" onClick={prevPage} disabled={!hasPrev} aria-label="Previous page">
            <IconChevronLeft className="size-4" />
          </Button>
          {range.map((item, idx) => {
            if (item === 'dots') {
              return (
                <span key={`dots-${idx}`} className="px-2 font-mono text-xs tabular-nums text-muted-foreground">
                  ...
                </span>
              )
            }
            const pageNum = item as number
            const isActive = page === pageNum
            return (
              <Button
                key={pageNum}
                size="sm"
                variant={isActive ? 'default' : 'outline'}
                onClick={() => setPage(pageNum)}
                className="size-8 p-0 font-mono tabular-nums"
              >
                {pageNum}
              </Button>
            )
          })}
          <Button size="icon-sm" variant="outline" onClick={nextPage} disabled={!hasNext} aria-label="Next page">
            <IconChevronRight className="size-4" />
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
