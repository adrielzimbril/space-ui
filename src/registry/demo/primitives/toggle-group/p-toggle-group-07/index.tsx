import { IconBold, IconItalic, IconUnderline } from '@tabler/icons-react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  return (
    <TooltipProvider>
      <ToggleGroup defaultValue={['bold']} multiple>
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem aria-label="Toggle bold" value="bold" />}>
            <IconBold />
          </TooltipTrigger>
          <TooltipPopup>Bold</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem aria-label="Toggle italic" value="italic" />}>
            <IconItalic />
          </TooltipTrigger>
          <TooltipPopup>Italic</TooltipPopup>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<ToggleGroupItem aria-label="Toggle underline" value="underline" />}>
            <IconUnderline />
          </TooltipTrigger>
          <TooltipPopup>Underline</TooltipPopup>
        </Tooltip>
      </ToggleGroup>
    </TooltipProvider>
  )
}
