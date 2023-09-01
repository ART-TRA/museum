import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Environment, useHelper } from '@react-three/drei';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';

export const Background = () => {
  const { gl } = useThree();
  const lightHelper = useRef();
  const shadowCameraRef = useRef();
  // useHelper(lightHelper, THREE.DirectionalLightHelper);
  // useHelper(shadowCameraRef, THREE.CameraHelper);

  // const light = useRecoilValue(lightAtom);

  useLayoutEffect(() => {
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
  }, [gl]);

  return (
    <>
      <ambientLight intensity={1} />
      {/*<Environment preset="forest" background blur={0.5} />*/}
      <Environment files="/images/lake.hdr" background blur={0.5} />
      {/*<color attach="background" args={['']} />*/}
      {/*<fog attach="fog" args={[light ? '#7fc7e1' : '#020c25', 7, 35]} />*/}
      <directionalLight
        ref={lightHelper}
        color={'#ffffff'}
        position={[4, 10, 5]}
        castShadow
        intensity={1}
        shadow-mapSize={[2048, 2048]}
        // shadow-camera-far={6}
        // shadow-camera-left={-6}
        // shadow-camera-right={6}
        // shadow-camera-top={6}
        // shadow-camera-bottom={-6}
        // decay={1}
        penumbra={1}
        // bias={0.0001}
      >
        <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" />
      </directionalLight>

      {/*<pointLight*/}
      {/*  color={'#ffffff'}*/}
      {/*  position={[0, 2, 1]}*/}
      {/*  castShadow*/}
      {/*  intensity={10}*/}
      {/*  shadow-mapSize-width={2048}*/}
      {/*  shadow-mapSize-height={2048}*/}
      {/*  shadow-camera-far={40}*/}
      {/*  shadow-camera-left={-40}*/}
      {/*  shadow-camera-right={40}*/}
      {/*  shadow-camera-top={40}*/}
      {/*  shadow-camera-bottom={-40}*/}
      {/*  decay={1}*/}
      {/*  penumbra={1}*/}
      {/*  bias={0.0001}*/}
      {/*/>*/}

      {/*<EffectComposer>*/}
      {/*  <Bloom*/}
      {/*    // luminanceThreshold={0}*/}
      {/*    // mipmapBlur*/}
      {/*    // luminanceSmoothing={0.1}*/}
      {/*    // intensity={3}*/}

      {/*    luminanceThreshold={0.1}*/}
      {/*    // mipmapBlur*/}
      {/*    // luminanceSmoothing={0.1}*/}
      {/*    intensity={0.5}*/}
      {/*    // radius={0.9}*/}
      {/*  />*/}
      {/*</EffectComposer>*/}
    </>
  );
};
