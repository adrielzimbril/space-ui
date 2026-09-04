import type { NextConfig } from 'next'
import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const config: NextConfig = {
  turbopack: {
    root: '../../',
  },
  images: {
    remotePatterns: [
      {
        hostname: 'ui.aceternity.com',
      },
      {
        hostname: 'ui.paceui.com',
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
