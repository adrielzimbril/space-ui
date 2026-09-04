import { IconChevronDown, IconSearch } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from '@/registry/primitives/collapsible'
import { Frame, FrameHeader, FramePanel } from '@/registry/primitives/frame'

export default function Particle() {
  return (
    <Frame className="w-full">
      <Collapsible>
        <FrameHeader className="flex-row items-center justify-between px-2 py-2">
          <CollapsibleTrigger className="data-panel-open:[&_svg]:rotate-180" render={<Button variant="ghost" />}>
            <IconChevronDown className="size-4" />
            Section header
          </CollapsibleTrigger>
          <Button aria-label="Delete" size="icon" variant="ghost">
            <IconSearch />
          </Button>
        </FrameHeader>
        <CollapsiblePanel>
          <FramePanel>
            <h2 className="font-semibold text-sm">Section title</h2>
            <p className="text-muted-foreground text-sm">Section description</p>
          </FramePanel>
        </CollapsiblePanel>
      </Collapsible>
    </Frame>
  )
}
