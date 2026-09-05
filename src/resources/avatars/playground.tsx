'use client'

import { useEffect, useMemo, useState } from 'react'
import { resolveVariant, type AvatarEffect, type AvatarVariant } from '@usespaceui/avatars'
import { bloomSound } from '@/components/providers/sound-provider'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { ResourceStudio } from '@/resources/components/shared/layout/studio'
import { ResourceNav } from '@/resources/components/shared/layout/nav'
import { ResourceToolbar, type ResourceToolbarConfig } from '@/resources/components/shared/layout/toolbar'
import { InlineInstallBar } from '@/components/docs/installation/inline-install-bar'
import { AvatarCodeModal } from './code-modal'
import { AvatarControlPanel } from './control-panel'
import { MockupView } from '@/resources/components/shared/avatar/mockup-view'
import { GalleryView } from './gallery-view'
import { AvatarInfoPanel } from './info-panel'
import { SeedView } from './seed-view'
import { DEFAULT_SEEDS } from '@/resources/shared/seeds'
import type { SelectedAvatar } from './types'
import { getRandomPersonas, getSelectedAvatarDetails, resolvePaletteColors, type AvatarViewMode } from './utils'

export function AvatarsPlayground() {
  const [pool, setPool] = useState<string[]>(() => getRandomPersonas(126))
  const [pattern, setPattern] = useState<AvatarVariant | 'all'>('all')
  const [size, setSize] = useState(164)
  const [effect, setEffect] = useState<AvatarEffect>('none')
  const [animate, setAnimate] = useState(false)
  const [paletteIndex, setPaletteIndex] = useState(-2)
  const [customColors, setCustomColors] = useState<string[]>([])
  const [circle, setCircle] = useState(true)
  const [view, setView] = useState<AvatarViewMode>('gallery')
  const [seedName, setSeedName] = useState(DEFAULT_SEEDS)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<SelectedAvatar | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)', true)

  useEffect(() => {
    if (!isDesktop) {
      setShowLeft(false)
      setShowRight(false)
    }
  }, [isDesktop])

  const parsedColors = useMemo(() => resolvePaletteColors(paletteIndex, customColors), [paletteIndex, customColors])
  const details = useMemo(() => getSelectedAvatarDetails(pattern), [pattern])

  const selectAvatar = (avatar: SelectedAvatar) => {
    bloomSound()
    setSelectedAvatar({
      ...avatar,
      variant: avatar.variant === 'all' ? resolveVariant(avatar.seed, 'all') : avatar.variant,
    })
  }

  const reset = () => {
    setPool(getRandomPersonas(126))
    setPattern('all')
    setSize(164)
    setEffect('none')
    setAnimate(false)
    setPaletteIndex(-2)
    setCustomColors([])
    setCircle(true)
    setSeedName(DEFAULT_SEEDS)
    setView('gallery')
    setShowLeft(false)
    setShowRight(isDesktop)
    setExpanded(false)
    setSelectedAvatar(null)
  }

  const toolbarConfig: ResourceToolbarConfig = {
    theme: true,
    expand: true,
    info: true,
    sidebar: true,
    reset: true,
    viewToggle: true,
    view,
    views: ['gallery', 'mockup', 'seed'],
    onViewChange: setView,
    onReset: reset,
    onToggleExpand: setExpanded,
    onToggleInfo: setShowLeft,
    onToggleSidebar: setShowRight,
    infoVisible: showLeft,
    sidebarVisible: showRight,
    expanded,
  }

  return (
    <>
      <ResourceStudio
        showLeft={showLeft && !expanded}
        showRight={showRight && !expanded}
        leftWidth="30%"
        rightWidth="20rem"
        onToggleLeft={setShowLeft}
        onToggleRight={setShowRight}
        className={expanded ? 'p-0' : undefined}
        left={<AvatarInfoPanel />}
        installBar={
          view !== 'seed' && !expanded ? (
            <InlineInstallBar packageName="@usespaceui/avatars" isShadcn={false} />
          ) : null
        }
        canvas={
          view === 'mockup' ? (
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
          ) : view === 'gallery' ? (
            <GalleryView
              pool={pool}
              pattern={pattern}
              effect={effect}
              animate={animate}
              circle={circle}
              parsedColors={parsedColors}
              paletteIndex={paletteIndex}
              onSelectAvatar={selectAvatar}
              sidebarLeft={showLeft && !expanded}
              sidebarRight={showRight && !expanded}
            />
          ) : (
            <SeedView
              seed={seedName}
              setSeed={setSeedName}
              pattern={pattern}
              size={size}
              effect={effect}
              animate={animate}
              circle={circle}
              parsedColors={parsedColors}
            />
          )
        }
        float={
          <ResourceToolbar
            config={toolbarConfig}
            left={<ResourceNav />}
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
            regenerateSeeds={() => {
              const next = getRandomPersonas(126)
              setPool(next)
              setSeedName(next[0] ?? DEFAULT_SEEDS)
            }}
            view={view}
            setView={setView}
            previewSeed={seedName}
          />
        }
      />
      <AvatarCodeModal
        target={selectedAvatar}
        config={{ size, circle, effect, animate }}
        onClose={() => setSelectedAvatar(null)}
      />
    </>
  )
}
