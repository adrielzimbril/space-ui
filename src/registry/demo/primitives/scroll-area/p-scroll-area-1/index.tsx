import { ScrollArea } from '@/registry/primitives/scroll-area'

const shortcuts = [
  { keys: '⌘ K', action: 'Search' },
  { keys: '⌘ B', action: 'Toggle sidebar' },
  { keys: '⌘ J', action: 'Toggle terminal' },
  { keys: '⌘ S', action: 'Save file' },
  { keys: '⌘ ⇧ P', action: 'Command palette' },
  { keys: '⌘ P', action: 'Quick open' },
  { keys: '⌘ /', action: 'Toggle comment' },
  { keys: '⌘ D', action: 'Select next occurrence' },
  { keys: '⌘ ⇧ K', action: 'Delete line' },
  { keys: '⌥ ↑', action: 'Move line up' },
  { keys: '⌥ ↓', action: 'Move line down' },
  { keys: '⌘ ⇧ F', action: 'Search in files' },
  { keys: '⌘ \\', action: 'Split editor' },
  { keys: '⌘ W', action: 'Close tab' },
  { keys: '⌃ `', action: 'Toggle terminal' },
  { keys: '⌘ ⇧ E', action: 'File explorer' },
  { keys: '⌘ ⇧ G', action: 'Source control' },
  { keys: '⌘ ⇧ X', action: 'Extensions' },
  { keys: '⌘ ,', action: 'Settings' },
  { keys: 'F2', action: 'Rename symbol' },
  { keys: 'F12', action: 'Go to definition' },
  { keys: '⌘ .', action: 'Quick fix' },
  { keys: '⌘ ⇧ L', action: 'Select all occurrences' },
  { keys: '⌘ ⇧ \\', action: 'Jump to bracket' },
  { keys: '⌘ ⇧ [', action: 'Fold region' },
  { keys: '⌘ ⇧ ]', action: 'Unfold region' },
]

export default function Particle() {
  return (
    <ScrollArea className="h-64 rounded-lg border">
      <div className="px-4 py-2">
        <h4 className="mb-2 font-medium text-sm">Keyboard Shortcuts</h4>
        <div className="flex flex-col">
          {shortcuts.map(({ keys, action }) => (
            <div className="flex items-center justify-between py-1.5 text-sm" key={keys}>
              <span className="text-muted-foreground">{action}</span>
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{keys}</kbd>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
