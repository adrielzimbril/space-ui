import { Button } from '@/registry/primitives/button'
import { Card, CardPanel } from '@/registry/primitives/card'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Frame, FrameDescription, FrameHeader, FrameTitle } from '@/registry/primitives/frame'
import { Input } from '@/registry/primitives/input'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'

const frameworkOptions = [
  { label: 'Next.js', value: 'next' },
  { label: 'Vite', value: 'vite' },
  { label: 'Remix', value: 'remix' },
  { label: 'Astro', value: 'astro' },
]

export default function Particle() {
  return (
    <Frame className="w-full max-w-xs">
      <FrameHeader>
        <FrameTitle>Create project</FrameTitle>
        <FrameDescription>Deploy your new project in one-click.</FrameDescription>
      </FrameHeader>
      <Card>
        <CardPanel>
          <Form className="flex w-full flex-col gap-4">
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input placeholder="Name of your project" type="text" />
            </Field>
            <Field>
              <FieldLabel>Framework</FieldLabel>
              <Select defaultValue="next" items={frameworkOptions}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {frameworkOptions.map(({ label, value }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </Field>
            <Button className="w-full" type="submit">
              Deploy
            </Button>
          </Form>
        </CardPanel>
      </Card>
    </Frame>
  )
}
