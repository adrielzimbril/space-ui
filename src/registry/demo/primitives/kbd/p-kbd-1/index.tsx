import { Kbd, KbdGroup } from '@/registry/primitives/kbd'

export default function Particle() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Single keys:</p>
        <div className="flex gap-2">
          <Kbd>K</Kbd>
          <Kbd>⌘</Kbd>
          <Kbd>⌃</Kbd>
          <Kbd>⇧</Kbd>
        </div>
      </div>
      <div>
        <p className="mb-2 text-muted-foreground text-sm">Key combinations:</p>
        <div className="flex gap-2">
          <KbdGroup className="bg-muted p-0.5 rounded-lg">
            <Kbd className="bg-background">⌘</Kbd>
            <Kbd className="bg-background">K</Kbd>
          </KbdGroup>
          <KbdGroup className="bg-muted p-0.5 rounded-lg">
            <Kbd className="bg-background">⌘</Kbd>
            <Kbd className="bg-background">Shift</Kbd>
            <Kbd className="bg-background">P</Kbd>
          </KbdGroup>
          <KbdGroup className="bg-muted p-0.5 rounded-lg">
            <Kbd className="bg-background">Ctrl</Kbd>
            <Kbd className="bg-background">Alt</Kbd>
            <Kbd className="bg-background">Delete</Kbd>
          </KbdGroup>
        </div>
      </div>
    </div>
  )
}
