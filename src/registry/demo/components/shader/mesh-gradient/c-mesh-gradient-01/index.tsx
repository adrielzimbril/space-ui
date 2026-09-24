'use client'

import * as React from 'react'
import { MeshGradient, type MeshGradientProps } from '@/registry/components/shader/mesh-gradient'

export interface MeshGradientDemoProps extends MeshGradientProps {}

export default function Demo({
  color1 = '#4c9bff',
  color2 = '#1f4fd8',
  color3 = '#0a1a4a',
  color4,
  colors,
  speed = 1,
  distortion = 1,
  swirl = 0.57,
  swirlIterations = 7.4,
  softness = 1,
  proportion = 0,
  shape = 'edge',
  shapeScale = 0.59,
  scale = 1.45,
  rotation = 120,
}: MeshGradientDemoProps) {
  return (
    <div className="relative size-full min-h-96 h-dvh overflow-hidden">
      <MeshGradient
        className="absolute inset-0"
        color1={color1}
        color2={color2}
        color3={color3}
        color4={color4}
        colors={colors}
        speed={speed}
        distortion={distortion}
        swirl={swirl}
        swirlIterations={swirlIterations}
        softness={softness}
        proportion={proportion}
        shape={shape}
        shapeScale={shapeScale}
        scale={scale}
        rotation={rotation}
      />
    </div>
  )
}
