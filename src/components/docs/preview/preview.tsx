'use client'

import registryMeta from '@/__registry__/client-meta.json'
import { getRegistryComponentGroup } from '@/__registry__/components'
import { index } from '@/__registry__/index'
import { usePreviewTheme } from '@/components/docs/preview/hooks/use-preview-theme'
import { useRegistryEntry } from '@/components/docs/preview/hooks/use-registry-entry'
import { type Binds, Tweakpane } from '@/components/docs/preview/tweakpane'
import { prettify } from '@/components/providers/favorites-provider'
import { FavoriteButton } from '@/components/shared/favorite-button'
import { useLayoutMode } from '@/components/providers/layout-mode-provider'
import { useProAccess } from '@/components/providers/pro-access-provider'
import { bloomSound } from '@/components/providers/sound-provider'
import { PreviewLoading } from '@/components/shared/preview-loading'
import { getEffectiveContained } from '@/config/preview-config'
import {
  trackBlockViewed,
  trackComponentCodeCopied,
  trackComponentPreviewInteracted,
  trackComponentTabSwitched,
  trackComponentViewed,
  trackPaywallHit,
  trackTemplatePreviewOpened,
  trackTemplateViewed,
} from '@/lib/analytics/posthog'
import { formatCodeForDisplay } from '@/lib/install-command'
import { CopyButton } from '@/registry/components/spaceui/copy'
import { LiquidBorder } from '@/registry/components/spaceui/liquid-metal-border'
import { ModeSwitcher } from '@/registry/components/spaceui/mode-switcher'
import { useIsMobile } from '@/registry/hooks/browser/use-media-query'
import { cn } from '@/registry/lib/utils'
import { Button } from '@/registry/primitives/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/primitives/tabs'
import {
  IconAdjustmentsHorizontal,
  IconExternalLink,
  IconLock,
  IconMaximize,
  IconRotateClockwise,
} from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { PreviewContent } from './preview-content'
import { ShowcaseCard } from './showcase-card'
import { ProSplitPlaceholder } from './pro-split-placeholder'
const ShikiRenderer = dynamic(() => import('@/components/docs/code/shiki-renderer').then((m) => m.ShikiRenderer), {
  loading: () => <PreviewLoading className="h-48" />,
})

export interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string
  iframe?: boolean
  bigScreen?: boolean
  title?: string
  description?: string
  variant?: 'default' | 'showcase' | 'card'
  restart?: boolean
  open?: boolean
  allowCopy?: boolean
  contained?: boolean
  container?: boolean
  isPro?: boolean
  align?: 'start' | 'center' | 'end'
  previewClassName?: string
}

function flattenFirstLevel(input?: Record<string, Record<string, unknown>> | null): Record<string, unknown> {
  if (!input) return {}

  return Object.values(input).reduce<Record<string, unknown>>((acc, current) => {
    return { ...acc, ...current }
  }, {})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function unwrapValues(obj: Record<string, any>): Record<string, any> {
  if (obj !== null && typeof obj === 'object' && !Array.isArray(obj)) {
    if ('value' in obj) {
      return obj.value
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result: Record<string, any> = {}
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        result[key] = unwrapValues(obj[key])
      }
    }
    return result
  }
  return obj
}

