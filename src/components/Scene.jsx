import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { Background } from 'src/components/Background';
import { Experience } from 'src/components/Experience';
import * as THREE from 'three';
import { useResize } from 'src/hooks/useResize';
import { Settings } from 'src/components/Settings';

export const randomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const Scene = () => {
  const { isDesktop } = useResize();
  return (
    <div className="scene">
      <Canvas
        // shadows
        id="scene"
        dpr={[1, 1.5]}
        // style={{ pointerEvents: 'none' }}
        camera={{
          fov: isDesktop ? 32 : 40,
          position: [-17.6, 2.5, -2.7],
          near: 0.01,
          far: 1000,
        }}
        gl={{
          toneMapping: THREE.NeutralToneMapping,
          toneMappingExposure: 1.1,
          // autoClear: true,
          antialias: true,
          physicallyCorrectLights: true,
        }}
        // eventSource={document.getElementById('root')}
        // eventPrefix="client"
      >
        <Experience />
        <Background />
        <Settings />
        {/*<Preload all />*/}
      </Canvas>
    </div>
  );
};
