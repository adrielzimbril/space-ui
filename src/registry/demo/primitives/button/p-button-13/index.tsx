import { IconBrandFacebook, IconBrandGithub, IconBrandGoogle, IconBrandX } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return (
    <div className="inline-flex flex-wrap gap-2">
      <Button aria-label="Login with Google" size="icon" variant="outline">
        <IconBrandGoogle aria-hidden="true" />
      </Button>
      <Button aria-label="Login with Facebook" size="icon" variant="outline">
        <IconBrandFacebook aria-hidden="true" />
      </Button>
      <Button aria-label="Login with X" size="icon" variant="outline">
        <IconBrandX aria-hidden="true" />
      </Button>
      <Button aria-label="Login with GitHub" size="icon" variant="outline">
        <IconBrandGithub aria-hidden="true" />
      </Button>
    </div>
  )
}
