'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IconCheck, IconPlus, IconSearch } from '@tabler/icons-react'
import { cn } from '@/registry/lib/utils'
import {
  Combobox,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxTrigger,
} from '@/registry/primitives/combobox'

export interface Member {
  id: string
  name: string
  email?: string
  avatar?: string
}

export interface MemberSelectorProps {
  members: Member[]
  selected: string[]
  onChange: (selected: string[]) => void
  max?: number
  maxVisible?: number
  label?: string
  className?: string
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const MOTION_EASE = [0.22, 1, 0.36, 1] as const

interface MemberBubbleProps {
  member: Member
  isSelected: boolean
  onClick: () => void
}

function MemberBubble({ member, isSelected, onClick }: MemberBubbleProps) {
  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.85, filter: 'blur(2px)' }}
      onClick={onClick}
      className="group relative flex flex-col items-center gap-1.5 outline-none cursor-pointer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{
        layout: { duration: 0.35, ease: MOTION_EASE },
        opacity: { duration: 0.25, ease: MOTION_EASE },
        scale: { duration: 0.25, ease: MOTION_EASE },
        filter: { duration: 0.25, ease: MOTION_EASE },
      }}
    >
      <div
        className={cn(
          'relative size-12 rounded-full overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2',
          !isSelected && 'opacity-50 hover:opacity-75',
        )}
      >
        {member.avatar ? (
          <img
            src={member.avatar}
            alt={member.name}
            className={cn(
              'size-full object-cover transition-[filter,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              !isSelected && 'grayscale',
            )}
          />
        ) : (
          <div
            className={cn(
              'size-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
              isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
            )}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!isSelected && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: MOTION_EASE,
            }}
            className="absolute bottom-5 right-0 size-4 rounded-full bg-foreground dark:bg-white flex items-center justify-center shadow-xs pointer-events-none"
          >
            <IconPlus className="size-2.5 text-background dark:text-black" strokeWidth={2.5} />
          </motion.div>
        )}
      </AnimatePresence>

      <span
        className={cn(
          'text-xs font-medium truncate max-w-15 transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isSelected ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {member.name.split(' ')[0]}
      </span>
    </motion.button>
  )
}

interface AddButtonProps extends React.ComponentPropsWithoutRef<typeof motion.button> {
  isOpen: boolean
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(({ isOpen, className, ...props }, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      className={cn('group flex flex-col items-center gap-1.5 outline-none cursor-pointer', className)}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: MOTION_EASE }}
      {...props}
    >
      <div
        className={cn(
          'size-12 rounded-full border-2 border-dashed flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          'group-focus-visible:ring-2 group-focus-visible:ring-ring group-focus-visible:ring-offset-2',
          isOpen
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/40 hover:border-muted-foreground/60 hover:bg-muted/50',
        )}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.25, ease: MOTION_EASE }}>
          <IconPlus
            className={cn('size-5 transition-colors duration-200', isOpen ? 'text-primary' : 'text-muted-foreground')}
          />
        </motion.div>
      </div>
      <span
        className={cn(
          'text-xs font-medium transition-colors duration-200',
          isOpen ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        Add
      </span>
    </motion.button>
  )
})
AddButton.displayName = 'AddButton'

