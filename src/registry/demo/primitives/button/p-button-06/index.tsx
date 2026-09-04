import Link from 'next/link'
import { Button } from '@/registry/primitives/button'

export default function Particle() {
  return <Button render={<Link href="/" />}>Link</Button>
}
