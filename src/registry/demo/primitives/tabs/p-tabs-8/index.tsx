import { Badge } from '@/registry/primitives/badge'
import { Tabs, TabsList, TabsPanel, TabsTab } from '@/registry/primitives/tabs'

export default function Particle() {
  return (
    <Tabs defaultValue="tab-1">
      <TabsList>
        <TabsTab value="tab-1">
          All
          <Badge className="not-in-data-active:text-muted-foreground" variant="outline">
            128
          </Badge>
        </TabsTab>
        <TabsTab value="tab-2">
          Pending
          <Badge className="not-in-data-active:text-muted-foreground" variant="outline">
            8
          </Badge>
        </TabsTab>
        <TabsTab value="tab-3">
          Completed
          <Badge className="not-in-data-active:text-muted-foreground" variant="outline">
            120
          </Badge>
        </TabsTab>
      </TabsList>
      <TabsPanel value="tab-1">
        <p className="p-4 text-center text-muted-foreground text-xs">All items content</p>
      </TabsPanel>
      <TabsPanel value="tab-2">
        <p className="p-4 text-center text-muted-foreground text-xs">Pending items content</p>
      </TabsPanel>
      <TabsPanel value="tab-3">
        <p className="p-4 text-center text-muted-foreground text-xs">Completed items content</p>
      </TabsPanel>
    </Tabs>
  )
}
