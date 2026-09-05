export type VideoAspect = '1:1' | '16:9' | '9:16' | '4:3'
export type VideoExportSize = 512 | 720 | 1080 | 1440 | 2160 | 3160

export function videoDims(aspect: VideoAspect, size: VideoExportSize) {
  if (aspect === '1:1') return { width: size, height: size }
  if (aspect === '16:9') return { width: Math.round((size * 16) / 9), height: size }
  if (aspect === '9:16') return { width: size, height: Math.round((size * 16) / 9) }
  return { width: Math.round((size * 4) / 3), height: size }
}
