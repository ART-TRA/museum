uniform float uTime;
varying vec2 vUv;

void main() {
  vec2 circleUv = vUv;
  float circle = smoothstep(0.2, 0.1, length(circleUv - 0.5) + sin(uTime * 3.5) * 0.25);
//  circle *= smoothstep(0.1 - abs(cos(uTime * 2.5)), 0.1, length(circleUv - 0.5) - 0.5 - abs(sin(uTime * 1.5)) * 0.25);
  circle *= smoothstep(0.5 - abs(cos(uTime * 3.5)) * 0.25, 0.9, length(circleUv - 0.5) - cos(uTime * 3.5) * 0.25);
  gl_FragColor = vec4(1.0, 1.0, 1.0, circle * 6.0);

//  #include <tonemapping_fragment>
//  #include <colorspace_fragment>
}