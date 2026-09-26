'use client'

import { GradientFileUpload } from '@/registry/components/spaceui/gradient-file-upload'

export default function Demo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center p-4 sm:p-8">
      <GradientFileUpload variant="original" maxSizeMb={50} uploadDurationMs={2500} />
    </div>
  )
}
