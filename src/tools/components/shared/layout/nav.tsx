'use client'

import { IconLayout2 } from '@tabler/icons-react'
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { usePageTreeList } from '@/components/providers/page-trees-provider'

export function ResourceNav() {
  const pageTrees = usePageTreeList()
  return (
    <MobileNavDrawer
      trees={pageTrees}
      triggerClassName="flex!"
      trigger={
        <ToolbarButton label="Open navigation">
          <IconLayout2 className="size-4" />
        </ToolbarButton>
      }
    />
  )
}
