'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/registry/lib/utils'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'
import { focus } from './shared'

export function SelectChevron() {
  return <IconChevronDown aria-hidden="true" strokeWidth={2} className="size-4 flex-none text-[#a9a49e]" />
}

export function InlineSelectChevron() {
  return <IconChevronDown aria-hidden="true" strokeWidth={1.5} className="ml-0.5 size-4 flex-none" />
}

export type SpeechSelectItem = {
  id: string
  label: string
  description?: string
  image: string
}

export function SpeechSelect({
  ariaLabel,
  value,
  items,
  onChange,
  menuWidth,
  hideTriggerImageOnMobile = false,
  hideTriggerLabelOnMobile = false,
  inlineCode = false,
  triggerValue,
}: {
  ariaLabel: string
  value: string
  items: readonly SpeechSelectItem[]
  onChange: (value: string) => void
  menuWidth: number
  hideTriggerImageOnMobile?: boolean
  hideTriggerLabelOnMobile?: boolean
  inlineCode?: boolean
  triggerValue?: string
}) {
  const [open, setOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selectedItem = items.find((item) => item.id === value) ?? items[0]

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    const edge = 6
    setMenuPosition({
      left: Math.max(edge, Math.min(rect.left - 4, window.innerWidth - menuWidth - edge)),
      top: rect.bottom,
    })
  }, [menuWidth])

  const toggleMenu = () => {
    if (!open) updateMenuPosition()
    setOpen((current) => !current)
  }

  useEffect(() => {
    if (!open) return

    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    const reposition = () => updateMenuPosition()

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromEscape)
    window.addEventListener('resize', reposition)
    window.addEventListener('scroll', reposition, true)

    const selectedOption = menuRef.current?.querySelector<HTMLElement>('[role="option"][aria-selected="true"]')
    selectedOption?.scrollIntoView({ block: 'nearest' })

    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromEscape)
      window.removeEventListener('resize', reposition)
      window.removeEventListener('scroll', reposition, true)
    }
  }, [open, updateMenuPosition])

  const menu = open
    ? createPortal(
        <div
          ref={menuRef}
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className="fixed z-[220] max-h-[206px] overflow-auto rounded-2xl bg-white p-1.5 text-[15px] leading-[22px] text-black outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{
            left: menuPosition.left,
            top: menuPosition.top,
            width: menuWidth,
            boxShadow: 'rgba(0, 0, 0, 0.4) 0px 0px 1px 0px, rgba(0, 0, 0, 0.04) 0px 4px 4px 0px',
          }}
          onKeyDown={(event) => {
            if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
            event.preventDefault()
            const options = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="option"]'))
            const current = options.indexOf(document.activeElement as HTMLButtonElement)
            const direction = event.key === 'ArrowDown' ? 1 : -1
            const next =
              current === -1
                ? options.findIndex((option) => option.getAttribute('aria-selected') === 'true')
                : (current + direction + options.length) % options.length
            options[Math.max(0, next)]?.focus()
          }}
        >
          {items.map((item) => {
            const selected = item.id === value
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(item.id)
                  setOpen(false)
                  triggerRef.current?.focus()
                }}
                className={cn(
                  'relative flex h-9 w-full items-center gap-2 rounded-xl pl-2.5 text-left outline-none transition-colors before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-[#f5f3f1] before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:before:opacity-100',
                  selected ? 'pr-1.5' : 'pr-[38px]',
                )}
              >
                <span
                  aria-hidden="true"
                  className="relative z-10 size-4 flex-none self-center rounded-full bg-[#dedbd8] bg-cover bg-center"
                  style={{ backgroundImage: `url("${item.image}")` }}
                />
                <span className="relative z-10 min-w-0 truncate">{item.label}</span>
                {item.description ? (
                  <span className="relative z-10 ml-1 flex-none text-[13px] leading-[18px] text-[#777169]">
                    {item.description}
                  </span>
                ) : null}
                {selected ? (
                  <IconCheck
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="relative z-10 ml-auto size-6 flex-none text-black"
                  />
                ) : null}
              </button>
            )
          })}
        </div>,
        document.body,
      )
    : null

  return (
    <span className={inlineCode ? 'inline' : 'block min-w-0'}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={toggleMenu}
        className={
          inlineCode
            ? cn(
                'inline-flex h-[23px] max-w-[230px] items-center rounded-lg bg-[#eef6ff]/70 pr-[3px] pl-1 align-middle text-[13px] leading-none font-normal text-[#052f70] ring-[.5px] ring-[#78b7ff] ring-inset outline-none transition hover:ring-1 hover:ring-[#368cff]',
                focus,
              )
            : cn(
                'flex h-9 w-full items-center gap-2 rounded-xl pr-2 pl-3 text-[15px] leading-[22px] font-medium text-black outline-none transition-colors',
                focus,
              )
        }
      >
        <span className={cn('flex min-w-0 flex-1 items-baseline', !inlineCode && 'gap-2')}>
          {!inlineCode && (
            <span
              aria-hidden="true"
              className={cn(
                'size-4 flex-none self-center rounded-full bg-[#dedbd8] bg-cover bg-center',
                hideTriggerImageOnMobile && 'max-sm:hidden',
              )}
              style={{ backgroundImage: `url("${selectedItem.image}")` }}
            />
          )}
          <span className={cn('min-w-0 truncate', hideTriggerLabelOnMobile && 'max-sm:hidden')}>
            {triggerValue ?? selectedItem.label}
          </span>
        </span>
        {inlineCode ? (
          <InlineSelectChevron />
        ) : (
          <span className="flex-none transition-transform">
            <SelectChevron />
          </span>
        )}
      </button>
      {menu}
    </span>
  )
}
