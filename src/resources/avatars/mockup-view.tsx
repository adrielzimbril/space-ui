'use client'

import { useMemo } from 'react'
import { Avatar } from '@usespaceui/avatars/react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { type AvatarEffect, type AvatarVariant, resolveVariant } from '@usespaceui/avatars'

interface MockupViewProps {
  pool: string[]
  pattern: AvatarVariant | 'all'
  size: number
  effect: AvatarEffect
  animate: boolean
  circle: boolean
  parsedColors?: string[]
  paletteIndex: number
}

export function MockupView({ pool, pattern, size, effect, animate, circle, parsedColors, paletteIndex }: MockupViewProps) {
  const seed = useMemo(() => pool[0] ?? 'Space UI', [pool])

  const variantFor = (index: number) => {
    if (pattern !== 'all') return pattern
    const variants: AvatarVariant[] = ['triton', 'adinkra', 'kerala', 'sindhi', 'tangata', 'navajo', 'aztec']
    return variants[index % variants.length]
  }

  return (
    <ScrollArea className="size-full" data-lenis-prevent="true">
      <div className="min-h-full w-full bg-background p-4 sm:p-6 md:p-8">
        <div className="mx-auto flex h-full max-w-280 flex-col gap-4">
          <div className="rounded-2xl bg-muted p-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {pool.slice(0, 8).map((exampleName, i) => (
                <div
                  key={exampleName}
                  className="flex min-w-16 flex-col items-center gap-2 rounded-xl bg-background px-3 py-2"
                >
                  <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                    <Avatar
                      name={exampleName}
                      size={32}
                      variant={variantFor(i)}
                      colors={parsedColors}
                      circle={circle}
                      effect={effect}
                      animate={animate}
                    />
                  </div>
                  <span className="truncate text-[0.625rem] font-medium text-muted-foreground">
                    {exampleName.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl bg-muted p-2">
              <div className="rounded-xl bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                    <Avatar name={seed} size={48} variant={variantFor(0)} colors={parsedColors} circle={circle} effect={effect} animate={animate} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">New post</p>
                    <p className="text-xs text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                    <Avatar name={seed} size={28} variant={variantFor(1)} colors={parsedColors} circle={circle} effect={effect} animate={animate} />
                  </div>
                  <div className="flex-1 rounded-xl bg-muted p-2">
                    <p className="text-xs text-muted-foreground">Shared an identity</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted p-2">
              <div className="rounded-xl bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                    <Avatar name={seed} size={48} variant={variantFor(2)} colors={parsedColors} circle={circle} effect={effect} animate={animate} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Chat</p>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  {pool.slice(1, 4).map((name, i) => (
                    <div key={name} className="flex items-center gap-2">
                      <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                        <Avatar name={name} size={24} variant={variantFor(i + 3)} colors={parsedColors} circle={circle} effect={effect} animate={animate} />
                      </div>
                      <div className="flex-1 rounded-lg bg-muted p-2">
                        <div className="h-2 w-24 rounded bg-background/60" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-muted p-2">
              <div className="rounded-xl bg-background p-4">
                <p className="text-sm font-semibold">Profile</p>
                <div className="mt-3 flex flex-col items-center gap-3">
                  <div className={`overflow-hidden bg-muted ${circle ? 'rounded-full' : 'rounded-[0.625rem]'}`}>
                    <Avatar name={seed} size={72} variant={variantFor(4)} colors={parsedColors} circle={circle} effect={effect} animate={animate} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold">{seed}</p>
                    <p className="text-xs text-muted-foreground capitalize">{pattern === 'all' ? 'All families' : pattern.replace(/-/g, ' ')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
