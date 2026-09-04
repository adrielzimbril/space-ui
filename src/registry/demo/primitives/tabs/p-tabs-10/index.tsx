import { IconSettings, IconLayoutDashboard, IconFolder } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/primitives/tabs'

export default function Demo() {
  return (
    <Tabs className="items-center" defaultValue="tab-1">
      <TabsList>
        <TabsTab aria-label="Overview" className="size-10!" value="tab-1">
          <IconLayoutDashboard aria-hidden="true" />
        </TabsTab>
        <TabsTab aria-label="Inbox" className="size-10!" value="tab-2">
          <IconFolder aria-hidden="true" />
          <Badge className="absolute end-0 top-0 rounded-full not-in-data-active:opacity-64" size="sm">
            5
          </Badge>
        </TabsTab>
        <TabsTab aria-label="Settings" className="size-10!" value="tab-3">
          <IconSettings aria-hidden="true" />
        </TabsTab>
      </TabsList>
      <TabsPanel value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">Overview content</p>
      </TabsPanel>
      <TabsPanel value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">Inbox content</p>
      </TabsPanel>
      <TabsPanel value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">Settings content</p>
      </TabsPanel>
    </Tabs>
  )
}
