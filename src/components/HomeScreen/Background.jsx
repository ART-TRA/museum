import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { AmbientLight, PointLight } from 'three';
import { Lightformer, Environment } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const Background = () => {
  const cursorPointLight = useRef();

  useFrame((state) => {
    cursorPointLight.current.position.x = state.mouse.x * 30;
    cursorPointLight.current.position.y = state.mouse.y * 30;
  });

  return (
    <>
      {/*<color attach="background" args={['#ffffff']} />*/}
      {/*<EffectComposer disableNormalPass>*/}
      {/*  <Bloom mipmapBlur luminanceThreshold={1} intensity={2} />*/}
      {/*</EffectComposer>*/}
      {/*<fog attach="fog" args={['#2f9fcb', 0, 35]} />*/}

      <Environment files="/environment/env1.hdr" blur={0.1} />
      <ambientLight intensity={0.2} color={'#fff'} />
      <pointLight ref={cursorPointLight} intensity={8} color={'#d3b92e'} />

      <pointLight
        position={[0, -10, 8]}
        intensity={20}
        color={'#bb7b1b'}
        // castShadow
      />
      <pointLight
        position={[0, -1, 8]}
        intensity={10}
        color={'#bb7b1b'}
        // castShadow
      />
      <pointLight
        position={[-5, 0, 2]}
        intensity={3}
        color={'#bb7b1b'}
        // castShadow
      />
      <directionalLight
        // ref={lightHelper}
        color={'#ffffff'}
        position={[20, -3, -20]}
        // castShadow
        intensity={3}
        // shadow-mapSize={[2048, 2048]}
        // shadow-camera-far={6}
        // shadow-camera-left={-6}
        // shadow-camera-right={6}
        // shadow-camera-top={6}
        // shadow-camera-bottom={-6}
        // decay={1}
        penumbra={1}
        bias={0.0001}
      />
      <directionalLight
        // ref={lightHelper}
        color={'#ffffff'}
        position={[0, 5, 60]}
        // castShadow
        intensity={4}
        // shadow-mapSize={[2048, 2048]}
        // shadow-camera-far={6}
        // shadow-camera-left={-6}
        // shadow-camera-right={6}
        // shadow-camera-top={6}
        // shadow-camera-bottom={-6}
        // decay={1}
        penumbra={1}
        bias={0.0001}
      />
    </>
  );
};
