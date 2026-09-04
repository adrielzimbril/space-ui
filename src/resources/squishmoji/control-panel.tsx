'use client'

import { IconRefresh } from '@tabler/icons-react'
import {
  BACKGROUND_STYLE_VALUES,
  EXPRESSION_VALUES,
  SHAPE_VALUES,
  type SquishBackgroundStyleChoice,
  type SquishExpressionChoice,
  type SquishShapeChoice,
} from '@usespaceui/squishmoji'
import { Squishmoji } from '@usespaceui/squishmoji/react'
import { ScrollArea } from '@/registry/primitives/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/primitives/select'
import { Slider } from '@/registry/primitives/slider'
import { ToggleGroup, ToggleGroupItem } from '@/registry/primitives/toggle-group'
import { Button } from '@/registry/primitives/button'
import type { ResourceViewMode } from '@/resources/view-mode'
import { DEFAULT_SEEDS } from '@/resources/avatars/seeds'

const SIZE_MIN = 64
const SIZE_MAX = 256

function toLabel(value: string) {
  return value.replace(/[-_]/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
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
}) {
  const activeSeed = seed.trim() || DEFAULT_SEEDS

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-10 shrink-0 items-center px-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold">Squishmoji</h2>
          <span className="text-[0.625rem] text-muted-foreground">
            {view === 'canvas' ? 'Canvas' : view === 'mockup' ? 'Mockup' : view === 'gallery' ? 'Gallery' : 'Seed'}
          </span>
        </div>
      </div>
      <ScrollArea className="min-h-0 flex-1">
        <div className="flex flex-col gap-4 p-3.5">
          <div className="flex items-center gap-3 rounded-xl bg-muted p-2.5">
            <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-[0.625rem] bg-background">
              <Squishmoji seed={activeSeed} size={44} shape={shape} expression={expression} backgroundStyle={backgroundStyle} animate={false} frozenAt={0} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold">{toLabel(shape === 'all' ? 'All shapes' : shape)}</p>
              <p className="truncate text-[0.625rem] text-muted-foreground">{toLabel(expression === 'all' ? 'All expressions' : expression)}</p>
            </div>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Randomize seeds" onClick={regenerateSeeds}>
              <IconRefresh />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Shape</span>
            <Select value={shape} onValueChange={(value) => value && setShape(value as SquishShapeChoice)}>
              <SelectTrigger aria-label="Shape" className="h-9 border-0 bg-muted px-3 text-xs">
                <SelectValue>{toLabel(shape)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {SHAPE_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {toLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Expression</span>
            <Select value={expression} onValueChange={(value) => value && setExpression(value as SquishExpressionChoice)}>
              <SelectTrigger aria-label="Expression" className="h-9 border-0 bg-muted px-3 text-xs">
                <SelectValue>{toLabel(expression)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {EXPRESSION_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {toLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[0.6875rem] font-semibold text-muted-foreground">Background</span>
            <Select
              value={backgroundStyle}
              onValueChange={(value) => value && setBackgroundStyle(value as SquishBackgroundStyleChoice)}
            >
              <SelectTrigger aria-label="Background" className="h-9 border-0 bg-muted px-3 text-xs">
                <SelectValue>{toLabel(backgroundStyle)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {BACKGROUND_STYLE_VALUES.map((item) => (
                  <SelectItem key={item} value={item}>
                    {toLabel(item)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {view === 'canvas' || view === 'seed' ? (
            <div className="flex flex-col gap-2">
              <span className="text-[0.6875rem] font-semibold text-muted-foreground">Size · {size}px</span>
              <Slider value={[size]} min={SIZE_MIN} max={SIZE_MAX} onValueChange={(value) => setSize(value[0] ?? size)} />
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
        </div>
      </ScrollArea>
    </div>
  )
}
