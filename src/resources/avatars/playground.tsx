'use client'

import { useMemo, useState } from 'react'
import { useTheme } from 'next-themes'
import {
  IconMoon,
  IconRotateClockwise,
  IconSun,
  IconLayout2,
} from '@tabler/icons-react'
import type { AvatarEffect, AvatarVariant } from '@usespaceui/avatars'
import { ResourceStudio } from '@/resources/studio'
import { ToolbarSection } from '@/components/playground/playground-toolbar-section'
import { ToolbarButton } from '@/components/playground/playground-toolbar-button'
import { MorphIcon } from '@/registry/components/spaceui/morph-icon'
import { triggerThemeTransition, type ThemeValue } from '@/registry/components/spaceui/mode-switcher'
import { MobileNavDrawer } from '@/components/layout/mobile-nav-drawer'
import { source, uiKitSource, resourcesSource } from '@/lib/source'
import { AvatarCanvas } from './canvas'
import { AvatarControlPanel } from './control-panel'
import { MockupView } from './mockup-view'
import { getRandomPersonas, getSelectedAvatarDetails, resolvePaletteColors } from './utils'

type ViewMode = 'canvas' | 'mockup'

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
  const [view, setView] = useState<ViewMode>('canvas')
  const [canvasKey, setCanvasKey] = useState(0)

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
    setView('canvas')
    setCanvasKey((key) => key + 1)
  }

  return (
    <ResourceStudio
      canvas={
        view === 'canvas' ? (
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
        ) : (
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
        )
      }
      float={
        <>
          <ToolbarSection aria-label="Navigation" className="left-2 top-6">
            <MobileNavDrawer
              trees={[source.pageTree, uiKitSource.pageTree, resourcesSource.pageTree]}
              triggerClassName="flex!"
              trigger={
                <ToolbarButton label="Open navigation">
                  <IconLayout2 className="size-4" />
                </ToolbarButton>
              }
            />
          </ToolbarSection>
          <ToolbarSection aria-label="Playground actions" className="right-2 top-6">
            <ToolbarButton
              label={view === 'canvas' ? 'Show mockup' : 'Show canvas'}
              pressed={view === 'mockup'}
              onClick={() => setView(view === 'canvas' ? 'mockup' : 'canvas')}
            >
              {view === 'canvas' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><path d="M3 3h7v7H3z"/><path d="M14 3h7v7h-7z"/><path d="M14 14h7v7h-7z"/><path d="M3 14h7v7H3z"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
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
          </ToolbarSection>
        </>
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
        />
      }
    />
  )
}
