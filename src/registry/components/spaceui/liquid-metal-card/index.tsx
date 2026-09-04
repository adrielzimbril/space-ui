'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/primitives/card'
import { LiquidMetal, LiquidMetalProps } from '@paper-design/shaders-react'

import { cn } from '@/registry/lib/utils'

type ShaderProps = Omit<LiquidMetalProps, 'className' | 'style' | 'shape'>

type LiquidMetalCardProps = React.ComponentProps<typeof Card> & Partial<ShaderProps>

function LiquidMetalCard({
  className,
  children,
  speed = 0.6,
  repetition = 4,
  softness = 0.5,
  shiftRed = 0.3,
  shiftBlue = 0.3,
  distortion = 0,
  contour = 0,
  angle = 45,
  scale = 8,
  offsetX = 0.1,
  offsetY = -0.1,
  ...props
}: LiquidMetalCardProps) {
  return (
    <Card
      data-slot="liquid-metal-card"
      className={cn('relative overflow-hidden bg-transparent ring-0', className)}
      {...props}
    >
      <LiquidMetal
        className="absolute inset-0 rounded-2xl"
        shape="none"
        speed={speed}
        repetition={repetition}
        softness={softness}
        shiftRed={shiftRed}
        shiftBlue={shiftBlue}
        distortion={distortion}
        contour={contour}
        angle={angle}
        scale={scale}
        offsetX={offsetX}
        offsetY={offsetY}
      />
      <div className="absolute inset-0.75 rounded-[calc(1rem-1px)] bg-card inset-shadow-lg" />
      <div className="relative flex flex-col gap-6 group-data-[size=sm]/card:gap-4">{children}</div>
    </Card>
  )
}

export { LiquidMetalCard, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
