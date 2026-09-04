import { OTPField, OTPFieldInput } from '@/registry/primitives/otp-field'

const OTP_LENGTH = 6

const OTP_SLOT_KEYS = Array.from({ length: OTP_LENGTH }, (_, i) => `otp-slot-${i}`)

export default function Particle() {
  return (
    <OTPField aria-label="One-time password" length={OTP_LENGTH}>
      {OTP_SLOT_KEYS.map((slotKey, index) => (
        <OTPFieldInput key={slotKey} aria-label={index === 0 ? undefined : `Character ${index + 1} of ${OTP_LENGTH}`} />
      ))}
    </OTPField>
  )
}
