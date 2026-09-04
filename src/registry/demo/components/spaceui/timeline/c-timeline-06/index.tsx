'use client'

import { IconCheck, IconCircle, IconChevronRight } from '@tabler/icons-react'
import { Badge } from '@/registry/primitives/badge'
import { Frame, FrameHeader, FramePanel } from '@/registry/primitives/frame'
import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from '@/registry/components/spaceui/timeline'

import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/registry/primitives/collapsible'
import { Spinner } from '@/registry/primitives/spinner'
const pipelineSteps = [
  {
    id: 1,
    title: 'Source Code Checkout',
    duration: '12s',
    status: 'completed',
    description: 'Successfully fetched latest changes from the main branch.',
    user: {
      name: 'Alex Johnson',
      avatar: 'https://avatars.spaceui.one/v1?name=pluto&variant=shaula',
    },
  },
  {
    id: 2,
    title: 'Dependency Installation',
    duration: '1m 45s',
    status: 'completed',
    description: 'All npm packages installed and cached for future builds.',
    user: {
      name: 'Sarah Chen',
      avatar: 'https://avatars.spaceui.one/v1?name=neptune&variant=singularity',
    },
  },
  {
    id: 3,
    title: 'Unit & Integration Tests',
    duration: 'Running',
    status: 'active',
    description: 'Running 142 test suites across the entire codebase...',
    user: {
      name: 'Michael Rodriguez',
      avatar: 'https://avatars.spaceui.one/v1?name=uranus&variant=triton',
    },
  },
  {
    id: 4,
    title: 'Production Build',
    duration: 'Pending',
    status: 'pending',
    description: 'Optimizing assets and generating static site pages.',
    user: {
      name: 'Emma Wilson',
      avatar: 'https://avatars.spaceui.one/v1?name=earth&variant=solar-flare',
    },
  },
]

function StatusIcon({ status }: { status: string }) {
  if (status === 'completed') return <IconCheck className="size-3.5" />
  if (status === 'active') return <Spinner className="size-3.5" />
  return <IconCircle className="size-3.5" />
}

function StatusBadge({ status, duration }: { status: string; duration: string }) {
  const variant = status === 'completed' ? 'success' : status === 'active' ? 'info' : 'warning'

  return (
    <Badge variant={variant} size="sm">
      {duration}
    </Badge>
  )
}

export default function Demo() {
  return (
    <div className="w-full max-w-lg">
      <Timeline defaultValue={3}>
        {pipelineSteps.map((step) => (
          <TimelineItem key={step.id} step={step.id} className="ms-10 pb-10">
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-7" />
              <div className="flex items-center gap-2">
                <TimelineTitle className="text-sm font-semibold">{step.title}</TimelineTitle>
                <StatusBadge status={step.status} duration={step.duration} />
              </div>
              <TimelineIndicator
                className={cn(
                  'bg-muted text-muted-foreground group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center border-none group-data-[orientation=vertical]/timeline:-left-7',
                  step.status === 'active' && 'ring-primary/20 ring-2',
                )}
              >
                <StatusIcon status={step.status} />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent className="mt-2">
              <Frame>
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger className="flex w-full">
                    <FrameHeader className="flex grow flex-row items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="size-5">
                          <AvatarImage src={step.user.avatar} alt={step.user.name} />
                          <AvatarFallback>{step.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground text-xs font-medium">{step.user.name}</span>
                      </div>
                      <IconChevronRight className="text-muted-foreground size-4 transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                    </FrameHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <FramePanel>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                    </FramePanel>
                  </CollapsibleContent>
                </Collapsible>
              </Frame>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  )
}
