import localFont from 'next/font/local'
import {
  Inter,
  Roboto,
  Open_Sans,
  Manrope,
  Geist,
  Rubik,
  DM_Sans,
  Lato,
  Raleway,
  Work_Sans,
  IBM_Plex_Sans,
  Figtree,
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Libre_Baskerville,
  Crimson_Pro,
} from 'next/font/google'

export const OpenRunde = localFont({
  src: [
    {
      path: './font-open-runde/open-runde-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font-open-runde/open-runde-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './font-open-runde/open-runde-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './font-open-runde/open-runde-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-open-runde',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
})

export const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
})

export const fontOpenSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const fontManrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const fontGeist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

export const fontRubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

export const fontDMSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const fontLato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const fontRaleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
})

export const fontWorkSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const fontIBMPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
})

export const fontFigtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
})

export const fontBricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

export const fontHanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  display: 'swap',
})

export const fontLibreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  display: 'swap',
})

export const fontCrimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
})
