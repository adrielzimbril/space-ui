'use client'

import * as React from 'react'
import { sleep } from '@/registry/utils/sleep'
import { useMutation } from '@/registry/hooks/form/use-mutation'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Button } from '@/registry/primitives/button'
import { Badge } from '@/registry/primitives/badge'
import { IconLoader2, IconCheck, IconAlertCircle, IconDatabase } from '@tabler/icons-react'

export default function Demo() {
  const { mutate, loading, data, isSuccess, isError } = useMutation(async (recordName: string) => {
    await sleep(750)
    if (recordName.includes('Error')) {
      throw new Error('Simulated database mutation failure!')
    }
    return { id: Math.floor(Math.random() * 9000) + 1000, name: recordName, timestamp: new Date().toLocaleTimeString() }
  })

  const status = loading ? 'Executing' : isSuccess ? 'Success' : isError ? 'Error' : 'Idle'

  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconDatabase className="size-4 text-muted-foreground" />
          </Badge>
          <span>Mutate</span>
        </div>
        <Badge variant={isSuccess ? 'success' : isError ? 'destructive' : 'outline'} size="sm">
          {status}
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-3 rounded-[0.875rem] bg-background p-3">
        <div className="rounded-lg bg-muted p-2.5">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <IconLoader2 className="size-4 animate-spin" />
              <span>Processing</span>
            </div>
          )}
          {isSuccess && data && (
            <div className="flex items-start gap-2">
              <IconCheck className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <span className="block text-[.6875rem] font-semibold text-muted-foreground">Record #{data.id}</span>
                <span className="mt-0.5 block truncate font-mono text-sm font-semibold text-foreground">
                  {data.name} @ {data.timestamp}
                </span>
              </div>
            </div>
          )}
          {isError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <IconAlertCircle className="size-4 shrink-0" />
              <span>Mutation failed</span>
            </div>
          )}
          {!loading && !isSuccess && !isError && <span className="text-sm text-muted-foreground">Ready to mutate</span>}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => mutate('New User Project')} disabled={loading} className="flex-1">
            Create
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => mutate('Simulated Error')}
            disabled={loading}
            className="flex-1"
          >
            Error
          </Button>
        </div>
      </CardPanel>
    </Card>
  )
}
