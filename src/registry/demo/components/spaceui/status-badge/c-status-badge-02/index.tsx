import { StatusBadge } from '@/registry/components/spaceui/status-badge'

export default function StatusBadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4">
      <StatusBadge size="sm" status="online" primaryText="Small">
        v1.0.0
      </StatusBadge>
      <StatusBadge size="default" status="online" primaryText="Default">
        v2.4.1
      </StatusBadge>
      <StatusBadge size="lg" status="online" primaryText="Large">
        v3.0.0-beta
      </StatusBadge>
    </div>
  )
}
