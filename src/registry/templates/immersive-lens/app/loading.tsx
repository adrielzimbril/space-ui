export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white text-neutral-900">
      <div className="flex flex-col items-center gap-3">
        <div className="text-xl font-medium tracking-tight">Immersive Lens</div>
        <div className="text-xs uppercase tracking-[0.25em] text-neutral-400">Loading WebGL Scene</div>
      </div>
    </div>
  )
}
