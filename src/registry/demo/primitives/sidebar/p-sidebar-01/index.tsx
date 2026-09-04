'use client'

import {
  IconCalendar,
  IconSearch,
  IconSettings,
  IconArrowUp,
  IconLayoutDashboard,
  IconChartBar,
  IconUser,
} from '@tabler/icons-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/primitives/sidebar'
import { Separator } from '@/registry/primitives/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/registry/primitives/breadcrumb'

// Menu items
const items = [
  {
    title: 'Dashboard',
    url: '#',
    icon: IconLayoutDashboard,
    isActive: true,
  },
  {
    title: 'Analytics',
    url: '#',
    icon: IconChartBar,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: IconCalendar,
  },
  {
    title: 'Search',
    url: '#',
    icon: IconSearch,
  },
  {
    title: 'Settings',
    url: '#',
    icon: IconSettings,
  },
]

export default function SidebarDemo() {
  return (
    <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-border/70 bg-background shadow-sm [transform:translate3d(0,0,0)]">
      <SidebarProvider className="min-h-[420px]">
        <Sidebar className="border-r border-border/60">
          <SidebarHeader className="border-b border-border/40 p-4">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold text-xs">
                S
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold leading-none">Space UI</span>
                <span className="text-[10px] text-muted-foreground">Workspace</span>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Application</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={item.isActive}
                        render={
                          <a href={item.url} className="flex items-center gap-2.5">
                            <item.icon className="size-4" />
                            <span>{item.title}</span>
                          </a>
                        }
                      />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/40 p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconUser className="size-4" />
                    <span className="text-xs font-medium">John Doe</span>
                  </div>
                  <IconArrowUp className="size-3.5 text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col bg-muted/20">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border/40 px-4 bg-background">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50 border border-border/40 flex items-center justify-center text-xs text-muted-foreground">
                Card 1
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 border border-border/40 flex items-center justify-center text-xs text-muted-foreground">
                Card 2
              </div>
              <div className="aspect-video rounded-xl bg-muted/50 border border-border/40 flex items-center justify-center text-xs text-muted-foreground">
                Card 3
              </div>
            </div>
            <div className="min-h-[100px] flex-1 rounded-xl bg-muted/50 border border-border/40 p-4 text-xs text-muted-foreground flex items-center justify-center">
              Main content area
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
