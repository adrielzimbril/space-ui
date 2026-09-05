'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  resolveExpression,
  resolveShape,
  type SquishBackgroundStyleChoice,
  type SquishExpressionChoice,
  type SquishShapeChoice,
} from '@usespaceui/squishmoji'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { bloomSound } from '@/components/providers/sound-provider'
import { useMediaQuery } from '@/registry/hooks/browser/use-media-query'
import { ResourceStudio } from '@/resources/components/shared/layout/studio'
import { ResourceNav } from '@/resources/components/shared/layout/nav'
import { ResourceToolbar, type ResourceToolbarConfig } from '@/resources/components/shared/layout/toolbar'
import { InlineInstallBar } from '@/components/docs/installation/inline-install-bar'
import { ResourceGallery } from '@/resources/components/shared/layout/gallery'
import { ResourceSeedView } from '@/resources/components/shared/layout/seed-stage'
import { PersonaProvider } from '@/resources/components/shared/avatar/persona'
import { MockupView } from '@/resources/components/shared/avatar/mockup-view'
import { DEFAULT_SEEDS } from '@/resources/shared/seeds'
import { getRandomPersonas } from '@/resources/shared/utils'
import type { ResourceViewMode } from '@/resources/shared/types'
import { SquishmojiControlPanel } from './control-panel'
import { SquishmojiCodeModal } from './code-modal'
import { VideoStage } from './video-stage'
import { AvatarExportPanel } from '@/resources/components/shared/avatar/export/panel'
import { videoDims, type VideoAspect, type VideoExportSize } from '@/resources/components/shared/avatar/export/dims'
import { SequenceTimeline } from '@/resources/components/shared/avatar/export/sequence-timeline'
import { exportRaster, exportSvgMarkup } from '@/resources/components/shared/avatar/export/raster'
import { startLiveRecording, stopLiveRecording } from '@/resources/components/shared/avatar/export/video'
import {
  exportToVideoAuto,
  exportToVideoSequence,
  type SequenceStep,
} from '@/resources/components/shared/avatar/export/squish-video'

function captionFor(seed: string, shape: SquishShapeChoice, expression: SquishExpressionChoice) {
  return `${resolveShape(seed, shape)} · ${resolveExpression(seed, expression)}`
}

function snippetFor({
  seed,
  shape,
  expression,
  size,
  backgroundStyle,
  animate,
  animWobble,
  animOnHover,
  animOnClick,
}: {
  seed: string
  shape: SquishShapeChoice
  expression: SquishExpressionChoice
  size: number
  backgroundStyle: SquishBackgroundStyleChoice
  animate: boolean
  animWobble: boolean
  animOnHover: boolean
  animOnClick: boolean
}) {
  const resolvedShape = resolveShape(seed, shape)
  const resolvedExpr = resolveExpression(seed, expression)
  const lines = [`<Squishmoji`, `  seed="${seed}"`, `  shape="${resolvedShape}"`, `  expression="${resolvedExpr}"`]
  if (size !== 120) lines.push(`  size={${size}}`)
  if (backgroundStyle !== 'all' && backgroundStyle !== 'solid') lines.push(`  backgroundStyle="${backgroundStyle}"`)
  if (!animate) lines.push('  animate={false}')
  if (animWobble) lines.push('  animWobble')
  if (animOnHover) lines.push('  animOnHover')
  if (animOnClick) lines.push('  animOnClick')
  lines.push('/>')
  return `import { Squishmoji } from '@usespaceui/squishmoji/react'\n\n${lines.join('\n')}`
}

