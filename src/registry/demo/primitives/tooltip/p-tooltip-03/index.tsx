'use client'

import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'
import {
  Tooltip,
  TooltipCreateHandle,
  TooltipPopup,
  TooltipProvider,
  TooltipTrigger,
} from '@/registry/primitives/tooltip'

const tooltipHandle = TooltipCreateHandle<ComponentType>()

const BoldContent = () => {
  return <span>Make text bold</span>
}

const ItalicContent = () => {
  return <span>Apply italic formatting to text</span>
}

const UnderlineContent = () => {
  return <span>Underline text</span>
}

export default function Particle() {
  return (
    <TooltipProvider>
      <ToggleGroup defaultValue={['bold']} multiple>
        <TooltipTrigger
          className="after:absolute after:left-full after:h-full after:w-1"
          handle={tooltipHandle}
          payload={BoldContent}
          render={<ToggleGroupItem aria-label="Toggle bold" value="bold" />}
        >
          <IconBold aria-hidden="true" />
        </TooltipTrigger>
        <TooltipTrigger
          className="after:absolute after:left-full after:h-full after:w-1"
          handle={tooltipHandle}
          payload={ItalicContent}
          render={<ToggleGroupItem aria-label="Toggle italic" value="italic" />}
        >
          <IconItalic aria-hidden="true" />
        </TooltipTrigger>
        <TooltipTrigger
          className="after:absolute after:left-full after:h-full after:w-1"
          handle={tooltipHandle}
          payload={UnderlineContent}
          render={<ToggleGroupItem aria-label="Toggle underline" value="underline" />}
        >
          <IconUnderline aria-hidden="true" />
        </TooltipTrigger>
      </ToggleGroup>

      <Tooltip handle={tooltipHandle}>
        {({ payload: Payload }) => <TooltipPopup>{Payload !== undefined && <Payload />}</TooltipPopup>}
      </Tooltip>
    </TooltipProvider>
  )
}
