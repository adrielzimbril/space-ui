import { cn } from '@/registry/lib/utils'
import { ImageDark } from '@/components/ui/image-dark'
import type * as React from 'react'

const sizes = {
  xs: 'size-5.5',
  sm: 'size-7',
  md: 'size-8',
  lg: 'size-12',
  xl: 'size-14',
}

export const IconLogo = ({
  size = 'sm',
  className,
  ...props
}: {
  size?: keyof typeof sizes
  className?: string
} & Omit<React.ComponentProps<typeof ImageDark>, 'src' | 'darkSrc' | 'alt'>) => {
  return (
    <ImageDark
      src="/logo.svg"
      darkSrc="/logo-dark.svg"
      alt="Space UI Logo"
      width={40}
      height={40}
      className={cn(sizes[size], 'object-contain', className)}
      {...props}
    />
  )
}
