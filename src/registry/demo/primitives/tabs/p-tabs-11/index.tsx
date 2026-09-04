import { IconSettings, IconLayoutDashboard, IconFolder } from '@tabler/icons-react'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/primitives/tabs'
import { Tooltip, TooltipPopup, TooltipProvider, TooltipTrigger } from '@/registry/primitives/tooltip'

export default function Particle() {
  return (
    <TooltipProvider>
      <Tabs className="items-center" defaultValue="tab-1">
        <TabsList>
          <Tooltip>
            <TooltipTrigger render={<TabsTab aria-label="Overview" value="tab-1" />}>
              <IconLayoutDashboard aria-hidden="true" />
            </TooltipTrigger>
            <TooltipPopup>Overview</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<TabsTab aria-label="Projects" value="tab-2" />}>
              <IconFolder aria-hidden="true" />
            </TooltipTrigger>
            <TooltipPopup>Projects</TooltipPopup>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger render={<TabsTab aria-label="Settings" value="tab-3" />}>
              <IconSettings aria-hidden="true" />
            </TooltipTrigger>
            <TooltipPopup>Settings</TooltipPopup>
          </Tooltip>
        </TabsList>
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
    </TooltipProvider>
  )
}
