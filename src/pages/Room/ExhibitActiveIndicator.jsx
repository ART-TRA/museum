import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import fragmentShader from 'src/shaders/activeIndicator/fragment.glsl';
import vertexShader from 'src/shaders/activeIndicator/vertex.glsl';

export const ExhibitActiveIndicator = ({
  indicatorPosition = [0, 0, 0],
  indicatorRotation,
}) => {
  const ref = useRef();
  const materialArgs = useRef({
    transparent: true,
    uniforms: {
      uTime: new THREE.Uniform(0),
    },
    fragmentShader,
    vertexShader,
  });

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    materialArgs.current.uniforms.uTime.value = elapsedTime;
    if (!indicatorRotation) {
      ref.current?.lookAt(state.camera.position);
    }
  });

  return (
    <mesh ref={ref} position={indicatorPosition} rotation={indicatorRotation}>
      <planeGeometry args={[0.24, 0.24]} />
      <shaderMaterial {...materialArgs.current} />
    </mesh>
  );
};
