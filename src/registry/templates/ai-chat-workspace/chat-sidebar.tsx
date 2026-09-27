'use client'

import { Button as ButtonSquircle } from '@/registry/components/button/button-squircle'
import { cn } from '@/registry/lib/utils'
import {
  IconBook,
  IconFolder,
  IconLayoutSidebar,
  IconLayoutSidebarLeftCollapse,
  IconPlus,
  IconSearch,
} from '@tabler/icons-react'
import * as React from 'react'
import { SpaceUILogo } from './logo'
import type { ChatSection } from './types'
import { UserMenu } from './user-menu'

export interface ChatSidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (val: boolean) => void
  activeChatId: string
  onSelectChat: (id: string) => void
  onNewChat: () => void
  sections: ChatSection[]
  theme: 'dark' | 'light'
  setTheme: (val: 'dark' | 'light') => void
}

export function ChatSidebar({
  sidebarOpen,
  setSidebarOpen,
  activeChatId,
  onSelectChat,
  onNewChat,
  sections,
  theme,
  setTheme,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = React.useState('')

  const filteredSections = React.useMemo(() => {
    if (!searchQuery.trim()) return sections
    const q = searchQuery.toLowerCase()
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) => item.label.toLowerCase().includes(q) || item.project.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.items.length > 0)
  }, [sections, searchQuery])

  if (!sidebarOpen) {
    return (
      <aside className="group/sidebar relative z-20 hidden h-full w-[4.5rem] shrink-0 flex-col justify-between py-5 transition-[width,background-color] duration-300 ease-out lg:flex border-r border-muted bg-card">
        <div className="flex flex-col items-center">
          <ButtonSquircle
            type="button"
            variant="ghost"
            size="icon-sm"
            squircle
            onClick={() => setSidebarOpen(true)}
            aria-label="Toggle sidebar"
            className="relative grid size-8 place-items-center outline-none transition focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            <SpaceUILogo
              size={32}
              className="absolute opacity-100 transition duration-200 group-hover/sidebar:scale-90 group-hover/sidebar:opacity-0"
            />
            <IconLayoutSidebar
              className="absolute size-5 text-muted-foreground opacity-0 transition duration-200 group-hover/sidebar:scale-100 group-hover/sidebar:opacity-100"
              stroke={1.75}
            />
          </ButtonSquircle>
          <div className="mt-5 h-px w-8 bg-muted" />
          <div className="mt-8 flex flex-col items-center gap-6">
            <ButtonSquircle
              type="button"
              onClick={onNewChat}
              aria-label="New chat"
              size="icon-lg"
              squircle
              variant="ghost"
              className="text-primary hover:bg-accent focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <IconPlus className="size-5" stroke={2.2} />
            </ButtonSquircle>
            <ButtonSquircle
              type="button"
              aria-label="Projects"
              size="icon-lg"
              squircle
              variant="ghost"
              className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <IconFolder className="size-5" stroke={1.75} />
            </ButtonSquircle>
            <ButtonSquircle
              type="button"
              aria-label="Library"
              size="icon-lg"
              squircle
              variant="ghost"
              className="text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              <IconBook className="size-5" stroke={1.75} />
            </ButtonSquircle>
          </div>
        </div>

        <div className="flex flex-col items-center px-2">
          <UserMenu theme={theme} setTheme={setTheme} compact />
        </div>
      </aside>
    )
  }

  return (
    <aside className="relative flex h-full w-[17rem] shrink-0 flex-col overflow-hidden transition-[transform,width,background-color] duration-300 ease-out border-r border-muted bg-card">
      <div className="sticky top-0 z-10 pt-5 bg-card after:absolute after:bottom-0 after:left-5 after:right-5 after:h-px after:bg-muted">
        <div className="flex items-center justify-between px-5 pb-4 lg:px-3.5">
          <div className="flex items-center gap-2.5">
            <SpaceUILogo size={32} />
            <span className="text-sm font-semibold tracking-tight text-foreground">Workspace</span>
          </div>
          <ButtonSquircle
            type="button"
            variant="ghost"
            size="icon-sm"
            squircle
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="flex size-8 cursor-pointer items-center justify-center transition text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <IconLayoutSidebarLeftCollapse className="size-5" stroke={1.75} />
          </ButtonSquircle>
        </div>

        <div className="px-3.5 pb-3.5 pt-4">
          <label className="flex h-9 cursor-text items-center gap-2 [corner-shape:superellipse(1.25)] rounded-[0.625rem] px-2 ring-1 ring-inset ring-muted bg-muted hover:bg-muted transition">
            <IconSearch className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search conversations..."
              className="min-w-0 flex-1 bg-transparent text-sm font-medium leading-none outline-none text-foreground placeholder:text-muted-foreground"
            />
          </label>
        </div>

        <div className="space-y-1 px-3.5 pb-4">
          <ButtonSquircle
            type="button"
            variant="ghost"
            squircle
            onClick={onNewChat}
            className="flex w-full cursor-pointer items-center justify-start gap-2 p-1.5 pr-2 text-left text-sm font-medium text-primary hover:bg-accent transition"
          >
            <IconPlus className="size-5 rounded-full text-primary" stroke={2.2} />
            <span>New chat</span>
          </ButtonSquircle>

          <ButtonSquircle
            type="button"
            variant="ghost"
            squircle
            className="flex w-full cursor-pointer items-center justify-start gap-2 p-1.5 pr-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <IconFolder className="size-5 shrink-0 text-muted-foreground" stroke={1.8} />
            <span>Projects</span>
          </ButtonSquircle>

          <ButtonSquircle
            type="button"
            variant="ghost"
            squircle
            className="flex w-full cursor-pointer items-center justify-start gap-2 p-1.5 pr-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition"
          >
            <IconBook className="size-5 shrink-0 text-muted-foreground" stroke={1.8} />
            <span>Library</span>
          </ButtonSquircle>
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden overflow-y-auto px-3.5 pt-4 space-y-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 scrollbar-track-transparent">
        {filteredSections.map((section) => (
          <section key={section.title} className="mb-4">
            <p className="mb-1 px-1.5 text-xs font-medium leading-5 text-muted-foreground">{section.title}</p>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = activeChatId === item.id
                return (
                  <ButtonSquircle
                    key={item.id}
                    type="button"
                    variant="ghost"
                    squircle
                    onClick={() => onSelectChat(item.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between p-1.5 pr-2 text-left text-sm font-medium transition',
                      isActive
                        ? 'bg-accent text-accent-foreground font-semibold'
                        : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      {section.title === 'Pinned' && (
                        <IconFolder className="size-4 shrink-0 text-muted-foreground" stroke={1.8} />
                      )}
                      <span className="min-w-0 truncate">{item.label}</span>
                    </span>
                  </ButtonSquircle>
                )
              })}
            </div>
          </section>
        ))}

        {filteredSections.length === 0 && (
          <div className="py-8 text-center text-xs text-muted-foreground">No conversations found</div>
        )}
      </div>

      <div className="px-3.5 pb-5 pt-4 border-t border-muted">
        <UserMenu theme={theme} setTheme={setTheme} />
      </div>
    </aside>
  )
}
