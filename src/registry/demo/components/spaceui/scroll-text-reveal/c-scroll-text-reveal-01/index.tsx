'use client'

import React from 'react'
import { ScrollTextReveal } from '@/registry/components/spaceui/scroll-text-reveal'

const TEXTS = [
  'With predictive analytics, automated workflows, and beautifully simple dashboards, uncover patterns and make decisions with confidence.',
  'Ship your ideas faster with beautifully crafted UI components built for modern web applications.',
  'Open-source design library engineered for both humans and AI agents with seamless precision.',
  'Create expressive, polished, high-quality interfaces effortlessly with zero friction install.',
  'Avatars, squircle, plush, audio, gooey filters, shaders — an entire modern ecosystem.',
  'Design tokens, fluid motion, accessibility, and high performance baked into every piece.',
  'From marketing sites to high-scale enterprise dashboards — built to adapt and scale with you.',
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-xl items-center p-4 pb-40">
      {TEXTS.map((text, i) => (
        <React.Fragment key={i}>
          <ScrollTextReveal
            splitBy={i % 2 === 0 ? 'character' : 'word'}
            className="text-center text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-foreground leading-snug tracking-tight"
          >
            {text}
          </ScrollTextReveal>
          {i < TEXTS.length - 1 && <div className="flex w-full h-60 bg-muted squircle rounded-4xl my-8" />}
        </React.Fragment>
      ))}
    </div>
  )
}
