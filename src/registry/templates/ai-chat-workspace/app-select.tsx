'use client'

import { cn } from '@/registry/lib/utils'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import { IconChevronDown } from '@tabler/icons-react'
import * as React from 'react'

export interface SelectOption {
  value: string
  label: string
  provider?: string
  badge?: string
  description?: string
}

export interface AppSelectProps {
  options: SelectOption[]
  value: string
  onChange: (val: string) => void
  ariaLabel: string
  variant?: 'compact' | 'inline'
  size?: 'xsmall' | 'small' | 'medium'
  className?: string
  dropdownClassName?: string
}

export const AppSelect = React.forwardRef<HTMLDivElement, AppSelectProps>(function AppSelect(
  { options, value, onChange, ariaLabel, variant = 'compact', size = 'medium', className, dropdownClassName },
  forwardedRef,
) {
  const currentOption = options.find((o) => o.value === value) || options[0]

  return (
    <div ref={forwardedRef} className={cn('relative inline-block', className)}>
      <Select
        aria-label={ariaLabel}
        value={value}
        onValueChange={(val: string | null) => {
          if (val) onChange(val)
        }}
        items={options}
      >
        <SelectTrigger
          className={cn(
            'cursor-pointer outline-none overflow-hidden transition duration-200 focus-visible:ring-1 focus-visible:ring-ring border-0 shadow-none [&>span[data-slot=select-icon]]:hidden',
            variant === 'compact' &&
              size === 'medium' &&
              'h-10 gap-1.5 [corner-shape:superellipse(1.25)] rounded-xl bg-muted px-3 text-sm font-medium text-foreground ring-1 ring-inset ring-muted hover:bg-accent hover:text-accent-foreground',
            variant === 'compact' &&
              size === 'small' &&
              'h-9 gap-1 [corner-shape:superellipse(1.25)] rounded-xl bg-muted px-3 text-sm font-medium text-foreground ring-1 ring-inset ring-muted hover:bg-accent hover:text-accent-foreground',
            variant === 'compact' &&
              size === 'xsmall' &&
              'h-8 gap-1 [corner-shape:superellipse(1.25)] rounded-xl bg-muted px-2.5 text-xs font-medium text-foreground ring-1 ring-inset ring-muted hover:bg-accent hover:text-accent-foreground',
            variant === 'inline' &&
              'h-5 min-h-0 w-auto min-w-0 gap-1 rounded-none bg-transparent p-0 text-sm font-normal text-muted-foreground hover:text-foreground',
          )}
        >
          <SelectValue>
            {() => (
              <span className="flex items-center gap-1.5 truncate">
                <span className="truncate">{currentOption?.label}</span>
              </span>
            )}
          </SelectValue>
          <IconChevronDown
            className={cn(
              'shrink-0 text-muted-foreground transition duration-200',
              size === 'xsmall' && variant === 'compact' ? 'size-3.5' : 'size-4',
              variant === 'inline' && 'size-3.5',
            )}
            stroke={2}
          />
        </SelectTrigger>

        <SelectPopup
          alignItemWithTrigger={false}
          className={cn('min-w-60 bg-background overflow-hidden [corner-shape:superellipse(1.25)]', dropdownClassName)}
        >
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              className="group relative flex w-full cursor-pointer select-none items-center [corner-shape:superellipse(1.25)] rounded-lg p-2 font-medium outline-none transition text-sm text-muted-foreground hover:text-foreground focus:text-foreground data-selected:text-foreground"
            >
              <div className="flex min-w-0 flex-col items-start pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="line-clamp-1">{opt.label}</span>
                  {opt.badge && (
                    <Badge variant="secondary" size="xs" className="text-[0.625rem] px-1.5 py-0.5 font-medium">
                      {opt.badge}
                    </Badge>
                  )}
                </div>
                {opt.description && (
                  <span className="mt-0.5 text-[0.6875rem] font-normal leading-tight text-muted-foreground">
                    {opt.description}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  )
})
