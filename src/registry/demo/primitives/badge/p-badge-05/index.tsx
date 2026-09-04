import Link from 'next/link'
import { Badge } from '@/registry/primitives/badge'

export default function Demo() {
  return <Badge render={<Link href="/" />}>Badge</Badge>
}
