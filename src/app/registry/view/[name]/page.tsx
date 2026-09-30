import { RegistryViewClient } from './client'

// Rendered per request inside the preview iframe (it reads the item name and props from the URL),
// never reached through client navigation: opt out of instant-navigation validation.
export const instant = false

export default async function RegistryViewPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>
  searchParams: Promise<{ props?: string }>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return <RegistryViewClient name={resolvedParams?.name || ''} encodedProps={resolvedSearchParams?.props} />
}
