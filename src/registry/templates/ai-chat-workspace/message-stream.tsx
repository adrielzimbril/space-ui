'use client'

import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { useClipboard } from '@/registry/hooks/browser/use-clipboard'

import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { IconCheck, IconCode, IconCopy, IconFileText, IconThumbDown, IconThumbUp } from '@tabler/icons-react'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import * as React from 'react'
import { getCategoryAgent } from './data'
import { SpaceUILogo } from './logo'
import type { ChatAttachment, ChatMessage } from './types'

export function CopyButton({ text, className }: { text: string; className?: string }) {
  const { copy, copied } = useClipboard({ timeout: 2000 })

  return (
    <ButtonSquircle
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={() => copy(text)}
      aria-label={copied ? 'Copied' : 'Copy message'}
      title={copied ? 'Copied to clipboard' : 'Copy message'}
      className={cn(
        'cursor-pointer transition-colors',
        copied ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        className,
      )}
    >
      {copied ? (
        <IconCheck className="size-3.5 text-primary scale-110 transition-transform duration-200" stroke={2.2} />
      ) : (
        <IconCopy className="size-3.5" stroke={1.8} />
      )}
    </ButtonSquircle>
  )
}

export function FeedbackButtons() {
  const [rating, setRating] = React.useState<'up' | 'down' | null>(null)

  return (
    <div className="flex items-center gap-0.5">
      <ButtonSquircle
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => setRating((prev) => (prev === 'up' ? null : 'up'))}
        aria-label="Good response"
        title="Good response"
        className={cn(
          'cursor-pointer transition-colors',
          rating === 'up'
            ? 'bg-primary/15 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        )}
      >
        <IconThumbUp className="size-3.5" stroke={1.8} />
      </ButtonSquircle>
      <ButtonSquircle
        type="button"
        variant="ghost"
        size="icon-xs"
        onClick={() => setRating((prev) => (prev === 'down' ? null : 'down'))}
        aria-label="Bad response"
        title="Bad response"
        className={cn(
          'cursor-pointer transition-colors',
          rating === 'down'
            ? 'bg-destructive/15 text-destructive'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
        )}
      >
        <IconThumbDown className="size-3.5" stroke={1.8} />
      </ButtonSquircle>
    </div>
  )
}

export function AttachmentView({ attachment }: { attachment: ChatAttachment }) {
  if (attachment.type === 'image') {
    return (
      <div className="relative h-44 w-44 overflow-hidden [corner-shape:superellipse(1.25)] rounded-2xl bg-muted border border-muted flex items-center justify-center">
        <SpaceUILogo size={48} />
      </div>
    )
  }

  const isCode = attachment.type === 'code'

  return (
    <div className="flex min-w-52.5 items-center gap-3 [corner-shape:superellipse(1.25)] rounded-2xl px-4 py-3 bg-card border border-muted">
      <div className="flex size-9 shrink-0 items-center justify-center [corner-shape:superellipse(1.25)] rounded-full bg-muted text-muted-foreground">
        {isCode ? <IconCode className="size-4" stroke={1.8} /> : <IconFileText className="size-4" stroke={1.8} />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium leading-tight text-foreground">
          {attachment.name || (isCode ? 'recipe.txt' : 'document.pdf')}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground leading-none">
          {attachment.size || (isCode ? 'Code' : 'PDF')}
        </p>
      </div>
    </div>
  )
}

export interface MessageStreamProps {
  isNew: boolean
  messages: ChatMessage[]
  userName?: string
  category?: string
}

export function MessageStream({ isNew, messages, userName = 'Adriel', category }: MessageStreamProps) {
  const agentConfig = getCategoryAgent(category)

  if (isNew) {
    return (
      <section className="absolute left-1/2 top-1/2 flex w-full max-w-175 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center px-4">
        <SpaceUILogo size={48} className="mb-5" />
        <h1 className="mb-1 text-xl font-semibold leading-snug tracking-tight text-foreground">Hello {userName}</h1>
        <p className="text-center text-sm font-normal leading-normal text-muted-foreground">
          What can I help you explore or create today?
        </p>
      </section>
    )
  }

  return (
    <div className="relative z-10 flex min-h-0 flex-1 flex-col-reverse overflow-y-auto pt-16">
      <div className="mx-auto flex min-h-full w-full max-w-175 flex-col justify-end space-y-7 px-2 py-4">
        {messages.map((msg) =>
          msg.role === 'assistant' ? (
            <div key={msg.id} className="flex max-w-[92%] sm:max-w-[85%] items-start gap-3">
              <div className="relative flex size-8 items-center justify-center overflow-hidden [corner-shape:superellipse(1.25)] rounded-xl bg-accent mt-0.5 ring-1 ring-border/50">
                <Squishmoji
                  seed={agentConfig.seed}
                  shape={agentConfig.shape}
                  expression={agentConfig.expression}
                  backgroundStyle="all"
                  animate
                  animOnHover
                  size={Math.round(26 * 1.4)}
                  className="origin-center transition-transform"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 min-w-0">
                <div className="hidden! sflex items-center gap-2">
                  <span className="text-xs font-semibold text-foreground">{agentConfig.name}</span>
                  <Badge variant="outline" size="xs" className="text-[0.625rem] px-1.5 py-0.5 font-normal">
                    {category || 'Space AI'}
                  </Badge>
                </div>
                <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{msg.content}</div>
                {msg.attachments && msg.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {msg.attachments.map((att, idx) => (
                      <AttachmentView key={idx} attachment={att} />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-1 pt-0.5">
                  <CopyButton text={msg.content} />
                  <FeedbackButtons />
                </div>
              </div>
            </div>
          ) : (
            <div key={msg.id} className="group/user-msg flex justify-end">
              <div className="flex max-w-[92%] sm:max-w-[85%] items-start justify-end gap-3">
                <div className="flex flex-1 flex-col items-end gap-2 min-w-0">
                  {msg.attachments?.map((att, idx) => (
                    <AttachmentView key={idx} attachment={att} />
                  ))}
                  {msg.content && (
                    <div className="relative group/bubble flex items-center gap-1.5">
                      <CopyButton
                        text={msg.content}
                        className="opacity-0 group-hover/bubble:opacity-100 transition-opacity"
                      />
                      <div className="[corner-shape:superellipse(1.25)] rounded-2xl px-4 py-2.5 bg-muted border border-muted">
                        <p className="text-sm leading-relaxed text-foreground">{msg.content}</p>
                      </div>
                    </div>
                  )}
                </div>
                <Avatar className="size-8 shrink-0 ring-1 ring-border mt-0.5">
                  <AvatarImage
                    src={`https://avatars.spaceui.one/v1?name=${userName.toLowerCase().replace(/\s+/g, '')}&variant=pebble`}
                    alt={userName}
                  />
                  <AvatarFallback className="text-[0.6875rem] font-semibold">AZ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
