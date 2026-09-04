'use client'

import { IconArrowRight } from '@tabler/icons-react'
import React from 'react'

interface OpenInV0ButtonProps {
  url: string
}

export function OpenInV0Button({ url }: OpenInV0ButtonProps) {
  return (
    <a
      href={`https://v0.dev/chat?q=${encodeURIComponent(`Install and integrate the component from ${url} into my Next.js React project.`)}`}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
      title="Open in v0"
      aria-label="Open in v0"
    >
      <svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
      <span>v0</span>
      <IconArrowRight className="size-2.5 opacity-60" />
    </a>
  )
}
