'use client'

import { ProductTabsSection } from './sections/product-tabs'
import { CreativePlatformSection } from './sections/creative-platform'

export default function ElevenLabsPage() {
  return (
    <main className="size-full pb-12 bg-[#fdfcfc] [font-family:var(--font-eleven-inter)] text-[17px] leading-[1.4] text-black antialiased">
      <ProductTabsSection />
      <CreativePlatformSection />
    </main>
  )
}
