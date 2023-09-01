uniform float uTime;
uniform vec3 uMouse;

varying vec2 vUv;
varying float vProgress;

void main() {
  vUv = uv;
  vProgress = smoothstep(-1.0, 1.0, sin(vUv.x * 8.0 + uTime * 3.0));

  vec3 newPosition = position;
  float mouseMaxDistance = 0.06;
  float distance = length(uMouse - newPosition);
  if (distance < mouseMaxDistance) {
    vec3 direction = normalize(uMouse - newPosition);
    direction *= (1.0 - distance / mouseMaxDistance);
    newPosition -= direction * 0.02;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}