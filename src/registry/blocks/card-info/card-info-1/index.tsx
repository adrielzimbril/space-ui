'use client'

import React from 'react'
import { Badge } from '@/registry/primitives/badge'
import { Card, CardPanel } from '@/registry/primitives/card'
import { cn } from '@/registry/lib/utils'
import { HandshakeIcon, PlayingCardsIcon, ShapeIcon, ThreeDIcon } from './icons'

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

interface CraftSectionCard {
  icon: string | React.ReactNode
  title: string
  description: string
}

const data: CraftSectionCard[] = [
  {
    icon: <PlayingCardsIcon />,
    title: 'For Businesses',
    description:
      "I love designing interfaces that breathe simplicity, fit naturally into your users' lives, and respect your long-term business goals.\n\n🎯 Impact: satisfied customers, engineering teams implementing without stress, and a product that proves its value over time.",
  },
  {
    icon: <ThreeDIcon />,
    title: 'For Startups',
    description:
      'Building a product starts with understanding what truly matters. Together, we clarify the problem, imagine a realistic MVP, and choose the right tools to quickly test your hypotheses.\n\n🎯 Impact: fewer risky bets, more concrete learnings, and a first product that attracts your real users.',
  },
  {
    icon: <HandshakeIcon />,
    title: 'For Product Teams',
    description:
      'The best products are born from aligned, curious teams. Through workshops and co-creation sessions, I help your teams see their challenges differently and find solutions that make your product grow.\n\n🎯 Impact: a product that evolves in the right direction and teams that are motivated and proud of what they build.',
  },
  {
    icon: <ShapeIcon />,
    title: 'For Students',
    description:
      "Learning design is not just about taking a class: it's about understanding how to turn a raw idea into a viable project. My trainings and resources are here to give you the right reflexes from the start.\n\n🎯 Impact: more confidence, less dropouts, and the satisfaction of seeing your ideas become real.",
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
