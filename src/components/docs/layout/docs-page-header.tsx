import React from 'react'
import { DocsBreadcrumb } from '@/components/docs/layout/breadcrumb'
import { PageActions } from '@/components/docs/layout/page-actions'
import { DocHeaderMetadata } from '@/components/docs/layout/doc-header-metadata'
import { DocsMobileNav, type NavItem } from '@/components/docs/layout/docs-pager'
import type { DocMetadata } from '@/lib/docs-metadata'

export interface DocsPageHeaderProps {
  title: string
  description?: string
  slug?: string[]
  path: string
  url: string
  docMeta: DocMetadata
  lastModified?: number | string | Date
  prevNav?: NavItem
  nextNav?: NavItem
  showMetadata?: boolean
}

export function DocsPageHeader({
  title,
  description,
  slug,
  path,
  url,
  docMeta,
  lastModified,
  prevNav,
  nextNav,
  showMetadata = true,
}: DocsPageHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* <DocsBreadcrumb slug={slug} className="mb-1" /> */}
      <div className="flex items-start justify-between">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>

        {/* Mobile Actions / Quick Nav */}
        <div className="docs-nav fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-2 border-t border-border bg-background px-6 py-4 sm:static sm:z-0 sm:border-t-0 sm:bg-transparent sm:p-0">
          <PageActions path={path} url={url} />
          <DocsMobileNav prev={prevNav} next={nextNav} />
        </div>
      </div>

      {description && <p className="text-muted-foreground">{description}</p>}

      {showMetadata ? (
        <DocHeaderMetadata
          updatedAt={docMeta.updatedAt || (lastModified ? new Date(lastModified).toISOString() : undefined)}
          createdAt={docMeta.createdAt}
          size={docMeta.size}
          dependencies={docMeta.dependencies}
        />
      ) : null}
    </div>
  )
}
