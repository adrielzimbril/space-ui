'use client'

import type { FormEvent } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/registry/lib/utils'
import { IconCheck, IconMicrophoneOff, IconPhoneFilled } from '@tabler/icons-react'
import { OrbSmooth } from '@/registry/components/orb/smooth'
import { demoAgents, initialAgentMessages } from '../../../data'
import { focus } from '../../../components/shared'
import { SelectChevron } from '../../../components/speech-select'

export function PhoneIcon() {
  return <IconPhoneFilled aria-hidden="true" className="size-5" />
}

export function MicOffIcon() {
  return <IconMicrophoneOff aria-hidden="true" strokeWidth={1.7} className="size-5" />
}

export function AgentsDemo({ mode }: { mode: 'voice' | 'chat' }) {
  const [calling, setCalling] = useState(false)
  const [agentMenuOpen, setAgentMenuOpen] = useState(false)
  const [selectedAgentId, setSelectedAgentId] = useState('support')
  const [agentMenuPosition, setAgentMenuPosition] = useState({
    left: 0,
    top: 0,
  })
  const [messages, setMessages] = useState(initialAgentMessages)
  const [message, setMessage] = useState('')
  const agentTriggerRef = useRef<HTMLButtonElement>(null)
  const agentMenuRef = useRef<HTMLDivElement>(null)
  const agentListboxId = useId()
  const selectedAgent = demoAgents.find((agent) => agent.id === selectedAgentId) ?? demoAgents[0]

  const updateAgentMenuPosition = useCallback(() => {
    const trigger = agentTriggerRef.current
    if (!trigger) return
    const rect = trigger.getBoundingClientRect()
    setAgentMenuPosition({
      left: Math.max(8, rect.left - 4),
      top: rect.bottom + 8,
    })
  }, [])

  useEffect(() => {
    if (!agentMenuOpen) return

    updateAgentMenuPosition()
    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target as Node
      if (!agentTriggerRef.current?.contains(target) && !agentMenuRef.current?.contains(target)) {
        setAgentMenuOpen(false)
      }
    }
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAgentMenuOpen(false)
        agentTriggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeFromOutside)
    document.addEventListener('keydown', closeFromEscape)
    window.addEventListener('resize', updateAgentMenuPosition)
    window.addEventListener('scroll', updateAgentMenuPosition, true)
    return () => {
      document.removeEventListener('pointerdown', closeFromOutside)
      document.removeEventListener('keydown', closeFromEscape)
      window.removeEventListener('resize', updateAgentMenuPosition)
      window.removeEventListener('scroll', updateAgentMenuPosition, true)
    }
  }, [agentMenuOpen, updateAgentMenuPosition])

  const appendMessage = () => {
    const nextMessage = message.trim()
    if (!nextMessage) return
    setMessages((current) => [...current, { id: Date.now(), from: 'user', text: nextMessage }])
    setMessage('')
  }

  const submitMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    appendMessage()
  }

  return (
    <>
      <div className="absolute inset-0 z-[5] flex items-center justify-center">
        <div className="relative flex h-[332px] w-72 max-w-full flex-col">
          <div className="pointer-events-none absolute inset-0 z-20">
            <div
              className={cn(
                'relative mx-auto aspect-square w-64 max-w-full origin-top transition-transform duration-[400ms] ease-in-out',
                mode === 'chat' ? '-translate-x-4 rotate-90' : 'translate-x-0 rotate-0',
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 origin-center overflow-hidden rounded-full transition-transform duration-[400ms] ease-in-out',
                  mode === 'chat'
                    ? 'translate-x-5 -translate-y-5 -rotate-90 scale-[0.15625]'
                    : 'translate-x-0 translate-y-0 rotate-0 scale-100',
                )}
              >
                <img
                  src={selectedAgent.image}
                  alt=""
                  className={cn(
                    'size-full object-cover transition-transform duration-700',
                    calling ? 'scale-[1.04]' : 'scale-100',
                  )}
                />
                <div
                  className={cn(
                    'absolute -inset-2 transition-all duration-700',
                    calling ? 'animate-[pulse_1.8s_ease-in-out_infinite] scale-110 opacity-55' : 'scale-100 opacity-0',
                  )}
                >
                  <img src={selectedAgent.image} alt="" className="size-full object-cover blur-[3px]" />
                </div>
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-full transition-opacity duration-500',
                    calling ? 'opacity-100' : 'opacity-0',
                  )}
                >
                  <OrbSmooth
                    size={256}
                    textureUrl={selectedAgent.image}
                    audioMode={calling ? 'mic' : 'ambient'}
                    sphereScale={0.9}
                    spherePower={1.1}
                    grainOpacity={0.67}
                    animated
                    className="size-full"
                  />
                </div>
                <span className="absolute inset-0 z-20 rounded-full ring-[.5px] ring-black/[.075] ring-inset" />
              </div>
            </div>
          </div>

          <div
            aria-hidden={mode !== 'chat'}
            className={cn(
              'relative z-10 aspect-square max-h-64 w-72 max-w-full transition-opacity duration-300',
              mode === 'chat' ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0',
            )}
          >
            <div className="absolute inset-x-0 top-0 -bottom-8 flex flex-col pt-16 pb-8 [mask:linear-gradient(transparent,white_4rem,white_calc(100%-2rem),transparent)]">
              <div className="flex min-h-full items-end">
                <div className="flex max-h-[192px] flex-auto flex-col gap-4 overflow-y-auto [scrollbar-width:none]">
                  {messages.map((item) => (
                    <p
                      key={item.id}
                      className={cn(
                        'text-[15px] leading-5 text-black',
                        item.from === 'user' &&
                          'mr-1 ml-auto mt-1 w-fit max-w-[calc(100%-4rem)] rounded-[20px] bg-white px-4 py-2.5 shadow-[0_0_0_.897px_rgb(0_0_0_/_0.07),0_2px_4px_rgb(0_0_0_/_0.08)]',
                      )}
                    >
                      {item.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={calling ? 'End call' : 'Start call'}
            aria-pressed={calling}
            onClick={() => setCalling((current) => !current)}
            className={cn(
              'group absolute top-0 left-0 z-30 flex h-64 w-72 items-center justify-center outline-none transition-opacity duration-200',
              focus,
              mode === 'voice' ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0',
            )}
          >
            <span className="absolute bottom-0 left-1/2 flex size-16 -translate-x-1/2 translate-y-8 items-center justify-center rounded-full bg-[#f5f3f1] p-2">
              <span className="flex size-12 items-center justify-center rounded-full bg-black text-white shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_1px_1px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)] transition group-hover:bg-[#59544f]">
                {calling ? <MicOffIcon /> : <PhoneIcon />}
              </span>
            </span>
          </button>
          <form
            onSubmit={submitMessage}
            aria-hidden={mode !== 'chat'}
            className={cn(
              'relative mt-8 h-11 w-full transition-opacity duration-300',
              mode === 'chat' ? 'opacity-100 delay-150' : 'pointer-events-none opacity-0',
            )}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== 'Enter' || event.shiftKey) return
                event.preventDefault()
                appendMessage()
              }}
              placeholder="Type a message…"
              aria-label="Type a message"
              tabIndex={mode === 'chat' ? 0 : -1}
              className={cn(
                'h-11 w-full rounded-full bg-white px-[18px] text-[16px] leading-6 text-black outline-none placeholder:text-[#a9a49e] shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_1px_1px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)]',
                focus,
              )}
            />
          </form>
        </div>
      </div>

      <div className="absolute bottom-6 left-8 z-20 hidden md:block">
        <button
          ref={agentTriggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={agentMenuOpen}
          aria-controls={agentMenuOpen ? agentListboxId : undefined}
          onClick={() => {
            updateAgentMenuPosition()
            setAgentMenuOpen((current) => !current)
          }}
          className={cn(
            'flex h-10 items-center gap-2 rounded-full py-0 pr-3 pl-0.5 text-[15px] leading-5 text-black transition-colors hover:bg-[#eeeceb]',
            focus,
          )}
        >
          <span className="relative -ml-[1.5px] flex size-10 flex-none items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-black/10 shadow-[0_0_0_1px_rgb(0_0_0_/_0.06),0_1px_2px_rgb(0_0_0_/_0.04),0_2px_4px_rgb(0_0_0_/_0.04)]">
            <span className="relative size-7 overflow-hidden rounded-full">
              <img src={selectedAgent.image} alt="" className="size-full object-cover" />
            </span>
          </span>
          <span className="whitespace-nowrap">{selectedAgent.label}</span>
          <SelectChevron />
        </button>
      </div>

      {agentMenuOpen &&
        createPortal(
          <div
            ref={agentMenuRef}
            id={agentListboxId}
            role="listbox"
            aria-label="Choose an agent"
            className="fixed z-[200] w-[211px] rounded-2xl bg-white p-1.5 text-[15px] leading-5 text-black shadow-[0_0_1px_rgb(0_0_0_/_0.4),0_4px_4px_rgb(0_0_0_/_0.04)]"
            style={{
              left: agentMenuPosition.left,
              top: agentMenuPosition.top,
            }}
          >
            {demoAgents.map((agent) => {
              const selected = agent.id === selectedAgent.id
              return (
                <button
                  key={agent.id}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setSelectedAgentId(agent.id)
                    setCalling(false)
                    setAgentMenuOpen(false)
                    agentTriggerRef.current?.focus()
                  }}
                  className={cn(
                    'flex h-9 w-full items-center gap-2 rounded-xl px-2.5 text-left transition-colors hover:bg-[#f5f3f1]',
                    focus,
                  )}
                >
                  <span className="relative size-4 flex-none overflow-hidden rounded-full">
                    <img src={agent.image} alt="" className="size-full object-cover" />
                  </span>
                  <span className="min-w-0 flex-1 truncate">{agent.label}</span>
                  {selected && (
                    <IconCheck aria-hidden="true" strokeWidth={1.5} className="size-5 flex-none text-black" />
                  )}
                </button>
              )
            })}
          </div>,
          document.body,
        )}
    </>
  )
}
