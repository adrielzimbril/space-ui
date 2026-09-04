import { IconSparkles } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/registry/primitives/empty'

export default function Demo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconSparkles />
        </EmptyMedia>
        <EmptyTitle>No upcoming meetings</EmptyTitle>
        <EmptyDescription>Create a meeting to get started.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button size="sm">Create meeting</Button>
          <Button size="sm" variant="outline">
            <IconSparkles />
            View docs
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}
