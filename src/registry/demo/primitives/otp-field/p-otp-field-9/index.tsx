import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { OTPField, OTPFieldInput } from '@/registry/primitives/otp-field'

const OTP_LENGTH = 6

const OTP_SLOT_KEYS = Array.from({ length: OTP_LENGTH }, (_, i) => `otp-slot-${i}`)

export default function Particle() {
  return (
    <Field className="items-center">
      <FieldLabel>Access code</FieldLabel>
      <OTPField length={OTP_LENGTH} mask>
        {OTP_SLOT_KEYS.map((slotKey, index) => (
          <OTPFieldInput key={slotKey} aria-label={`Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <FieldDescription>
        Use <code className="font-mono text-foreground">mask</code> to obscure the code on shared screens.
      </FieldDescription>
    </Field>
  )
}
