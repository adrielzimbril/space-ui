import type { Metadata } from 'next'

import { ReuiCustomizer } from '@/registry/components/spaceui/customizer'

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false

export const metadata: Metadata = {
  title: 'Customize',
  description: 'Build, lock, save and share a Base UI design preset, including the Haumea design language.',
}

export default function CustomizePage() {
  return <ReuiCustomizer />
}
