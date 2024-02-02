import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Experience } from 'src/components/Main/Experience';

export const Scene = () => {
  return (
    <Canvas
      shadows
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
      <Experience />
      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
};
