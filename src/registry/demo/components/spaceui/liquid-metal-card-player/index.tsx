import { Button } from '@/registry/primitives/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LiquidMetalCard,
} from '@/registry/components/spaceui/liquid-metal-card'
import { IconCircle, IconSparkles } from '@tabler/icons-react'

export function LiquidMetalCardPlayer() {
  return (
    <LiquidMetalCard className="w-full max-w-sm" speed={0.4} repetition={3} softness={0.4} contour={0.3} scale={10}>
      <CardHeader>
        <img
          src="/images/take-me-back-to-eden.jpg"
          alt="Take Me Back to Eden album cover"
          className="mx-auto size-32 rounded-xl object-cover"
        />
      </CardHeader>
      <CardContent className="text-center">
        <CardTitle className="text-lg">The Summoning</CardTitle>
        <CardDescription>Sleep Token · Take Me Back to Eden</CardDescription>
        <div className="mt-4 flex items-center justify-center gap-4">
          <Button variant="ghost" size="icon">
            <IconSparkles className="size-5" />
          </Button>
          <Button size="icon-lg" className="rounded-full">
            <IconCircle className="size-5 fill-current" />
          </Button>
          <Button variant="ghost" size="icon">
            <IconSparkles className="size-5" />
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>2:15</span>
          <div className="h-1 flex-1 rounded-full bg-muted">
            <div className="h-full w-1/3 rounded-full bg-primary" />
          </div>
          <span>6:46</span>
        </div>
      </CardContent>
    </LiquidMetalCard>
  )
}
