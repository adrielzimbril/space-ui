import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

import fs from 'node:fs'
import path from 'node:path'

const withMDX = createMDX()

const isLocalMonorepo =
  !process.env.VERCEL &&
  fs.existsSync(path.resolve(process.cwd(), '../../pnpm-workspace.yaml'))

const config: NextConfig = {
  ...(isLocalMonorepo
    ? {
        turbopack: {
          root: '../../',
        },
      }
    : {}),
  images: {
    remotePatterns: [
      {
        hostname: 'ui.spaceui.com',
      },
      {
        hostname: 'spaceui.one',
      },
      {
        hostname: 'cdn.spaceui.one',
      },
      {
        hostname: 'img.spaceui.one',
      },
      {
        hostname: 'images.pexels.com',
      },
      {
        hostname: 'ph-files.imgix.net',
      },
      {
        hostname: '30tools.com',
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: false,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    useTypeScriptCli: true,
    turbopackRustReactCompiler: true,
    useOffline: true,
  },
  outputFileTracingIncludes: {
    '/llms.mdx/**': ['./src/content/**/*'],
  },
  async rewrites() {
    return [
      {
        source: '/docs/:path*.mdx',
        destination: '/llms.mdx/docs/:path*',
      },
      {
        source: '/ui-kit/:path*.mdx',
        destination: '/llms.mdx/ui-kit/:path*',
      },
      {
        source: '/resources/:path*.mdx',
        destination: '/llms.mdx/resources/:path*',
      },
      {
        source: '/:path*.mdx',
        destination: '/llms.mdx/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/ui-kit',
        destination: '/ui-kit/components',
        permanent: false,
      },
    ]
  },
}

export default withMDX(config)
