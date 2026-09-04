import { Button } from '@/registry/primitives/button'
import { Input } from '@/registry/primitives/input'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  LiquidMetalCard,
} from '@/registry/components/spaceui/liquid-metal-card'
import { IconUser, IconBrandGithub } from '@tabler/icons-react'

export function LiquidMetalCardLogin() {
  return (
    <LiquidMetalCard
      className="w-full max-w-sm"
      speed={0.3}
      repetition={3}
      softness={0.8}
      shiftRed={0.2}
      shiftBlue={0.4}
    >
      <CardHeader className="text-center">
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input type="email" placeholder="Email address" className="h-10" />
        <Input type="password" placeholder="Password" className="h-10" />
        <Button className="w-full">Sign In</Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="gap-2">
            <IconBrandGithub className="size-4" />
            GitHub
          </Button>
          <Button variant="outline" className="gap-2">
            <IconUser className="size-4" />
            Google
          </Button>
        </div>
      </CardContent>
    </LiquidMetalCard>
  )
}
