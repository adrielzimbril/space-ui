'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { AvatarEffect, AvatarVariant } from '@usespaceui/avatars'
import { ResourceStudio } from '@/resources/studio'
import { AvatarCanvas } from './canvas'
import { AvatarControlPanel } from './control-panel'
import { getRandomPersonas, getSelectedAvatarDetails, resolvePaletteColors } from './utils'

export function AvatarsPlayground() {
  const [pool, setPool] = useState<string[]>(() => getRandomPersonas(200))
  const [pattern, setPattern] = useState<AvatarVariant | 'all'>('all')
  const [size, setSize] = useState(164)
  const [effect, setEffect] = useState<AvatarEffect>('none')
  const [animate, setAnimate] = useState(false)
  const [paletteIndex, setPaletteIndex] = useState(-2)
  const [customColors, setCustomColors] = useState<string[]>([])
  const [circle, setCircle] = useState(true)

  const parsedColors = useMemo(() => resolvePaletteColors(paletteIndex, customColors), [paletteIndex, customColors])
  const details = useMemo(() => getSelectedAvatarDetails(pattern), [pattern])

  return (
    <ResourceStudio
      bar={
        <div className="flex w-full items-center justify-between gap-3 text-sm">
          <Link href="/resources" className="font-medium text-muted-foreground hover:text-foreground">
            Resources
          </Link>
          <span className="font-semibold">Avatars</span>
        </div>
      }
      canvas={
        <AvatarCanvas
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
