'use client'

import { ImageDark } from '@/registry/components/spaceui/image-dark'
import { Badge } from '@/registry/primitives/badge'
import { Separator } from '@/registry/primitives/separator'

export default function ImageDarkDemo1() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 bg-white border-2 border-muted p-8 text-zinc-950">
          <Badge variant="outline" size="sm" className="border-zinc-200 bg-zinc-100 font-medium text-zinc-800">
            Light Mode
          </Badge>

          <div className="relative flex size-24 items-center justify-center rounded-2xl border-2 border-zinc-200 p-3">
            <ImageDark
              src="/logo.svg"
              darkSrc="/logo-dark.svg"
              alt="Light theme logo"
              width={72}
              height={72}
              className="size-full object-contain"
            />
          </div>

          <p className="text-center text-xs font-medium text-zinc-500">Rendered with light theme</p>
        </div>

        <Separator orientation="vertical" className="hidden md:block" />
        <Separator orientation="horizontal" className="block md:hidden" />

        <div className="dark flex flex-col items-center justify-center gap-4 bg-background border-2 border-zinc-500 p-8 text-zinc-50">
          <Badge variant="outline" size="sm" className="border-zinc-800 bg-zinc-900 font-medium text-zinc-200">
            Dark Mode
          </Badge>

          <div className="relative flex size-24 items-center justify-center rounded-2xl border-2 border-zinc-800 p-3">
            <ImageDark
              src="/logo.svg"
              darkSrc="/logo-dark.svg"
              alt="Dark theme logo"
              width={72}
              height={72}
              className="size-full object-contain"
            />
          </div>

          <p className="text-center text-xs font-medium text-zinc-400">
            Rendered with <code className="text-zinc-200">.dark</code> class
          </p>
        </div>
      </div>
    </div>
  )
}
