'use client'

import { IconRefresh } from '@tabler/icons-react'
import {
  EXPRESSION_VALUES,
  SHAPE_VALUES,
  type SquishBackgroundStyleChoice,
  type SquishExpressionChoice,
  type SquishShapeChoice,
} from '@usespaceui/squishmoji'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { cn } from '@/registry/lib/utils'
import { squishPalette } from './palette'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import { Slider } from '@/registry/primitives/slider'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'
import { Button } from '@/registry/primitives/button'
import type { ReactNode } from 'react'
import type { ResourceViewMode } from '@/resources/shared/types'
import { DEFAULT_SEEDS } from '@/resources/shared/seeds'

const SIZE_MIN = 64
const SIZE_MAX = 256

function toLabel(value: string) {
  return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

const BACKGROUND_SWATCHES: Array<{ id: SquishBackgroundStyleChoice; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'solid', label: 'Solid' },
  { id: 'taygeta', label: 'Taygeta' },
  { id: 'maia', label: 'Maia' },
  { id: 'merope', label: 'Merope' },
  { id: 'celaeno', label: 'Celaeno' },
  { id: 'alcyone', label: 'Alcyone' },
]

function backgroundFill(id: SquishBackgroundStyleChoice, body: string, palette: string[]) {
  const mid = palette[1] ?? body
  const accent = palette[2] ?? body
  if (id === 'all') return `conic-gradient(from 210deg, ${body}, ${mid}, ${accent}, ${body})`
  if (id === 'solid') return body
  if (id === 'taygeta' || id === 'maia' || id === 'merope')
    return `radial-gradient(circle at 25% 25%, ${mid}, ${body} 68%)`
  if (id === 'celaeno') return `linear-gradient(155deg, #ffffff, ${body} 42%, #0f172a)`
  return `radial-gradient(ellipse at 30% 25%, ${accent}, ${body} 62%, #0f172a)`
}

function OptionPreview({
  seed,
  shape,
  expression,
  backgroundStyle,
}: {
  seed: string
  shape: SquishShapeChoice
  expression: SquishExpressionChoice
  backgroundStyle: SquishBackgroundStyleChoice
}) {
  return (
    <span className="grid size-6 shrink-0 place-items-center overflow-hidden rounded-full bg-muted [&_svg]:size-full! [&_svg]:shrink-0 [&_svg]:self-center">
      <Squishmoji
        seed={seed}
        size={24}
        shape={shape}
        expression={expression}
        backgroundStyle={backgroundStyle}
        animate={false}
        frozenAt={0}
      />
    </span>
  )
}

