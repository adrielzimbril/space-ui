import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuPopup,
  ContextMenuTrigger,
} from '@/registry/primitives/context-menu'

export default function Particle() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-lg border border-dashed text-muted-foreground text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuPopup>
        <ContextMenuCheckboxItem defaultChecked>Show hidden files</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Compact view</ContextMenuCheckboxItem>
      </ContextMenuPopup>
    </ContextMenu>
  )
}