export function ComponentPreview({
  name,
  className,
  previewClassName,
  align,
  iframe,
  bigScreen = false,
  title,
  description,
  variant = 'default',
  restart = false,
  open,
  allowCopy = true,
  contained,
  container,
  children,
  ...props
}: ComponentPreviewProps) {
  const componentGroup = getRegistryComponentGroup(name)
  const isBlock = name.includes('block') || Boolean(componentGroup?.includes('block'))
  const isShader = name.includes('shader') || Boolean(componentGroup?.includes('shader'))
  const useIframe = iframe !== undefined ? iframe : isBlock
  const Component = index[name]?.component

  const rawContained = contained !== undefined ? contained : container
  const effectiveContained = getEffectiveContained(contained, container, name, componentGroup)
  const effectiveOpen = open ?? !effectiveContained

  if (variant === 'showcase' || variant === 'card') {
    return (
      <ShowcaseCard
        name={name}
        description={description}
        title={title}
        iframe={useIframe}
        restart={restart}
        open={effectiveOpen}
        allowCopy={allowCopy}
        contained={effectiveContained}
        className={className}
        align={align}
        previewClassName={previewClassName}
        {...props}
      >
        {children}
      </ShowcaseCard>
    )
  }

  const { isSplit, setActivePreview, activePreview, registerDefaultPreview, activeTweakName, setActiveTweakName } =
    useLayoutMode()
  const isSelected = activePreview?.name === name

  const isMobile = useIsMobile()
  const [binds, setBinds] = useState<Binds | null>(null)
  const [componentProps, setComponentProps] = useState<Record<string, unknown> | null>(null)
  const hasAutoOpenedRef = useRef(false)
  useEffect(() => {
    if (!isSplit && isSelected && !hasAutoOpenedRef.current && !isMobile && binds && activeTweakName === null) {
      hasAutoOpenedRef.current = true
      setActiveTweakName(name)
    }
  }, [isSplit, isSelected, isMobile, binds, activeTweakName, name, setActiveTweakName])

  useEffect(() => {
    if (isSplit && activeTweakName === name) {
      setActiveTweakName(null)
    }
  }, [isSplit, activeTweakName, name, setActiveTweakName])

  const [key, setKey] = useState(0)
  const { themeOverride, setThemeOverride } = usePreviewTheme(name)
  const { entry, error: registryError } = useRegistryEntry(name)
  const pathname = usePathname()
  const cleanGroup = componentGroup?.replace(/^demo-/, '')
  const derivedSlug = name.replace(/^(demo-)?(c|b|p)-/, '').replace(/-\d+$/, '')
  const pageSlug = pathname ? pathname.split('/').filter(Boolean).pop() : undefined
  const metaRecord = registryMeta as Record<string, any>

  const isPro = Boolean(
    props.isPro ||
    (Component as any)?.isPro ||
    entry?.isPro ||
    entry?.meta?.isPro ||
    metaRecord[name]?.isPro === true ||
    metaRecord[name]?.meta?.isPro === true ||
    (cleanGroup && metaRecord[cleanGroup]?.isPro === true) ||
    (derivedSlug &&
      (metaRecord[derivedSlug]?.isPro === true ||
        metaRecord[`components-spaceui-${derivedSlug}`]?.isPro === true ||
        metaRecord[`blocks-${derivedSlug}`]?.isPro === true ||
        metaRecord[`components-shader-${derivedSlug}`]?.isPro === true)) ||
    (pageSlug &&
      (metaRecord[pageSlug]?.isPro === true ||
        metaRecord[`components-spaceui-${pageSlug}`]?.isPro === true ||
        metaRecord[`blocks-${pageSlug}`]?.isPro === true ||
        metaRecord[`components-shader-${pageSlug}`]?.isPro === true)) ||
    (entry?.registryDependencies as string[] | undefined)?.some((dep) => {
      const depName = dep.replace(/.*\/([^/]+)\.json$/, '$1')
      return metaRecord[depName]?.isPro === true
    }),
  )

  const hasProAccess = useProAccess()
  const isLocked = isPro && !hasProAccess

  const previewName = useMemo(() => {
    const flattenedProps = flattenFirstLevel(componentProps as Record<string, Record<string, unknown>> | null)
    const serializedProps = Object.keys(flattenedProps).length
      ? `?props=${encodeURIComponent(JSON.stringify(flattenedProps))}`
      : ''

    return `${name}${serializedProps}`
  }, [componentGroup, componentProps, name])

  const code = useMemo(() => {
    return formatCodeForDisplay(entry?.files?.[0]?.content) || null
  }, [entry])

  useEffect(() => {
    const demoProps = (Component as any)?.demoProps ?? entry?.meta?.demoProps ?? {}

    setBinds(Object.keys(demoProps).length > 0 ? (demoProps as Binds) : null)
    setComponentProps(Object.keys(demoProps).length > 0 ? unwrapValues(demoProps) : null)
  }, [entry, Component])

  useEffect(() => {
    if (!binds) return
    const unwrapped = unwrapValues(binds)
    setComponentProps(unwrapped)
    setActivePreview((current: any) => {
      if (current && current.name === name) {
        return {
          ...current,
          binds,
          componentProps: unwrapped,
          previewName,
        }
      }
      return current
    })
  }, [binds, name, previewName, setActivePreview])

  const isEffectivelySelected = activePreview ? activePreview.name === name : isSplit
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const containerRef = useRef<HTMLDivElement>(null)
  const tabEnterTimeRef = useRef<number>(Date.now())

  // Viewport visibility & duration tracking
  useEffect(() => {
    const el = containerRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return

    let enterTime: number | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            enterTime = Date.now()
          } else if (enterTime) {
            const duration = Date.now() - enterTime
            if (duration >= 500) {
              if (isBlock) {
                trackBlockViewed({
                  block_name: name,
                  block_category: cleanGroup || 'block',
                  is_pro: isPro,
                })
              } else if (name.startsWith('template-')) {
                trackTemplateViewed({
                  template_name: name,
                  template_category: cleanGroup || 'template',
                  is_pro: isPro,
                  time_on_page_ms: duration,
                })
              } else {
                trackComponentViewed({
                  component_name: name,
                  is_pro: isPro,
                  view_duration_ms: duration,
                  source_page: pathname || '',
                })
              }
            }
            enterTime = null
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => {
      if (enterTime) {
        const duration = Date.now() - enterTime
        if (duration >= 500) {
          trackComponentViewed({
            component_name: name,
            is_pro: isPro,
            view_duration_ms: duration,
            source_page: pathname || '',
          })
        }
      }
      observer.disconnect()
    }
  }, [name, isPro, isBlock, cleanGroup, pathname])

  const handleTabChange = (nextTab: 'preview' | 'code') => {
    if (nextTab !== tab) {
      const timeBeforeSwitch = Date.now() - tabEnterTimeRef.current
      trackComponentTabSwitched({
        component_name: name,
        from_tab: tab,
        to_tab: nextTab,
        is_pro: isPro,
        time_before_switch_ms: timeBeforeSwitch,
      })
      tabEnterTimeRef.current = Date.now()
      setTab(nextTab)
    }
  }

  useEffect(() => {
    if (!isSplit) {
      setTab('preview')
    }
  }, [isSplit])

  const effectiveRestart = restart || Boolean(binds)

  const handleReset = () => {
    trackComponentPreviewInteracted({
      component_name: name,
      interaction_type: 'reset',
      is_pro: isPro,
    })
    setKey((prev) => prev + 1)
    const demoProps = (Component as any)?.demoProps ?? entry?.meta?.demoProps ?? {}
    if (Object.keys(demoProps).length > 0) {
      setBinds(demoProps as Binds)
      setComponentProps(unwrapValues(demoProps))
    }
  }

  const handleActivate = React.useCallback(() => {
    if (activePreview?.name !== name) {
      setActivePreview({
        name,
        title: title ?? name,
        component: Component,
        componentProps,
        useIframe,
        previewName,
        code,
        binds,
        themeOverride,
        restart: effectiveRestart,
        open: effectiveOpen,
        contained: effectiveContained,
        componentGroup,
        bigScreen,
        align,
        previewClassName,
      })
    }
  }, [
    activePreview?.name,
    name,
    title,
    Component,
    componentProps,
    useIframe,
    previewName,
    code,
    binds,
    themeOverride,
    effectiveRestart,
    effectiveOpen,
    effectiveContained,
    componentGroup,
    bigScreen,
    align,
    previewClassName,
    setActivePreview,
  ])

  useEffect(() => {
    if (!activePreview && (Component || useIframe)) {
      registerDefaultPreview({
        name,
        title: title ?? name,
        component: Component,
        componentProps,
        useIframe,
        previewName,
        code,
        binds,
        themeOverride,
        restart: effectiveRestart,
        open: effectiveOpen,
        contained: effectiveContained,
        componentGroup,
        bigScreen,
        align,
        previewClassName,
      })
    }
  }, [
    activePreview,
    name,
    title,
    Component,
    componentProps,
    useIframe,
    previewName,
    code,
    binds,
    themeOverride,
    effectiveRestart,
    effectiveOpen,
    effectiveContained,
    componentGroup,
    bigScreen,
    align,
    previewClassName,
    registerDefaultPreview,
  ])

  const showToolbar = (effectiveRestart || effectiveOpen || Boolean(binds)) && !(isSplit && isEffectivelySelected)

  return (
    <div
      ref={containerRef}
      className={cn('rounded-2xl [corner-shape:superellipse(1.25)] bg-muted w-full p-2 mt-5.5 not-prose', className)}
      {...props}
    >
      <Tabs value={tab} onValueChange={(v) => handleTabChange(v as 'preview' | 'code')} className="gap-0">
        <div className="flex flex-wrap items-center justify-between gap-3 px-3 pb-1 pt-1">
          <div className="flex items-center gap-2">
            {!isLocked && (
              <TabsList
                className={cn(
                  'flex items-center rounded-lg bg-background p-1 font-medium relative z-0',
                  !title && 'ml-auto',
                )}
                aria-label="Preview and Code"
              >
                <TabsTrigger
                  value="preview"
                  onClick={() => {
                    bloomSound()
                    handleTabChange('preview')
                  }}
                  className="relative z-10 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground outline-none cursor-pointer transition-all duration-300 data-active:bg-muted"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  onClick={() => {
                    bloomSound()
                    handleTabChange('code')
                  }}
                  className="relative z-10 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground data-active:text-foreground outline-none cursor-pointer transition-all duration-300 data-active:bg-muted"
                >
                  Code
                </TabsTrigger>
              </TabsList>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <FavoriteButton
              slug={name}
              title={title ?? prettify(name)}
              size="icon-lg"
              variant="ghost"
              className="bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300 active:scale-[0.96]"
            />
            {isSplit && !isEffectivelySelected && (
              <Button
                size="icon-lg"
                variant="ghost"
                onClick={() => {
                  bloomSound()
                  setActivePreview({
                    name,
                    title: title ?? name,
                    component: Component,
                    componentProps,
                    useIframe,
                    previewName,
                    code,
                    binds,
                    themeOverride,
                    restart,
                    open,
                    contained: effectiveContained,
                    componentGroup,
                    bigScreen,
                  })
                }}
                className="bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300 active:scale-[0.96]"
                title="Show on Canvas Stage"
              >
                <IconMaximize className="size-3.5" />
              </Button>
            )}
            {!(isSplit && isEffectivelySelected) && (
              <ModeSwitcher
                variant="ghost"
                size="icon-lg"
                value={themeOverride}
                onValueChange={setThemeOverride}
                className="bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300 active:scale-[0.96]"
                iconSize="size-3.5"
                enableTransition={false}
              />
            )}
            {allowCopy &&
              (!isLocked && code ? (
                <CopyButton
                  content={code}
                  variant="ghost"
                  size="lg"
                  onCopiedChange={(copied) => {
                    if (copied) {
                      trackComponentCodeCopied({
                        component_name: name,
                        component_category: cleanGroup || 'component',
                        tab: tab,
                        is_pro: isPro,
                        copy_type: 'full_code',
                      })
                    }
                  }}
                  className="rounded-md bg-background hover:bg-background text-muted-foreground hover:text-foreground cursor-pointer shrink-0 transition-all duration-300 active:scale-[0.96]"
                />
              ) : isLocked ? (
                <LiquidBorder
                  preset="chrome"
                  className="inline-flex size-10 sm:size-9 [corner-shape:superellipse(1.25)] rounded-lg p-0.625 shrink-0"
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => {
                      bloomSound()
                      trackPaywallHit({
                        component_name: name,
                        component_category: cleanGroup || 'component',
                        is_pro: true,
                        trigger: 'copy_button',
                        user_plan: hasProAccess ? 'pro' : 'free',
                      })
                      window.location.href = '/pricing'
                    }}
                    className="bg-background! squircle rounded-md cursor-pointer text-muted-foreground hover:text-foreground"
                    title="Pro component — View plans to unlock"
                    aria-label="Pro component — View plans to unlock"
                  >
                    <IconLock className="size-3.5" />
                  </Button>
                </LiquidBorder>
              ) : null)}
          </div>
        </div>

        <TabsContent
          value="preview"
          className="rounded-[0.875rem] bg-background outline-none mt-2 relative overflow-hidden"
        >
          <div className="flex items-center justify-center flex-col md:flex-row min-h-105 max-h-162 relative">
            <div className="relative size-full flex-1 min-w-0 h-[stretch] flex items-center justify-center">
              {/* Floating controls in top-right only if enabled via props */}
              {showToolbar && (
                <div className="pointer-events-auto absolute right-4 top-4 z-30 flex select-none items-center justify-center gap-1 rounded-xl bg-muted p-1.5">
                  {/* Restart / Reset component animation */}
                  {effectiveRestart && (
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={handleReset}
                      className="rounded-sm text-muted-foreground hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                      title={binds ? 'Reset demo & controls' : 'Restart component'}
                      aria-label="Restart component"
                    >
                      <IconRotateClockwise className="size-3.5" />
                    </Button>
                  )}

                  {effectiveOpen && (
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={() => {
                        trackTemplatePreviewOpened({
                          template_name: name,
                          from_page: pathname || '',
                        })
                        window.open(`/registry/view/${previewName}`, '_blank')
                      }}
                      className="rounded-sm text-muted-foreground hover:bg-background hover:text-foreground transition-colors cursor-pointer"
                      title="Open in new window"
                      aria-label="Open in new window"
                    >
                      <IconExternalLink className="size-3.5" />
                    </Button>
                  )}

                  {!isSplit && binds && (
                    <Button
                      size="icon-xs"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        trackComponentPreviewInteracted({
                          component_name: name,
                          interaction_type: 'tweak',
                          is_pro: isPro,
                        })
                        handleActivate()
                        setActiveTweakName((prev) => (prev === name ? null : name))
                      }}
                      className={cn(
                        'rounded-sm text-muted-foreground hover:bg-background hover:text-foreground transition-colors cursor-pointer',
                        activeTweakName === name && 'bg-background text-muted-foreground',
                      )}
                      title="Configure props"
                      aria-label="Toggle tweakpane"
                    >
                      <IconAdjustmentsHorizontal className="size-3.5" />
                    </Button>
                  )}
                </div>
              )}

              {/* Component Rendering */}
              {isSplit && isEffectivelySelected ? (
                <ProSplitPlaceholder />
              ) : (
                <PreviewContent
                  name={name}
                  previewName={previewName}
                  componentGroup={componentGroup}
                  Component={Component}
                  componentProps={componentProps}
                  children={children}
                  useIframe={useIframe}
                  bigScreen={bigScreen}
                  contained={effectiveContained}
                  themeOverride={themeOverride}
                  registryError={Boolean(registryError)}
                  reloadKey={key}
                  align={align}
                  previewClassName={previewClassName ?? (className?.includes('items-') ? className : undefined)}
                />
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="rounded-[0.875rem] bg-background py-1.5 overflow-hidden outline-none mt-2">
          <ShikiRenderer code={code ?? ''} lang="tsx" className="max-h-126" />
        </TabsContent>
      </Tabs>

      {!isSplit && binds && activeTweakName === name ? (
        <Tweakpane binds={binds} onBindsChange={setBinds} show onClose={() => setActiveTweakName(null)} />
      ) : null}
    </div>
  )
}
