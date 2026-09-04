'use client'

import { useRef, useState } from 'react'
import { Button } from '@/registry/primitives/button'
import { Spinner } from '@/registry/primitives/spinner'
import { anchoredToastManager } from '@/registry/primitives/toast'

export default function Particle() {
  const submitRef = useRef<HTMLButtonElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toastIdRef = useRef<string | null>(null)

  function handleSubmit() {
    if (!submitRef.current || isSubmitting) return

    if (toastIdRef.current) {
      anchoredToastManager.close(toastIdRef.current)
      toastIdRef.current = null
    }

    setIsSubmitting(true)

    new Promise<void>((_, reject) => {
      setTimeout(() => {
        setIsSubmitting(false)
        reject(new Error('The server is not responding. Please try again later.'))
      }, 2000)
    }).catch((error: Error) => {
      toastIdRef.current = anchoredToastManager.add({
        description: error.message,
        positionerProps: {
          anchor: submitRef.current,
          sideOffset: 4,
        },
        title: 'Error submitting form',
        type: 'error',
      })
    })
  }

  return (
    <Button disabled={isSubmitting} onClick={handleSubmit} ref={submitRef} variant="outline">
      {isSubmitting ? (
        <>
          <Spinner />
          Submitting…
        </>
      ) : (
        'Submit'
      )}
    </Button>
  )
}
