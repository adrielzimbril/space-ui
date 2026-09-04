import { Button } from '@/registry/primitives/button'
import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  return (
    <div className="flex flex-col gap-2">
      <Textarea placeholder="Type your message here" />
      <Button className="self-end">Send</Button>
    </div>
  )
}
