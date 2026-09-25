'use client'

import { LikeButton } from '@/registry/components/button/like-button'

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center">
      <LikeButton initialCount={24} />
    </div>
  )
}
