import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stats, Stage } from '@react-three/drei';
import { Background } from 'src/components/Background';
import { Level3 } from 'src/components/TestLevel';
import { OfficeModel } from 'src/components/OfficeModel';
import * as THREE from 'three';
import { ModelLast } from 'src/components/LevelVol2';

export const Scene = () => {
  // const ref = useRef();

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
      {/*<Stage*/}
      {/*  controls={ref}*/}
      {/*  preset="soft"*/}
      {/*  intensity={2}*/}
      {/*  contactShadow={false}*/}
      {/*  shadows={false}*/}
      {/*  environment="city"*/}
      {/*>*/}
      {/*<Level3 />*/}
      <ModelLast />
      {/*<OfficeModel />*/}
      {/*</Stage>*/}
      <Background />
      <Stats showPanel={0} className="stats" />
    </Canvas>
  );
};
