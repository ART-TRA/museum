uniform vec3 uColor;
uniform float uTime;

varying vec2 vUv;
varying float vProgress;

void main() {
  float hideCorners = smoothstep(1.0, 0.9, vUv.x);
  float hideCorners2 = smoothstep(0.0, 0.1, vUv.x);
  vec3 mixedColor = mix(uColor, uColor * 0.25, vProgress);

  gl_FragColor = vec4(mixedColor, hideCorners * hideCorners2);
}