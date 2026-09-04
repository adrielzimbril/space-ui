'use client'

import type { ReactNode } from 'react'
import { cn } from '@/registry/lib/utils'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { ToolbarSection } from '@/components/playground/playground-toolbar-section'

export function ResourceToolbar({
  left,
  right,
  className,
}: {
  left?: ReactNode
  right?: ReactNode
  className?: string
}) {
  return (
    <>
      {left ? (
        <ToolbarSection aria-label="Resource navigation" className="left-2 top-6">
          {left}
        </ToolbarSection>
      ) : null}
      {right ? (
        <ToolbarSection aria-label="Resource actions" className="right-2 top-6">
          {right}
        </ToolbarSection>
      ) : null}
    </>
  )
}
