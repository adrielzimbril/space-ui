'use client'

import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import { IconDots, IconLayoutSidebar } from '@tabler/icons-react'
import * as React from 'react'
import { AppSelect } from './app-select'
import { ChatComposer } from './chat-composer'
import { ChatSidebar } from './chat-sidebar'
import { AI_MODELS, CURRENT_USER, DEFAULT_CHAT_SECTIONS, DEFAULT_CONVERSATIONS, PROJECT_OPTIONS } from './data'
import { MessageStream } from './message-stream'
import type { AIChatWorkspaceProps, ChatMessage } from './types'

export function AIChatWorkspace({ initialTheme = 'dark', initialChatId = 'new', className }: AIChatWorkspaceProps) {
  const [theme, setTheme] = React.useState<'dark' | 'light'>(initialTheme)
  const [activeChatId, setActiveChatId] = React.useState<string>(initialChatId)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [inputPrompt, setInputPrompt] = React.useState('')
  const [selectedModel, setSelectedModel] = React.useState('claude-3-7-sonnet')
  const [selectedTool, setSelectedTool] = React.useState('artifacts')
  const [selectedProject, setSelectedProject] = React.useState('culinary-lab')

  const [conversations, setConversations] = React.useState<Record<string, ChatMessage[]>>(DEFAULT_CONVERSATIONS)

  React.useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.classList.remove('light')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.classList.add('light')
      root.style.colorScheme = 'light'
    }
  }, [theme])

  const messages = React.useMemo(() => {
    if (activeChatId === 'new') return []
    return conversations[activeChatId] || DEFAULT_CONVERSATIONS[activeChatId] || []
  }, [activeChatId, conversations])

  const conversationSelectOptions = React.useMemo(() => {
    const list = [{ value: 'new', label: 'New conversation' }]
    DEFAULT_CHAT_SECTIONS.forEach((section) => {
      section.items.forEach((item) => {
        list.push({ value: item.id, label: item.label })
      })
    })
    return list
  }, [])

  const handleSelectChat = (id: string) => {
    setActiveChatId(id)
    const targetMeta = DEFAULT_CHAT_SECTIONS.flatMap((s) => s.items).find((i) => i.id === id)
    if (targetMeta) {
      const matchingProj = PROJECT_OPTIONS.find((p) => p.label === targetMeta.project)
      if (matchingProj) {
        setSelectedProject(matchingProj.value)
      }
    }
  }

  const handleNewChat = () => {
    setActiveChatId('new')
  }

  const handleSend = () => {
    const trimmed = inputPrompt.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const currentModelObj = AI_MODELS.find((m) => m.value === selectedModel)
    const modelName = currentModelObj?.label || 'Claude 3.7 Sonnet'

    const assistantMsg: ChatMessage = {
      id: `msg-resp-${Date.now()}`,
      role: 'assistant',
      content: `I analyzed your query: "${trimmed}".\n\nHere are practical observations and recommendations based on current best practices. Let me know if you would like me to dive deeper into any specific aspect or generate structured notes.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const targetChatId = activeChatId === 'new' ? 'coffee-brewing' : activeChatId

    setConversations((prev) => {
      const existing = prev[targetChatId] || []
      return {
        ...prev,
        [targetChatId]: [...existing, userMsg, assistantMsg],
      }
    })

    if (activeChatId === 'new') {
      setActiveChatId(targetChatId)
    }

    setInputPrompt('')
  }

  const isNew = activeChatId === 'new'

  return (
    <div
      className={cn(
        'relative flex h-dvh w-full overflow-hidden transition-colors duration-300 bg-background text-foreground',
        theme === 'dark' ? 'dark' : 'light',
        className,
      )}
    >
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        sections={DEFAULT_CHAT_SECTIONS}
        theme={theme}
        setTheme={setTheme}
      />

      <main className="relative flex h-full min-w-0 flex-1 flex-col justify-end overflow-hidden pb-4 bg-background lg:py-4 lg:pl-5 lg:pr-4">
        <header className="absolute left-5 top-4 z-20 flex w-[calc(100%-2rem)] items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            {!sidebarOpen && (
              <ButtonSquircle
                type="button"
                variant="ghost"
                size="icon-xs"
                squircle
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
                className="flex size-7 cursor-pointer items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <IconLayoutSidebar className="size-4" stroke={1.8} />
              </ButtonSquircle>
            )}

            <AppSelect
              ariaLabel="Project"
              variant="inline"
              value={selectedProject}
              onChange={setSelectedProject}
              options={PROJECT_OPTIONS}
            />
            <span className="text-sm text-muted-foreground">/</span>
            <AppSelect
              ariaLabel="Conversation"
              variant="inline"
              value={activeChatId}
              onChange={handleSelectChat}
              options={conversationSelectOptions}
            />
          </div>

          <div className="flex items-center gap-1.5">
            <ButtonSquircle
              type="button"
              variant="ghost"
              size="icon-xs"
              squircle
              aria-label="More options"
              className="flex size-7 cursor-pointer items-center justify-center transition text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              <IconDots className="size-4" stroke={1.8} />
            </ButtonSquircle>
          </div>
        </header>

        <MessageStream
          isNew={isNew}
          messages={messages}
          userName={CURRENT_USER.name.split(' ')[0]}
          category={DEFAULT_CHAT_SECTIONS.flatMap((s) => s.items).find((i) => i.id === activeChatId)?.project}
        />

        <ChatComposer
          inputPrompt={inputPrompt}
          setInputPrompt={setInputPrompt}
          onSend={handleSend}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          theme={theme}
        />
      </main>
    </div>
  )
}
