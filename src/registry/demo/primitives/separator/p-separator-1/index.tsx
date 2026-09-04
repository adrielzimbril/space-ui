import { Separator } from '@/registry/primitives/separator'

export default function Particle() {
  return (
    <div className="max-w-72">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-sm">space ui</h4>
        <p className="text-muted-foreground text-sm">
          Unstyled, accessible primitives for fast product UI and design systems.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex items-center gap-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
        <Separator orientation="vertical" />
        <div>Releases</div>
      </div>
    </div>
  )
}
