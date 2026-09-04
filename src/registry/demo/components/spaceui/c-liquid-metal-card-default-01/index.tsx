import { Button } from '@/registry/primitives/button'
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  LiquidMetalCard,
} from '@/registry/components/spaceui/liquid-metal-card'

export function LiquidMetalCardDefault() {
  return (
    <LiquidMetalCard className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Your new project will be created with the default settings. You can customize it later in the project
          settings.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </LiquidMetalCard>
  )
}
