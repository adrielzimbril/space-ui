import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LiquidMetalCard,
} from '@/registry/components/spaceui/liquid-metal-card'

export function LiquidMetalCardCustom() {
  return (
    <LiquidMetalCard
      className="w-full max-w-sm"
      speed={1.2}
      repetition={6}
      softness={0.8}
      shiftRed={0.5}
      shiftBlue={0.1}
    >
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <CardAction>
          <Badge variant="secondary">New</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Customize the liquid metal effect with props like speed, repetition, softness, and color shifts.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Mark all as read</Button>
      </CardFooter>
    </LiquidMetalCard>
  )
}
