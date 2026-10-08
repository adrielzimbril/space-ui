export type ActivityStatus = 'running' | 'failed' | 'completed'

export interface AgentActivityItem {
  id: string
  agent: string
  status: ActivityStatus
  description: string
  time: string
  group: string
}

export interface AgentActivityPreset {
  id: string
  name: string
  items: AgentActivityItem[]
}

export const AGENT_ACTIVITY_PRESETS: Record<string, AgentActivityPreset> = {
  general: {
    id: 'general',
    name: 'Autonomous Operations',
    items: [
      {
        id: 'act-1',
        agent: 'Vector Indexer',
        status: 'running',
        description: 'Reindexing 42k embeddings in cluster us-east…',
        time: '2m',
        group: 'Today',
      },
      {
        id: 'act-2',
        agent: 'Token Guard',
        status: 'failed',
        description: 'Rate ceiling reached on model tier gpt-5',
        time: '18m',
        group: 'Today',
      },
      {
        id: 'act-3',
        agent: 'Prompt Optimizer',
        status: 'completed',
        description: 'Reduced system latency by 28% across 12 chains',
        time: '45m',
        group: 'Today',
      },
      {
        id: 'act-4',
        agent: 'Context Pruner',
        status: 'completed',
        description: 'Compressed active memory buffer to 4.2k tokens',
        time: '2h',
        group: 'Today',
      },
      {
        id: 'act-5',
        agent: 'Telemetry Probe',
        status: 'completed',
        description: 'Synced 1.8M traces to cold storage bucket',
        time: '5h',
        group: 'Earlier',
      },
      {
        id: 'act-6',
        agent: 'Model Router',
        status: 'failed',
        description: 'Upstream gateway timeout on primary fallback',
        time: '8h',
        group: 'Earlier',
      },
      {
        id: 'act-7',
        agent: 'Knowledge Sync',
        status: 'completed',
        description: 'Merged documentation updates into vector space',
        time: '12h',
        group: 'Earlier',
      },
      {
        id: 'act-8',
        agent: 'Key Vault Guard',
        status: 'completed',
        description: 'Rotated ephemeral API access credentials',
        time: '2d',
        group: 'This Week',
      },
      {
        id: 'act-9',
        agent: 'Policy Inspector',
        status: 'failed',
        description: 'Blocked unauthorized external webhook endpoint',
        time: '3d',
        group: 'This Week',
      },
      {
        id: 'act-10',
        agent: 'Semantic Cache',
        status: 'completed',
        description: 'Evicted 3,420 stale prompt responses',
        time: '4d',
        group: 'This Week',
      },
    ],
  },
  devops: {
    id: 'devops',
    name: 'Infrastructure & Edge',
    items: [
      {
        id: 'dev-1',
        agent: 'Edge Mesh Sentinel',
        status: 'running',
        description: 'Propagating routing policy to 34 edge regions…',
        time: '1m',
        group: 'Today',
      },
      {
        id: 'dev-2',
        agent: 'Postgres Optimizer',
        status: 'completed',
        description: 'Vacuumed partitions and updated statistics',
        time: '25m',
        group: 'Today',
      },
      {
        id: 'dev-3',
        agent: 'Container Sandbox',
        status: 'failed',
        description: 'OOM kill triggered on isolated worker daemon',
        time: '1h',
        group: 'Today',
      },
      {
        id: 'dev-4',
        agent: 'TLS Provisioner',
        status: 'completed',
        description: 'Issued zero-trust mTLS certificates for api nodes',
        time: '6h',
        group: 'Earlier',
      },
      {
        id: 'dev-5',
        agent: 'DDoS Shield',
        status: 'completed',
        description: 'Mitigated 14 Gbps SYN flood on ingress router',
        time: '10h',
        group: 'Earlier',
      },
      {
        id: 'dev-6',
        agent: 'Artifact Registry',
        status: 'failed',
        description: 'Checksum mismatch verifying base image layer',
        time: '2d',
        group: 'This Week',
      },
    ],
  },
}

export type AgentActivityPresetKey = keyof typeof AGENT_ACTIVITY_PRESETS
export const AGENT_ACTIVITY_LOGS = AGENT_ACTIVITY_PRESETS.general.items
