'use client'

import { PreviewCard as PreviewCardPrimitive } from '@base-ui/react/preview-card'
import type React from 'react'
import { cn } from '@/registry/lib/utils'

export const PreviewCard: typeof PreviewCardPrimitive.Root = PreviewCardPrimitive.Root

export function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props): React.ReactElement {
  return <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
}

export function PreviewCardPopup({
  className,
  children,
  align = 'center',
  sideOffset = 4,
  anchor,
  portalProps,
  ...props
}: PreviewCardPrimitive.Popup.Props & {
  align?: PreviewCardPrimitive.Positioner.Props['align']
  sideOffset?: PreviewCardPrimitive.Positioner.Props['sideOffset']
  anchor?: PreviewCardPrimitive.Positioner.Props['anchor']
  portalProps?: PreviewCardPrimitive.Portal.Props
}): React.ReactElement {
  return (
    <PreviewCardPrimitive.Portal {...portalProps}>
      <PreviewCardPrimitive.Positioner
        align={align}
        anchor={anchor}
        className="z-50"
        data-slot="preview-card-positioner"
        sideOffset={sideOffset}
      >
        <PreviewCardPrimitive.Popup
          className={cn(
            'relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 ',
            className,
          )}
          data-slot="preview-card-content"
          {...props}
        >
          {children}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

export {
  PreviewCardPrimitive,
  PreviewCard as HoverCard,
  PreviewCardTrigger as HoverCardTrigger,
  PreviewCardPopup as HoverCardContent,
}

export const PreviewCardPortal: typeof PreviewCardPrimitive.Portal = PreviewCardPrimitive.Portal
export const PreviewCardArrow: typeof PreviewCardPrimitive.Arrow = PreviewCardPrimitive.Arrow
export const PreviewCardPositioner: typeof PreviewCardPrimitive.Positioner = PreviewCardPrimitive.Positioner
export const PreviewCardBackdrop: typeof PreviewCardPrimitive.Backdrop = PreviewCardPrimitive.Backdrop

export type PreviewCardProps = PreviewCardPrimitive.Root.Props
export type PreviewCardTriggerProps = PreviewCardPrimitive.Trigger.Props
export type PreviewCardPortalProps = PreviewCardPrimitive.Portal.Props
export type PreviewCardPositionerProps = PreviewCardPrimitive.Positioner.Props
export type PreviewCardPopupProps = PreviewCardPrimitive.Popup.Props
export type PreviewCardArrowProps = PreviewCardPrimitive.Arrow.Props
export type PreviewCardBackdropProps = PreviewCardPrimitive.Backdrop.Props
