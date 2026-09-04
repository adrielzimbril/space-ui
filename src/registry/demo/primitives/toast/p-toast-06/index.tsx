'use client'

import { Button } from '@/registry/primitives/button'
import { toastManager } from '@/registry/primitives/toast'

const DEDUP_ID = 'space-demo-dedup-toast'

export default function Demo() {
  return (
    <Button
      onClick={() => {
        toastManager.add({
          description: 'Repeated clicks update this toast instead of stacking another.',
          id: DEDUP_ID,
          title: 'Saved',
          type: 'success',
        })
      }}
      variant="outline"
    >
      One Success Toast
    </Button>
  )
}
