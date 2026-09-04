export const CLEAR_WGSL = /* wgsl */ `
@group(0) @binding(0) var uTexture: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct Params { value: f32 }
@group(0) @binding(2) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  return params.value * textureSampleLevel(uTexture, samp, uv, 0.0);
}
`

export const SPLAT_WGSL = /* wgsl */ `
@group(0) @binding(0) var uTarget: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct Params {
  point: vec2f,
  color: vec4f,
  cumulativeAudio: vec4f,
  audioAverage: vec4f,
  radius: f32,
  time: f32,
  aspectRatio: f32,
}
@group(0) @binding(2) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  var p = uv - vec2f(0.5);
  p *= params.radius;
  let dist = sqrt(dot(p, p));
  let pTime = params.time * 0.25 + params.cumulativeAudio.w * 0.15;
  let pDist = (dist * 2.0 - pTime) % 1.0;
  let width = 0.15;
  let pulse = smoothstep(0.0, width, pDist) - smoothstep(width, width * 2.0, pDist);
  let splat = pulse * (params.audioAverage.x * 30.0) * clamp(dist, 0.0, 1.0) * params.color.xyz;
  let base = textureSampleLevel(uTarget, samp, uv, 0.0).xyz;
  return vec4f(base + splat, 1.0);
}
`

export const ADVECTION_WGSL = /* wgsl */ `
@group(0) @binding(0) var uVelocity: texture_2d<f32>;
@group(0) @binding(1) var uSource: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
struct Params { texelSize: vec2f, dyeTexelSize: vec2f, dt: f32, dissipation: f32 }
@group(0) @binding(3) var<uniform> params: Params;
fn bilerp(tex: texture_2d<f32>, uv: vec2f, tsize: vec2f) -> vec4f {
  let st = uv / tsize - 0.5;
  let iuv = floor(st);
  let fuv = fract(st);
  let a = textureSampleLevel(tex, samp, (iuv + vec2f(0.5, 0.5)) * tsize, 0.0);
  let b = textureSampleLevel(tex, samp, (iuv + vec2f(1.5, 0.5)) * tsize, 0.0);
  let c = textureSampleLevel(tex, samp, (iuv + vec2f(0.5, 1.5)) * tsize, 0.0);
  let d = textureSampleLevel(tex, samp, (iuv + vec2f(1.5, 1.5)) * tsize, 0.0);
  return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
}
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let coord = uv - params.dt * bilerp(uVelocity, uv, params.texelSize).xy * params.texelSize;
  var color = params.dissipation * bilerp(uSource, coord, params.dyeTexelSize);
  color.w = 1.0;
  return color;
}
`

export const DIVERGENCE_WGSL = /* wgsl */ `
@group(0) @binding(0) var uVelocity: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct Params { texelSize: vec2f }
@group(0) @binding(2) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.texelSize;
  var L = textureSampleLevel(uVelocity, samp, uv - vec2f(t.x, 0.0), 0.0).x;
  var R = textureSampleLevel(uVelocity, samp, uv + vec2f(t.x, 0.0), 0.0).x;
  var T = textureSampleLevel(uVelocity, samp, uv + vec2f(0.0, t.y), 0.0).y;
  var B = textureSampleLevel(uVelocity, samp, uv - vec2f(0.0, t.y), 0.0).y;
  let C = textureSampleLevel(uVelocity, samp, uv, 0.0).xy;
  if ((uv - vec2f(t.x, 0.0)).x < 0.0) { L = -C.x; }
  if ((uv + vec2f(t.x, 0.0)).x > 1.0) { R = -C.x; }
  if ((uv + vec2f(0.0, t.y)).y > 1.0) { T = -C.y; }
  if ((uv - vec2f(0.0, t.y)).y < 0.0) { B = -C.y; }
  let div = 0.5 * (R - L + T - B);
  return vec4f(div, 0.0, 0.0, 1.0);
}
`

export const CURL_WGSL = /* wgsl */ `
@group(0) @binding(0) var uVelocity: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct Params { texelSize: vec2f }
@group(0) @binding(2) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.texelSize;
  let L = textureSampleLevel(uVelocity, samp, uv - vec2f(t.x, 0.0), 0.0).y;
  let R = textureSampleLevel(uVelocity, samp, uv + vec2f(t.x, 0.0), 0.0).y;
  let T = textureSampleLevel(uVelocity, samp, uv + vec2f(0.0, t.y), 0.0).x;
  let B = textureSampleLevel(uVelocity, samp, uv - vec2f(0.0, t.y), 0.0).x;
  let vorticity = R - L - T + B;
  return vec4f(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`

