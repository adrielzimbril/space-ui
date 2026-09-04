import { Textarea } from '@/registry/primitives/textarea'

export default function Demo() {
  return (
    <Textarea
      aria-label="Message"
      className="border-transparent bg-muted shadow-none before:hidden"
      placeholder="Type your message here"
    />
  )
}
