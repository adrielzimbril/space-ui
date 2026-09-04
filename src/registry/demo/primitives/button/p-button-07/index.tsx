import { Button } from '@/registry/primitives/button'
import { Spinner } from '@/registry/primitives/spinner'

export default function Demo() {
  return (
    <Button disabled>
      <Spinner />
      Loading...
    </Button>
  )
}
