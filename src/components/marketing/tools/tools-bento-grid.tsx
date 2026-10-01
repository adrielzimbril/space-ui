'use client'

import { MediaCard } from '@/components/marketing/landing/card-media'
import { PlushCard } from '@/components/marketing/landing/bento/packages/plush-card'
import { AvatarsSquishmojiCard } from '@/components/marketing/landing/bento/packages/avatars-squishmoji-card'
import { FlagsCard } from '@/components/marketing/landing/bento/packages/flags-card'
import { SquircleCard } from '@/components/marketing/landing/bento/packages/squircle-card'
import { ImageSplitCard } from '@/components/marketing/landing/bento/packages/image-split-card'
import { EmojiCard } from '@/components/marketing/landing/bento/packages/emoji-card'
import { AudioCard } from '@/components/marketing/landing/bento/packages/audio-card'

export function ToolsBentoGrid() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <MediaCard id="plush" className="sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2">
        {(active) => <PlushCard isVisible={active} hasBeenVisible />}
      </MediaCard>
      <MediaCard id="avatars-compact" className="sm:col-span-2 lg:col-span-2">
        {(active) => <AvatarsSquishmojiCard isVisible={active} />}
      </MediaCard>
      <MediaCard id="flags-compact">{(active) => <FlagsCard isVisible={active} />}</MediaCard>
      <MediaCard id="audio">{() => <AudioCard />}</MediaCard>
      <MediaCard id="image-split" className="sm:col-span-2 lg:col-span-2">
        {(active) => <ImageSplitCard isVisible={active} />}
      </MediaCard>
      <MediaCard id="emoji-compact">{(active) => <EmojiCard isVisible={active} />}</MediaCard>
      <MediaCard id="squircle">{() => <SquircleCard />}</MediaCard>
    </div>
  )
}
