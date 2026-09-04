import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from '@/registry/primitives/meter'

export default function Particle() {
  return (
    <Meter value={75}>
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>Storage usage</MeterLabel>
        <MeterValue />
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}
