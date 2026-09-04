import { IconUsers, IconPlus, IconClock, IconDots, IconUser, IconSettings, IconExternalLink } from '@tabler/icons-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { AvatarGroup } from '@/registry/components/spaceui/avatar-group'
import { Button } from '@/registry/primitives/button'
import { Group, GroupText } from '@/registry/primitives/group'
import {
  Menu,
  MenuPopup,
  MenuGroup,
  MenuItem,
  MenuGroupLabel,
  MenuSeparator,
  MenuTrigger,
} from '@/registry/primitives/menu'
const team = [
  { name: 'Shadcn', src: 'https://avatars.spaceui.one/v1?name=shadcn&variant=lumina', fallback: 'SH' },
  { name: 'Max', src: 'https://avatars.spaceui.one/v1?name=max&variant=shaula', fallback: 'MA' },
  {
    name: 'Evil Rabbit',
    src: 'https://avatars.spaceui.one/v1?name=evilrabbit&variant=singularity',
    fallback: 'ER',
  },
]

export default function Pattern() {
  return (
    <Group>
      {/* Team Context */}
      <Button variant="outline">
        <IconUsers aria-hidden="true" />
        <span>Team</span>
      </Button>

      {/* Active Members - Inspired by Avatar Patterns */}
      <GroupText className="gap-0 bg-transparent">
        <AvatarGroup>
          {team.map((member) => (
            <Avatar key={member.name} className="size-5">
              <AvatarImage src={member.src} alt={member.name} />
              <AvatarFallback>{member.fallback}</AvatarFallback>
            </Avatar>
          ))}
        </AvatarGroup>
        <div className="ml-2 flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-green-500" />
          <span className="text-muted-foreground text-xs font-medium">3 Live</span>
        </div>
      </GroupText>

      {/* Collaboration Actions */}
      <Button variant="outline" size="icon">
        <IconPlus aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon">
        <IconClock aria-hidden="true" />
      </Button>

      {/* Options Dropdown */}
      <Menu>
        <MenuTrigger
          render={
            <Button variant="outline" size="icon">
              <IconDots aria-hidden="true" />
            </Button>
          }
        />
        <MenuPopup align="end" className="w-48">
          <MenuGroup>
            <MenuGroupLabel>Team Settings</MenuGroupLabel>
            <MenuSeparator />
            <MenuItem>
              <IconUser aria-hidden="true" />
              <span>Manage members</span>
            </MenuItem>
            <MenuItem>
              <IconSettings aria-hidden="true" />
              <span>Team preferences</span>
            </MenuItem>
          </MenuGroup>
          <MenuSeparator />
          <MenuItem>
            <IconExternalLink aria-hidden="true" />
            <span>Open dashboard</span>
          </MenuItem>
        </MenuPopup>
      </Menu>
    </Group>
  )
}
