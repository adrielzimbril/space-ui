'use client'

import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from '@/registry/primitives/meter'

export default function Demo() {
  return (
    <Meter max={5} value={3}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>Rating</MeterLabel>
        <MeterValue>{(_formatted, value) => `${value} / 5`}</MeterValue>
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
