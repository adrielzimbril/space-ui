import { IconChevronDown } from '@tabler/icons-react'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/registry/primitives/collapsible'

export default function Demo() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="inline-flex items-center gap-2 font-medium text-sm data-panel-open:[&_svg]:rotate-180">
        Show recovery keys
        <IconChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsiblePanel>
        <ul className="flex flex-col gap-1 py-2 text-muted-foreground text-sm">
          <li className="rounded-sm bg-muted px-2 py-1 font-mono">8A9B-2C4E-7F1D</li>
          <li className="rounded-sm bg-muted px-2 py-1 font-mono">3D5F-9E1A-4C2B</li>
          <li className="rounded-sm bg-muted px-2 py-1 font-mono">6F8A-1B3C-9D7E</li>
        </ul>
      </CollapsiblePanel>
    </Collapsible>
  )
}
