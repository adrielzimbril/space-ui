'use client'

import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { LiquidBorder } from '@/registry/components/spaceui/liquid-metal-border'
import { cn } from '@/registry/lib/utils'
import { IconArrowUp, IconSparkles } from '@tabler/icons-react'
import * as React from 'react'
import { AppSelect } from './app-select'
import { AI_MODELS, AI_TOOLS } from './data'
import { RainbowUpgradeButton } from './user-menu'

export interface ChatComposerProps {
  inputPrompt: string
  setInputPrompt: (val: string) => void
  onSend: () => void
  selectedModel: string
  setSelectedModel: (val: string) => void
  selectedTool: string
  setSelectedTool: (val: string) => void
  theme: 'dark' | 'light'
}

export function ChatComposer({
  inputPrompt,
  setInputPrompt,
  onSend,
  selectedModel,
  setSelectedModel,
  selectedTool,
  setSelectedTool,
}: ChatComposerProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="z-20 flex flex-col items-center px-2 lg:p-1">
      <div className="mb-4 w-full [corner-shape:superellipse(1.25)] rounded-2xl border border-muted bg-muted p-px lg:w-[43.75rem] lg:[corner-shape:superellipse(1.25)] lg:rounded-[1.25rem]">
        <div className="flex items-center justify-between px-2.5 py-1.5 text-xs font-medium text-muted-foreground lg:px-3">
          <div className="flex items-center gap-1.5">
            <IconSparkles className="size-3.5 text-primary" stroke={2} />
            <span>Access premium reasoning models & creative tools</span>
          </div>
          <RainbowUpgradeButton />
        </div>

        <div className="flex cursor-text flex-col gap-2 [corner-shape:superellipse(1.25)] rounded-[0.9375rem] p-2.5 pt-0 transition-all duration-200 lg:[corner-shape:superellipse(1.25)] lg:rounded-[1.1875rem] lg:p-3 lg:pt-0 bg-card border border-muted">
          <textarea
            ref={textareaRef}
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything, brainstorm ideas, or analyze research..."
            rows={1}
            className="max-h-40 min-h-6 w-full resize-none overflow-y-auto border-0 bg-transparent pt-2.5 pl-1 text-sm leading-5 tracking-normal outline-none focus:border-0 focus:ring-0 text-foreground placeholder:text-muted-foreground lg:pt-3.5 lg:pb-6 lg:text-[0.9375rem] lg:leading-6"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AppSelect
                ariaLabel="Tool mode"
                size="xsmall"
                value={selectedTool}
                onChange={setSelectedTool}
                options={AI_TOOLS}
              />
            </div>

            <div className="flex items-center gap-2">
              <AppSelect
                ariaLabel="AI Model"
                size="medium"
                value={selectedModel}
                onChange={setSelectedModel}
                options={AI_MODELS}
              />

              <LiquidBorder
                className="p-0.5 [corner-shape:superellipse(1.25)] rounded-full"
                innerClassName="size-full flex items-center justify-center"
              >
                <ButtonSquircle
                  type="button"
                  onClick={onSend}
                  aria-label="Send message"
                  size="icon-lg"
                  squircle={false}
                  variant={inputPrompt.trim() ? 'primary' : 'secondary'}
                  className={cn(
                    'cursor-pointer [corner-shape:superellipse(1.25)] rounded-full transition duration-200 focus-visible:ring-1 focus-visible:ring-ring border-0',
                    inputPrompt.trim()
                      ? 'bg-primary text-primary-foreground hover:bg-primary'
                      : 'bg-muted text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <IconArrowUp className="size-5" stroke={2.3} />
                </ButtonSquircle>
              </LiquidBorder>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs font-normal leading-none text-muted-foreground lg:w-[43.75rem]">
        AI can make mistakes — verify important info.
      </p>
    </div>
  )
}
