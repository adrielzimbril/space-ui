import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Immersive Lens Portfolio',
  description: 'Full-page immersive photography template with Three.js WebGL distortion and GSAP lightbox.',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-hidden bg-white text-black antialiased selection:bg-black selection:text-white">
      {children}
    </div>
  )
}
