import { Tabs, TabsList, TabsTab } from '@/registry/primitives/tabs'

export default function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Tabs defaultValue="preview">
        <TabsList size="sm" variant="default">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
          <TabsTab value="props">Props</TabsTab>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="preview">
        <TabsList variant="default">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
          <TabsTab value="props">Props</TabsTab>
        </TabsList>
      </Tabs>

      <Tabs defaultValue="preview">
        <TabsList size="lg" variant="default">
          <TabsTab value="preview">Preview</TabsTab>
          <TabsTab value="code">Code</TabsTab>
          <TabsTab value="props">Props</TabsTab>
        </TabsList>
      </Tabs>
    </div>
  )
}
