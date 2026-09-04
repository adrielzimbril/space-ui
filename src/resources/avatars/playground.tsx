'use client'

import { useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  IconMoon,
  IconRotateClockwise,
  IconSun,
  IconLayout2,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconArrowsMaximize,
  IconArrowsMinimize,
} from '@tabler/icons-react'
import type { AvatarEffect, AvatarVariant } from '@usespaceui/avatars'
import { ResourceStudio } from '@/resources/studio'
import { ResourceToolbar } from '@/resources/components/resource-toolbar'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { triggerThemeTransition, type ThemeValue } from '@/registry/components/spaceui/mode-switcher'
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer'
import { source, uiKitSource, resourcesSource } from '@/lib/source'
import { AvatarCanvas } from './canvas'
import { AvatarControlPanel } from './control-panel'
import { MockupView } from './mockup-view'
import { GalleryView } from './gallery-view'
import { getRandomPersonas, getSelectedAvatarDetails, resolvePaletteColors } from './utils'

type ViewMode = 'canvas' | 'mockup' | 'gallery'

export function AvatarsPlayground() {
  const { resolvedTheme, setTheme } = useTheme()
  const [pool, setPool] = useState<string[]>(() => getRandomPersonas(200))
  const [pattern, setPattern] = useState<AvatarVariant | 'all'>('all')
  const [size, setSize] = useState(164)
  const [effect, setEffect] = useState<AvatarEffect>('none')
  const [animate, setAnimate] = useState(false)
  const [paletteIndex, setPaletteIndex] = useState(-2)
  const [customColors, setCustomColors] = useState<string[]>([])
  const [circle, setCircle] = useState(true)
  const [view, setView] = useState<ViewMode>('gallery')
  const [canvasKey, setCanvasKey] = useState(0)
  const [showRight, setShowRight] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const parsedColors = useMemo(() => resolvePaletteColors(paletteIndex, customColors), [paletteIndex, customColors])
  const details = useMemo(() => getSelectedAvatarDetails(pattern), [pattern])
  const theme: ThemeValue = resolvedTheme === 'dark' ? 'dark' : 'light'

  const reset = () => {
    setPool(getRandomPersonas(200))
    setPattern('all')
    setSize(164)
    setEffect('none')
    setAnimate(false)
    setPaletteIndex(-2)
    setCustomColors([])
    setCircle(true)
    setView('gallery')
    setShowRight(true)
    setExpanded(false)
    setCanvasKey((key) => key + 1)
  }

  const cycleView = () => {
    if (view === 'canvas') setView('mockup')
    else if (view === 'mockup') setView('gallery')
    else setView('canvas')
  }

  const viewLabel = view === 'canvas' ? 'Mockup' : view === 'mockup' ? 'Gallery' : 'Canvas'

  return (
    <ResourceStudio
      showRight={showRight && !expanded}
      onToggleRight={setShowRight}
      className={expanded ? 'p-0' : undefined}
      canvas={
        view === 'gallery' ? (
          <GalleryView
            pool={pool}
            pattern={pattern}
            size={size}
            effect={effect}
            animate={animate}
            circle={circle}
            parsedColors={parsedColors}
            paletteIndex={paletteIndex}
          />
        ) : view === 'mockup' ? (
          <MockupView
            pool={pool}
            pattern={pattern}
            size={size}
            effect={effect}
            animate={animate}
            circle={circle}
            parsedColors={parsedColors}
            paletteIndex={paletteIndex}
          />
        ) : (
          <AvatarCanvas
            key={canvasKey}
            pool={pool}
            pattern={pattern}
            size={size}
            effect={effect}
            animate={animate}
            circle={circle}
            parsedColors={parsedColors}
            paletteIndex={paletteIndex}
            onSelectAvatar={() => {}}
          />
        )
      }
      float={
        <ResourceToolbar
          left={
            <ToolbarButton label="Open navigation">
              <IconLayout2 className="size-4" />
            </ToolbarButton>
          }
          right={
            <>
              <ToolbarButton
                label={expanded ? 'Show panels' : 'Hide panels'}
                pressed={expanded}
                onClick={() => setExpanded((e) => !e)}
              >
                {expanded ? <IconArrowsMinimize className="size-4" /> : <IconArrowsMaximize className="size-4" />}
              </ToolbarButton>
              {!expanded ? (
                <ToolbarButton
                  label={showRight ? 'Hide controls' : 'Show controls'}
                  pressed={!showRight}
                  onClick={() => setShowRight((show) => !show)}
                >
                  {showRight ? (
                    <IconLayoutSidebarLeftCollapse className="size-4" />
                  ) : (
                    <IconLayoutSidebarLeftExpand className="size-4" />
                  )}
                </ToolbarButton>
              ) : null}
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
              <ToolbarButton
                label={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}
                onClick={(event) => {
                  const next = theme === 'dark' ? 'light' : 'dark'
                  void triggerThemeTransition(event.currentTarget, () => setTheme(next))
                }}
              >
                <MorphIcon activeKey={theme} variant="blur-scale">
                  {theme === 'dark' ? <IconMoon className="size-4" /> : <IconSun className="size-4" />}
                </MorphIcon>
              </ToolbarButton>
              <ToolbarButton label="Reset playground" onClick={reset}>
                <IconRotateClockwise className="size-4" />
              </ToolbarButton>
            </>
          }
        />
      }
      right={
        <AvatarControlPanel
          pool={pool}
          pattern={pattern}
          setPattern={setPattern}
          paletteIndex={paletteIndex}
          setPaletteIndex={setPaletteIndex}
          customColors={customColors}
          setCustomColors={setCustomColors}
          size={size}
          setSize={setSize}
          effect={effect}
          setEffect={setEffect}
          circle={circle}
          setCircle={setCircle}
          animate={animate}
          setAnimate={setAnimate}
          parsedColors={parsedColors}
          details={details}
          regenerateSeeds={() => setPool(getRandomPersonas(200))}
          view={view}
          setView={setView}
        />
      }
    />
  )
}
