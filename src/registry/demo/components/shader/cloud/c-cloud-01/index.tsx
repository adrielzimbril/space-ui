'use client'

import * as React from 'react'
import { Cloud } from '@/registry/components/shader/cloud'

export interface CloudDemoProps {
  speed?: number
  bg?: string
  sky?: string
  cloudColor?: string
  shadow?: string
  sun?: string
  glare?: string
  sunlight?: string
}

export default function Demo({
  speed = 1,
  bg = '#ffffff',
  sky = '#68b8d7',
  cloudColor = '#adc1de',
  shadow = '#183550',
  sun = '#ff9919',
  glare = '#ff6633',
  sunlight = '#ff9933',
}: CloudDemoProps) {
  return (
    <div className="flex size-full items-center justify-center">
      <Cloud
        className="min-h-dvh size-full"
        speed={speed}
        bg={bg}
        sky={sky}
        cloudColor={cloudColor}
        shadow={shadow}
        sun={sun}
        glare={glare}
        sunlight={sunlight}
      />
    </div>
  )
}
