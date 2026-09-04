import Link from 'next/link'
import { Badge } from '@/registry/primitives/badge'

export default function Particle() {
  return <Badge render={<Link href="/" />}>Badge</Badge>
}
