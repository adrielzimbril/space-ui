'use client'

import React from 'react'
import { Badge } from '@/registry/primitives/badge'
import { Card, CardPanel } from '@/registry/primitives/card'
import { cn } from '@/registry/lib/utils'
import { BalanceIcon, BookIcon, LongitudeIcon, WandIcon } from '@/registry/blocks/card-info/card-info-1/icons'

export function DetailsCard({
  icon,
  title,
  description,
}: {
  icon: string | React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="bg-muted rounded-3xl md:rounded-5xl overflow-hidden h-full md:max-w-xl">
      <CardPanel
        className={cn(
          'flex relative flex-col min-h-60 items-center justify-center p-4 rounded-xl md:rounded-3xl bg-background overflow-hidden',
        )}
      >
        <div className="flex flex-col items-start gap-4 w-full max-w-[90%] py-12 mx-auto">
          <Badge
            variant="secondary"
            className="aspect-square p-4 rounded-full size-auto! [&>svg]:size-12! [&>img]:size-12!"
          >
            {typeof icon === 'string' ? (
              <img className="object-cover pointer-events-none" src={icon} alt={title} loading="lazy" />
            ) : (
              icon
            )}
          </Badge>
          <h3 className="text-3xl tracking-wide leading-[120%]">{title}</h3>

          <p className="text-muted-foreground whitespace-pre-line text-xl leading-[140%]">{description}</p>
        </div>
      </CardPanel>
    </Card>
  )
}

interface PhilosophyCard {
  title: string
  icon: React.ReactNode
  alt: string
  description: string
}

const data: PhilosophyCard[] = [
  {
    title: 'User First',
    icon: <WandIcon />,
    alt: 'Symbol',
    description:
      'Every project starts with a simple question: what truly matters to the user?\nMy role: turn that answer into experiences people love to use — and that exceed their expectations.',
  },
  {
    title: 'Always Learning',
    icon: <BookIcon />,
    alt: 'Book',
    description:
      "Design, AI, growth, systems… I love staying curious and exploring what's next.\nEvery new insight is a chance to improve what I create — and inspire those I work with.",
  },
  {
    title: 'Teams that Rise Together',
    icon: <LongitudeIcon />,
    alt: 'Longitude',
    description:
      'A great product is always a team effort. I love creating spaces where ideas flow, everyone feels involved, and we build something everyone is proud of.',
  },
  {
    title: 'Move Fast, Move Right',
    icon: <BalanceIcon />,
    alt: 'Balance default',
    description:
      'I believe in fast iterations and intentional decisions.\nEvery test is a compass, every adjustment brings the product closer to its best version.',
  },
]

export default function Particle() {
  return (
    <div
      className={cn(
        'md:grid grid-cols-1 md:grid-cols-2 md:max-w-5xl gap-6 items-center justify-center justify-items-center self-center place-self-center w-full place-items-center',
      )}
    >
      {data.map((item, index) => (
        <DetailsCard key={index} icon={item.icon} title={item.title} description={item.description} />
      ))}
    </div>
  )
}
