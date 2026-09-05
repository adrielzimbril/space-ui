function save(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = name
  link.href = url
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function svgMarkup(svg: SVGSVGElement | string) {
  let source = typeof svg === 'string' ? svg : new XMLSerializer().serializeToString(svg)
  if (!source.includes('xmlns=')) source = source.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  return source
}

async function imageFor(svg: SVGSVGElement | string, size: number) {
  const image = new Image()
  image.crossOrigin = 'anonymous'
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () => reject(new Error('SVG could not be rasterized'))
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgMarkup(svg))}`
  })
  image.width = image.height = size
  return image
}

export async function exportSvgMarkup(svg: SVGSVGElement | string, fileName: string) {
  save(new Blob([svgMarkup(svg)], { type: 'image/svg+xml;charset=utf-8' }), `${fileName}.svg`)
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
