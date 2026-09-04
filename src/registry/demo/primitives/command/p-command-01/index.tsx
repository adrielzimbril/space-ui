'use client'

import { IconArrowDown, IconArrowUp, IconCornerDownLeft } from '@tabler/icons-react'
import { Fragment, useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { useEventListener } from '@/registry/hooks/dom/use-event-listener'
import {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
} from '@/registry/primitives/command'
import { Kbd, KbdGroup } from '@/registry/primitives/kbd'

export interface Item {
  value: string
  label: string
  shortcut?: string
}

export interface Group {
  value: string
  items: Item[]
}

export const suggestions: Item[] = [
  { label: 'Linear', shortcut: '⌘L', value: 'linear' },
  { label: 'Figma', shortcut: '⌘F', value: 'figma' },
  { label: 'Slack', shortcut: '⌘S', value: 'slack' },
  { label: 'YouTube', shortcut: '⌘Y', value: 'youtube' },
  { label: 'Raycast', shortcut: '⌘R', value: 'raycast' },
]

export const commands: Item[] = [
  { label: 'Clipboard History', shortcut: '⌘⇧C', value: 'clipboard-history' },
  { label: 'Import Extension', shortcut: '⌘I', value: 'import-extension' },
  { label: 'Create Snippet', shortcut: '⌘N', value: 'create-snippet' },
  { label: 'System Preferences', shortcut: '⌘,', value: 'system-preferences' },
  { label: 'Window Management', shortcut: '⌘⇧W', value: 'window-management' },
]

export const groupedItems: Group[] = [
  { items: suggestions, value: 'Suggestions' },
  { items: commands, value: 'Commands' },
]

export default function Particle() {
  const [open, setOpen] = useState(false)

  function handleItemClick(_item: Item) {
    setOpen(false)
  }

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  })

  return (
    <CommandDialog onOpenChange={setOpen} open={open}>
      <CommandDialogTrigger render={<Button variant="outline" />}>
        Open Command Palette
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>J</Kbd>
        </KbdGroup>
      </CommandDialogTrigger>
      <CommandDialogPopup>
        <Command items={groupedItems}>
          <CommandInput placeholder="Search for apps and commands..." />
          <CommandPanel>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              {(group: Group, _index: number) => (
                <Fragment key={group.value}>
                  <CommandGroup items={group.items}>
                    <CommandGroupLabel>{group.value}</CommandGroupLabel>
                    <CommandCollection>
                      {(item: Item) => (
                        <CommandItem key={item.value} onClick={() => handleItemClick(item)} value={item.value}>
                          <span className="flex-1">{item.label}</span>
                          {item.shortcut && <CommandShortcut>{item.shortcut}</CommandShortcut>}
                        </CommandItem>
                      )}
                    </CommandCollection>
                  </CommandGroup>
                  <CommandSeparator />
                </Fragment>
              )}
            </CommandList>
          </CommandPanel>
          <CommandFooter>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <KbdGroup>
                  <Kbd>
                    <IconArrowUp />
                  </Kbd>
                  <Kbd>
                    <IconArrowDown />
                  </Kbd>
                </KbdGroup>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <Kbd>
                  <IconCornerDownLeft />
                </Kbd>
                <span>Open</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Kbd>Esc</Kbd>
              <span>Close</span>
            </div>
          </CommandFooter>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  )
}
