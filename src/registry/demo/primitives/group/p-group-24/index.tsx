import {
  IconEye,
  IconSend,
  IconChevronDown,
  IconCalendar,
  IconFile,
  IconDots,
  IconCopy,
  IconHistory,
  IconArchive,
  IconTrash,
} from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarGroup } from '@/registry/components/spaceui/avatar-group'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'
import { Menu, MenuPopup, MenuGroup, MenuItem, MenuSeparator, MenuTrigger } from '@/registry/primitives/menu'
import { Separator } from '@/registry/primitives/separator'
const viewers = [
  {
    src: 'https://avatars.spaceui.one/v1?name=uranus&variant=triton',
    initials: 'SC',
    name: 'Sarah Chen',
  },
  {
    src: 'https://avatars.spaceui.one/v1?name=earth&variant=solar-flare',
    initials: 'AJ',
    name: 'Alex Johnson',
  },
]

export default function Pattern() {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <AvatarGroup>
        {viewers.map((viewer) => (
          <Avatar key={viewer.name} className="size-8 text-xs">
            <AvatarImage src={viewer.src} alt={viewer.name} />
            <AvatarFallback>{viewer.initials}</AvatarFallback>
          </Avatar>
        ))}
      </AvatarGroup>

      <Separator orientation="vertical" className="my-auto h-4" />

      <Button variant="outline" size="sm">
        <IconEye aria-hidden="true" />
        <span className="hidden md:block">Preview</span>
      </Button>

      <Group className="**:data-[slot=button]:border-r-0">
        <Button size="sm">
          <IconSend aria-hidden="true" />
          Publish
        </Button>

        <GroupSeparator className="bg-primary/72" />

        <Menu>
          <MenuTrigger
            render={
              <Button
                size="icon-sm"
                className="border-primary-foreground/20 rounded-l-none border-l"
                aria-label="More publish options"
              />
            }
          >
            <IconChevronDown aria-hidden="true" />
          </MenuTrigger>

          <MenuPopup sideOffset={8} align="end" className="w-48">
            <MenuGroup>
              <MenuItem>
                <IconCalendar className="size-4 opacity-60" aria-hidden="true" />
                Schedule for later
              </MenuItem>
              <MenuItem>
                <IconFile className="size-4 opacity-60" aria-hidden="true" />
                Save as draft
              </MenuItem>
            </MenuGroup>
          </MenuPopup>
        </Menu>
      </Group>

      <Menu>
        <MenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="More actions" />}>
          <IconDots aria-hidden="true" />
        </MenuTrigger>

        <MenuPopup sideOffset={8} align="end" className="w-40">
          <MenuGroup>
            <MenuItem>
              <IconCopy className="size-4 opacity-60" aria-hidden="true" />
              Duplicate
            </MenuItem>
            <MenuItem>
              <IconHistory className="size-4 opacity-60" aria-hidden="true" />
              View history
            </MenuItem>
            <MenuItem>
              <IconArchive className="size-4 opacity-60" aria-hidden="true" />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive">
              <IconTrash aria-hidden="true" />
              Delete
            </MenuItem>
          </MenuGroup>
        </MenuPopup>
      </Menu>
    </div>
  )
}
