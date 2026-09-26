'use client'

import { AvatarGroup, AvatarGroupAction } from '@/registry/components/spaceui/avatar-group'
import { Button } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { X } from '@keyline-icons/react'
import type { AvatarVariant } from '@usespaceui/avatars'
import type { SquishBackgroundStyle, SquishExpression } from '@usespaceui/squishmoji'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'

export type VoiceChatParticipantType = 'avatar' | 'squishmoji'

export interface VoiceChatParticipant {
  id: string
  name: string
  type?: VoiceChatParticipantType
  /** For type 'avatar': the avatar variant */
  variant?: AvatarVariant
  /** For type 'squishmoji': the expression */
  expression?: SquishExpression
  /** For type 'squishmoji': background style */
  backgroundStyle?: SquishBackgroundStyle
  isSpeaking?: boolean
}

const DEFAULT_PARTICIPANTS: VoiceChatParticipant[] = [
  { id: '1', name: 'Adriel', type: 'avatar', variant: 'lumina', isSpeaking: true },
  { id: '2', name: 'Poteto', type: 'squishmoji', expression: 'happy', backgroundStyle: 'taygeta' },
  { id: '3', name: 'Elon Musk', type: 'avatar', variant: 'pebble' },
  { id: '4', name: 'Guillermo', type: 'squishmoji', expression: 'excited', backgroundStyle: 'maia' },
  { id: '5', name: 'Lee Robinson', type: 'avatar', variant: 'doodle' },
  { id: '6', name: 'Shadcn', type: 'squishmoji', expression: 'loving', backgroundStyle: 'celaeno', isSpeaking: true },
  { id: '7', name: 'Sam Altman', type: 'avatar', variant: 'splash' },
]

const COLLAPSED_WIDTH = 268
const EXPANDED_WIDTH = 360
const EXPANDED_HEIGHT = 420

const AVATAR_SIZE_COLLAPSED = 44
const AVATAR_SIZE_EXPANDED = 56

// Apple-style spring — calm, breathing
const SPRING = { type: 'spring', stiffness: 240, damping: 30, mass: 0.9 } as const
const SPRING_SLOW = { type: 'spring', stiffness: 180, damping: 28, mass: 1.1 } as const

const WAVE_PEAKS = [0.3, 1, 0.55]

function WaveBars({ tone }: { tone: 'foreground' | 'background' }) {
  return (
    <div className="flex items-center justify-center gap-0.75">
      {WAVE_PEAKS.map((peak, i) => (
        <motion.span
          key={i}
          className={cn('w-0.75 rounded-full', tone === 'foreground' ? 'bg-foreground' : 'bg-background')}
          style={{ height: 10 }}
          animate={{ scaleY: [0.28, peak, 0.28] }}
          transition={{
            duration: 1.1,
            delay: i * 0.18,
            repeat: Infinity,
            ease: [0.45, 0, 0.55, 1],
          }}
        />
      ))}
    </div>
  )
}

function SpeakingIndicator({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={SPRING}
          className="absolute -top-1 -right-1 z-2 rounded-full bg-background p-1.5 ring-1 ring-border/40"
        >
          <WaveBars tone="foreground" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function AudioWaveIcon({ isExpanded }: { isExpanded: boolean }) {
  return (
    <motion.div
      animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.7 : 1 }}
      transition={SPRING}
      className="absolute flex size-11 items-center justify-center rounded-full bg-foreground"
      style={{ left: 12, top: '50%', y: '-50%' }}
      aria-hidden={isExpanded}
    >
      <WaveBars tone="background" />
    </motion.div>
  )
}

function ParticipantAvatar({
  participant,
  size,
  animate,
  isExpanded = false,
  isSpeaking = false,
}: {
  participant: VoiceChatParticipant
  size: number
  animate?: boolean
  isExpanded?: boolean
  isSpeaking?: boolean
}) {
  const avatarClassName = cn('size-11 ring-2 ring-background', isExpanded && 'size-full')

  if (participant.type === 'squishmoji') {
    return (
      <Avatar className={avatarClassName}>
        <div className="flex items-center justify-center bg-muted rounded-full">
          <Squishmoji
            seed={participant.id}
            expression={participant.expression ?? 'happy'}
            shape="all"
            size={size}
            backgroundStyle={participant.backgroundStyle ?? 'taygeta'}
            animate={animate}
            animWobble={animate}
          />
        </div>
        {isSpeaking && <SpeakingIndicator show={true} />}
      </Avatar>
    )
  }
  return (
    <Avatar className={avatarClassName}>
      <AvatarImage
        alt={participant.name}
        src={`https://avatars.spaceui.one/v1?name=${participant.name.toLowerCase().replace(/\s+/g, '')}&variant=${participant.variant ?? 'pebble'}`}
      />
      <AvatarFallback>
        {participant.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}
      </AvatarFallback>
      {isSpeaking && <SpeakingIndicator show={true} />}
    </Avatar>
  )
}

