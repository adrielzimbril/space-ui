export function isLowPowerGpu() {
  if (typeof window === 'undefined') return true
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  const coarse = window.matchMedia('(pointer: coarse)').matches
  const narrow = window.innerWidth < 768
  const cores = navigator.hardwareConcurrency || 8
  return Boolean(connection?.saveData || coarse || narrow || cores <= 6)
}

export function attachGpuGate(canvas: HTMLCanvasElement) {
  const state = { paused: document.hidden, lowPower: isLowPowerGpu() }

  const sync = (visible: boolean) => {
    state.paused = document.hidden || !visible
  }

  const io = new IntersectionObserver(([entry]) => sync(entry.isIntersecting), {
    threshold: 0.08,
    rootMargin: '24px',
  })
  io.observe(canvas)

  const onVis = () => {
    if (document.hidden) state.paused = true
  }
  document.addEventListener('visibilitychange', onVis)

  return {
    state,
    dispose() {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    },
  }
}
