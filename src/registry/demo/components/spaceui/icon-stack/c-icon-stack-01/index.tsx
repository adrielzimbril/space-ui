import { IconStack2 } from '@tabler/icons-react'
import { IconStack } from '@/registry/components/spaceui/icon-stack'

export default function Demo() {
  return (
    <div className="flex items-center justify-center">
      <IconStack aria-hidden="true">
        <IconStack2 className="size-4" />
      </IconStack>
    </div>
  )
}
