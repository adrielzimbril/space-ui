'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/registry/lib/utils'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { focus } from './shared'
import { SelectChevron } from './speech-select'

export function CopyIcon({ copied }: { copied: boolean }) {
  return copied ? (
    <IconCheck aria-hidden="true" strokeWidth={1.5} className="size-4" />
  ) : (
    <IconCopy aria-hidden="true" strokeWidth={1.5} className="size-4" />
  )
}

export function ApiPromptInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <span className="group relative flex h-6 min-w-0 flex-auto self-center rounded-lg bg-[#eef6ff]/70 ring-[.5px] ring-[#78b7ff] ring-inset transition hover:ring-[#368cff] focus-within:ring-1 focus-within:ring-[#368cff]">
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder=" "
        spellCheck={false}
        maxLength={500}
        aria-label="Prompt"
        className="h-6 w-full min-w-0 bg-transparent px-1.5 text-[#052f70] caret-[#368cff] outline-none"
      />
      <span className="pointer-events-none absolute inset-y-px left-px w-7 rounded-l-lg bg-gradient-to-r from-[#eef6ff] to-transparent opacity-0 transition-opacity group-focus-within:opacity-100" />
      <span className="pointer-events-none absolute inset-y-px right-px w-7 rounded-r-lg bg-gradient-to-l from-[#eef6ff] to-transparent opacity-0 transition-opacity group-focus-within:opacity-100" />
    </span>
  )
}

export function CodeLanguageSelect({
  value,
  onChange,
}: {
  value: 'ts' | 'python'
  onChange: (value: 'ts' | 'python') => void
}) {
  const [open, setOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const options = [
    { id: 'ts', label: 'TypeScript' },
    { id: 'python', label: 'Python' },
  ] as const

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    setMenuPosition({ left: rect.left, top: rect.bottom - 2 })
  }, [])

  useEffect(() => {
    if (!open) return
    updatePosition()

    const closeOnOutsidePress = (event: MouseEvent) => {
      const target = event.target as Node
      if (!triggerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }

    document.addEventListener('mousedown', closeOnOutsidePress)
    document.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsidePress)
      document.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [open, updatePosition])

  const menu =
    open && typeof document !== 'undefined'
      ? createPortal(
          <div
            ref={menuRef}
            id={listboxId}
            role="listbox"
            aria-label="Code language"
            className="fixed z-[220] w-[138px] rounded-2xl bg-white p-1.5 text-[15px] leading-6 text-black shadow-[0_0_1px_rgba(0,0,0,.4),0_1px_1px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.10)] ring-[.5px] ring-black/[.075] outline-none"
            style={menuPosition}
          >
            {options.map((option) => {
              const selected = option.id === value
              return (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.id)
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  className="flex h-9 w-full items-center rounded-[10px] px-2.5 text-left outline-none transition-colors hover:bg-[#f5f3f1] focus-visible:bg-[#f5f3f1]"
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {selected && <IconCheck aria-hidden="true" strokeWidth={1.5} className="size-4 flex-none" />}
                </button>
              )
            })}
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Code language"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        onClick={() => {
          updatePosition()
          setOpen((current) => !current)
        }}
        className={cn(
          'flex h-9 items-center gap-2 rounded-xl pr-2 pl-3 text-[14px] leading-5 font-medium text-black outline-none transition-colors',
          focus,
        )}
      >
        <span>{value === 'ts' ? 'TypeScript' : 'Python'}</span>
        <span className="transition-transform">
          <SelectChevron />
        </span>
      </button>
      {menu}
    </>
  )
}
