'use client'

import * as React from 'react'
import { DirtCarousel, type DirtCarouselItem, type Direction } from '@/registry/components/spaceui/dirt-carousel'

const DEMO_ITEMS: DirtCarouselItem[] = [
  {
    name: 'Dirt Brand',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%201%20Dirt%20Logo_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/UWtIR6AbAq00SZSnNEjivgNa63Y.png',
  },
  {
    name: 'Organic Flower',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%204%20Organic%20Flower_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/Xtp7s80JrDWbAL3MgaM0C2XDAE.png',
  },
  {
    name: 'Liquid Gradient',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%202%20Liquid%20Gradient_01%20(1)%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/xLTQCFfEGd2cu1L1fUqqraoEYig.png',
  },
  {
    name: 'Plant Lilac',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%205%203D%20Plant_Lilac_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/8n6Pce7uGKr0QnCFkcACaqNOgM.png',
  },
  {
    name: 'Microorganism',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%203%20Microorganism_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/gPLyNjohvfQMkxxufswXghqDg.png',
  },
  {
    name: '[Center] Dirt Brand',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%201%20Dirt%20Logo_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/UWtIR6AbAq00SZSnNEjivgNa63Y.png',
  },
  {
    name: 'Organic Flower',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%204%20Organic%20Flower_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/Xtp7s80JrDWbAL3MgaM0C2XDAE.png',
  },
  {
    name: 'Liquid Gradient',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%202%20Liquid%20Gradient_01%20(1)%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/xLTQCFfEGd2cu1L1fUqqraoEYig.png',
  },
  {
    name: 'Plant Lilac',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%205%203D%20Plant_Lilac_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/8n6Pce7uGKr0QnCFkcACaqNOgM.png',
  },
  {
    name: 'Microorganism',
    mediaType: 'video',
    videoLink:
      'https://pub-48241b63717b4fb8a39ec6bd2d9bdca4.r2.dev/Studio%20Dirt_Brand%20assets_World%203%20Microorganism_01%20(1).webm',
    thumbnail: 'https://framerusercontent.com/assets/gPLyNjohvfQMkxxufswXghqDg.png',
  },
]

export interface DirtCarouselDemoProps {
  direction?: Direction
  radius?: number
  ballSize?: number
  bounce?: boolean
  mouseTilt?: boolean
  snap?: boolean
  autoRotate?: boolean
}

export default function Demo({
  direction = 'flat',
  radius = 800,
  ballSize = 800,
  bounce = false,
  mouseTilt = false,
  snap = true,
  autoRotate = false,
}: DirtCarouselDemoProps) {
  return (
    <div className="relative flex size-full min-h-[640px] flex-col overflow-hidden rounded-2xl bg-background">
      <DirtCarousel
        items={DEMO_ITEMS}
        direction={direction}
        radius={radius}
        ballSize={ballSize}
        bounce={bounce}
        mouseTilt={mouseTilt}
        tiltIntensity={mouseTilt ? 1.0 : 0}
        snap={snap}
        autoRotate={autoRotate}
        className="size-full"
      />
    </div>
  )
}
