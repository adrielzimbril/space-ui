import { Frame, FrameDescription, FrameHeader, FramePanel, FrameTitle } from '@/registry/primitives/frame'
import { Separator } from '@/registry/primitives/separator'

export default function Demo() {
  return (
    <Frame className="w-full">
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel className="p-0">
        <div className="p-5">
          <h2 className="font-semibold text-sm">Stacked panel</h2>
          <p className="text-muted-foreground text-sm">Section description</p>
        </div>
        <Separator />
        <div className="p-5">
          <h2 className="font-semibold text-sm">Stacked panel</h2>
          <p className="text-muted-foreground text-sm">Section description</p>
        </div>
      </FramePanel>
    </Frame>
  )
}
