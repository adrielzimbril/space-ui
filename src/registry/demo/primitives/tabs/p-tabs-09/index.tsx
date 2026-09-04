import { IconSettings, IconLayoutDashboard, IconFolder } from '@tabler/icons-react'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/primitives/tabs'

export default function Demo() {
  return (
    <Tabs className="w-full flex-row" defaultValue="tab-1" orientation="vertical">
      <div className="border-s">
        <TabsList variant="underline">
          <TabsTab value="tab-1">
            <IconLayoutDashboard aria-hidden="true" />
            Overview
          </TabsTab>
          <TabsTab value="tab-2">
            <IconFolder aria-hidden="true" />
            Projects
          </TabsTab>
          <TabsTab value="tab-3">
            <IconSettings aria-hidden="true" />
            Settings
          </TabsTab>
        </TabsList>
      </div>
      <TabsPanel value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">Overview content</p>
      </TabsPanel>
      <TabsPanel value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">Projects content</p>
      </TabsPanel>
      <TabsPanel value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">Settings content</p>
      </TabsPanel>
    </Tabs>
  )
}
