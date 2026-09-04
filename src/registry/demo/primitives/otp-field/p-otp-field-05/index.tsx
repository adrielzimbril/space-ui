'use client'

import { useEffect, useRef, useState } from 'react'
import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { OTPField, OTPFieldInput } from '@/registry/primitives/otp-field'

const OTP_LENGTH = 6

const OTP_SLOT_KEYS = Array.from({ length: OTP_LENGTH }, (_, i) => `otp-slot-${i}`)

function normalizeTierCode(value: string) {
  return value.replace(/[^0-3]/g, '')
}

export default function Particle() {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const [invalidPulse, setInvalidPulse] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const invalidTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const skipClearOnNextValueChangeRef = useRef(false)

  useEffect(() => {
    return () => {
      if (invalidTimeoutRef.current != null) {
        clearTimeout(invalidTimeoutRef.current)
      }
    }
  }, [])

  function clearInvalidFeedback() {
    if (invalidTimeoutRef.current != null) {
      clearTimeout(invalidTimeoutRef.current)
      invalidTimeoutRef.current = null
    }
    setInvalidPulse(0)
    setStatusMessage('')
  }

  function handleValueChange() {
    if (skipClearOnNextValueChangeRef.current) {
      skipClearOnNextValueChangeRef.current = false
      return
    }
    clearInvalidFeedback()
  }

  function handleValueInvalid(value: string) {
    skipClearOnNextValueChangeRef.current = true
    setInvalidPulse((current) => current + 1)
    setStatusMessage(`Unsupported characters were ignored from ${value}.`)

    if (invalidTimeoutRef.current != null) {
      clearTimeout(invalidTimeoutRef.current)
    }
    invalidTimeoutRef.current = setTimeout(() => {
      invalidTimeoutRef.current = null
      setInvalidPulse(0)
    }, 400)
  }

  const activeInvalidIndex = invalidPulse > 0 ? focusedIndex : -1

  return (
    <Field className="items-center">
      <FieldLabel>Tier code</FieldLabel>
      <OTPField
        inputMode="numeric"
        length={OTP_LENGTH}
        normalizeValue={normalizeTierCode}
        validationType="none"
        onValueChange={handleValueChange}
        onValueInvalid={handleValueInvalid}
      >
        {OTP_SLOT_KEYS.map((slotKey, index) => {
          const showInvalid = activeInvalidIndex === index && invalidPulse > 0

          return (
            <OTPFieldInput
              key={slotKey}
              aria-invalid={showInvalid || undefined}
              aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
              onFocus={() => {
                setFocusedIndex(index)
              }}
            />
          )
        })}
      </OTPField>
      <FieldDescription>Digits 0-3 only.</FieldDescription>
      <span aria-live="polite" className="sr-only">
        {statusMessage}
      </span>
    </Field>
  )
}
