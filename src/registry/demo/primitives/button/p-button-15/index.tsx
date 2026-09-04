import { IconQrcode } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Group, GroupSeparator } from '@/registry/primitives/group'

export default function Demo() {
  return (
    <Group>
      <Button aria-label="QR code" size="icon">
        <IconQrcode aria-hidden="true" />
      </Button>
      <GroupSeparator className="bg-primary/72" />
      <Button>Sign in</Button>
    </Group>
  )
}
