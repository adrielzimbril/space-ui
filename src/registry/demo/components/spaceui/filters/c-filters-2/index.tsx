'use client'

import { IconAt, IconWorld, IconPhone, IconUser, IconCreditCard, IconLink, IconFilter2 } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { createFilter, Filters, type Filter, type FilterFieldConfig } from '@/registry/components/spaceui/filters'
import { z } from 'zod-v4'

import { Button } from '@/registry/primitives/button'
// Zod validation helper - wraps a Zod schema to return validation result with message
function zodValidator<T extends z.ZodType>(schema: T) {
  return (value: unknown): { valid: boolean; message?: string } => {
    const result = schema.safeParse(value)
    if (result.success) {
      return { valid: true }
    }
    // Get the first error message from Zod using format()
    const formatted = result.error.format()
    const message = formatted._errors?.[0] || result.error.message || 'Invalid value'
    return { valid: false, message }
  }
}

// Define Zod schemas for different field types
const emailSchema = z
  .string()
  .min(1, { message: 'Email is required' })
  .pipe(z.email({ message: 'Please enter a valid email address' }))

const urlSchema = z.string().pipe(z.url({ message: 'Please enter a valid URL (e.g., https://example.com)' }))

const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/, {
  message: 'Please enter a valid phone number',
})

const usernameSchema = z
  .string()
  .min(3, { message: 'Username must be at least 3 characters' })
  .max(20, { message: 'Username must be at most 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })

const creditCardSchema = z.string().regex(/^\d{13,19}$/, {
  message: 'Please enter a valid credit card number (13-19 digits)',
})

export default function Pattern() {
  const fields: FilterFieldConfig[] = [
    {
      key: 'email',
      label: 'Email',
      icon: <IconAt className="size-3.5" />,
      type: 'text',
      placeholder: 'user@example.com',
      // Use Zod validator for email validation
      validation: zodValidator(emailSchema),
    },
    {
      key: 'website',
      label: 'Website',
      icon: <IconWorld className="size-3.5" />,
      type: 'text',
      placeholder: 'https://example.com',
      // Use Zod validator for URL validation
      validation: zodValidator(urlSchema),
    },
    {
      key: 'phone',
      label: 'Phone',
      icon: <IconPhone className="size-3.5" />,
      type: 'text',
      placeholder: '+1234567890',
      // Use Zod validator for phone validation
      validation: zodValidator(phoneSchema),
    },
    {
      key: 'username',
      label: 'Username',
      icon: <IconUser className="size-3.5" />,
      type: 'text',
      className: 'w-44',
      placeholder: 'john_doe',
      // Use Zod validator for username validation
      validation: zodValidator(usernameSchema),
    },
    {
      key: 'cardNumber',
      label: 'Card Number',
      icon: <IconCreditCard className="size-3.5" />,
      type: 'text',
      placeholder: '4111111111111111',
      // Use Zod validator for credit card validation
      validation: zodValidator(creditCardSchema),
    },
    {
      key: 'customUrl',
      label: 'Custom URL',
      icon: <IconLink className="size-3.5" />,
      type: 'text',
      placeholder: 'https://...',
      // Custom validation function without Zod (for comparison)
      validation: (value) => {
        const urlPattern = /^https?:\/\/.+\..+/
        if (!urlPattern.test(value as string)) {
          return {
            valid: false,
            message: 'URL must start with http:// or https://',
          }
        }
        return { valid: true }
      },
    },
  ]

  const [filters, setFilters] = useState<Filter[]>([createFilter('email', 'contains', [''])])

  const handleFiltersChange = useCallback((filters: Filter[]) => {
    setFilters(filters)
  }, [])

  return (
    <div className="flex grow content-start items-start self-start">
      <Filters
        filters={filters}
        fields={fields}
        trigger={
          <Button variant="outline" size="icon">
            <IconFilter2 />
          </Button>
        }
        onChange={handleFiltersChange}
      />
    </div>
  )
}
