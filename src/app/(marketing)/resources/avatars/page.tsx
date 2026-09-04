import { AvatarsPlayground } from '@/resources/avatars/playground'

export const metadata = {
  title: 'Avatars',
  description: 'Generative deterministic avatars playground.',
}

export default function AvatarsResourcePage() {
  return <AvatarsPlayground />
}

export const instant = false
