import { cn } from '@/registry/lib/utils'
import * as React from 'react'

export interface ImageDarkProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /**
   * The default light-mode image source.
   */
  src: string
  /**
   * The dark-mode image source. When provided, automatically switches based on the dark theme.
   */
  darkSrc?: string
}

/**
 * An adaptive image component that seamlessly switches between light and dark mode assets using standard <img> elements.
 * Uses pure CSS theme classes to prevent hydration mismatch, flashes, and layout shifts without any external image framework dependencies.
 */
export const ImageDark = React.forwardRef<HTMLImageElement, ImageDarkProps>(
  ({ src, darkSrc, className, alt = '', ...props }, ref) => {
    if (!darkSrc) {
      return <img ref={ref} src={src} alt={alt} className={className} {...props} />
    }

    return (
      <>
        <img ref={ref} src={src} alt={alt} className={cn('dark:hidden', className)} {...props} />
        <img src={darkSrc} alt={alt} className={cn('hidden dark:block', className)} {...props} />
      </>
    )
  },
)

ImageDark.displayName = 'ImageDark'

export { ImageDark as DarkImage, ImageDark as ThemedImage }
