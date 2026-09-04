import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { resourcesSource as source } from '@/lib/source'
import { UiKitLayoutWrapper } from '@/components/layout/ui-kit-layout-wrapper'
import { ResourcesMdx } from '../resources-mdx'

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await props.params
  if (slug[0] === 'avatars') notFound()
  return (
    <UiKitLayoutWrapper>
      <ResourcesMdx slug={slug} />
    </UiKitLayoutWrapper>
  )
}

export async function generateStaticParams() {
  return source.generateParams().filter((params) => params.slug?.[0] && params.slug[0] !== 'avatars')
}

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await props.params
  const page = source.getPage(slug)
  if (!page) notFound()
  const image = ['/docs-og', ...slug, 'image.png'].join('/')
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: 'https://www.spaceui.one',
      siteName: 'Space UI',
      images: image,
      locale: 'en_US',
      type: 'website',
    },
  }
}

export const instant = false
