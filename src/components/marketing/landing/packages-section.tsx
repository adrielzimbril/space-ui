'use client'

import Link from 'next/link'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { Button } from '@/registry/components/button/button-squircle'
import { AvatarsSquishmojiCard } from './bento/packages/avatars-squishmoji-card'
import { FlagsCard } from './bento/packages/flags-card'
import { EmojiCard } from './bento/packages/emoji-card'
import { MediaCard } from './card-media'
import { IconArrowUpRight } from '@tabler/icons-react'

export function PackagesSection() {
  return (
    <section id="packages" data-page-section className="mx-auto max-w-7xl scroll-mt-16 px-5 sm:px-6 py-20">
      <div className="flex flex-col items-center justify-center text-center gap-2">
        <Link href="/tools" data-space-hover="tick" className="outline-none">
          <Badge
            size="md"
            className="px-3.5 py-1.5 font-semibold text-xs tracking-tight bg-muted text-foreground border-none cursor-pointer"
          >
            Tools &amp; Packages
          </Badge>
        </Link>
        <div className="max-w-2xl">
          <Link
            href="/tools"
            data-space-hover="tick"
            className="group inline-block focus-visible:outline-none cursor-pointer"
          >
            <h2 className="text-[2.125rem] font-semibold tracking-tight text-foreground sm:text-[2.875rem] md:text-[3.375rem] transition-colors group-hover:text-foreground">
              Creative Tools
            </h2>
          </Link>
          <p className="mt-2 text-base text-muted-foreground">
            Modular creative tools and lightweight runtime packages published on npm. Install independently into any
            React project with zero friction.
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <PlushCard isVisible={isVisible} hasBeenVisible={hasBeenVisible} /> */}
        <MediaCard id="avatars-compact" className="sm:col-span-2 lg:col-span-2">
          {(active) => <AvatarsSquishmojiCard isVisible={active} />}
        </MediaCard>
        {/* <SquircleCard /> */}
        <MediaCard id="flags-compact">{(active) => <FlagsCard isVisible={active} />}</MediaCard>
        {/* <AudioCard /> */}
        {/* <ImageSplitCard isVisible={isVisible} /> */}
        <MediaCard id="emoji-compact">{(active) => <EmojiCard isVisible={active} />}</MediaCard>
      </div>
      <div className="flex mt-6 justify-center self-center align-center">
        <Button
          render={<Link href="/tools" />}
          size="sm"
          data-space-hover="tick"
          data-space-click="confirm"
          className="inline-flex items-center gap-2 px-6 py-3.5 font-medium active:scale-[0.98] transition-all duration-300"
        >
          <span>Explore</span>
          <IconArrowUpRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
