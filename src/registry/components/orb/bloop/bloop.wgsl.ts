export const BLOOP_WGSL = /* wgsl */ `
struct Ubo {
  time: f32,
  micLevel: f32,
  stateListen: f32,
  listenTimestamp: f32,
  stateThink: f32,
  thinkTimestamp: f32,
  stateSpeak: f32,
  speakTimestamp: f32,
  avgMag: vec4f,
  cumulativeAudio: vec4f,
  viewport: vec2f,
  watercolorStrength: f32,
  watercolorAnimated: f32,
  bloopColorMain: vec4f,
  bloopColorLow: vec4f,
  bloopColorMid: vec4f,
  bloopColorHigh: vec4f,
}

@group(0) @binding(0) var<uniform> ubo: Ubo;

const E: f32 = 2.71828182846;
const PI: f32 = 3.141592653589793;
const MAIN_R: f32 = 0.49;

fn scaled(edge0: f32, edge1: f32, x: f32) -> f32 {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

fn spring(t: f32, d: f32) -> f32 {
  return 1.0 - exp(-E * 2.0 * t) * cos((1.0 - d) * 115.0 * t);
}

fn fixedSpring(t: f32, d: f32) -> f32 {
  let s = mix(spring(t, d), 1.0, scaled(0.0, 1.0, t));
  return s * (1.0 - t) + t;
}

fn silkySmooth(t: f32, k: f32) -> f32 {
  return atan(k * sin((t - 0.5) * PI)) / atan(k) * 0.5 + 0.5;
}

fn bounce(t: f32, d: f32) -> f32 {
  return -sin(PI * (1.0 - d) * t) * (1.0 - t) * exp(-E * 2.0 * t) * t * 10.0;
}

fn opSmoothUnion(d1: f32, d2: f32, k_in: f32) -> f32 {
  let k = max(k_in, 0.000001);
  let h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

fn sdRoundedBox(p: vec2f, b: vec2f, rad: f32) -> f32 {
  let q = abs(p) - b + rad;
  return min(max(q.x, q.y), 0.0) + length(max(q, vec2f(0.0))) - rad;
}

fn permute(x: vec4f) -> vec4f {
  return ((x * 34.0 + 1.0) * x) % 289.0;
}

fn taylorInvSqrt(r: vec4f) -> vec4f {
  return 1.79284291400159 - 0.85373472095314 * r;
}

fn fade3(t: vec3f) -> vec3f {
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

fn cnoise(P: vec3f) -> f32 {
  var Pi0 = floor(P);
  var Pi1 = Pi0 + vec3f(1.0);
  Pi0 = Pi0 % 289.0;
  Pi1 = Pi1 % 289.0;
  let Pf0 = fract(P);
  let Pf1 = Pf0 - vec3f(1.0);
  let ix = vec4f(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  let iy = vec4f(Pi0.yy, Pi1.yy);
  let iz0 = vec4f(Pi0.z);
  let iz1 = vec4f(Pi1.z);
  let ixy = permute(permute(ix) + iy);
  let ixy0 = permute(ixy + iz0);
  let ixy1 = permute(ixy + iz1);
  var gx0 = ixy0 / 7.0;
  var gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  var gz0 = vec4f(0.5) - abs(gx0) - abs(gy0);
  let sz0 = step(gz0, vec4f(0.0));
  gx0 -= sz0 * (step(vec4f(0.0), gx0) - 0.5);
  gy0 -= sz0 * (step(vec4f(0.0), gy0) - 0.5);
  var gx1 = ixy1 / 7.0;
  var gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  var gz1 = vec4f(0.5) - abs(gx1) - abs(gy1);
  let sz1 = step(gz1, vec4f(0.0));
  gx1 -= sz1 * (step(vec4f(0.0), gx1) - 0.5);
  gy1 -= sz1 * (step(vec4f(0.0), gy1) - 0.5);
  var g000 = vec3f(gx0.x, gy0.x, gz0.x);
  var g100 = vec3f(gx0.y, gy0.y, gz0.y);
  var g010 = vec3f(gx0.z, gy0.z, gz0.z);
  var g110 = vec3f(gx0.w, gy0.w, gz0.w);
  var g001 = vec3f(gx1.x, gy1.x, gz1.x);
  var g101 = vec3f(gx1.y, gy1.y, gz1.y);
  var g011 = vec3f(gx1.z, gy1.z, gz1.z);
  var g111 = vec3f(gx1.w, gy1.w, gz1.w);
  let norm0 = taylorInvSqrt(vec4f(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  let norm1 = taylorInvSqrt(vec4f(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;
  let n000 = dot(g000, Pf0);
  let n100 = dot(g100, vec3f(Pf1.x, Pf0.yz));
  let n010 = dot(g010, vec3f(Pf0.x, Pf1.y, Pf0.z));
  let n110 = dot(g110, vec3f(Pf1.xy, Pf0.z));
  let n001 = dot(g001, vec3f(Pf0.xy, Pf1.z));
  let n101 = dot(g101, vec3f(Pf1.x, Pf0.y, Pf1.z));
  let n011 = dot(g011, vec3f(Pf0.x, Pf1.yz));
  let n111 = dot(g111, Pf1);
  let fade_xyz = fade3(Pf0);
  let n_z = mix(vec4f(n000, n100, n010, n110), vec4f(n001, n101, n011, n111), fade_xyz.z);
  let n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  return 2.2 * mix(n_yz.x, n_yz.y, fade_xyz.x);
}

fn watercolorTex(uv: vec2f, z: f32) -> f32 {
  let a = cnoise(vec3f(uv * 4.0, z));
  let b = cnoise(vec3f(uv * 8.0 + vec2f(5.2, 1.7), z + 1.1));
  return a * 0.65 + b * 0.35;
}

fn texDisp(uv: vec2f, z: f32, mixT: f32) -> f32 {
  let r = watercolorTex(uv, z) * 0.5 + 0.5;
  let g = watercolorTex(vec2f(uv.x, 1.0 - uv.y), z + 2.3) * 0.5 + 0.5;
  return mix(r - 0.5, g - 0.5, mixT);
}

fn hash21(p: vec2f) -> f32 {
  return fract(sin(dot(p, vec2f(12.9898, 4.1414))) * 43758.5453);
}

fn noise2(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  let res = mix(mix(hash21(i), hash21(i + vec2f(1.0, 0.0)), u.x), mix(hash21(i + vec2f(0.0, 1.0)), hash21(i + vec2f(1.0, 1.0)), u.x), u.y);
  return res * res;
}

fn fbm(x_in: vec2f) -> f32 {
  var x = x_in;
  var v = 0.0;
  var a = 0.5;
  let rot = mat2x2f(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (var i = 0; i < 4; i++) {
    v += a * noise2(x);
    x = rot * x * 2.0 + vec2f(100.0);
    a *= 0.5;
  }
  return v;
}

fn blendLinearBurn(base: vec3f, blend: vec3f, opacity: f32) -> vec3f {
  let burned = max(base + blend - vec3f(1.0), vec3f(0.0));
  return burned * opacity + base * (1.0 - opacity);
}

fn idleDist(st: vec2f, time: f32) -> f32 {
  let midRadius = 0.12;
  let maxRadius = 0.3;
  let t1 = 1.0;
  let gamma = 3.0;
  let omega = PI / 2.0;
  let k = exp(-gamma) * omega;
  var radius: f32;
  if (time <= t1) {
    let tp = time / t1;
    radius = midRadius * (1.0 - exp(-gamma * tp) * cos(omega * tp));
  } else {
    radius = midRadius + (maxRadius - midRadius) * (1.0 - exp(-k * (time - t1)));
  }
  return length(st) - radius;
}

fn listenDist(st: vec2f, duration: f32, time: f32, mic: f32) -> f32 {
  let breathingSequence = sin(time) * 0.5 + 0.5;
  let entryAnimation = fixedSpring(scaled(0.0, 3.0, duration), 0.9);
  let l1 = mic;
  var radius = 0.38 + l1 * 0.05 + breathingSequence * 0.03;
  radius *= 1.0 - (1.0 - entryAnimation) * 0.25;
  return length(st) - radius;
}

fn thinkDist(st: vec2f, duration: f32, time: f32) -> f32 {
  let breathingSequence = sin(time) * 0.5 + 0.5;
  let entryAnimation = fixedSpring(scaled(0.0, 1.4, duration), 0.9);
  var radius = 0.38 + breathingSequence * 0.03;
  radius *= 1.0 - (1.0 - entryAnimation) * 0.25;
  let baseCircle = length(st) - radius;
  let deploy = smoothstep(0.35, 1.1, duration);
  var d = 1000.0;
  var ringRadi = MAIN_R * 0.45 * deploy;
  ringRadi -= (sin(PI * 4.0 + time * 3.0 - silkySmooth(time / 4.0, 2.0) * PI) * 0.5 + 0.5) * MAIN_R * 0.1 * deploy;
  let nodeRadius = mix(radius, MAIN_R * 0.5, deploy);
  for (var i = 0; i < 5; i++) {
    let f = (f32(i) + 0.5) / 5.0;
    let a = -f * PI * 2.0 + time / 3.0;
    let pos = vec2f(cos(a), sin(a)) * ringRadi;
    d = opSmoothUnion(d, length(st - pos) - nodeRadius, 0.035);
  }
  let cornerDeploy = smoothstep(0.5, 1.1, duration);
  let thinkingDotRadius = 0.06 * cornerDeploy;
  if (thinkingDotRadius > 0.001) {
    for (var i = 0; i < 5; i++) {
      let f = (f32(i) + 0.5) / 5.0;
      let dotAngle = f * PI * 2.0;
      let pulse = sin(PI * 4.0 + dotAngle * 2.0 + time * 0.4 * PI) * 0.5 + 0.5;
      let dotRingRadius = pulse * thinkingDotRadius * 0.3;
      let dotPos = vec2f(-MAIN_R, MAIN_R) * 0.8;
      let dotOffset = vec2f(cos(dotAngle + time), sin(dotAngle + time)) * dotRingRadius;
      d = opSmoothUnion(d, length(st - dotPos - dotOffset) - thinkingDotRadius * 0.8, 0.01);
    }
  }
  return mix(baseCircle, d, deploy);
}

fn speakDist(st: vec2f, duration: f32, time: f32, avg: vec4f) -> f32 {
  let breathing = sin(time) * 0.5 + 0.5;
  let zoom = fixedSpring(scaled(0.0, 1.15, duration), 0.9);
  var radius = 0.38 + breathing * 0.03;
  radius *= 1.0 - (1.0 - zoom) * 0.25;
  let baseCircle = length(st) - radius;
  let deploy = smoothstep(0.55, 1.25, duration);
  var d = 1000.0;
  let mag = array<f32, 4>(avg.x, avg.y, avg.z, avg.w);
  for (var i = 0; i < 4; i++) {
    let f = (f32(i) + 0.5) / 4.0;
    let w = (1.0 / 4.0) * 0.44;
    var h = w;
    let wave = sin(f * PI * 0.8 + time) * 0.5 + 0.5;
    let barIn = spring(scaled(0.05 + wave * 0.25, 0.85 + wave * 0.2, max(duration - 0.5, 0.0)), 0.98);
    var pos = vec2f(f - 0.5, 0.0) * MAIN_R * 1.9;
    pos *= mix(0.15, 1.0, barIn);
    h += mag[i] * (0.1 + (1.0 - abs(f - 0.5) * 2.0) * 0.1);
    h *= barIn;
    d = opSmoothUnion(d, sdRoundedBox(st - pos, vec2f(w, max(h, 0.001)), w), 0.2 * (1.0 - clamp(duration, 0.0, 1.0)));
  }
  return mix(baseCircle, d, deploy);
}

fn watercolor(st: vec2f) -> vec3f {
  let time = ubo.time * 0.85;
  let cum = ubo.cumulativeAudio;
  let audio = ubo.avgMag;
  let amp = clamp(ubo.watercolorStrength, 0.0, 1.0) * 2.0;
  var uv = st * (1.0 / (2.0 * 0.4)) + 0.5;
  uv.y = 1.0 - uv.y;
  let noiseX = cnoise(vec3f(uv + vec2f(0.0, 74.8572), (time + cum.x * 0.05) * 0.3));
  let noiseY = cnoise(vec3f(uv + vec2f(203.91282, 10.0), (time + cum.z * 0.05) * 0.3));
  uv += vec2f(noiseX * 2.0, noiseY) * 0.19 * amp;
  let noiseA = cnoise(vec3f(uv * 18.0 + vec2f(344.91282, 0.0), time * 0.3))
    + cnoise(vec3f(uv * 39.6 + vec2f(723.937, 0.0), time * 0.4)) * 0.5;
  uv += noiseA * 0.01 * amp;
  uv.y -= 0.09;
  let mixT = (sin(time + cum.w * 2.0) + 1.0) * 0.5;
  let texZ = select(0.0, time * 0.08, ubo.watercolorAnimated > 0.5);
  var textureUv = uv;
  let tex0 = texDisp(textureUv, texZ, mixT) * 0.08 * amp;
  textureUv += vec2f(63.861 + cum.x * 0.05, 368.937);
  let tex1 = texDisp(textureUv, texZ, mixT) * 0.08 * amp;
  textureUv += vec2f(453.163 - cum.z * 0.1, 1649.808 + cum.y * 0.1);
  let tex3 = texDisp(textureUv, texZ, mixT) * 0.08 * amp;
  uv += vec2f(tex0);
  var stn = uv * 1.25;
  let q = vec2f(
    fbm(stn * 0.5 + 0.075 * (time + cum.w * 0.175)),
    fbm(stn * 0.5 + 0.075 * (time + cum.x * 0.136))
  );
  let r = vec2f(
    fbm(stn + q + vec2f(0.3, 9.2) + 0.15 * (time + cum.y * 0.234)),
    fbm(stn + q + vec2f(8.3, 0.8) + 0.126 * (time + cum.z * 0.165))
  );
  let f = fbm(stn + r - q);
  var fullFbm = (f + 0.6 * f * f + 0.7 * f + 0.5) * 0.5;
  fullFbm = pow(fullFbm, 0.55);
  let sinOffsets = vec3f(cum.x * 0.15, -cum.y * 0.5, cum.z * 1.5);
  let snUv = uv + vec2f((fullFbm - 0.5) * 1.2 + tex0, 0.025 + tex0);
  let sn = noise2(snUv * 2.0 + vec2f(sin(sinOffsets.x * 0.25), time * 0.5 + sinOffsets.x)) * 2.0;
  var sn2 = smoothstep(sn - 1.8, sn + 1.8, (snUv.y - 0.5) * (5.0 - audio.x * 0.05) + 0.5);
  let snUvBis = uv + vec2f((fullFbm - 0.5) * 0.85 + tex1, 0.025 + tex1);
  let snBis = noise2(snUvBis * 4.0 + vec2f(sin(sinOffsets.y * 0.15) * 2.4 + 293.0, time + sinOffsets.y * 0.5)) * 2.0;
  var sn2Bis = smoothstep(snBis - (0.9 + audio.y * 0.4), snBis + (0.9 + audio.y * 0.8), (snUvBis.y - 0.6) * (5.0 - audio.y * 0.75) + 0.5);
  let snUvThird = uv + vec2f((fullFbm - 0.5) * 1.1 + tex3, tex3);
  let snThird = noise2(snUvThird * 6.0 + vec2f(sin(sinOffsets.z * 0.1) * 2.4 + 153.0, time * 1.2 + sinOffsets.z * 0.8)) * 2.0;
  let sn2Third = smoothstep(snThird - 0.7, snThird + 0.7, (snUvThird.y - 0.9) * 6.0 + 0.5);
  sn2 = pow(sn2, 0.8);
  sn2Bis = pow(sn2Bis, 0.9);
  var col = blendLinearBurn(ubo.bloopColorMain.xyz, ubo.bloopColorLow.xyz, 1.0 - sn2);
  col = blendLinearBurn(col, mix(ubo.bloopColorMain.xyz, ubo.bloopColorMid.xyz, 1.0 - sn2Bis), sn2);
  col = mix(col, mix(ubo.bloopColorMain.xyz, ubo.bloopColorHigh.xyz, 1.0 - sn2Third), sn2 * sn2Bis);
  return col;
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  var st = uv - 0.5;
  st.y *= ubo.viewport.y / max(ubo.viewport.x, 1.0);
  let t = ubo.time;
  let listenA = ubo.stateListen;
  let thinkA = ubo.stateThink;
  let speakA = ubo.stateSpeak;
  let listenDur = max(0.0, t - ubo.listenTimestamp);
  let thinkDur = max(0.0, t - ubo.thinkTimestamp);
  let speakDur = max(0.0, t - ubo.speakTimestamp);

  var dist = idleDist(st, t);
  var aMul = sin(PI / 0.7 * t) * 0.3 + 0.7;

  if (listenA > 0.001) {
    dist = mix(dist, listenDist(st, listenDur, t, ubo.micLevel), listenA);
    aMul = mix(aMul, 1.0, listenA);
  }
  if (thinkA > 0.001) {
    dist = mix(dist, thinkDist(st, thinkDur, t), thinkA);
    aMul = mix(aMul, 1.0, thinkA);
  }
  if (speakA > 0.001) {
    dist = mix(dist, speakDist(st, speakDur, t, ubo.avgMag), speakA);
    aMul = mix(aMul, 1.0, speakA);
  }

  let alpha = smoothstep(0.0075, 0.0, dist) * aMul;
  let col = watercolor(st);
  return vec4f(col * alpha, alpha);
}
`
