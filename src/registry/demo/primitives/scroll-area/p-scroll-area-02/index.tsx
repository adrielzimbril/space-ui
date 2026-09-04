import { ScrollArea } from '@/registry/primitives/scroll-area'

const shortcuts = [
  { keys: '⌘ K', action: 'Search' },
  { keys: '⌘ B', action: 'Sidebar' },
  { keys: '⌘ J', action: 'Terminal' },
  { keys: '⌘ S', action: 'Save' },
  { keys: '⌘ ⇧ P', action: 'Commands' },
  { keys: '⌘ P', action: 'Quick open' },
  { keys: '⌘ /', action: 'Comment' },
  { keys: '⌘ D', action: 'Next match' },
  { keys: '⌘ ⇧ K', action: 'Delete line' },
  { keys: '⌥ ↑', action: 'Move up' },
  { keys: '⌥ ↓', action: 'Move down' },
  { keys: '⌘ ⇧ F', action: 'Find in files' },
  { keys: '⌘ W', action: 'Close tab' },
  { keys: '⌘ ,', action: 'Settings' },
  { keys: 'F2', action: 'Rename' },
  { keys: 'F12', action: 'Definition' },
  { keys: '⌘ .', action: 'Quick fix' },
  { keys: '⌘ ⇧ L', action: 'Select all' },
]

export default function Demo() {
  return (
    <ScrollArea className="max-w-96 rounded-lg border">
      <div className="flex w-max gap-4 p-4">
        {shortcuts.map(({ keys, action }) => (
          <div
            className="flex h-20 w-28 shrink-0 flex-col items-center justify-center gap-1.5 rounded-md bg-muted"
            key={keys}
          >
            <kbd className="font-mono text-xs font-medium">{keys}</kbd>
            <span className="text-muted-foreground text-xs">{action}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
