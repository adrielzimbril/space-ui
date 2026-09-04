import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sign in',
  description: 'Sign in to your Space UI account.',
}

export default function LoginPage() {
  return (
    <main className="relative grid min-h-[calc(100svh-4rem)] place-items-center overflow-hidden bg-muted/25 px-4 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,oklch(0.54_0.25_293/.12),transparent_38%)]" />
      <div className="relative w-full max-w-sm">
        <div className="bg-background p-6 rounded-xl border">Login Card Placeholder</div>
        <p className="mt-5 text-center text-sm text-muted-foreground">
          New to Space UI?{' '}
          <Link href="/signup" className="font-medium text-foreground underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}
