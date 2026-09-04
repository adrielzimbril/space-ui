import React from 'react'
import { UiKitLayoutWrapper } from '@/components/layout/ui-kit-layout-wrapper'

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <UiKitLayoutWrapper>{children}</UiKitLayoutWrapper>
}
