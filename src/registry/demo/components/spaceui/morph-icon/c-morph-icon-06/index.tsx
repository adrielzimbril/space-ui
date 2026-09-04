'use client'

import * as React from 'react'
import { Button } from '@/registry/primitives/button'
import { Input } from '@/registry/primitives/input'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { IconChevronDown, IconChevronUp, IconEye, IconEyeOff, IconPlus, IconMinus } from '@tabler/icons-react'

export default function AccordionVisibilityDemo() {
  const [expanded, setExpanded] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [openSection, setOpenSection] = React.useState(false)

  return (
    <div className="flex flex-col items-center gap-6 p-8 max-w-sm w-full mx-auto">
      {/* Password visibility input */}
      <div className="relative w-full">
        <Input
          type={showPassword ? 'text' : 'password'}
          defaultValue="super-secret-passphrase"
          placeholder="Password"
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 size-7 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setShowPassword((p) => !p)}
        >
          <MorphIcon activeKey={showPassword ? 'visible' : 'hidden'} variant="blur-scale">
            {showPassword ? <IconEyeOff className="size-4" /> : <IconEye className="size-4" />}
          </MorphIcon>
        </Button>
      </div>

      {/* Accordion / Plus-Minus Button */}
      <div className="flex items-center gap-3 w-full justify-between p-3 rounded-xl border border-border bg-card">
        <span className="text-xs font-medium text-foreground">Expand Details</span>
        <Button
          variant="outline"
          size="icon"
          className="size-8 rounded-lg cursor-pointer"
          onClick={() => setOpenSection((o) => !o)}
        >
          <MorphIcon activeKey={openSection ? 'minus' : 'plus'} variant="rotate-scale">
            {openSection ? <IconMinus className="size-4" /> : <IconPlus className="size-4" />}
          </MorphIcon>
        </Button>
      </div>

      {/* Dropdown / Chevron indicator */}
      <div className="flex items-center gap-3 w-full justify-between p-3 rounded-xl border border-border bg-card">
        <span className="text-xs font-medium text-foreground">Menu Trigger</span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-lg cursor-pointer"
          onClick={() => setExpanded((e) => !e)}
        >
          <MorphIcon activeKey={expanded ? 'up' : 'down'} variant="flip">
            {expanded ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />}
          </MorphIcon>
        </Button>
      </div>
    </div>
  )
}
