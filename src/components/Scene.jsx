import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Background } from 'src/components/Background';
import * as THREE from 'three';
import { Model } from 'src/components/Level';
import { HomeScreen } from 'src/components/HomeScreen';

export const Scene = () => {
  return (
    <Canvas
      // shadows
      id="scene"
      dpr={[1, 2]}
      // style={{ pointerEvents: 'none' }}
      camera={{
        fov: 32,
        position: [-17.0, 1.4, -1.6],
        near: 0.01,
        far: 100000,
      }}
      gl={{
        // toneMapping: THREE.ACESFilmicToneMapping,
        // toneMappingExposure: 1.5,
        antialias: true,
        // physicallyCorrectLights: true,
        alpha: true,
        // outputColorSpace: 'srgb',
      }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      {/*<OrbitControls />*/}
      {/*<HomeScreen />*/}
      <Model />
      <Background />
      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
};
