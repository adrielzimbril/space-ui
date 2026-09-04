import { StatusBadge } from '@/registry/components/spaceui/status-badge'

export default function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 p-4">
      <StatusBadge status="online" primaryText="Online" animated>
        Operational
      </StatusBadge>
      <StatusBadge status="busy" primaryText="Busy">
        In a meeting
      </StatusBadge>
      <StatusBadge status="away" primaryText="Away">
        AFK
      </StatusBadge>
      <StatusBadge status="warning" primaryText="Warning">
        High latency
      </StatusBadge>
      <StatusBadge status="error" primaryText="Error">
        Service outage
      </StatusBadge>
      <StatusBadge status="info" primaryText="Info">
        Maintenance
      </StatusBadge>
      <StatusBadge status="offline" primaryText="Offline">
        Disconnected
      </StatusBadge>
    </div>
  )
}