export const MemberSelector = React.forwardRef<HTMLDivElement, MemberSelectorProps>(
  ({ members, selected, onChange, max, maxVisible = 5, label, className }, ref) => {
    const [open, setOpen] = React.useState(false)
    const triggerRef = React.useRef<HTMLButtonElement>(null)

    const visibleMembers = React.useMemo(() => {
      return [...members]
        .sort((a, b) => {
          const aSel = selected.includes(a.id)
          const bSel = selected.includes(b.id)
          return aSel && !bSel ? -1 : !aSel && bSel ? 1 : 0
        })
        .slice(0, maxVisible)
    }, [members, selected, maxVisible])

    const sortedMembers = React.useMemo(() => {
      return [...members].sort((a, b) => {
        const aSel = selected.includes(a.id)
        const bSel = selected.includes(b.id)
        return aSel && !bSel ? -1 : !aSel && bSel ? 1 : 0
      })
    }, [members, selected])

    const selectedMembers = React.useMemo(() => {
      return members.filter((m) => selected.includes(m.id))
    }, [members, selected])

    const handleToggleSelect = (id: string) => {
      if (selected.includes(id)) {
        onChange(selected.filter((item) => item !== id))
      } else {
        if (max && selected.length >= max) return
        onChange([...selected, id])
      }
    }

    return (
      <div ref={ref} className={cn('relative', className)}>
        {label && (
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">{label}</div>
        )}
        <div className="flex items-start gap-4 flex-wrap">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleMembers.map((member) => (
              <MemberBubble
                key={member.id}
                member={member}
                isSelected={selected.includes(member.id)}
                onClick={() => handleToggleSelect(member.id)}
              />
            ))}
          </AnimatePresence>
          <motion.div layout transition={{ duration: 0.35, ease: MOTION_EASE }} className="relative">
            <Combobox
              autoHighlight
              items={sortedMembers}
              multiple
              value={selectedMembers}
              onValueChange={(newSelectedMembers) => {
                if (max && newSelectedMembers.length > max) return
                onChange(newSelectedMembers.map((m) => m.id))
              }}
              open={open}
              onOpenChange={(nextOpen, details) => {
                if (details.reason === 'item-press') return
                setOpen(nextOpen)
              }}
              itemToStringLabel={(item) => (item ? `${item.name} ${item.email ?? ''}` : '')}
              itemToStringValue={(item) => item?.id ?? ''}
              isItemEqualToValue={(a, b) => a?.id === b?.id}
            >
              <ComboboxTrigger render={<AddButton ref={triggerRef} isOpen={open} />} />
              <ComboboxPopup anchor={triggerRef}>
                <div className="p-2 border-b border-border">
                  <ComboboxInput
                    placeholder="Search members..."
                    showTrigger={false}
                    startAddon={<IconSearch className="size-4 text-muted-foreground" />}
                    className="rounded-lg"
                  />
                </div>
                <ComboboxEmpty className="text-center text-sm text-muted-foreground">No members found</ComboboxEmpty>
                <ComboboxList className="overflow-y-auto p-1 gap-1">
                  {(member: Member) => {
                    const isSel = selected.includes(member.id)
                    return (
                      <ComboboxItem
                        key={member.id}
                        value={member}
                        disabled={!isSel && max !== undefined && selected.length >= max}
                        className={cn(
                          'w-full flex items-center gap-3 not-first:mt-2 px-3 py-2.5 cursor-pointer rounded-lg transition-colors select-none',
                          '[&>.col-start-1]:hidden [&>.col-start-2]:flex [&>.col-start-2]:items-center [&>.col-start-2]:gap-3 [&>.col-start-2]:w-full [&>.col-start-2]:min-w-0',
                          isSel ? 'bg-muted hover:bg-muted/90' : 'hover:bg-muted/80',
                        )}
                      >
                        <div
                          className={cn(
                            'size-9 rounded-full overflow-hidden shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            !isSel && 'grayscale opacity-60',
                          )}
                        >
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="size-full object-cover" />
                          ) : (
                            <div
                              className={cn(
                                'size-full flex items-center justify-center text-xs font-medium',
                                isSel ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                              )}
                            >
                              {getInitials(member.name)}
                            </div>
                          )}
                        </div>

                        <div className="flex-1 text-left min-w-0">
                          <div
                            className={cn(
                              'text-sm font-medium truncate transition-colors duration-200',
                              isSel ? 'text-foreground' : 'text-foreground/80',
                            )}
                          >
                            {member.name}
                          </div>
                          {member.email && <div className="text-xs text-muted-foreground truncate">{member.email}</div>}
                        </div>

                        <div
                          className={cn(
                            'size-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200',
                            isSel ? 'bg-primary' : 'border-2 border-muted-foreground/30',
                          )}
                        >
                          {isSel && (
                            <motion.div
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.18, ease: MOTION_EASE }}
                            >
                              <IconCheck className="size-3 text-primary-foreground" strokeWidth={3} />
                            </motion.div>
                          )}
                        </div>
                      </ComboboxItem>
                    )
                  }}
                </ComboboxList>
              </ComboboxPopup>
            </Combobox>
          </motion.div>
        </div>
      </div>
    )
  },
)

MemberSelector.displayName = 'MemberSelector'
export default MemberSelector
