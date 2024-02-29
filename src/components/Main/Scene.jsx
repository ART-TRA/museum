import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Experience } from 'src/components/Main/Experience';
import * as THREE from 'three';

export const Scene = () => {
  return (
    <Canvas
      // shadows
      id="scene"
      dpr={[1, 2]}
      // style={{ pointerEvents: 'none' }}
      performance={{
        current: 1,
        min: 1,
        max: 1,
        debounce: 200,
        // regress: () => void
      }}
      camera={{
        fov: 32,
        // position: [-17.0, 1.4, -1.6],
        position: [0, 0, 17],
        near: 0.001,
        far: 30000,
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        // toneMappingExposure: 1.5,
        // antialias: true,
        physicallyCorrectLights: true,
        // alpha: true,
        // outputColorSpace: 'srgb',
      }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      {/*<OrbitControls />*/}
      <Experience />
      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
};
