'use client'

import { Tree, TreeItem, TreeItemLabel } from '@/registry/components/spaceui/tree'
import { hotkeysCoreFeature, syncDataLoaderFeature } from '@headless-tree/core'
import { useTree } from '@headless-tree/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'

interface OrgItem {
  name: string
  role?: string
  avatar?: string
  children?: string[]
}

const items: Record<string, OrgItem> = {
  company: { name: 'Acme Inc.', children: ['ceo'] },
  ceo: {
    name: 'Sarah Chen',
    role: 'CEO',
    avatar: 'https://avatars.spaceui.one/v1?name=orion&variant=titan',
    children: ['cto', 'coo', 'cfo'],
  },
  cto: {
    name: 'Alex Johnson',
    role: 'CTO',
    avatar: 'https://avatars.spaceui.one/v1?name=lyra&variant=glass',
    children: ['eng-lead', 'design-lead'],
  },
  coo: {
    name: 'Emma Wilson',
    role: 'COO',
    avatar: 'https://avatars.spaceui.one/v1?name=vega&variant=pebble',
    children: ['ops-mgr', 'hr-mgr'],
  },
  cfo: {
    name: 'David Kim',
    role: 'CFO',
    avatar: 'https://avatars.spaceui.one/v1?name=sirius&variant=invader',
    children: ['finance-mgr'],
  },
  'eng-lead': {
    name: 'Michael Rodriguez',
    role: 'Engineering Lead',
    avatar: 'https://avatars.spaceui.one/v1?name=nova&variant=kendo',
    children: ['dev-1', 'dev-2'],
  },
  'design-lead': {
    name: 'Lisa Park',
    role: 'Design Lead',
    avatar: 'https://avatars.spaceui.one/v1?name=pulsar&variant=lumina',
  },
  'ops-mgr': {
    name: 'James Brown',
    role: 'Operations Manager',
    avatar: 'https://avatars.spaceui.one/v1?name=quasar&variant=shaula',
  },
  'hr-mgr': {
    name: 'Amy Taylor',
    role: 'HR Manager',
    avatar: 'https://avatars.spaceui.one/v1?name=comet&variant=singularity',
  },
  'finance-mgr': {
    name: 'Robert Davis',
    role: 'Finance Manager',
    avatar: 'https://avatars.spaceui.one/v1?name=apollo&variant=triton',
  },
  'dev-1': {
    name: 'Tom Harris',
    role: 'Senior Developer',
    avatar: 'https://avatars.spaceui.one/v1?name=gemini&variant=solar-flare',
  },
  'dev-2': {
    name: 'Nina Patel',
    role: 'Developer',
    avatar: 'https://avatars.spaceui.one/v1?name=luna&variant=titan',
  },
}

const indent = 24

export default function Demo() {
  const tree = useTree<OrgItem>({
    initialState: {
      expandedItems: ['ceo', 'cto'],
    },
    indent,
    rootItemId: 'company',
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
        {tree.getItems().map((item) => {
          const data = item.getItemData()
          const initials = data.name
            .split(' ')
            .map((n) => n[0])
            .join('')

          return (
            <TreeItem key={item.getId()} item={item}>
              <TreeItemLabel className="gap-2 py-1">
                <Avatar className="size-6 shrink-0">
                  <AvatarImage src={data.avatar} alt={data.name} />
                  <AvatarFallback className="text-[9px]">{initials}</AvatarFallback>
                </Avatar>
                <span className="flex flex-col items-start">
                  <span className="text-sm leading-tight">{data.name}</span>
                  {data.role && <span className="text-muted-foreground text-[10px] leading-tight">{data.role}</span>}
                </span>
              </TreeItemLabel>
            </TreeItem>
          )
        })}
      </Tree>
    </div>
  )
}
