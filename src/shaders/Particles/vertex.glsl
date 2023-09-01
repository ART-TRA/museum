uniform vec3 uMouse;

varying vec2 vUv;

attribute float aRandom;

void main() {
  vec3 newPosition = position;
  float mouseMaxDistance = 0.065;
  float distance = length(uMouse - newPosition);
  if (distance < mouseMaxDistance) {
    vec3 direction = normalize(uMouse - newPosition);
    direction *= (1.0 - distance / mouseMaxDistance);
    newPosition -= direction * 0.05;
  }

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  gl_PointSize = aRandom * (1.0 / - mvPosition.z);

  vUv = uv;
}