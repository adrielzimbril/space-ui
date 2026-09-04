export const CLOUDS_WGSL = /* wgsl */ `
struct Params {
  iResolution: vec2f,
  iMouse: vec2f,
  iTime: f32,
  speed: f32,
  iDpr: f32,
  _pad: f32,
  skyColor: vec4f,
  cloudColor: vec4f,
  cloudShadowColor: vec4f,
  sunColor: vec4f,
  sunlightColor: vec4f,
  sunGlareColor: vec4f,
  backgroundColor: vec4f,
}

@group(0) @binding(0) var<uniform> params: Params;

fn hash(p: f32) -> f32 {
  var x = fract(p * 0.011);
  x *= (x + 7.5);
  x *= (x + x);
  return fract(x);
}

fn noise(x: vec3f) -> f32 {
  let p = floor(x);
  var f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  let n = p.x + p.y * 57.0 + 113.0 * p.z;
  return mix(
    mix(mix(hash(n + 0.0), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
    mix(mix(hash(n + 113.0), hash(n + 114.0), f.x), mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y),
    f.z
  );
}

const constantTime: f32 = 1000.0;

fn map5(p: vec3f) -> f32 {
  let speed1 = vec3f(0.5, 0.01, 1.0) * 0.5 * params.speed;
  var q = p - speed1 * (params.iTime + constantTime);
  var f = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q); q = q * 2.01;
  f += 0.06250 * noise(q); q = q * 2.02;
  f += 0.03125 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
fn map4(p: vec3f) -> f32 {
  let speed1 = vec3f(0.5, 0.01, 1.0) * 0.5 * params.speed;
  var q = p - speed1 * (params.iTime + constantTime);
  var f = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q); q = q * 2.01;
  f += 0.06250 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
fn map3(p: vec3f) -> f32 {
  let speed1 = vec3f(0.5, 0.01, 1.0) * 0.5 * params.speed;
  var q = p - speed1 * (params.iTime + constantTime);
  var f = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q); q = q * 2.03;
  f += 0.12500 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}
fn map2(p: vec3f) -> f32 {
  let speed1 = vec3f(0.5, 0.01, 1.0) * 0.5 * params.speed;
  var q = p - speed1 * (params.iTime + constantTime);
  var f = 0.50000 * noise(q); q = q * 2.02;
  f += 0.25000 * noise(q);
  return clamp(1.5 - p.y - 2.0 + 1.75 * f, 0.0, 1.0);
}

const sundir = vec3f(-0.70710678, 0.0, -0.70710678);

fn integrate(sum: vec4f, dif: f32, den: f32, bgcol: vec3f, t: f32) -> vec4f {
  let lin = params.cloudColor.xyz * 1.4 + params.sunlightColor.xyz * dif;
  var col = vec4f(mix(vec3f(1.0, 0.95, 0.8), params.cloudShadowColor.xyz, den), den);
  col = vec4f(col.xyz * lin, col.w);
  col = vec4f(mix(col.xyz, bgcol, 1.0 - exp(-0.003 * t * t)), col.w);
  col = vec4f(col.xyz, col.w * 0.4);
  col = vec4f(col.xyz * col.w, col.w);
  return sum + col * (1.0 - sum.w);
}

fn raymarch(ro: vec3f, rd: vec3f, bgcol: vec3f) -> vec4f {
  var sum = vec4f(0.0);
  var t = 0.0;
  for (var i = 0; i < 20; i++) {
    let pos = ro + t * rd;
    if (pos.y < -3.0 || pos.y > 2.0 || sum.w > 0.99) { break; }
    let den = map5(pos);
    if (den > 0.01) {
      let dif = clamp((den - map5(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
      sum = integrate(sum, dif, den, bgcol, t);
    }
    t += max(0.075, 0.02 * t);
  }
  for (var i = 0; i < 25; i++) {
    let pos = ro + t * rd;
    if (pos.y < -3.0 || pos.y > 2.0 || sum.w > 0.99) { break; }
    let den = map4(pos);
    if (den > 0.01) {
      let dif = clamp((den - map4(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
      sum = integrate(sum, dif, den, bgcol, t);
    }
    t += max(0.075, 0.02 * t);
  }
  for (var i = 0; i < 30; i++) {
    let pos = ro + t * rd;
    if (pos.y < -3.0 || pos.y > 2.0 || sum.w > 0.99) { break; }
    let den = map3(pos);
    if (den > 0.01) {
      let dif = clamp((den - map3(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
      sum = integrate(sum, dif, den, bgcol, t);
    }
    t += max(0.075, 0.02 * t);
  }
  for (var i = 0; i < 40; i++) {
    let pos = ro + t * rd;
    if (pos.y < -3.0 || pos.y > 2.0 || sum.w > 0.99) { break; }
    let den = map2(pos);
    if (den > 0.01) {
      let dif = clamp((den - map2(pos + 0.3 * sundir)) / 0.6, 0.0, 1.0);
      sum = integrate(sum, dif, den, bgcol, t);
    }
    t += max(0.075, 0.02 * t);
  }
  return clamp(sum, vec4f(0.0), vec4f(1.0));
}

fn setCamera(ro: vec3f, ta: vec3f, cr: f32) -> mat3x3f {
  let cw = normalize(ta - ro);
  let cp = vec3f(sin(cr), cos(cr), 0.0);
  let cu = normalize(cross(cw, cp));
  let cv = normalize(cross(cu, cw));
  return mat3x3f(cu, cv, cw);
}

fn render(ro: vec3f, rd: vec3f) -> vec4f {
  let sun = clamp(dot(sundir, rd), 0.0, 1.0);
  var col = params.skyColor.xyz - rd.y * 0.2 * vec3f(1.0, 0.5, 1.0) + 0.15 * 0.5;
  col += 0.2 * params.sunColor.xyz * pow(sun, 8.0);
  let res = raymarch(ro, rd, col);
  col = col * (1.0 - res.w) + res.xyz;
  col += 0.2 * params.sunGlareColor.xyz * pow(sun, 3.0);
  return vec4f(col, 1.0);
}

@fragment fn fs_main(@location(0) uv: vec2f) -> @location(0) vec4f {
  let iResolution = params.iResolution;
  let frag = vec2f(uv.x, 1.0 - uv.y) * iResolution * params.iDpr;
  let p = (-iResolution + 2.0 * frag) / iResolution.y;
  var m = params.iMouse / iResolution;
  m.y = (1.0 - m.y) * 0.33 + 0.28;
  m.x *= 0.25;
  m.x += sin(params.iTime * 0.1 + 3.1415) * 0.25 + 0.25;
  let ro = 4.0 * normalize(vec3f(sin(3.0 * m.x), 0.4 * m.y, cos(3.0 * m.x)));
  let ta = vec3f(0.0, -1.0, 0.0);
  let ca = setCamera(ro, ta, 0.0);
  let rd = ca * normalize(vec3f(p.xy, 1.5));
  return render(ro, rd);
}
`
