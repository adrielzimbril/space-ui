import { IconPackage } from '@tabler/icons-react'
import { IconStack } from '@/registry/components/spaceui/icon-stack'

import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/registry/components/spaceui/item'
export default function Pattern() {
  return (
    <div className="mx-auto flex w-full max-w-md items-center justify-center p-4">
      <Item variant="outline" className="max-w-sm">
        <ItemMedia>
          <IconStack aria-hidden="true" className="text-primary h-12 w-11">
            <IconPackage className="text-primary size-3" />
          </IconStack>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Registry package ready</ItemTitle>
          <ItemDescription>Use IconStack as rich media inside compact shadcn items.</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
