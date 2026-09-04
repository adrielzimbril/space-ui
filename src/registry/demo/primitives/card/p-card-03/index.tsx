import { IconLock } from '@tabler/icons-react'
import { Button } from '@/registry/primitives/button'
import { Card, CardDescription, CardFooter, CardHeader, CardPanel, CardTitle } from '@/registry/primitives/card'
import { Field, FieldLabel } from '@/registry/primitives/field'
import { Form } from '@/registry/primitives/form'
import { Input } from '@/registry/primitives/input'

export default function Particle() {
  return (
    <Card className="w-full max-w-xs">
      <CardHeader className="border-b">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Enter email and password to login</CardDescription>
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
      <CardFooter className="border-t">
        <div className="flex gap-1 text-muted-foreground text-xs">
          <IconLock className="size-3 h-lh shrink-0" />
          <p>The information you enter is encrypted and stored securely.</p>
        </div>
      </CardFooter>
    </Card>
  )
}
