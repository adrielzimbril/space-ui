'use client'

import React from 'react'
import { GooeyTextReveal } from '@/registry/components/spaceui/gooey-text-reveal'

const TEXTS = [
  'Ship your ideas faster with beautifully crafted UI components',
  'Open-source design library built for both humans and AI agents',
  'Create expressive, polished, high-quality interfaces effortlessly',
  'Built on Next.js & Base UI primitives for modern development',
  'Avatars, emoji, squircle, plush, flags, audio — one ecosystem',
  "Copy, paste, ship — zero config, it's completely yours",
  'Fresh component drops every single week, always evolving',
  'MIT licensed with zero friction install into any project',
  'Design tokens, motion, accessibility baked into every piece',
  'From marketing sites to complex apps — scales with you',
  'Registry-first workflow: browse, copy, customize, deploy',
  'Dark mode, RTL, theming — first-class citizens here',
  'Motion tokens, blur reveals, gooey text — motion done right',
  'Join thousands shipping faster with Space UI today',
]

export default function Demo() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl items-center p-4">
      {TEXTS.map((text, i) => (
        <React.Fragment key={i}>
          <GooeyTextReveal
            mode="scroll"
            priority={i}
            duration={1.6}
            stagger={0.14}
            blurAmount={0.6}
            once={false}
            className="text-center text-2xl sm:text-3xl md:text-5xl xl:text-7xl font-bold text-foreground leading-tight"
          >
            {text}
          </GooeyTextReveal>
          {i < TEXTS.length - 1 && <div className="flex w-full h-60 bg-muted squircle rounded-4xl my-8" />}
        </React.Fragment>
      ))}
    </div>
  )
}
