import { Tabs, TabsList, TabsTab } from '@/registry/primitives/tabs'

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Tabs defaultValue="1">
        <TabsList size="sm">
          <TabsTab value="1">Small</TabsTab>
          <TabsTab value="2">Tab</TabsTab>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="1">
        <TabsList size="default">
          <TabsTab value="1">Default</TabsTab>
          <TabsTab value="2">Tab</TabsTab>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="1">
        <TabsList size="lg">
          <TabsTab value="1">Large</TabsTab>
          <TabsTab value="2">Tab</TabsTab>
        </TabsList>
      </Tabs>
    </div>
  )
}
