'use client'

import Link from 'next/link'
import { registryStats } from '@/__registry__/stats'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { megaMenuTools } from '@/config/menu-config'
import { IconArrowUpRight } from '@tabler/icons-react'
import { Button } from '@/registry/components/button/button-squircle'
import { MediaCard } from './card-media'
import { OrbBloopCard } from './bento/registry/orb-bloop-card'
import { HandleReelCard } from './bento/registry/handle-reel-card'
import { AnimojiCard } from './bento/registry/animoji-card'
import { FlagsCard } from './bento/packages/flags-card'
import { TimelineCard } from './bento/registry/timeline-card'
import { GitHubActivityCard } from './bento/registry/github-activity-card'
import { AvatarsSquishmojiCard } from './bento/packages/avatars-squishmoji-card'
import { LoadingOrbCard } from './bento/registry/loading-orb-card'
import { EmojiCard } from './bento/packages/emoji-card'
// Hidden cards: uncomment the import with its line in the grid (Card Studio renders them either way).
// import { OrbSmoothCard } from './bento/registry/orb-smooth-card'
// import { MorphingTextCard } from './bento/registry/morphing-text-card'
// import { BouncyAccordionCard } from './bento/registry/bouncy-accordion-card'
// import { WordsPreloaderCard } from './bento/registry/words-preloader-card'

export function RegistryGrid() {
  return (
    <section id="registry" data-page-section className="mx-auto max-w-7xl scroll-mt-16 px-5 sm:px-6 py-20">
      <div className="flex flex-col items-center justify-center text-center gap-3">
        <Link href="/components" data-space-hover="tick" className="outline-none">
          <Badge
            size="md"
            className="px-3.5 py-1.5 font-semibold text-xs tracking-tight bg-muted text-foreground border-none cursor-pointer"
          >
            Components
          </Badge>
        </Link>
        <div className="max-w-2xl">
          <Link
            href="/components"
            data-space-hover="tick"
            className="group inline-block focus-visible:outline-none cursor-pointer"
          >
            <h2 className="text-[34px] font-semibold tracking-tight text-foreground sm:text-[46px] md:text-[54px] transition-colors group-hover:text-foreground/80">
              Component Registry
            </h2>
          </Link>
          <p className="mt-3 text-base text-muted-foreground">
            Explore animated primitives, shaders, and tactile components built with Base UI and Tailwind CSS.
          </p>
        </div>
      </div>

      {/* data-ph-no-record: live demos rewrite the DOM every frame; keep them out of session replays. */}
      <div data-ph-no-record className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <MediaCard id="orb-bloop">{(active) => <OrbBloopCard isVisible={active} />}</MediaCard>
        {/* <MediaCard id="orb-smooth">{(active) => <OrbSmoothCard isVisible={active} />}</MediaCard> */}
        {/* <MediaCard id="morphing-text">{() => <MorphingTextCard />}</MediaCard> */}
        {/* <MediaCard id="bouncy-accordion">{() => <BouncyAccordionCard />}</MediaCard> */}
        <MediaCard id="handle-reel">{() => <HandleReelCard />}</MediaCard>
        <MediaCard id="animoji">{(active) => <AnimojiCard isVisible={active} />}</MediaCard>
        <MediaCard id="timeline" className="md:row-span-2">
          {(active) => <TimelineCard isVisible={active} />}
        </MediaCard>
        <MediaCard id="github-activity" className="sm:col-span-2 lg:col-span-2">
          {() => <GitHubActivityCard />}
        </MediaCard>
        <MediaCard id="avatars" className="sm:col-span-2 lg:col-span-2">
          {(active) => <AvatarsSquishmojiCard isVisible={active} count={9} />}
        </MediaCard>
        <MediaCard id="flags">{(active) => <FlagsCard isVisible={active} />}</MediaCard>
        {/* <MediaCard id="words-preloader">{(active) => <WordsPreloaderCard isVisible={active} />}</MediaCard> */}
        <MediaCard id="loading-orb">{(active) => <LoadingOrbCard isVisible={active} />}</MediaCard>
        <MediaCard id="emoji">{(active) => <EmojiCard isVisible={active} />}</MediaCard>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <Link href="/primitives" data-space-hover="tick" className="rounded-2xl bg-muted p-6 sm:p-8">
          <p className="text-4xl font-semibold tracking-tight text-foreground">{registryStats.primitives}+</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Base UI Primitives</p>
        </Link>

        <Link href="/components" data-space-hover="tick" className="rounded-2xl bg-muted p-6 sm:p-8">
          <p className="text-4xl font-semibold tracking-tight text-foreground">{registryStats.components}+</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Interactive Components</p>
        </Link>

        <Link href="/templates" data-space-hover="tick" className="rounded-2xl bg-muted p-6 sm:p-8">
          <p className="text-4xl font-semibold tracking-tight text-foreground">{registryStats.templatesFree}+</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Templates</p>
        </Link>

        <Link href="/hooks" data-space-hover="tick" className="rounded-2xl bg-muted p-6 sm:p-8">
          <p className="text-4xl font-semibold tracking-tight text-foreground">{registryStats.hooksOnly}+</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Production Hooks</p>
        </Link>

        <Link href="/tools" data-space-hover="tick" className="rounded-2xl bg-muted p-6 sm:p-8">
          <p className="text-4xl font-semibold tracking-tight text-foreground">{megaMenuTools.length}+</p>
          <p className="mt-2 text-sm font-medium text-muted-foreground">Creative Tools</p>
        </Link>
      </div>
      <div className="flex mt-6 justify-center self-center align-center">
        <Button
          render={<Link href="/components" />}
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
