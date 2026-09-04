import { Field, FieldDescription, FieldLabel } from '@/registry/primitives/field'
import { OTPField, OTPFieldInput } from '@/registry/primitives/otp-field'

const OTP_LENGTH = 6

const OTP_SLOT_KEYS = Array.from({ length: OTP_LENGTH }, (_, i) => `otp-slot-${i}`)

export default function Demo() {
  return (
    <Field className="items-center">
      <FieldLabel>Recovery code</FieldLabel>
      <OTPField length={OTP_LENGTH} validationType="alphanumeric">
        {OTP_SLOT_KEYS.map((slotKey, index) => (
          <OTPFieldInput key={slotKey} aria-label={`Character ${index + 1} of ${OTP_LENGTH}`} />
        ))}
      </OTPField>
      <FieldDescription>
        Accept letters and numbers for backup codes such as <code className="font-mono text-foreground">A7C9XZ</code>.
      </FieldDescription>
    </Field>
  )
}
