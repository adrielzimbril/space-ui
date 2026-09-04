'use client'

import { Button } from '@/registry/primitives/button'
import { toastManager } from '@/registry/primitives/toast'

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        onClick={() =>
          toastManager.add({
            title: 'Event created',
            description: 'Your event has been scheduled successfully.',
          })
        }
        variant="outline"
      >
        Default
      </Button>
      <Button
        onClick={() =>
          toastManager.add({
            type: 'success',
            title: 'Profile updated',
            description: 'Your changes have been saved.',
          })
        }
        variant="outline"
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toastManager.add({
            type: 'info',
            title: 'New notification',
            description: 'You have 3 unread messages in your inbox.',
          })
        }
        variant="outline"
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toastManager.add({
            type: 'warning',
            title: 'Storage warning',
            description: 'Your disk space is almost full (90%).',
          })
        }
        variant="outline"
      >
        Warning
      </Button>
      <Button
        onClick={() =>
          toastManager.add({
            type: 'error',
            title: 'Action failed',
            description: 'Could not connect to the remote server.',
          })
        }
        variant="outline"
      >
        Error
      </Button>
    </div>
  )
}
