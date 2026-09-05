function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = name
  link.href = url
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

async function imageFor(svg: SVGSVGElement | string, size: number) {
  const source = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg)
  const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }))
  const image = new Image()
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = reject
    image.src = url
  })
  URL.revokeObjectURL(url)
  image.width = image.height = size
  return image
}

export async function exportSvgMarkup(svg: SVGSVGElement | string, fileName: string) {
  const source = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg)
  save(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }), `${fileName}.svg`)
}

export async function exportRaster(
  svg: SVGSVGElement | string | null,
  fileName: string,
  format: 'png' | 'webp' = 'png',
  size = 1000,
) {
  if (!svg) return
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  canvas.getContext('2d')!.drawImage(await imageFor(svg, size), 0, 0, size, size)
  canvas.toBlob((blob) => {
    if (blob) save(blob, `${fileName}.${format}`)
  }, `image/${format}`)
}

export { save, imageFor }
