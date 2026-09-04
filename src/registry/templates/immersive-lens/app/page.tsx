import type { Metadata } from 'next'
import { ClientPage } from '../components/client-page'

export const metadata: Metadata = {
  title: 'Immersive Lens Portfolio',
  description: 'Full-page immersive photography template with Three.js WebGL distortion and GSAP lightbox.',
}

export default function Page() {
  return <ClientPage />
}
