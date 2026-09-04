export interface CategoryItem {
  label: string
  image: string
  thumb: string
  colors: readonly string[]
}

export interface GalleryImage {
  url: string
  title: string
  category: string
  location?: string
  camera?: string
}

export type LayoutMode = 'vertical' | 'horizontal'
export type LightboxPhase = 'closed' | 'opening' | 'open' | 'closing'

export const ease = [0.104, 0.204, 0.492, 1] as const

export const glass =
  'bg-black/75 backdrop-blur-[4px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08),inset_1.8px_3px_0_-2px_rgba(255,255,255,.45),inset_-2px_-2px_0_-2px_rgba(255,255,255,.4),inset_-3px_-8px_1px_-6px_rgba(255,255,255,.3),inset_-.3px_-1px_4px_rgba(0,0,0,.09),0_1px_5px_rgba(0,0,0,.08),0_6px_16px_rgba(0,0,0,.12),0_6px_12px_rgba(0,0,0,.12)]'

export const categories: readonly CategoryItem[] = [
  {
    label: 'Work',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=85',
    thumb: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    colors: ['#F3ECF3', '#D9C6DB', '#D694AD', '#AD7092'],
  },
  {
    label: 'Fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2560&q=85',
    thumb: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    colors: ['#DBD1D0', '#282824', '#E9C797', '#D0A975'],
  },
  {
    label: 'Journey',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2560&q=85',
    thumb: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80',
    colors: ['#D7F3FD', '#B4D0E8', '#8DB5D9', '#6B99C5'],
  },
] as const

export const galleryImages = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2560&q=85',
] as const
