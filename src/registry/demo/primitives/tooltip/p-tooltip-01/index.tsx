import { Button } from '@/registry/primitives/button'
import { Tooltip, TooltipPopup, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Demo() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Hover me</TooltipTrigger>
      <TooltipPopup>Helpful hint</TooltipPopup>
    </Tooltip>
  )
}
