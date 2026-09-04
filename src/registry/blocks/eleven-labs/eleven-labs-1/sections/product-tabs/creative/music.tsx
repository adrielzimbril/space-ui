'use client'

import { useState } from 'react'
import { cn } from '@/registry/lib/utils'
import { getImage } from '../../../data'
import { CompactPlayButton } from '../../../components/shared'

export function CreativeMusicDemo() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="absolute top-[106px] left-1/2 z-[5] flex h-[228px] w-[calc(100%-32px)] max-w-[592px] -translate-x-1/2 flex-col overflow-hidden rounded-3xl bg-white shadow-[inset_0_0_0_.5px_rgb(0_0_0_/_0.075)] md:top-[115px]">
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-4 text-[16px] leading-6 text-black [scrollbar-width:none]">
        A rich orchestral track, deeply cinematic, symphonic strings, brass and woodwinds, an epic fantasy, triumphant,
        jubilant, crescendo, finale.
      </div>
      <div className="relative z-10 flex items-end justify-between gap-4 px-3 pb-3">
        <div className="flex h-14 min-w-0 items-end gap-4">
          <div className="flex size-14 flex-none items-center justify-center rounded-xl bg-[#f5f3f1]">
            <div className="relative size-11 overflow-hidden rounded-full">
              <img
                src={getImage('creative-music-orb')}
                alt=""
                className={cn(
                  'size-full object-cover transition-transform duration-700',
                  playing ? 'animate-[spin_9s_linear_infinite] scale-110' : 'scale-100',
                )}
              />
              <span className="absolute inset-0 rounded-full ring-[.5px] ring-black/[.075] ring-inset" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[16px] leading-6 font-medium text-black">Epic Symphony</p>
            <p className="text-[16px] leading-6 font-medium text-[#a9a49e]">0:50</p>
          </div>
        </div>
        <CompactPlayButton playing={playing} onClick={() => setPlaying((current) => !current)} iconOnly />
      </div>
    </div>
  )
}
