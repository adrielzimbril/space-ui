import Link from 'next/link'
import { Button } from '@/registry/primitives/button'
import { Card, CardAction, CardHeader, CardPanel, CardTitle } from '@/registry/primitives/card'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardAction>
          <Link className="text-muted-foreground text-sm leading-4.5 hover:underline" href="#">
            Sign up
          </Link>
        </CardAction>
      </CardHeader>
      <CardPanel>
        <Form className="flex w-full flex-col gap-4">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input placeholder="Enter your email" type="email" />
          </Field>
          <Field>
            <FieldLabel>Password</FieldLabel>
            <Input placeholder="Enter your password" type="password" />
          </Field>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </Form>
      </CardPanel>
    </Card>
  )
}
