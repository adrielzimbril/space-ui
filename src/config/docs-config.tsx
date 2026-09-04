import { DocsLayoutProps } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/app/layout.config'
import { source } from '@/lib/source'
import XIcon from '@/registry/icons/x-icon'
import React from 'react'

export const DOCS_LAYOUT_PROPS: DocsLayoutProps = {
  tree: source.pageTree,
  githubUrl: 'https://github.com/usespaceui/ui',
  ...baseOptions,
  links: [
    ...(baseOptions.links || []),
    {
      icon: <XIcon />,
      url: 'https://x.com/space_ui',
      text: 'X',
      type: 'icon',
    },
  ],
}
