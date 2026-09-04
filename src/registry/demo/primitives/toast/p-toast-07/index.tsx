'use client'

import { Button } from '@/registry/primitives/button'
import { toastManager } from '@/registry/primitives/toast'

const ERROR_TOAST_ID = 'space-demo-error-upsert'

export default function Demo() {
  return (
    <Button
      onClick={() => {
        toastManager.add({
          description: 'Repeated clicks update this toast; errors use a shake animation.',
          id: ERROR_TOAST_ID,
          title: 'Something went wrong',
          type: 'error',
        })
      }}
      variant="outline"
    >
      One Error Toast
    </Button>
  )
}
