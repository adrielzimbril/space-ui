import { IconBrandGithub, IconBrandGoogle, IconBrandX } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline">
        <IconBrandGoogle aria-hidden="true" />
        <span className="flex-1">Login with Google</span>
      </Button>
      <Button variant="outline">
        <IconBrandX aria-hidden="true" />
        <span className="flex-1">Login with X</span>
      </Button>
      <Button variant="outline">
        <IconBrandGithub aria-hidden="true" />
        <span className="flex-1">Login with GitHub</span>
      </Button>
    </div>
  )
}
