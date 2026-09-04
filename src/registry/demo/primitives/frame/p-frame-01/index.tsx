import { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle } from '@/registry/primitives/frame'

export default function Demo() {
  return (
    <Frame className="w-full">
      <FrameHeader>
        <FrameTitle>Section header</FrameTitle>
        <FrameDescription>Brief description about the section</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <h2 className="font-semibold text-sm">Section title</h2>
        <p className="text-muted-foreground text-sm">Section description</p>
      </FramePanel>
      <FrameFooter>
        <p className="text-muted-foreground text-sm">Footer</p>
      </FrameFooter>
    </Frame>
  )
}
