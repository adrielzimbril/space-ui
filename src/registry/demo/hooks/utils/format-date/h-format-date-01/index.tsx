'use client'

import * as React from 'react'
import { getHumanDate, getIsToday, formatCount } from '@/registry/utils/format-date'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCalendar } from '@tabler/icons-react'

export default function Demo() {
  const dateStr = new Date().toISOString()
  const pastDate = '2020-06-15'

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconCalendar className="size-4 text-muted-foreground" />
          </Badge>
          <span>Date</span>
        </div>
        <Badge variant="outline" size="sm">
          Active
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-2 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Today</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">{getHumanDate(dateStr)}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-2.5">
          <span className="text-[.6875rem] font-semibold text-muted-foreground">Is today</span>
          <Badge variant="secondary" size="sm">
            {getIsToday(dateStr) ? 'Yes' : 'No'}
          </Badge>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">{pastDate}</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold text-foreground">{getHumanDate(pastDate)}</span>
        </div>
        <div className="rounded-lg bg-muted p-2.5">
          <span className="block text-[.6875rem] font-semibold text-muted-foreground">Count 12500</span>
          <span className="mt-0.5 block font-mono text-sm font-semibold tabular-nums text-foreground">
            {formatCount(12500)}
          </span>
        </div>
      </CardPanel>
    </Card>
  )
}
