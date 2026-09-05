import {
  renderLayout,
  resolveExpression,
  resolveShape,
  SquishEngine,
  type SquishBackgroundStyleChoice,
  type SquishExpressionChoice,
  type SquishLayout,
  type SquishShapeChoice,
} from '@usespaceui/squishmoji'
import { imageFor, save } from './raster'

export interface SequenceStep {
  shape: SquishShapeChoice
  expression: SquishExpressionChoice
  durationSec: number
  backgroundStyle: SquishBackgroundStyleChoice
  seed: string
  blink: boolean
  wobble: boolean
  animate: boolean
}

function adjusted(
  engine: SquishEngine,
  time: number,
  duration: number,
  eyeY: number,
  split: number,
  scale: number,
  gaze: number,
  forceBlink = false,
  timeInStep = 0,
  animate = true,
) {
  const phaseX = animate ? Math.sin((time * Math.PI * 2) / duration) * 0.8 : 0
  const phaseY = animate ? Math.cos((time * Math.PI * 4) / duration) * 0.8 : 0
  const blinkPhase = (time + 1.35) % 4.7
  const autoLid = !animate || blinkPhase > 0.18 ? 1 : Math.max(0.035, Math.abs(blinkPhase / 0.09 - 1))
  let manualLid = 1
  if (forceBlink) {
    const blinkProgress = Math.min(1, Math.max(0, (timeInStep - 0.5) / 0.2))
    manualLid = blinkProgress < 1 ? Math.max(0.035, Math.abs(blinkProgress * 2 - 1)) : 1
  }
  const lid = Math.min(autoLid, manualLid)
  return engine.layout(time, (eyes) =>
    eyes.map((eye, index) => {
      const matrix = [...eye.matrix] as typeof eye.matrix
      const pairCenterX = (eyes[0]!.matrix[4] + eyes[1]!.matrix[4]) / 2
      const pairCenterY = (eyes[0]!.matrix[5] + eyes[1]!.matrix[5]) / 2
      const gazeFactor = 0.35 + gaze * 0.65
      matrix[4] = pairCenterX + (matrix[4] - pairCenterX) * gazeFactor
      matrix[5] = pairCenterY + (matrix[5] - pairCenterY) * gazeFactor
      matrix[4] += phaseX * 16 * gaze + (index === 0 ? -split : split)
      matrix[5] += 10 - phaseY * 13 * gaze + eyeY
      matrix[3] *= lid
      return { ...eye, width: eye.width * scale, height: eye.height * scale, matrix }
    }),
  )
}

async function recordGenerated(
  duration: number,
  fileName: string,
  background: string,
  frameAt: (time: number) => {
    layout: SquishLayout
    backgroundStyle: SquishBackgroundStyleChoice
    seed: string
    wobble: boolean
    animate: boolean
  },
) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1000
  const context = canvas.getContext('2d')!
  const recorder = new MediaRecorder(canvas.captureStream(30), { mimeType: 'video/webm' })
  const chunks: Blob[] = []
  recorder.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data)
  }
  recorder.onstop = () => save(new Blob(chunks, { type: 'video/webm' }), `${fileName}.webm`)
  recorder.start()
  try {
    const frames = Math.ceil(duration * 30)
    const frameDuration = 1000 / 30
    const startedAt = performance.now()
    for (let frame = 0; frame < frames; frame++) {
      const time = frame / 30
      const state = frameAt(time)
      const svg = renderLayout(state.layout, { size: 1000, seed: state.seed, backgroundStyle: state.backgroundStyle })
      const image = await imageFor(svg, 1000)
      if (background === 'transparent') context.clearRect(0, 0, 1000, 1000)
      else {
        context.fillStyle = background
        context.fillRect(0, 0, 1000, 1000)
      }
      context.save()
      if (state.wobble) {
        const dx = Math.sin(time * 1.7) * 3.75
        const dy = Math.cos(time * 1.3) * 3.75
        const angle = (Math.sin(time) * 0.45 * Math.PI) / 180
        context.translate(500 + dx, 500 + dy)
        context.rotate(angle)
        context.translate(-500, -500)
      }
      context.drawImage(image, 0, 0, 1000, 1000)
      context.restore()
      const wait = startedAt + (frame + 1) * frameDuration - performance.now()
      if (wait > 0) await new Promise((resolve) => window.setTimeout(resolve, wait))
    }
  } finally {
    if (recorder.state !== 'inactive') recorder.stop()
  }
}

export async function exportToVideoAuto(
  seed: string,
  shape: SquishShapeChoice,
  expression: SquishExpressionChoice,
  background: string,
  fileName: string,
  duration = 3,
  eyeY = 0,
  split = 0,
  scale = 1,
  gaze = 1,
  backgroundStyle: SquishBackgroundStyleChoice = 'solid',
) {
  const engine = new SquishEngine(seed, { shape, expression })
  await recordGenerated(duration, fileName, background, (time) => ({
    layout: adjusted(engine, time, duration, eyeY, split, scale, gaze, false, 0, true),
    backgroundStyle,
    seed,
    wobble: false,
    animate: true,
  }))
}

export async function exportToVideoSequence(
  steps: SequenceStep[],
  background: string,
  fileName: string,
  eyeY = 0,
  split = 0,
  scale = 1,
  gaze = 1,
) {
  if (!steps.length) return
  const engine = new SquishEngine(steps[0]!.seed, { shape: steps[0]!.shape, expression: steps[0]!.expression })
  let current = 0
  let boundary = steps[0]!.durationSec
  let stepStart = 0
  const total = steps.reduce((sum, step) => sum + step.durationSec, 0)
  await recordGenerated(total, fileName, background, (time) => {
    if (time >= boundary && current < steps.length - 1) {
      current += 1
      stepStart = boundary
      boundary += steps[current]!.durationSec
      engine.name = steps[current]!.seed
      engine.setShape(resolveShape(engine.name, steps[current]!.shape), time)
      engine.setExpression(resolveExpression(engine.name, steps[current]!.expression), time)
    }
    const stepTime = time - stepStart
    const step = steps[current]!
    return {
      layout: adjusted(engine, time, total, eyeY, split, scale, gaze, step.blink, stepTime, step.animate),
      backgroundStyle: step.backgroundStyle,
      seed: step.seed,
      wobble: step.wobble,
      animate: step.animate,
    }
  })
}
