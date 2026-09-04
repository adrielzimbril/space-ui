'use client'

import { Button } from '@/registry/primitives/button'
import { LiquidMetal, LiquidMetalProps } from '@paper-design/shaders-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/registry/lib/utils'

const buttonVariants = cva(
  'relative flex items-center justify-center bg-transparent border-none cursor-pointer outline-none rounded-full overflow-hidden font-medium whitespace-nowrap text-primary',
  {
    variants: {
      size: {
        sm: 'min-w-28 h-9 px-4 text-xs',
        md: 'min-w-35.5 h-11.5 px-5 text-sm',
        lg: 'min-w-44 h-14 px-6 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

type ShaderProps = Omit<LiquidMetalProps, 'className' | 'style' | 'shape'>

type LiquidMetalButtonProps = Omit<React.ComponentProps<typeof Button>, 'variant' | 'size'> &
  Partial<ShaderProps> &
  VariantProps<typeof buttonVariants>

export function LiquidMetalButton({
  children,
  size,
  className,
  ref,
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
}: LiquidMetalButtonProps) {
  return (
    <Button ref={ref} data-slot="liquid-metal-button" className={cn(buttonVariants({ size }), className)} {...props}>
      <LiquidMetal
        className="absolute inset-0 rounded-full"
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
      <div className="absolute inset-[calc(var(--spacing)*0.68)] rounded-full bg-primary-foreground inset-shadow-lg" />
      <span className="relative">{children}</span>
    </Button>
  )
}
