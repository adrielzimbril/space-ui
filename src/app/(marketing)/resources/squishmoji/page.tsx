import { SquishmojiPlayground } from '@/resources/squishmoji/playground'

export const metadata = {
  title: 'Squishmoji',
  description: 'Deterministic squishy SVG avatars playground.',
}

export default function SquishmojiResourcePage() {
  return <SquishmojiPlayground />
}

export const instant = false
