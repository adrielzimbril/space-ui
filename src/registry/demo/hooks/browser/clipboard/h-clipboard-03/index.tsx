'use client'

import * as React from 'react'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'
import { Button } from '@/registry/primitives/button'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { IconCheck, IconCopy, IconKey, IconShieldLock } from '@tabler/icons-react'

function CredentialRow({ icon: Icon, label, value }: { icon: typeof IconKey; label: string; value: string }) {
  const { copy, copied } = useClipboard({ timeout: 1500 })

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-muted p-2.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-background shrink-0">
          <Icon className="size-3.5 text-muted-foreground" />
        </Badge>
        <div className="flex min-w-0 flex-col">
          <span className="text-xs font-semibold text-foreground">{label}</span>
          <span className="truncate font-mono text-[.6875rem] text-muted-foreground">{value}</span>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => copy(value)}
        className="shrink-0 bg-background text-muted-foreground hover:bg-background hover:text-foreground"
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
      >
        {copied ? <IconCheck className="size-3.5" /> : <IconCopy className="size-3.5" />}
      </Button>
    </div>
  )
}

export default function Demo() {
  return (
    <Card className="w-full max-w-md bg-muted rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-3 pt-1 pb-1">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Badge variant="secondary" className="rounded-sm aspect-square h-full! bg-transparent">
            <IconKey className="size-4 text-muted-foreground" />
          </Badge>
          <span>Credentials</span>
        </div>
        <Badge variant="outline" size="sm">
          Sensitive
        </Badge>
      </div>
      <CardPanel className="flex flex-col gap-2 rounded-[0.875rem] bg-background p-3">
        <CredentialRow icon={IconKey} label="Public key" value="pk_live_9482934823" />
        <CredentialRow icon={IconShieldLock} label="Webhook secret" value="whsec_8847291240" />
      </CardPanel>
    </Card>
  )
}
