export const DISPLAY_WGSL = /* wgsl */ `
@group(0) @binding(0) var uTexture: texture_2d<f32>;
@group(0) @binding(1) var uFluidSimTexture: texture_2d<f32>;
@group(0) @binding(2) var samp: sampler;
struct Params {
  uAudioAverage: vec4f,
  uAudioAverageInput: vec4f,
  uCumulativeAudio: vec4f,
  uFluidColor: vec4f,
  uResolution: vec2f,
  uTextureResolution: vec2f,
  uTime: f32,
  uCircleSize: f32,
  uAlpha: f32,
  uExposure: f32,
  uContrast: f32,
  uSaturation: f32,
  uNoiseOpacity: f32,
  uAnimatedNoise: f32,
  uNoiseSpeed: f32,
  uNoiseAmplitude: f32,
  uNoiseScale: f32,
  uSphereScale: f32,
  uSpherePower: f32,
  uFluidColorOpacity: f32,
  uRingColorOpacity: f32,
  uFbmScale: f32,
  uFbmPower: f32,
  uFbmAmplitude: f32,
  uFbmSpeed: f32,
  uFadeInDuration: f32,
  uDpr: f32,
  uWatercolorStrength: f32,
}
@group(0) @binding(3) var<uniform> params: Params;

fn getCoverUv(uv: vec2f, containerRes: vec2f, textureRes: vec2f) -> vec2f {
  let containerAspect = containerRes.x / containerRes.y;
  let textureAspect = textureRes.x / max(textureRes.y, 0.0001);
  var scale = vec2f(1.0);
  if (containerAspect > textureAspect) { scale.y = textureAspect / containerAspect; }
  else { scale.x = containerAspect / textureAspect; }
  return (uv - 0.5) * scale + 0.5;
}

fn permute(x: vec3f) -> vec3f { return ((x * 34.0 + 1.0) * x) % 289.0; }
fn permute4(x: vec4f) -> vec4f { return ((x * 34.0 + 1.0) * x) % 289.0; }
fn taylorInvSqrt(r: vec4f) -> vec4f { return 1.79284291400159 - 0.85373472095314 * r; }

fn snoise(v: vec3f) -> f32 {
  let C = vec2f(1.0 / 6.0, 1.0 / 3.0);
  let D = vec4f(0.0, 0.5, 1.0, 2.0);
  var i = floor(v + dot(v, C.yyy));
  let x0 = v - i + dot(i, C.xxx);
  let g = step(x0.yzx, x0.xyz);
  let l = 1.0 - g;
  let i1 = min(g.xyz, l.zxy);
  let i2 = max(g.xyz, l.zxy);
  let x1 = x0 - i1 + C.xxx;
  let x2 = x0 - i2 + 2.0 * C.xxx;
  let x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = i % 289.0;
  var pv = permute4(permute4(permute4(i.z + vec4f(0.0, i1.z, i2.z, 1.0)) + i.y + vec4f(0.0, i1.y, i2.y, 1.0)) + i.x + vec4f(0.0, i1.x, i2.x, 1.0));
  let n_ = 1.0 / 7.0;
  let ns = n_ * D.wyz - D.xzx;
  let j = pv - 49.0 * floor(pv * ns.z * ns.z);
  let x_ = floor(j * ns.z);
  let y_ = floor(j - 7.0 * x_);
  let x = x_ * ns.x + ns.yyyy;
  let y = y_ * ns.x + ns.yyyy;
  let h = 1.0 - abs(x) - abs(y);
  let b0 = vec4f(x.xy, y.xy);
  let b1 = vec4f(x.zw, y.zw);
  let s0 = floor(b0) * 2.0 + 1.0;
  let s1 = floor(b1) * 2.0 + 1.0;
  let sh = -step(h, vec4f(0.0));
  let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  let a1 = b1.xzyw + s1.xzyw * sh.zzww;
  var p0 = vec3f(a0.xy, h.x);
  var p1 = vec3f(a0.zw, h.y);
  var p2 = vec3f(a1.xy, h.z);
  var p3 = vec3f(a1.zw, h.w);
  let norm = taylorInvSqrt(vec4f(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  var m = max(0.6 - vec4f(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), vec4f(0.0));
  m = m * m;
  return 42.0 * dot(m * m, vec4f(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

fn contrastFn(color: vec3f, value: f32) -> vec3f {
  return clamp(0.5 + (1.0 + value) * (color - 0.5), vec3f(0.0), vec3f(1.0));
}
fn exposureFn(color: vec3f, value: f32) -> vec3f { return (1.0 + value) * color; }
fn saturationFn(rgb: vec3f, adjustment: f32) -> vec3f {
  let W = vec3f(0.2125, 0.7154, 0.0721);
  let intensity = vec3f(dot(rgb, W));
  return mix(intensity, rgb, adjustment);
}
fn blendOverlay(base: f32, blend: f32) -> f32 {
  if (base < 0.5) { return 2.0 * base * blend; }
  return 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
}
fn blendOverlayVec(base: vec3f, blend: vec3f) -> vec3f {
  return vec3f(blendOverlay(base.r, blend.r), blendOverlay(base.g, blend.g), blendOverlay(base.b, blend.b));
}
fn blendHardLight(base: vec3f, blend: vec3f, opacity: f32) -> vec3f {
  let result = blendOverlayVec(blend, base);
  return result * opacity + base * (1.0 - opacity);
}
fn random2(st: vec2f) -> f32 {
  return fract(sin(dot(st, vec2f(12.9898, 78.233))) * 43758.5453123);
}
fn filmGrainNoise(uv: vec2f) -> f32 {
  return fract(sin(dot(uv, vec2f(12.9898, 78.233))) * 43758.5453);
}
fn noise2d(st: vec2f) -> f32 {
  let i = floor(st);
  let f = fract(st);
  let a = random2(i);
  let b = random2(i + vec2f(1.0, 0.0));
  let c = random2(i + vec2f(0.0, 1.0));
  let d = random2(i + vec2f(1.0, 1.0));
  let u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
fn fbm(st_in: vec2f) -> f32 {
  var st = st_in;
  var v = 0.0;
  var a = 0.5;
  let shift = vec2f(100.0);
  let rot = mat2x2f(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (var i = 0; i < 4; i++) {
    v += a * noise2d(st);
    st = rot * st * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

@fragment fn fs_main(@location(0) uv_in: vec2f, @builtin(position) frag: vec4f) -> @location(0) vec4f {
  let vUv = vec2f(1.0 - uv_in.x, 1.0 - uv_in.y);
  var uv = vec2f(1.0 - vUv.x, vUv.y);
  let fluid = textureSampleLevel(uFluidSimTexture, samp, vUv, 0.0).rgb;
  let circleSize = params.uCircleSize - pow(params.uAudioAverageInput.x * 0.75, 3.0) * 0.2;
  var uvDot = (uv - 0.5) * 2.0;
  var d = sqrt(1.0 - clamp(dot(uvDot, uvDot), 0.0, 1.0));
  d = pow(d, params.uSpherePower);
  let normals = vec3f(uvDot, d);
  uvDot /= (vec2f(d) + vec2f(1.0)) * (1.0 / params.uSphereScale);
  uvDot = (uvDot + 1.0) * 0.5;
  uv = uvDot;

  let fbmUv = uv * params.uFbmScale;
  let fbmTime1 = params.uTime * params.uFbmSpeed;
  let fbmTime2 = params.uTime * (params.uFbmSpeed * 0.5) + params.uCumulativeAudio.x * 0.25;
  var q = vec2f(0.0);
  q.x = fbm(fbmUv + 0.00 * fbmTime1);
  q.y = fbm(fbmUv + vec2f(1.0));
  var r = vec2f(0.0);
  r.x = fbm(fbmUv + 1.0 * q + vec2f(91.3, 0.55) + 0.15 * fbmTime2);
  r.y = fbm(fbmUv + 1.0 * q - vec2f(45.33, 1.2) + 0.126 * fbmTime2);
  let f = fbm(fbmUv + r);
  var ffbm = mix(0.8, 0.66, clamp((f * f) * params.uFbmPower, 0.0, 1.0));
  ffbm = mix(ffbm, 0.0, clamp(length(q), 0.0, 1.0));
  ffbm = mix(ffbm, 1.0, clamp(length(r.x), 0.0, 1.0));

  let noiseTime1 = params.uTime * params.uNoiseSpeed * 0.5 + params.uCumulativeAudio.z * 0.1;
  let noiseX = snoise(vec3f(vUv * params.uNoiseScale, noiseTime1));
  let noiseY = snoise(vec3f(vec2f(vUv * params.uNoiseScale + vec2f(54.0)), params.uTime * params.uNoiseSpeed));
  var noiseDisp = vec2f(noiseX, noiseY) * (1.0 + params.uAudioAverage.z * 0.25);

  let circleUv = vUv - 0.5;
  let dist = sqrt(dot(circleUv, circleUv));
  let s = smoothstep(0.5, 0.496, dist);
  let pTime = params.uTime * 0.2 + params.uCumulativeAudio.z * 0.4;
  let pDist = ((dist * 2.0 - pTime) % 1.0 + 1.0) % 1.0;
  var pulse = smoothstep(0.0, 0.75, pDist) - smoothstep(0.75, 1.0, pDist);
  pulse = pow(pulse, 2.0) * params.uAudioAverage.y;

  uv += -fluid.rg * 0.001;
  uv += normals.xy * (ffbm - 0.5) * params.uFbmAmplitude;
  uv += noiseDisp * params.uNoiseAmplitude;
  let wcAmp = clamp(params.uWatercolorStrength, 0.0, 1.0) * 2.0;
  let wcTime = params.uTime * 0.85;
  let wcX = snoise(vec3f(uv + vec2f(0.0, 74.8572), (wcTime + params.uCumulativeAudio.x * 0.05) * 0.3));
  let wcY = snoise(vec3f(uv + vec2f(203.91282, 10.0), (wcTime + params.uCumulativeAudio.z * 0.05) * 0.3));
  uv += vec2f(wcX * 2.0, wcY) * 0.19 * wcAmp;

  let coverUv = getCoverUv(uv, params.uResolution, params.uTextureResolution);
  let gradient = textureSampleLevel(uTexture, samp, coverUv, 0.0).rgb;

  var ringUv = (vUv - 0.5) * 2.0 * (1.0 / params.uCircleSize) * 0.75;
  let ang = atan2(ringUv.y, ringUv.x);
  let len = length(ringUv);
  let ringTime = (-params.uTime * 0.5) - params.uCumulativeAudio.w * 0.2;
  ringUv.x += 1.0 + params.uAudioAverage.y * 1.5 - params.uAudioAverageInput.y * 2.5;
  let noiseScale = 0.65 + params.uAudioAverage.x * 0.4;
  let n0 = snoise(vec3f(ringUv * noiseScale, ringTime * 0.5)) * 0.5 + 0.5;
  let innerRadius = 0.25;
  var cl = cos(ang + ringTime * 2.0) * 0.5 + 0.5;
  let v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
  let v3 = pow(smoothstep(innerRadius, mix(innerRadius, 1.0, n0 * 0.75), len), 2.0);
  cl = cl * v2 * v3;
  cl = clamp(pow(cl * min(params.uAudioAverage.w * 4.0 + params.uAudioAverageInput.x * 4.0, 1.0), 3.0), 0.0, 1.0);

  var color = gradient + (vec3f(cl) * params.uRingColorOpacity);
  color = blendHardLight(color, params.uFluidColor.xyz, length(fluid) * 0.01 * params.uFluidColorOpacity);
  var grainCoord = floor(frag.xy);
  if (params.uAnimatedNoise > 0.5) {
    let gTime = params.uTime * 0.35;
    let waveX = snoise(vec3f(vUv * 2.5, gTime));
    let waveY = snoise(vec3f(vUv * 2.5 + vec2f(9.1, 0.0), gTime + 1.7));
    grainCoord = floor(frag.xy + vec2f(waveX, waveY) * 12.0);
  }
  var grainVal = filmGrainNoise(grainCoord);
  grainVal = clamp((grainVal - 0.5) * 1.5 + 0.5, 0.0, 1.0);
  let grainBlended = blendOverlayVec(color, vec3f(grainVal));
  color = mix(color, grainBlended, clamp(params.uNoiseOpacity, 0.0, 1.0) * 0.15);
  color = saturationFn(color, params.uSaturation);
  color = contrastFn(color, params.uContrast);
  color = exposureFn(color, params.uExposure);
  let fadeIn = select(1.0, min(params.uTime / params.uFadeInDuration, 1.0), params.uFadeInDuration > 0.0);
  let alpha = s * params.uAlpha * fadeIn;
  color = clamp(color, vec3f(0.0), vec3f(1.0));
  return vec4f(color * alpha, alpha);
}
`
