import { Button } from '@/registry/primitives/button'
import { Textarea } from '@/registry/primitives/textarea'

export default function Particle() {
  return (
    <div className="flex flex-col gap-2">
      <Textarea placeholder="Type your message here" />
      <Button className="self-start">Send</Button>
    </div>
  )
}
