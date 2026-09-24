'use client'

import * as React from 'react'
import { cn } from '@/registry/lib/utils'

export interface MeshGradientProps {
  colors?: string[]
  color1?: string
  color2?: string
  color3?: string
  color4?: string
  speed?: number
  distortion?: number
  swirl?: number
  swirlIterations?: number
  softness?: number
  proportion?: number
  shape?: 'edge' | 'wave' | 'circle'
  shapeScale?: number
  scale?: number
  rotation?: number
  className?: string
  style?: React.CSSProperties
}

let CachedMeshGradient: React.ComponentType<any> | null = null

export const MeshGradient = React.memo(function MeshGradient({
  colors: colorsProp,
  color1 = '#4c9bff',
  color2 = '#1f4fd8',
  color3 = '#0a1a4a',
  color4,
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
  className,
  style,
}: MeshGradientProps) {
  const colors = React.useMemo(() => {
    if (colorsProp && colorsProp.length > 0) return colorsProp
    const list = [color1, color2, color3]
    if (color4) list.push(color4)
    return list
  }, [colorsProp, color1, color2, color3, color4])

  const containerRef = React.useRef<HTMLDivElement>(null)
  const [size, setSize] = React.useState({ width: 800, height: 600 })
  const [mounted, setMounted] = React.useState(false)
  const [ShaderComp, setShaderComp] = React.useState<React.ComponentType<any> | null>(() => CachedMeshGradient)

  React.useEffect(() => {
    setMounted(true)
    if (!CachedMeshGradient) {
      import('@paper-design/shaders-react')
        .then((mod) => {
          CachedMeshGradient = mod.MeshGradient
          setShaderComp(() => mod.MeshGradient)
        })
        .catch(() => {})
    }
  }, [])

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      if (width > 0 && height > 0) setSize({ width: Math.round(width), height: Math.round(height) })
    })
    ro.observe(el)
    const { width, height } = el.getBoundingClientRect()
    if (width > 0 && height > 0) setSize({ width: Math.round(width), height: Math.round(height) })
    return () => ro.disconnect()
  }, [])

  if (!mounted || !ShaderComp) {
    return (
      <div
        ref={containerRef}
        className={cn('size-full bg-gradient-to-tr from-[#0a1a4a] via-[#1f4fd8] to-[#4c9bff]', className)}
        style={style}
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn('relative size-full overflow-hidden pointer-events-none select-none', className)}
      style={style}
    >
      <ShaderComp
        width={size.width}
        height={size.height}
        colors={colors}
        proportion={proportion}
        softness={softness}
        distortion={distortion}
        swirl={swirl}
        swirlIterations={swirlIterations}
        shape={shape}
        shapeScale={shapeScale}
        speed={speed}
        scale={scale}
        rotation={rotation}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
})

export default MeshGradient
