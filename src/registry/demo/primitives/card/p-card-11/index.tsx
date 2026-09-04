import { IconFolder, IconPlus } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import {
  Card,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
} from '@/registry/primitives/card'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/registry/primitives/empty'

export default function Demo() {
  return (
    <CardFrame className="w-full">
      <CardFrameHeader>
        <CardFrameTitle>Project</CardFrameTitle>
        <CardFrameDescription>Manage your projects</CardFrameDescription>
        <CardFrameAction>
          <Button variant="outline">
            <IconPlus />
            Add
          </Button>
        </CardFrameAction>
      </CardFrameHeader>
      <Card>
        <CardPanel>
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <IconFolder />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>Get started by adding your first project.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardPanel>
      </Card>
    </CardFrame>
  )
}
