import { notFound } from 'next/navigation'

export default function CatchAllPage() {
  notFound()
}

export const instant = false
