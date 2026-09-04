'use client'

import PaperShader from '@/registry/components/shader/paper-shader'
import { ORIGINAL_FRAGMENT_SHADER } from './shader-source'

export default function CShaderDemo() {
  return (
    <div className="size-full overflow-hidden">
      <PaperShader
        fragmentShader={ORIGINAL_FRAGMENT_SHADER}
        uniforms={{
          u_colorBack: [0.1, 0.1, 0.1, 1],
          u_colorTint: [1, 1, 1, 1],
          u_contour: 0.5,
          u_distortion: 0.1,
          u_softness: 0.05,
          u_repetition: 1.5,
          u_shiftRed: 0.5,
          u_shiftBlue: 0.5,
          u_angle: 0,
          u_isImage: false,
          u_shape: 0,
          u_fit: 0,
          u_scale: 1,
          u_rotation: 0,
          u_offsetX: 0,
          u_offsetY: 0,
          u_originX: 0.5,
          u_originY: 0.5,
          u_worldWidth: 0,
          u_worldHeight: 0,
        }}
        webGlContextAttributes={{ alpha: true, antialias: true }}
        speed={1}
      />
    </div>
  )
}
