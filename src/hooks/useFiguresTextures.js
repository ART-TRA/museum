import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const useFiguresTextures = () => {
  const [
    colored,
    normal,
    reflection,
    gloss,
    matcap,
    matcap4,
    matcap5,
    rough,
    env,
    noise,
  ] = useTexture([
    '/textures/figures/color.jpg',
    '/textures/figures/normal.jpg',
    '/textures/figures/reflection.jpg',
    '/textures/figures/gloss.jpg',
    '/textures/figures/2.png',
    '/textures/figures/matcap4.jpg',
    '/textures/figures/matcap6.png',
    '/textures/figures/roughness.jpg',
    '/textures/figures/env3.jpg',
    '/textures/figures/noise.png',
  ]);

  normal.flipY = reflection.flipY = gloss.flipY = true;
  colored.repeat.set(0.2, 0.5);
  colored.offset.set(0, 20);
  colored.wrapS = colored.wrapT = THREE.RepeatWrapping;

  return {
    colored,
    normal,
    reflection,
    gloss,
    matcap,
    matcap5,
    matcap4,
    rough,
    env,
    noise,
  };
};
