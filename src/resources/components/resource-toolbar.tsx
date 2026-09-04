'use client'

import type { ReactNode } from 'react'
import { IconLayoutSidebarLeftCollapse, IconLayoutSidebarLeftExpand } from '@tabler/icons-react'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { ToolbarSection } from '@/components/playground/playground-toolbar-section'

export type ResourceToolbarConfig = {
  theme?: boolean
  expand?: boolean
  info?: boolean
  sidebar?: boolean
  reset?: boolean
  viewToggle?: boolean
  view?: 'canvas' | 'mockup' | 'gallery'
  onViewChange?: (view: 'canvas' | 'mockup' | 'gallery') => void
  onReset?: () => void
  onToggleExpand?: (expanded: boolean) => void
  onToggleInfo?: (visible: boolean) => void
  onToggleSidebar?: (visible: boolean) => void
  infoVisible?: boolean
  sidebarVisible?: boolean
  expanded?: boolean
}

export function ResourceToolbar({
  left,
  right,
  config = {},
}: {
  left?: ReactNode
  right?: ReactNode
  config?: ResourceToolbarConfig
}) {
  const {
    theme = true,
    expand = true,
    info = false,
    sidebar = true,
    reset = true,
    viewToggle = false,
    view = 'canvas',
    onViewChange,
    onReset,
    onToggleExpand,
    onToggleInfo,
    onToggleSidebar,
    infoVisible = true,
    sidebarVisible = true,
    expanded = false,
  } = config

  const cycleView = () => {
    if (!onViewChange) return
    if (view === 'canvas') onViewChange('mockup')
    else if (view === 'mockup') onViewChange('gallery')
    else onViewChange('canvas')
  }

  const viewLabel = view === 'canvas' ? 'Mockup' : view === 'mockup' ? 'Gallery' : 'Canvas'

  const defaultButtons = (
    <>
      {info && !expanded ? (
        <ToolbarButton
          label={infoVisible ? 'Hide info' : 'Show info'}
          pressed={infoVisible}
          onClick={() => onToggleInfo?.(!infoVisible)}
        >
          {infoVisible ? (
            <IconLayoutSidebarLeftCollapse className="size-4" />
          ) : (
            <IconLayoutSidebarLeftExpand className="size-4" />
          )}
        </ToolbarButton>
      ) : null}
      {expand ? (
        <ToolbarButton
          label={expanded ? 'Show panels' : 'Hide panels'}
          pressed={expanded}
          onClick={() => onToggleExpand?.(!expanded)}
        >
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M4 14h6v6" />
              <path d="M20 10h-6V4" />
              <path d="M14 10l7-7" />
              <path d="M3 21l7-7" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M4 10h6V4" />
              <path d="M20 14h-6v6" />
              <path d="M10 14l-7 7" />
              <path d="M21 3l-7 7" />
            </svg>
          )}
        </ToolbarButton>
      ) : null}
      {sidebar && !expanded ? (
        <ToolbarButton
          label={sidebarVisible ? 'Hide controls' : 'Show controls'}
          pressed={!sidebarVisible}
          onClick={() => onToggleSidebar?.(!sidebarVisible)}
        >
          {sidebarVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M15 3v18" />
            </svg>
          )}
        </ToolbarButton>
      ) : null}
      {viewToggle ? (
        <ToolbarButton label={viewLabel} pressed={view !== 'canvas'} onClick={cycleView}>
          {view === 'canvas' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M3 3h7v7H3z" />
              <path d="M14 3h7v7h-7z" />
              <path d="M14 14h7v7h-7z" />
              <path d="M3 14h7v7H3z" />
            </svg>
          ) : view === 'mockup' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
          )}
        </ToolbarButton>
      ) : null}
      {reset ? (
        <ToolbarButton label="Reset" onClick={onReset}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </ToolbarButton>
      ) : null}
      {theme ? (
        <ToolbarButton label="Theme" onClick={() => {}}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </ToolbarButton>
      ) : null}
    </>
  )

  return (
    <>
      {left ? (
        <ToolbarSection aria-label="Resource navigation" className="left-2 top-6">
          {left}
        </ToolbarSection>
      ) : null}
      <ToolbarSection aria-label="Resource actions" className="right-2 top-6">
        {defaultButtons}
        {right}
      </ToolbarSection>
    </>
  )
}
