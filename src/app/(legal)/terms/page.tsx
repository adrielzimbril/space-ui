import type { Metadata } from 'next'
import Link from 'next/link'
import { Badge } from '@/registry/components/spaceui/badge-squircle'
import { Button } from '@/registry/components/button/button-squircle'
import { DocsPager } from '@/components/docs/layout/docs-pager'
import { siteConfig } from '@/config/space-config'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms and conditions governing the use of Space UI, our component registry, interactive tools, and community services.',
}

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col gap-8 text-foreground">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <span>/</span>
        <span>Legal</span>
        <span>/</span>
        <span className="font-medium text-foreground">Terms of Service</span>
      </nav>

      {/* Header */}
      <header className="flex flex-col gap-3 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm">Terms of Service</Badge>
          <span className="text-xs text-muted-foreground">v1.0.0</span>
          <span className="text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">Last updated: September 15, 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">Terms of Service</h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          The terms and guidelines governing your access to Space UI, our component registry, interactive previews, and
          community spaces.
        </p>
      </header>

      {/* Main Prose Content */}
      <article className="w-full prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-m-24 prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Space UI</strong> (
            <Link href="https://www.spaceui.one">https://www.spaceui.one</Link>), including our documentation, component
            registry, and interactive Community Wall, you agree to comply with and be bound by these Terms of Service.
            If you do not agree with any part of these terms, please discontinue use of the platform.
          </p>
        </section>

        <hr />

        <section>
          <h2>2. Open Source License (MIT)</h2>
          <p>
            All source code for Space UI components, primitives, blocks, hooks, and utility scripts is published under
            the terms of the permissive <strong>MIT License</strong>:
          </p>
          <blockquote>
            <p>
              Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
              associated documentation files, to deal in the Software without restriction, including without limitation
              the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
              Software, and to permit persons to whom the Software is furnished to do so, subject to the standard
              conditions.
            </p>
          </blockquote>
          <p>
            You are free to use components from Space UI in both <strong>commercial</strong> and{' '}
            <strong>personal</strong> projects without paying license fees or royalties.
          </p>
        </section>

        <hr />

        <section>
          <h2>3. Pro Access, Digital Products &amp; Strict No-Refund Policy</h2>
          <p>
            Space UI offers premium memberships, Lifetime access passes, and individual commercial templates
            (&ldquo;Digital Products&rdquo;) processed securely via our merchant of record and payment partner Polar.
          </p>
          <h3>A. Immediate Digital Delivery</h3>
          <p>
            Upon completing a purchase or activating a subscription, you receive immediate and irrevocable digital
            access to the Space UI Pro registry, source code repositories, CLI tokens, and downloadable assets.
          </p>
          <h3>B. Strict No-Refund Policy</h3>
          <p>
            Due to the non-returnable, intangible, and immediate nature of digital source code, software libraries, and
            downloadable files,{' '}
            <strong>
              all sales, subscription fees, template purchases, and lifetime access payments are strictly final and
              non-refundable
            </strong>
            .
          </p>
          <p>
            By completing a purchase on Space UI, you expressly acknowledge and agree that your statutory right of
            withdrawal or cancellation period is waived once access to the digital content has been initiated or
            granted.
          </p>
          <h3>C. Subscription Cancellations</h3>
          <p>
            If you subscribe to a recurring billing plan (such as Pro Yearly), you may cancel your subscription at any
            time via the customer billing portal. Cancellation prevents subsequent recurring renewals. Your access
            remains active until the end of your prepaid billing period, and no partial or prorated refunds will be
            issued for unused time.
          </p>
        </section>

        <hr />

        <section>
          <h2>4. Platform &amp; Registry Use</h2>
          <p>
            You may browse our documentation, test interactive demos, and fetch registry items using developer tooling
            or our CLI. When using the platform, you agree not to:
          </p>
          <ul>
            <li>Engage in denial-of-service (DoS) attacks or disrupt platform availability for other users.</li>
            <li>Submit abusive automated requests or attempt unauthorized access to infrastructure or user records.</li>
            <li>Distribute malware, phishing links, or exploits through community inputs.</li>
          </ul>
        </section>

        <hr />

        <section>
          <h2>5. Community Wall Guidelines</h2>
          <p>
            The Space UI Community Wall is an open canvas for developers, designers, and creators to share notes,
            feedback, and signatures.
          </p>
          <h3>A. Content Standards</h3>
          <p>All posted content must remain respectful. The following are strictly forbidden:</p>
          <ul>
            <li>Hate speech, discrimination, harassment, threats, or personal defamation.</li>
            <li>Sexually explicit, pornographic, or violent content.</li>
            <li>Commercial spam, cryptocurrency shills, or affiliate link drops.</li>
            <li>Impersonation of others or malicious code payloads.</li>
          </ul>
          <h3>B. License Grant &amp; Moderation</h3>
          <p>
            By submitting a card or note, you grant Space UI a non-exclusive license to display the content on the
            Community Wall. Space UI maintainers reserve the right to moderate, hide, or permanently remove any note
            that violates these standards.
          </p>
        </section>

        <hr />

        <section>
          <h2>6. User Accounts &amp; Authentication</h2>
          <p>
            You may authenticate via third-party OAuth providers (GitHub or Google). You remain responsible for
            maintaining the security of your third-party credentials. You can sign out at any time using the logout
            button.
          </p>
        </section>

        <hr />

        <section>
          <h2>7. Intellectual Property</h2>
          <p>
            While component code is released under the MIT license, the <strong>Space UI</strong> brand name, domain,
            logos, and original illustrations are protected property. You may mention Space UI to describe compatibility
            (such as &ldquo;built with Space UI&rdquo;), but you may not claim official endorsement without prior
            written authorization.
          </p>
        </section>

        <hr />

        <section>
          <h2>8. Disclaimer of Warranties</h2>
          <p>
            Space UI and all associated software and materials are provided strictly on an{' '}
            <strong>&ldquo;AS IS&rdquo;</strong> and <strong>&ldquo;AS AVAILABLE&rdquo;</strong> basis without
            warranties of any kind, whether express or implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <hr />

        <section>
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall Space UI, its maintainers, or
            contributors be liable for any indirect, incidental, special, consequential, or punitive damages arising out
            of your use of or inability to use the website, documentation, or components.
          </p>
        </section>

        <hr />

        <section>
          <h2>10. Modifications to Terms</h2>
          <p>
            We may update these Terms of Service periodically. Continued use of Space UI following updates constitutes
            acceptance of the revised terms.
          </p>
        </section>

        <hr />

        <section>
          <h2>11. Contact &amp; Questions</h2>
          <p>For questions or feedback regarding these terms, reach out to us:</p>
          <div className="not-prose flex flex-wrap gap-3 mt-4">
            <Button size="sm" render={<a href={`mailto:${siteConfig.email}`} />}>
              {siteConfig.email}
            </Button>
            <Button size="sm" render={<Link href="/privacy" />}>
              Privacy Policy
            </Button>
            <Button size="sm" render={<a href={siteConfig.links.github} target="_blank" rel="noreferrer" />}>
              GitHub
            </Button>
          </div>
        </section>
      </article>

      {/* Docs Pager Navigation */}
      <DocsPager prev={{ name: 'Privacy Policy', url: '/privacy' }} />
    </div>
  )
}
