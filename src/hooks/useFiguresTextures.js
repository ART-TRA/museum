import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const useFiguresTextures = () => {
  const [torusAO, torusArm, torusDiff, torusDisp, torusNormal, torusRough] =
    useTexture([
      '/textures/figures/halfTorus/ao.jpg',
      '/textures/figures/halfTorus/arm.jpg',
      '/textures/figures/halfTorus/diff.jpg',
      '/textures/figures/halfTorus/disp.jpg',
      '/textures/figures/halfTorus/normal.jpg',
      '/textures/figures/halfTorus/rough.jpg',
    ]);
  const [
    longCubeAO,
    longCubeArm,
    longCubeDisp,
    longCubeDiff,
    longCubeNormal,
    longCubeRough,
  ] = useTexture([
    '/textures/figures/longCube/ao.png',
    '/textures/figures/longCube/arm.png',
    '/textures/figures/longCube/disp.png',
    '/textures/figures/longCube/diff.png',
    '/textures/figures/longCube/nor.png',
    '/textures/figures/longCube/rough.png',
  ]);
  const [matcap, matcap4, matcap5, rough, env, noise] = useTexture([
    '/textures/figures/2.png',
    '/textures/figures/matcap8.jpg',
    '/textures/figures/matcap5.jpg',
    '/textures/figures/roughness.jpg',
    '/textures/figures/env3.jpg',
    '/textures/figures/noise.png',
  ]);

  return {
    torus: {
      ao: torusAO,
      arm: torusArm,
      diff: torusDiff,
      disp: torusDisp,
      normal: torusNormal,
      rough: torusRough,
    },
    longCube: {
      ao: longCubeAO,
      arm: longCubeArm,
      disp: longCubeDisp,
      diff: longCubeDiff,
      normal: longCubeNormal,
      rough: longCubeRough,
    },
    matcap,
    matcap5,
    matcap4,
    rough,
    env,
    noise,
  };
};
