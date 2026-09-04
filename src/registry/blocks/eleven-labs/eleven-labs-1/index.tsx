'use client'

import { ProductTabsSection } from './sections/product-tabs'
import { CreativePlatformSection } from './sections/creative-platform'

export { ProductTabsSection } from './sections/product-tabs'
export { CreativePlatformSection } from './sections/creative-platform'
export * from './data'
export * from './data/flags'
export * from './components/shared'
export * from './components/speech-select'
export * from './components/code-controls'

export default function ElevenLabsPage() {
  return (
    <main className="size-full pb-12 bg-[#fdfcfc] [font-family:var(--font-eleven-inter)] text-[17px] leading-[1.4] text-black antialiased">
      <ProductTabsSection />
      <CreativePlatformSection />
    </main>
  )
}