export const VORTICITY_WGSL = /* wgsl */ `
@group(0) @binding(0) var uVelocity: texture_2d<f32>;
@group(0) @binding(1) var uCurl: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
struct Params { texelSize: vec2f, curl: f32, dt: f32 }
@group(0) @binding(3) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.texelSize;
  let L = textureSampleLevel(uCurl, samp, uv - vec2f(t.x, 0.0), 0.0).x;
  let R = textureSampleLevel(uCurl, samp, uv + vec2f(t.x, 0.0), 0.0).x;
  let T = textureSampleLevel(uCurl, samp, uv + vec2f(0.0, t.y), 0.0).x;
  let B = textureSampleLevel(uCurl, samp, uv - vec2f(0.0, t.y), 0.0).x;
  let C = textureSampleLevel(uCurl, samp, uv, 0.0).x;
  var force = 0.5 * vec2f(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= params.curl * C;
  force.y *= -1.0;
  let vel = textureSampleLevel(uVelocity, samp, uv, 0.0).xy;
  return vec4f(vel + force * params.dt, 0.0, 1.0);
}
`

export const PRESSURE_WGSL = /* wgsl */ `
@group(0) @binding(0) var uPressure: texture_2d<f32>;
@group(0) @binding(1) var uDivergence: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
struct Params { texelSize: vec2f }
@group(0) @binding(3) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.texelSize;
  let L = textureSampleLevel(uPressure, samp, uv - vec2f(t.x, 0.0), 0.0).x;
  let R = textureSampleLevel(uPressure, samp, uv + vec2f(t.x, 0.0), 0.0).x;
  let T = textureSampleLevel(uPressure, samp, uv + vec2f(0.0, t.y), 0.0).x;
  let B = textureSampleLevel(uPressure, samp, uv - vec2f(0.0, t.y), 0.0).x;
  let divergence = textureSampleLevel(uDivergence, samp, uv, 0.0).x;
  let pressure = (L + R + B + T - divergence) * 0.25;
  return vec4f(pressure, 0.0, 0.0, 1.0);
}
`

export const GRAD_SUB_WGSL = /* wgsl */ `
@group(0) @binding(0) var uPressure: texture_2d<f32>;
@group(0) @binding(1) var uVelocity: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
struct Params { texelSize: vec2f }
@group(0) @binding(3) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let t = params.texelSize;
  let L = textureSampleLevel(uPressure, samp, uv - vec2f(t.x, 0.0), 0.0).x;
  let R = textureSampleLevel(uPressure, samp, uv + vec2f(t.x, 0.0), 0.0).x;
  let T = textureSampleLevel(uPressure, samp, uv + vec2f(0.0, t.y), 0.0).x;
  let B = textureSampleLevel(uPressure, samp, uv - vec2f(0.0, t.y), 0.0).x;
  var velocity = textureSampleLevel(uVelocity, samp, uv, 0.0).xy;
  velocity -= vec2f(R - L, T - B);
  return vec4f(velocity, 0.0, 1.0);
}
`

export const BLUR_WGSL = /* wgsl */ `
@group(0) @binding(0) var uTexture: texture_2d<f32>;
@group(0) @binding(1) var samp: sampler;
struct Params { simRes: vec2f, direction: vec2f }
@group(0) @binding(2) var<uniform> params: Params;
@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let off1 = 1.3846153846 * params.direction;
  let off2 = 3.2307692308 * params.direction;
  var color = textureSampleLevel(uTexture, samp, uv, 0.0) * 0.2270270270;
  color += textureSampleLevel(uTexture, samp, uv + off1 / params.simRes, 0.0) * 0.3162162162;
  color += textureSampleLevel(uTexture, samp, uv - off1 / params.simRes, 0.0) * 0.3162162162;
  color += textureSampleLevel(uTexture, samp, uv + off2 / params.simRes, 0.0) * 0.0702702703;
  color += textureSampleLevel(uTexture, samp, uv - off2 / params.simRes, 0.0) * 0.0702702703;
  return color;
}
`
