import { Button } from '@/registry/primitives/button'
import { Spinner } from '@/registry/primitives/spinner'

export default function Particle() {
  return (
    <Button disabled>
      <Spinner />
      Loading...
    </Button>
  )
}