export function SquishmojiPlayground() {
  const [pool, setPool] = useState<string[]>(() => getRandomPersonas(126))
  const [shape, setShape] = useState<SquishShapeChoice>('all')
  const [expression, setExpression] = useState<SquishExpressionChoice>('all')
  const [backgroundStyle, setBackgroundStyle] = useState<SquishBackgroundStyleChoice>('all')
  const [size, setSize] = useState(164)
  const [animate, setAnimate] = useState(false)
  const [animWobble, setAnimWobble] = useState(false)
  const [animOnHover, setAnimOnHover] = useState(false)
  const [animOnClick, setAnimOnClick] = useState(false)
  const [view, setView] = useState<ResourceViewMode>('gallery')
  const [seedName, setSeedName] = useState(DEFAULT_SEEDS)
  const [showRight, setShowRight] = useState(true)
  const [expanded, setExpanded] = useState(false)
  const [videoBg, setVideoBg] = useState('transparent')
  const [videoAspect, setVideoAspect] = useState<VideoAspect>('1:1')
  const [videoSize, setVideoSize] = useState<VideoExportSize>(1080)
  const [recording, setRecording] = useState(false)
  const [sequence, setSequence] = useState<SequenceStep[]>([])
  const [blinkTrigger, setBlinkTrigger] = useState(0)
  const [selectedSeed, setSelectedSeed] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const motionSnapshot = useRef<{
    animate: boolean
    animWobble: boolean
    animOnHover: boolean
    animOnClick: boolean
  } | null>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)', true)

  const getSvg = () => stageRef.current?.querySelector('svg') ?? null

  useEffect(() => {
    if (!isDesktop) setShowRight(false)
  }, [isDesktop])

  const name = seedName.trim() || DEFAULT_SEEDS
  const fileBase = `squishmoji-${name}`
  const code = useMemo(
    () =>
      snippetFor({
        seed: name,
        shape,
        expression,
        size,
        backgroundStyle,
        animate,
        animWobble,
        animOnHover,
        animOnClick,
      }),
    [name, shape, expression, size, backgroundStyle, animate, animWobble, animOnHover, animOnClick],
  )

  const renderSquish = (seed: string, mediaSize: number) => (
    <Squishmoji
      seed={seed}
      size={mediaSize}
      shape={shape}
      expression={expression}
      backgroundStyle={backgroundStyle}
      animate={animate}
      animWobble={animWobble}
      animOnHover={animOnHover}
      animOnClick={animOnClick}
      blinkTrigger={blinkTrigger}
    />
  )

  const reset = () => {
    setPool(getRandomPersonas(126))
    setShape('all')
    setExpression('all')
    setBackgroundStyle('all')
    setSize(164)
    setAnimate(true)
    setAnimWobble(false)
    setAnimOnHover(false)
    setAnimOnClick(false)
    setSeedName(DEFAULT_SEEDS)
    setView('gallery')
    setShowRight(isDesktop)
    setExpanded(false)
    motionSnapshot.current = null
  }

  const changeView = (next: ResourceViewMode) => {
    if (next === 'video' && view !== 'video') {
      motionSnapshot.current = { animate, animWobble, animOnHover, animOnClick }
      setAnimate(true)
      setAnimWobble(true)
      setAnimOnHover(true)
      setAnimOnClick(true)
    }
    if (next !== 'video' && view === 'video' && motionSnapshot.current) {
      const snap = motionSnapshot.current
      setAnimate(snap.animate)
      setAnimWobble(snap.animWobble)
      setAnimOnHover(snap.animOnHover)
      setAnimOnClick(snap.animOnClick)
      motionSnapshot.current = null
    }
    setView(next)
  }

  const toolbarConfig: ResourceToolbarConfig = {
    theme: true,
    expand: true,
    info: false,
    sidebar: true,
    reset: true,
    viewToggle: true,
    view,
    views: ['gallery', 'mockup', 'seed'],
    video: true,
    onViewChange: changeView,
    onReset: reset,
    onToggleExpand: setExpanded,
    onToggleSidebar: setShowRight,
    sidebarVisible: showRight,
    expanded,
  }

  const select = (seed: string) => {
    bloomSound()
    setSelectedSeed(seed)
  }

  const frame = videoDims(videoAspect, videoSize)
  const exportPanel =
    view === 'video' ? (
      <AvatarExportPanel
        videoBg={videoBg}
        setVideoBg={setVideoBg}
        aspect={videoAspect}
        setAspect={setVideoAspect}
        exportSize={videoSize}
        setExportSize={setVideoSize}
        recording={recording}
        onPng={() => void exportRaster(getSvg(), fileBase, 'png', Math.min(frame.width, frame.height))}
        onSvg={() => {
          const svg = getSvg()
          if (svg) void exportSvgMarkup(svg, fileBase)
        }}
        onToggleRecord={() => {
          if (recording) {
            stopLiveRecording(`${fileBase}-live`)
            setRecording(false)
            return
          }
          if (startLiveRecording(getSvg, videoBg, frame.width, frame.height)) setRecording(true)
        }}
        onBlink={() => setBlinkTrigger((count) => count + 1)}
        onAuto={() =>
          void exportToVideoAuto(
            name,
            shape,
            expression,
            videoBg,
            `${fileBase}-auto`,
            3,
            0,
            0,
            1,
            1,
            backgroundStyle,
            frame.width,
            frame.height,
          )
        }
      />
    ) : null

  return (
    <>
      <ResourceStudio
        showLeft={false}
        showRight={showRight && !expanded}
        rightWidth="20rem"
        onToggleRight={setShowRight}
        className={expanded ? 'p-0' : undefined}
        bottom={
          view === 'video' && !expanded ? (
            <SequenceTimeline
              sequence={sequence}
              onAdd={() =>
                setSequence((steps) => [
                  ...steps,
                  {
                    id: crypto.randomUUID(),
                    shape,
                    expression,
                    durationSec: 2,
                    backgroundStyle,
                    seed: name,
                    blink: false,
                    wobble: animWobble,
                    animate,
                  },
                ])
              }
              onUpdate={(id, patch) =>
                setSequence((steps) => steps.map((step) => (step.id === id ? { ...step, ...patch } : step)))
              }
              onRemove={(id) => setSequence((steps) => steps.filter((step) => step.id !== id))}
              onReorder={setSequence}
              onExport={() =>
                void exportToVideoSequence(
                  sequence,
                  videoBg,
                  `${fileBase}-sequence`,
                  0,
                  0,
                  1,
                  1,
                  frame.width,
                  frame.height,
                )
              }
            />
          ) : null
        }
        installBar={
          view !== 'seed' && view !== 'video' && !expanded ? (
            <InlineInstallBar packageName="@usespaceui/squishmoji" isShadcn={false} />
          ) : null
        }
        canvas={
          view === 'mockup' ? (
            <PersonaProvider
              render={(props) => (
                <Squishmoji
                  seed={props.name ?? DEFAULT_SEEDS}
                  size={props.size}
                  shape={shape}
                  expression={expression}
                  backgroundStyle={backgroundStyle}
                  animate={animate}
                  animWobble={animWobble}
                  animOnHover={animOnHover}
                  animOnClick={animOnClick}
                />
              )}
            >
              <MockupView
                pool={pool}
                pattern="all"
                size={size}
                effect="none"
                animate={animate}
                circle
                parsedColors={undefined}
                paletteIndex={-2}
              />
            </PersonaProvider>
          ) : view === 'gallery' ? (
            <ResourceGallery
              pool={pool}
              onSelect={select}
              limit={126}
              sidebarLeft={false}
              sidebarRight={showRight && !expanded}
              renderMedia={(seed) => (
                <div className="flex size-full max-h-full max-w-full items-center justify-center [&_svg]:size-full">
                  {renderSquish(seed, 164)}
                </div>
              )}
              caption={(seed) => captionFor(seed, shape, expression)}
            />
          ) : view === 'seed' ? (
            <ResourceSeedView
              title="Squishmoji"
              description="Deterministic squishy SVG avatars from any string. Alive with motion, no assets, no network."
              findLabel="Let's find your squishmoji"
              seed={seedName}
              setSeed={setSeedName}
              placeholder={DEFAULT_SEEDS}
              onRandomize={() => setSeedName(getRandomPersonas(1)[0] ?? DEFAULT_SEEDS)}
              packageName="@usespaceui/squishmoji"
              code={code}
              codeTitle="Squishmoji.tsx"
              footnote="Seed is the only required prop. The same seed always renders the same squishmoji."
              preview={renderSquish(name, size)}
            />
          ) : (
            <VideoStage
              stageRef={stageRef}
              seed={seedName}
              setSeed={setSeedName}
              placeholder={DEFAULT_SEEDS}
              onRandomize={() => setSeedName(getRandomPersonas(1)[0] ?? DEFAULT_SEEDS)}
              aspect={videoAspect}
              preview={
                <Squishmoji
                  key={name}
                  seed={name}
                  size="80%"
                  shape={shape}
                  expression={expression}
                  backgroundStyle={backgroundStyle}
                  animate={animate || recording}
                  animWobble={animWobble}
                  animOnHover={animOnHover}
                  animOnClick={animOnClick}
                  blinkTrigger={blinkTrigger}
                />
              }
            />
          )
        }
        float={<ResourceToolbar config={toolbarConfig} left={<ResourceNav />} />}
        right={
          <SquishmojiControlPanel
            seed={view === 'seed' || view === 'video' ? seedName : (pool[0] ?? DEFAULT_SEEDS)}
            shape={shape}
            setShape={setShape}
            expression={expression}
            setExpression={setExpression}
            backgroundStyle={backgroundStyle}
            setBackgroundStyle={setBackgroundStyle}
            size={size}
            setSize={setSize}
            animate={animate}
            setAnimate={setAnimate}
            animWobble={animWobble}
            setAnimWobble={setAnimWobble}
            animOnHover={animOnHover}
            setAnimOnHover={setAnimOnHover}
            animOnClick={animOnClick}
            setAnimOnClick={setAnimOnClick}
            regenerateSeeds={() => {
              const next = getRandomPersonas(126)
              setPool(next)
              setSeedName(next[0] ?? DEFAULT_SEEDS)
            }}
            view={view}
          >
            {exportPanel}
          </SquishmojiControlPanel>
        }
      />
      <SquishmojiCodeModal
        target={selectedSeed ? { seed: selectedSeed } : null}
        config={{
          shape,
          expression,
          backgroundStyle,
          animate,
          animWobble,
          animOnHover,
          animOnClick,
        }}
        onClose={() => setSelectedSeed(null)}
      />
    </>
  )
}
