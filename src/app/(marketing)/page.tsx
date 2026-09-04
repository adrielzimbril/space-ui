'use client'

import { Hero } from '@/components/marketing/landing/hero'
import { Principles } from '@/components/marketing/landing/principles'
import { Catalog } from '@/components/marketing/landing/catalog'
import { Studio } from '@/components/marketing/landing/studio'
import { Cta } from '@/components/marketing/landing/cta'
import { SectionScrollspy } from '@/registry/components/spaceui/section-scrollspy'

export default function HomePage() {
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <Hero />
      <Principles />
      <Catalog />
      <Studio />
      <Cta />
      <SectionScrollspy portal />
    </main>
  )
}
