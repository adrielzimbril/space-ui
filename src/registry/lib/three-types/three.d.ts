declare module 'three' {
  export const SRGBColorSpace: any
  export const LinearSRGBColorSpace: any
  export const NoColorSpace: any
  export const ClampToEdgeWrapping: any
  export const LinearMipmapLinearFilter: any
  export const LinearFilter: any
  export const NearestFilter: any
  export const FloatType: any
  export const HalfFloatType: any
  export const RGBAFormat: any
  export const ColorManagement: any
  export const MathUtils: {
    clamp(value: number, min: number, max: number): number
    [key: string]: any
  }
  export class Color {
    constructor(color?: any)
    r: number
    g: number
    b: number
    set(color: any): this
  }
  export class WebGLRenderer {
    constructor(parameters?: any)
    sortObjects: boolean
    autoClear: boolean
    outputColorSpace: any
    domElement: HTMLCanvasElement
    setClearColor(color: any, alpha?: number): void
    setPixelRatio(dpr: number): void
    setSize(width: number, height: number, updateStyle?: boolean): void
    render(scene: any, camera: any): void
    setRenderTarget(target: any): void
    clear(color?: boolean, depth?: boolean, stencil?: boolean): void
    dispose(): void
    forceContextLoss(): void
    [key: string]: any
  }
  export class WebGLRenderTarget {
    constructor(width: number, height: number, options?: any)
    texture: any
    setSize(width: number, height: number): void
    dispose(): void
  }
  export class Scene {
    add(object: any): void
    remove(object: any): void
    children: any[]
  }
  export class PerspectiveCamera {
    constructor(fov?: number, aspect?: number, near?: number, far?: number)
    aspect: number
    position: any
    lookAt(x: any, y?: any, z?: any): void
    updateProjectionMatrix(): void
  }
  export interface IUniform<T = any> {
    value: T
  }
  export class OrthographicCamera {
    constructor(left: number, right: number, top: number, bottom: number, near?: number, far?: number)
    left: number
    right: number
    top: number
    bottom: number
    position: any
    updateProjectionMatrix(): void
  }
  export class TextureLoader {
    setCrossOrigin(value: string): this
    load(url: string, onLoad?: (texture: any) => void, onProgress?: any, onError?: any): any
  }
  export class PlaneGeometry {
    constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number)
    dispose(): void
  }
  export class ShaderMaterial {
    constructor(parameters?: any)
    uniforms: any
    dispose(): void
  }
  export class Euler {
    constructor(x?: number, y?: number, z?: number, order?: string)
    x: number
    y: number
    z: number
    order: string
    set(x: number, y: number, z: number, order?: string): this
  }
  export class Mesh<G = any, M = any> {
    constructor(geometry?: G, material?: M)
    frustumCulled: boolean
    position: any
    scale: any
    rotation: any
    visible: boolean
    geometry: G
    material: M;
    [key: string]: any
  }
  export class Vector2 {
    constructor(x?: number, y?: number)
    x: number
    y: number
    set(x: number, y: number): this
    copy(v: any): this
    lerp(v: any, alpha: number): this
    subVectors(a: any, b: any): this
  }
  export class Vector3 {
    constructor(x?: number, y?: number, z?: number)
    x: number
    y: number
    z: number
    set(x: number, y: number, z: number): this
  }
  export class Vector4 {
    constructor(x?: number, y?: number, z?: number, w?: number)
    x: number
    y: number
    z: number
    w: number
    set(x: number, y: number, z: number, w: number): this
  }
  export class Texture {
    constructor(
      image?: any,
      mapping?: any,
      wrapS?: any,
      wrapT?: any,
      magFilter?: any,
      minFilter?: any,
      format?: any,
      type?: any,
      anisotropy?: any,
    )
    image: any
    colorSpace: any
    wrapS: any
    wrapT: any
    minFilter: any
    magFilter: any
    generateMipmaps: boolean
    needsUpdate: boolean
    dispose(): void
  }
  export class DataTexture extends Texture {
    constructor(
      data?: any,
      width?: number,
      height?: number,
      format?: any,
      type?: any,
      mapping?: any,
      wrapS?: any,
      wrapT?: any,
      magFilter?: any,
      minFilter?: any,
      anisotropy?: any,
    )
  }
  export class CanvasTexture extends Texture {
    constructor(
      canvas: any,
      mapping?: any,
      wrapS?: any,
      wrapT?: any,
      magFilter?: any,
      minFilter?: any,
      format?: any,
      type?: any,
      anisotropy?: any,
    )
  }
  const allOtherExports: any
  export default allOtherExports
}