export interface VoiceChatWidgetProps {
  participants?: VoiceChatParticipant[]
  hiddenCount?: number
  className?: string
  onJoin?: (user: VoiceChatParticipant) => void
}

export function VoiceChatWidget({
  participants = DEFAULT_PARTICIPANTS,
  hiddenCount = 3,
  className,
  onJoin,
}: VoiceChatWidgetProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [localParticipants, setLocalParticipants] = React.useState<VoiceChatParticipant[]>(participants)
  const [hasJoined, setHasJoined] = React.useState(false)
  const [isCollapsing, setIsCollapsing] = React.useState(false)
  const [leavingId, setLeavingId] = React.useState<string | null>(null)

  return (
    <motion.div
      onClick={() => !isExpanded && setIsExpanded(true)}
      animate={{
        width: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
        height: isExpanded ? EXPANDED_HEIGHT : 60,
        borderRadius: isExpanded ? 24 : 999,
      }}
      transition={SPRING_SLOW}
      className={cn(
        'relative overflow-hidden border-2 border-muted bg-background',
        !isExpanded && 'cursor-pointer hover:bg-background',
        className,
      )}
    >
      <AudioWaveIcon isExpanded={isExpanded} />

      {/* 
      <motion.div
        animate={{ opacity: isExpanded ? 0 : 1 }}
        transition={SPRING}
        className="absolute flex items-center gap-0.5 text-muted-foreground"
        style={{ right: 16, top: '50%', y: '-50%' }}
        aria-hidden={isExpanded}
      >
        <span className="text-md font-medium">+{hiddenCount}</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div> */}

      <motion.div
        animate={{
          opacity: isExpanded && !isCollapsing ? 1 : 0,
          y: isExpanded ? 0 : -6,
          filter: isCollapsing ? 'blur(8px)' : 'blur(0px)',
          scale: isCollapsing ? 0.95 : 1,
        }}
        transition={{ ...SPRING, delay: isCollapsing ? 0 : isExpanded ? 0.05 : 0 }}
        className={cn(
          'absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-4 pb-3 z-10',
          !isExpanded && 'pointer-events-none',
        )}
      >
        <div className="w-8" />
        <h2 className="text-[15px] font-semibold text-foreground">Voice Chat</h2>
        <Button
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation()
            setIsCollapsing(true)
            setTimeout(() => {
              setIsExpanded(false)
              setIsCollapsing(false)
            }, 250)
          }}
        >
          <X className="size-4" />
        </Button>
      </motion.div>

      <motion.div
        animate={{
          opacity: isExpanded && !isCollapsing ? 1 : 0,
          scaleX: isCollapsing ? 0 : 1,
          filter: isCollapsing ? 'blur(8px)' : 'blur(0px)',
        }}
        transition={{ ...SPRING, delay: isCollapsing ? 0.05 : 0, duration: isCollapsing ? 0.2 : 0.3 }}
        className="absolute left-4 right-4 h-px bg-border"
        style={{ top: 52 }}
      />

      {!isExpanded ? (
        <motion.div animate={{ opacity: 1 }} className="absolute flex items-center" style={{ left: 60, top: 8 }}>
          <AvatarGroup stacking="left">
            {localParticipants.slice(0, 4).map((participant) => (
              <ParticipantAvatar
                key={participant.id}
                participant={participant}
                size={AVATAR_SIZE_COLLAPSED}
                isSpeaking={participant.isSpeaking ?? false}
              />
            ))}
            {localParticipants.length > 4 && (
              <AvatarGroupAction className="size-11 ring-2 ring-muted bg-muted">
                +{localParticipants.length - 4}
              </AvatarGroupAction>
            )}
          </AvatarGroup>
        </motion.div>
      ) : (
        <motion.div
          animate={{
            opacity: isCollapsing ? 0 : 1,
            filter: isCollapsing ? 'blur(12px)' : 'blur(0px)',
            scale: isCollapsing ? 0.85 : 1,
          }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {localParticipants.map((participant, index) => {
            const gridStartX = 28
            const gridStartY = 70
            const colWidth = 80
            const rowHeight = 95
            const col = index < 4 ? index : index - 4
            const row = index < 4 ? 0 : 1
            const pos = {
              x: gridStartX + col * colWidth,
              y: gridStartY + row * rowHeight,
              size: AVATAR_SIZE_EXPANDED,
            }
            const avatarDelay = index * 0.03
            const isHovered = hovered === index
            const isLeaving = leavingId === participant.id

            return (
              <motion.div
                key={participant.id}
                animate={{
                  left: pos.x,
                  top: pos.y,
                  width: pos.size,
                  height: pos.size + 28,
                  opacity: isCollapsing || isLeaving ? 0 : 1,
                  scale: isLeaving ? 0.3 : 1,
                  filter: isLeaving ? 'blur(20px)' : isCollapsing ? 'blur(12px)' : 'blur(0px)',
                  zIndex: isLeaving ? 100 : 1,
                }}
                transition={{
                  ...SPRING,
                  delay: isLeaving ? 0 : isCollapsing ? index * 0.01 : avatarDelay,
                  duration: isLeaving ? 0.3 : undefined,
                  ease: isLeaving ? [0.4, 0, 0.2, 1] : undefined,
                }}
                className="absolute"
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className="rounded-full bg-background ring-2 ring-background"
                    style={{ width: pos.size, height: pos.size }}
                  >
                    <ParticipantAvatar
                      participant={participant}
                      size={pos.size}
                      animate={isHovered || isLeaving}
                      isExpanded={true}
                      isSpeaking={!!participant.isSpeaking}
                    />
                  </div>

                  <motion.span
                    animate={{ opacity: isCollapsing || isLeaving ? 0 : 1, y: isCollapsing ? -8 : isLeaving ? -12 : 0 }}
                    transition={{ ...SPRING, delay: isCollapsing ? 0 : isLeaving ? 0 : 0.15 + index * 0.03 }}
                    className="absolute whitespace-nowrap text-xs font-medium text-muted-foreground"
                    style={{ top: pos.size + 8 }}
                  >
                    {participant.name}
                  </motion.span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      <motion.div
        animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 12 }}
        transition={{ ...SPRING, delay: isExpanded ? 0.18 : 0 }}
        className={cn('absolute left-4 right-4', !isExpanded && 'pointer-events-none')}
        style={{ bottom: 50 }}
      >
        <Button
          variant="default"
          squircle
          full
          className="w-full font-medium"
          onClick={() => {
            if (hasJoined) {
              // Leave - morph blur animation then remove "You"
              const youParticipant = localParticipants.find((p) => p.name === 'You')
              if (youParticipant) {
                setLeavingId(youParticipant.id)
                setTimeout(() => {
                  setLocalParticipants((prev) => prev.filter((p) => p.name !== 'You'))
                  setHasJoined(false)
                  setLeavingId(null)
                  onJoin?.({ id: 'leave', name: 'You', type: 'avatar', variant: 'pebble' })
                }, 300)
              }
            } else {
              // Join - add "You"
              const newUser: VoiceChatParticipant = {
                id: `user-${Date.now()}`,
                name: 'You',
                type: 'avatar',
                variant: 'pebble',
              }
              setLocalParticipants((prev) => [...prev, newUser])
              setHasJoined(true)
              onJoin?.(newUser)
            }
          }}
        >
          {hasJoined ? 'Leave' : 'Join Now'}
        </Button>
      </motion.div>

      <motion.p
        animate={{ opacity: isExpanded ? 1 : 0 }}
        transition={{ ...SPRING, delay: isExpanded ? 0.22 : 0 }}
        className="absolute inset-x-0 text-center text-xs text-muted-foreground"
        style={{ bottom: 16 }}
      >
        Mic will be muted initially.
      </motion.p>
    </motion.div>
  )
}
