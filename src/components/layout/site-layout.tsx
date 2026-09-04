import { GitHubLink } from '@/registry/components/spaceui/github-link'

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans overscroll-none">
      <a
        href="#main-content"
        className="sr-only rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:text-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>

      <main id="main-content" className="relative flex min-h-0 flex-1 flex-col">
        {children}
      </main>
    </div>
  )
}
