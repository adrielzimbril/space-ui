declare module 'three' {
  export const SRGBColorSpace: any
  export const ClampToEdgeWrapping: any
  export const LinearMipmapLinearFilter: any
  export const LinearFilter: any
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
    clear(color?: boolean, depth?: boolean, stencil?: boolean): void
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
  export class Mesh<G = any, M = any> {
    constructor(geometry?: G, material?: M)
    frustumCulled: boolean
    position: any
    scale: any
    visible: boolean
    geometry: G
    material: M
  }
  export class Vector2 {
    constructor(x?: number, y?: number)
    x: number
    y: number
    set(x: number, y: number): this
  }
  export class Vector3 {
    constructor(x?: number, y?: number, z?: number)
    x: number
    y: number
    z: number
    set(x: number, y: number, z: number): this
  }
  export class Texture {
    colorSpace: any
    wrapS: any
    wrapT: any
    minFilter: any
    magFilter: any
    generateMipmaps: boolean
    needsUpdate: boolean
    dispose(): void
  }
  const allOtherExports: any
  export default allOtherExports
}
