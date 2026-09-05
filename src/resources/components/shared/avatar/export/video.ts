import { imageFor, save } from './raster'

let activeRecording: { recorder: MediaRecorder; frame: number; chunks: Blob[] } | null = null

export function startLiveRecording(
  source: SVGSVGElement | (() => SVGSVGElement | null) | null,
  background: string,
  size = 600,
) {
  if (!source || activeRecording) return false
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const context = canvas.getContext('2d')!
  const recorder = new MediaRecorder(canvas.captureStream(30), { mimeType: 'video/webm' })
  const chunks: Blob[] = []
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data)
  }
  recorder.start()
  const session = { recorder, frame: 0, chunks }
  activeRecording = session
  const draw = async () => {
    if (activeRecording !== session) return
    try {
      const svg = typeof source === 'function' ? source() : source
      if (svg) {
        const image = await imageFor(svg, size)
        if (activeRecording !== session) return
        if (background === 'transparent') context.clearRect(0, 0, size, size)
        else {
          context.fillStyle = background
          context.fillRect(0, 0, size, size)
        }
        context.drawImage(image, 0, 0, size, size)
      }
    } finally {
      if (activeRecording === session) session.frame = window.requestAnimationFrame(draw)
    }
  }
  session.frame = window.requestAnimationFrame(draw)
  return true
}

export function stopLiveRecording(fileName: string) {
  if (!activeRecording) return
  const session = activeRecording
  activeRecording = null
  window.cancelAnimationFrame(session.frame)
  session.recorder.onstop = () => save(new Blob(session.chunks, { type: 'video/webm' }), `${fileName}.webm`)
  session.recorder.stop()
}

export function isLiveRecording() {
  return Boolean(activeRecording)
}
