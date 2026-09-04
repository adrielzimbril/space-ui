'use client'

import {
  IconFolderOpen,
  IconFolder,
  IconFileCode,
  IconPalette,
  IconBraces,
  IconFileText,
  IconFile,
} from '@tabler/icons-react'
import { Tree, TreeItem, TreeItemLabel } from '@/registry/components/spaceui/tree'
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core'
import { useTree } from '@headless-tree/react'

interface FileItem {
  name: string
  children?: string[]
  type?: 'folder' | 'ts' | 'tsx' | 'css' | 'json' | 'md' | 'config'
}

const items: Record<string, FileItem> = {
  root: {
    name: 'my-project',
    children: ['src', 'public', 'package-json', 'readme', 'tsconfig'],
  },
  src: {
    name: 'src',
    children: ['app', 'components', 'lib', 'globals-css'],
    type: 'folder',
  },
  app: {
    name: 'app',
    children: ['page-tsx', 'layout-tsx', 'loading-tsx'],
    type: 'folder',
  },
  'page-tsx': { name: 'page.tsx', type: 'tsx' },
  'layout-tsx': { name: 'layout.tsx', type: 'tsx' },
  'loading-tsx': { name: 'loading.tsx', type: 'tsx' },
  components: {
    name: 'components',
    children: ['button-tsx', 'card-tsx', 'dialog-tsx'],
    type: 'folder',
  },
  'button-tsx': { name: 'button.tsx', type: 'tsx' },
  'card-tsx': { name: 'card.tsx', type: 'tsx' },
  'dialog-tsx': { name: 'dialog.tsx', type: 'tsx' },
  lib: { name: 'lib', children: ['utils-ts', 'api-ts'], type: 'folder' },
  'utils-ts': { name: 'utils.ts', type: 'ts' },
  'api-ts': { name: 'api.ts', type: 'ts' },
  'globals-css': { name: 'globals.css', type: 'css' },
  public: { name: 'public', children: ['favicon'], type: 'folder' },
  favicon: { name: 'favicon.ico', type: 'config' },
  'package-json': { name: 'package.json', type: 'json' },
  readme: { name: 'README.md', type: 'md' },
  tsconfig: { name: 'tsconfig.json', type: 'json' },
}

const getFileIcon = (type?: string, isExpanded?: boolean) => {
  if (!type || type === 'folder') {
    return isExpanded ? (
      <IconFolderOpen className="pointer-events-none size-4 text-amber-500" />
    ) : (
      <IconFolder className="pointer-events-none size-4 text-amber-500" />
    )
  }
  if (type === 'tsx' || type === 'ts') {
    return <IconFileCode className="pointer-events-none size-4 text-blue-500" />
  }
  if (type === 'css') {
    return <IconPalette className="pointer-events-none size-4 text-purple-500" />
  }
  if (type === 'json') {
    return <IconBraces className="pointer-events-none size-4 text-yellow-500" />
  }
  if (type === 'md') {
    return <IconFileText className="text-muted-foreground pointer-events-none size-4" />
  }
  return <IconFile className="text-muted-foreground pointer-events-none size-4" />
}

const indent = 20

export default function Pattern() {
  const tree = useTree<FileItem>({
    initialState: {
      expandedItems: ['src', 'app', 'components'],
    },
    indent,
    rootItemId: 'root',
    getItemName: (item) => item.getItemData().name,
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId].children ?? [],
    },
    features: [syncDataLoaderFeature, hotkeysCoreFeature],
  })

  return (
    <div className="mx-auto w-full grow place-self-start lg:w-xs">
      <Tree indent={indent} tree={tree}>
        {tree.getItems().map((item) => (
          <TreeItem key={item.getId()} item={item}>
            <TreeItemLabel className="before:bg-background relative before:absolute before:inset-x-0 before:-inset-y-0.5 before:-z-10">
              <span className="flex items-center gap-2">
                {getFileIcon(item.getItemData().type, item.isExpanded())}
                {item.getItemName()}
              </span>
            </TreeItemLabel>
          </TreeItem>
        ))}
      </Tree>
    </div>
  )
}
