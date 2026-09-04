'use client'

import { ImageDark } from '@/registry/components/spaceui/image-dark'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/registry/primitives/card'
import { Badge } from '@/registry/primitives/badge'
import { Button } from '@/registry/primitives/button'
import { IconArrowUpRight } from '@tabler/icons-react'

export default function Demo() {
  return (
    <Card className="w-full max-w-md overflow-hidden border border-border">
      <div className="relative aspect-video w-full overflow-hidden p-6 flex items-center justify-center border-b border-border">
        <div className="relative size-24">
          <ImageDark
            src="/logo.svg"
            darkSrc="/logo-dark.svg"
            alt="Space UI Application"
            width={180}
            height={180}
            className="size-full object-contain"
          />
        </div>
      </div>

      <CardHeader className="space-y-1 p-5 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Theme-Aware Preview</CardTitle>
          <Badge variant="secondary" size="sm" className="gap-1">
            <span>Auto Sync</span>
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          Standard HTML <code>&lt;img&gt;</code> attributes like <code>className</code>, <code>alt</code>,{' '}
          <code>width</code>, and <code>height</code> are supported with zero runtime overhead.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-2 flex items-center justify-end gap-2">
        <Button size="sm" variant="outline" className="text-xs">
          Learn more
        </Button>
        <Button size="sm" className="text-xs gap-1">
          <span>Explore</span>
          <IconArrowUpRight className="size-3.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
