import { IconCheck } from '@tabler/icons-react'
import { IconStack } from '@/registry/components/spaceui/icon-stack'

export default function Demo() {
  return (
    <div className="flex items-center justify-center">
      <IconStack aria-hidden="true" className="text-primary h-24 w-22">
        <span className="bg-background text-primary flex size-8 items-center justify-center rounded-full border shadow-xs">
          <IconCheck className="size-4" />
        </span>
      </IconStack>
    </div>
  )
}
