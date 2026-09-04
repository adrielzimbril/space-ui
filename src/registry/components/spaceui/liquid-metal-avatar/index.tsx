'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { LiquidMetal, LiquidMetalProps } from '@paper-design/shaders-react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/registry/lib/utils'

const avatarVariants = cva('relative flex items-center justify-center rounded-full overflow-visible bg-transparent', {
  variants: {
    size: {
      sm: 'size-8',
      md: 'size-12',
      lg: 'size-16',
    },
  },
  defaultVariants: { size: 'md' },
})

const innerVariants = cva('absolute rounded-full bg-primary-foreground inset-shadow-lg', {
  variants: {
    size: {
      sm: 'inset-[1px]',
      md: 'inset-[2px]',
      lg: 'inset-[3px]',
    },
  },
  defaultVariants: { size: 'md' },
})

type ShaderProps = Omit<LiquidMetalProps, 'className' | 'style' | 'shape'>

type LiquidMetalAvatarProps = React.ComponentProps<'div'> & Partial<ShaderProps> & VariantProps<typeof avatarVariants>

function LiquidMetalAvatar({
  size,
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
}: LiquidMetalAvatarProps) {
  return (
    <div data-slot="liquid-metal-avatar" className={cn(avatarVariants({ size }), className)} {...props}>
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
      <Avatar className={cn(innerVariants({ size }), 'size-auto bg-transparent')}>{children}</Avatar>
    </div>
  )
}

export { LiquidMetalAvatar, AvatarImage, AvatarFallback }
