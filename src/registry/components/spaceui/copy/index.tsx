'use client'

import * as React from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button, buttonVariants, type ButtonProps } from '@/registry/primitives/button'
import { cn } from '@/registry/lib/utils'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'
import { useControlledState } from '@/registry/hooks/animation/use-controlled-state'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'

const sizeMap: Record<string, NonNullable<ButtonProps['size']>> = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  default: 'icon',
  lg: 'icon-lg',
  xl: 'icon-xl',
}

export interface CopyButtonProps extends Omit<ButtonProps, 'children'> {
  content: string
  copied?: boolean
  onCopiedChange?: (copied: boolean, content?: string) => void
  delay?: number
}

function CopyButton({
  className,
  content,
  copied: controlledCopied,
  onCopiedChange,
  onClick,
  variant = 'default',
  size,
  delay = 3000,
  ...props
}: CopyButtonProps) {
  const { copy, copied: internalCopied } = useClipboard({
    timeout: delay,
    onSuccess: (text) => onCopiedChange?.(true, text),
  })

  const [isCopied, setIsCopied] = useControlledState({
    value: controlledCopied,
    defaultValue: internalCopied,
    onChange: (val) => onCopiedChange?.(val, content),
  })

  // Sync internalCopied to isCopied state if not controlled
  React.useEffect(() => {
    if (controlledCopied === undefined) {
      setIsCopied(internalCopied)
    }
  }, [internalCopied, controlledCopied, setIsCopied])

  const handleCopy = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      if (controlledCopied) return
      if (content) {
        void copy(content)
      }
    },
    [onClick, controlledCopied, content, copy],
  )

  const buttonSize = size ? (sizeMap[size] ?? size) : 'icon'
  const Icon = isCopied ? CheckIcon : CopyIcon

  return (
    <Button
      data-slot="copy-button"
      variant={variant}
      size={buttonSize}
      className={cn('shrink-0', className)}
      onClick={handleCopy}
      {...props}
    >
      <MorphIcon activeKey={isCopied ? 'check' : 'copy'} data-slot="copy-button-icon">
        <Icon />
      </MorphIcon>
    </Button>
  )
}

export { CopyButton, buttonVariants as copyButtonVariants }
