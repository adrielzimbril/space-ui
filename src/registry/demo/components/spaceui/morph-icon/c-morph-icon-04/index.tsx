'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { MorphIcon, type MorphIconVariant } from '@/registry/components/spaceui/morph-icon'
import { IconSparkles, IconFlame } from '@tabler/icons-react'

const VARIANTS: { name: MorphIconVariant; label: string; desc: string }[] = [
  { name: 'blur-scale', label: 'Blur Scale', desc: 'Smooth motion blur with scale' },
  { name: 'rotate-scale', label: 'Rotate Scale', desc: '90° rotational zoom transition' },
  { name: 'flip', label: '3D Flip', desc: 'Y-axis perspective flip' },
  { name: 'spring', label: 'Spring Bounce', desc: 'Bouncy vertical pop effect' },
]

export default function Demo() {
  const [toggle, setToggle] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <Button variant="outline" onClick={() => setToggle((t) => !t)} className="rounded-xl px-4 cursor-pointer">
        Trigger All Animations
      </Button>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
        {VARIANTS.map(({ name, label, desc }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-border bg-muted/20 text-center"
          >
            <div className="flex items-center justify-center size-12 rounded-xl bg-background border border-border shadow-xs">
              <MorphIcon activeKey={toggle ? 'flame' : 'sparkle'} variant={name} duration={0.3}>
                {toggle ? <IconFlame className="size-5" /> : <IconSparkles className="size-5" />}
              </MorphIcon>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