export function SquishmojiControlPanel({
  seed,
  shape,
  setShape,
  expression,
  setExpression,
  backgroundStyle,
  setBackgroundStyle,
  size,
  setSize,
  animate,
  setAnimate,
  animWobble,
  setAnimWobble,
  animOnHover,
  setAnimOnHover,
  animOnClick,
  setAnimOnClick,
  regenerateSeeds,
  view,
  children,
}: {
  seed: string
  shape: SquishShapeChoice
  setShape: (value: SquishShapeChoice) => void
  expression: SquishExpressionChoice
  setExpression: (value: SquishExpressionChoice) => void
  backgroundStyle: SquishBackgroundStyleChoice
  setBackgroundStyle: (value: SquishBackgroundStyleChoice) => void
  size: number
  setSize: (value: number) => void
  animate: boolean
  setAnimate: (value: boolean) => void
  animWobble: boolean
  setAnimWobble: (value: boolean) => void
  animOnHover: boolean
  setAnimOnHover: (value: boolean) => void
  animOnClick: boolean
  setAnimOnClick: (value: boolean) => void
  regenerateSeeds: () => void
  view: ResourceViewMode
  children?: ReactNode
}) {
  const activeSeed = seed.trim() || DEFAULT_SEEDS
  const { body, palette } = squishPalette(activeSeed)

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-10 shrink-0 items-center px-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold">Squishmoji</h2>
          <span className="text-[0.625rem] text-muted-foreground">
            {view === 'mockup' ? 'Mockup' : view === 'gallery' ? 'Gallery' : view === 'video' ? 'Video' : 'Seed'}
          </span>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-3.5">
          <div className="flex items-center gap-3 rounded-xl bg-muted p-2.5">
            <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[0.625rem] bg-background">
              <Squishmoji
                seed={activeSeed}
                size={44}
                shape={shape}
                expression={expression}
                backgroundStyle={backgroundStyle}
                animate={false}
                frozenAt={0}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{toLabel(shape === 'all' ? 'All shapes' : shape)}</p>
              <p className="truncate text-[0.625rem] text-muted-foreground">
                {toLabel(expression === 'all' ? 'All expressions' : expression)}
              </p>
            </div>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Randomize seeds" onClick={regenerateSeeds}>
              <IconRefresh />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Shape</span>
            <Select value={shape} onValueChange={(value) => value && setShape(value as SquishShapeChoice)}>
              <SelectTrigger aria-label="Shape" className="h-10 border-0 bg-muted px-2.5 text-xs">
                <SelectValue>
                  <span className="flex min-w-0 items-center gap-2">
                    <OptionPreview
                      seed={activeSeed}
                      shape={shape}
                      expression={expression}
                      backgroundStyle={backgroundStyle}
                    />
                    <span className="truncate">{shape === 'all' ? 'All shapes' : toLabel(shape)}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="flex items-center gap-2">
                    <OptionPreview
                      seed={activeSeed}
                      shape="all"
                      expression={expression}
                      backgroundStyle={backgroundStyle}
                    />
                    All shapes
                  </span>
                </SelectItem>
                {SHAPE_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    <span className="flex items-center gap-2">
                      <OptionPreview
                        seed={`${activeSeed}-${item}`}
                        shape={item}
                        expression={expression}
                        backgroundStyle={backgroundStyle}
                      />
                      {toLabel(item)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Expression</span>
            <Select
              value={expression}
              onValueChange={(value) => value && setExpression(value as SquishExpressionChoice)}
            >
              <SelectTrigger aria-label="Expression" className="h-10 border-0 bg-muted px-2.5 text-xs">
                <SelectValue>
                  <span className="flex min-w-0 items-center gap-2">
                    <OptionPreview
                      seed={activeSeed}
                      shape={shape}
                      expression={expression}
                      backgroundStyle={backgroundStyle}
                    />
                    <span className="truncate">{expression === 'all' ? 'All expressions' : toLabel(expression)}</span>
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  <span className="flex items-center gap-2">
                    <OptionPreview seed={activeSeed} shape={shape} expression="all" backgroundStyle={backgroundStyle} />
                    All expressions
                  </span>
                </SelectItem>
                {EXPRESSION_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    <span className="flex items-center gap-2">
                      <OptionPreview
                        seed={`${activeSeed}-${item}`}
                        shape={shape}
                        expression={item}
                        backgroundStyle={backgroundStyle}
                      />
                      {toLabel(item)}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Background</span>
            <p className="text-[0.625rem] text-muted-foreground">All = the seed picks. Otherwise you pin a style.</p>
            <div className="grid grid-cols-3 gap-1.5">
              {BACKGROUND_SWATCHES.map((swatch) => {
                const selected = backgroundStyle === swatch.id
                const dark = swatch.id === 'all' || swatch.id === 'celaeno' || swatch.id === 'alcyone' || swatch.id === 'merope'
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => setBackgroundStyle(swatch.id)}
                    className={cn(
                      'rounded-lg border px-1.5 py-2 text-[0.625rem] font-semibold',
                      selected ? 'border-foreground' : 'border-transparent',
                      dark ? 'text-white' : 'text-foreground',
                    )}
                    style={{ background: backgroundFill(swatch.id, body, palette) }}
                  >
                    {swatch.label}
                  </button>
                )
              })}
            </div>
          </div>

          {view === 'seed' ? (
            <div className="flex flex-col gap-2">
              <Slider
                value={[size]}
                min={SIZE_MIN}
                max={SIZE_MAX}
                onValueChange={(val) => {
                  const next = Array.isArray(val) ? val[0] : val
                  if (typeof next === 'number') setSize(next)
                }}
              />
            </div>
          ) : null}

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Motion</span>
            <ToggleGroup
              value={[animate ? 'on' : 'off']}
              onValueChange={(value) => {
                const next = value[0]
                if (next) setAnimate(next === 'on')
              }}
              className="w-full"
            >
              <ToggleGroupItem value="off" className="flex-1">
                Off
              </ToggleGroupItem>
              <ToggleGroupItem value="on" className="flex-1">
                On
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Wobble</span>
            <ToggleGroup
              value={[animWobble ? 'on' : 'off']}
              onValueChange={(value) => {
                const next = value[0]
                if (next) setAnimWobble(next === 'on')
              }}
              className="w-full"
            >
              <ToggleGroupItem value="off" className="flex-1">
                Off
              </ToggleGroupItem>
              <ToggleGroupItem value="on" className="flex-1">
                On
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Hover</span>
            <ToggleGroup
              value={[animOnHover ? 'on' : 'off']}
              onValueChange={(value) => {
                const next = value[0]
                if (next) setAnimOnHover(next === 'on')
              }}
              className="w-full"
            >
              <ToggleGroupItem value="off" className="flex-1">
                Off
              </ToggleGroupItem>
              <ToggleGroupItem value="on" className="flex-1">
                On
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Click</span>
            <ToggleGroup
              value={[animOnClick ? 'on' : 'off']}
              onValueChange={(value) => {
                const next = value[0]
                if (next) setAnimOnClick(next === 'on')
              }}
              className="w-full"
            >
              <ToggleGroupItem value="off" className="flex-1">
                Off
              </ToggleGroupItem>
              <ToggleGroupItem value="on" className="flex-1">
                On
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          {children}
        </div>
      </ScrollArea>
    </div>
  )
}
