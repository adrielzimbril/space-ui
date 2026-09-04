import { DocsLayoutProps } from 'fumadocs-ui/layouts/docs'
import { baseOptions } from '@/app/layout.config'
import { resourcesSource as source } from '@/lib/source'
import XIcon from '@/registry/icons/x-icon'
import { SIDEBAR_TABS } from '@/config/navigation'
import React from 'react'

export const RESOURCES_LAYOUT_PROPS: DocsLayoutProps = {
  tree: source.pageTree,
  sidebar: {
    tabs: SIDEBAR_TABS,
  },
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
