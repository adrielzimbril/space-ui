'use client'

import { useState } from 'react'
import { Button } from '@/registry/primitives/button'
import {
  Drawer,
  DrawerDescription,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/primitives/drawer'

export default function Particle() {
  const snapPoints = ['300px', 1] as const
  const [snapPoint, setSnapPoint] = useState<(typeof snapPoints)[number] | null>(snapPoints[0])

  return (
    <Drawer
      onSnapPointChange={(point) => setSnapPoint(point as (typeof snapPoints)[number] | null)}
      position="bottom"
      snapPoint={snapPoint}
      snapPoints={[...snapPoints]}
      snapToSequentialPoints
    >
      <DrawerTrigger render={<Button variant="outline" />}>With snap points</DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Snap Points</DrawerTitle>
          <DrawerDescription>Drag the drawer to snap between a compact peek and full-height view.</DrawerDescription>
        </DrawerHeader>
        <DrawerPanel>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 48 }, (_, i) => `box-${i}`).map((key) => (
              <div className="h-12 shrink-0 rounded-xl border bg-muted" key={key} />
            ))}
          </div>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  )
}
