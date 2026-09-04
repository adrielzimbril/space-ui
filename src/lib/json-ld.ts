export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.spaceui.one/#website',
      url: 'https://www.spaceui.one',
      name: 'Space UI',
      description:
        'Space UI - A modern, high-performance UI kit built with React, TypeScript, Tailwind CSS, Base UI, and Framer Motion.',
      inLanguage: 'en',
      publisher: {
        '@id': 'https://www.spaceui.one/#organization',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.spaceui.one/#organization',
      name: 'Space UI',
      url: 'https://www.spaceui.one',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.spaceui.one/icon-logo.png',
        width: 512,
        height: 512,
      },
    },
  ],
}
