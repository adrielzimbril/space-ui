'use client'

import type { ReactNode } from 'react'
import { useTheme } from 'next-themes'
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarRightExpand,
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconAppWindow,
  IconLayoutGrid,
  IconFingerprint,
  IconRotateClockwise,
  IconSun,
  IconMoon,
} from '@tabler/icons-react'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { ToolbarSection } from '@/components/playground/playground-toolbar-section'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { triggerThemeTransition } from '@/registry/components/spaceui/mode-switcher'

export type ResourceToolbarConfig = {
  theme?: boolean
  expand?: boolean
  info?: boolean
  sidebar?: boolean
  reset?: boolean
  viewToggle?: boolean
  view?: 'mockup' | 'gallery' | 'seed'
  views?: Array<'mockup' | 'gallery' | 'seed'>
  onViewChange?: (view: 'mockup' | 'gallery' | 'seed') => void
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
    view = 'gallery',
    views = ['gallery', 'mockup', 'seed'],
    onViewChange,
    onReset,
    onToggleExpand,
    onToggleInfo,
    onToggleSidebar,
    infoVisible = true,
    sidebarVisible = true,
    expanded = false,
  } = config

  const { resolvedTheme, setTheme } = useTheme()
  const activeTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const handleToggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next = activeTheme === 'dark' ? 'light' : 'dark'
    void triggerThemeTransition(event.currentTarget, () => setTheme(next))
  }

  const cycleView = () => {
    if (!onViewChange || views.length === 0) return
    const index = views.indexOf(view)
    const next = views[(index + 1) % views.length] ?? views[0]
    onViewChange(next)
  }

  const nextView = views[(Math.max(views.indexOf(view), 0) + 1) % views.length] ?? view
  const viewLabel = nextView === 'mockup' ? 'Mockup' : nextView === 'gallery' ? 'Gallery' : 'Seed'

  const leftButtons = (
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
    </>
  )

  const defaultButtons = (
    <>
      {sidebar && !expanded ? (
        <ToolbarButton
          label={sidebarVisible ? 'Hide controls' : 'Show controls'}
          pressed={sidebarVisible}
          onClick={() => onToggleSidebar?.(!sidebarVisible)}
        >
          {sidebarVisible ? (
            <IconLayoutSidebarRightCollapse className="size-4" />
          ) : (
            <IconLayoutSidebarRightExpand className="size-4" />
          )}
        </ToolbarButton>
      ) : null}

      {/* 3. Plein écran (Expand) */}
      {expand ? (
        <ToolbarButton
          label={expanded ? 'Show panels' : 'Hide panels'}
          pressed={expanded}
          onClick={() => onToggleExpand?.(!expanded)}
        >
          {expanded ? <IconArrowsMinimize className="size-4" /> : <IconArrowsMaximize className="size-4" />}
        </ToolbarButton>
      ) : null}

      {/* 4. Vue (Canvas / Mockup / Gallery / Seed) */}
      {viewToggle ? (
        <ToolbarButton label={viewLabel} pressed={view !== 'gallery'} onClick={cycleView}>
          {view === 'mockup' ? (
            <IconAppWindow className="size-4" />
          ) : view === 'gallery' ? (
            <IconLayoutGrid className="size-4" />
          ) : (
            <IconFingerprint className="size-4" />
          )}
        </ToolbarButton>
      ) : null}

      {/* 5. Reset */}
      {reset ? (
        <ToolbarButton label="Reset" onClick={onReset}>
          <IconRotateClockwise className="size-4" />
        </ToolbarButton>
      ) : null}

      {/* 6. Thème */}
      {theme ? (
        <ToolbarButton
          label={activeTheme === 'dark' ? 'Switch to light' : 'Switch to dark'}
          onClick={handleToggleTheme}
        >
          <MorphIcon activeKey={activeTheme} variant="blur-scale">
            {activeTheme === 'dark' ? <IconMoon className="size-4" /> : <IconSun className="size-4" />}
          </MorphIcon>
        </ToolbarButton>
      ) : null}
    </>
  )

  return (
    <>
      {left || info ? (
        <ToolbarSection aria-label="Resource navigation" className="left-2 top-6">
          {left}
          {leftButtons}
        </ToolbarSection>
      ) : null}
      <ToolbarSection aria-label="Resource actions" className="right-2 top-6">
        {defaultButtons}
        {right}
      </ToolbarSection>
    </>
  )
}
