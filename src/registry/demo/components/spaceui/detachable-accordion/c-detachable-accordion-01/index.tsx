'use client'

import { DetachableAccordion, type DetachableAccordionItem } from '@/registry/components/spaceui/detachable-accordion'
import { Component, Flash, Code, Shield, Cpu } from 'reicon-react'

const ITEMS: DetachableAccordionItem[] = [
  {
    value: 'components',
    icon: <Component size={20} />,
    title: 'Components',
    content:
      'Modular, composable UI primitives built for every interface. Mix and match to craft cohesive product experiences.',
  },
  {
    value: 'performance',
    icon: <Flash size={20} />,
    title: 'Performance',
    content:
      'Zero layout shift, sub-50ms interactions, and tree-shakeable bundles — engineered for speed from the ground up.',
  },
  {
    value: 'developer',
    icon: <Code size={20} />,
    title: 'Developer Experience',
    content: 'Type-safe APIs, intelligent autocompletion, and co-located docs make building feel effortless.',
  },
  {
    value: 'security',
    icon: <Shield size={20} />,
    title: 'Security',
    content: 'End-to-end encrypted data flows, signed registry artifacts, and auditable dependency chains built in.',
  },
  {
    value: 'infrastructure',
    icon: <Cpu size={20} />,
    title: 'Infrastructure',
    content: 'Deploy anywhere — edge, serverless, or container — with zero-config adapters for every major platform.',
  },
]

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center p-8 sm:p-12">
      <DetachableAccordion items={ITEMS} defaultValue="components" />
    </div>
  )
}
