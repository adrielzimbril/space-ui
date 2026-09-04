'use client'

import * as React from 'react'
import { getDate, getDateDifference, getThisMonth, formatDateDiff } from '@/registry/utils/format-date'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCalendarEvent } from '@tabler/icons-react'

export default function Demo() {
  const today = new Date().toISOString()
  const pastDate = '2023-03-15'

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCalendarEvent className="size-4 text-muted-foreground" />
          </Badge>
          <span>Dates</span>
        </div>
        <Badge variant="secondary" size="sm" className="capitalize">
          {getThisMonth()}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Medium</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
            {getDate({ date: today })}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">ISO</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
            {getDate({ date: today, iso: true })}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">{pastDate}</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
            {formatDateDiff(pastDate)}
          </span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">2023-01 → today</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">
            {getDateDifference(['2023-01-01', today]) as string}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
