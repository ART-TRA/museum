import React, { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Environment, useHelper } from '@react-three/drei';
import {
  Bloom,
  BrightnessContrast,
  ColorAverage,
  EffectComposer,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export const Background = () => {
  const { gl } = useThree();
  const lightHelper = useRef();
  const shadowCameraRef = useRef();
  // useHelper(lightHelper, THREE.DirectionalLightHelper);
  // useHelper(shadowCameraRef, THREE.CameraHelper);

  // const light = useRecoilValue(lightAtom);

  // useLayoutEffect(() => {
  //   gl.shadowMap.enabled = true;
  //   gl.shadowMap.type = THREE.PCFSoftShadowMap;
  //   gl.setClearColor('#fff', 0);
  // }, [gl]);

  return (
    <>
      {/*<ambientLight intensity={0.2} />*/}
      {/*<Environment preset="sunset" background blur={0.5} />*/}
      <Environment files="/images/environment3.hdr" background blur={0.5} />
      {/*<color attach="background" args={['']} />*/}
      {/*<fog attach="fog" args={['#ffffff00', 0, 95]} />*/}
      {/*<directionalLight*/}
      {/*  ref={lightHelper}*/}
      {/*  color={'#ffffff'}*/}
      {/*  position={[4, 10, 5]}*/}
      {/*  castShadow*/}
      {/*  intensity={1}*/}
      {/*  shadow-mapSize={[2048, 2048]}*/}
      {/*  // shadow-camera-far={6}*/}
      {/*  // shadow-camera-left={-6}*/}
      {/*  // shadow-camera-right={6}*/}
      {/*  // shadow-camera-top={6}*/}
      {/*  // shadow-camera-bottom={-6}*/}
      {/*  // decay={1}*/}
      {/*  penumbra={1}*/}
      {/*  // bias={0.0001}*/}
      {/*>*/}
      {/*  <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" />*/}
      {/*</directionalLight>*/}

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
      {/*<BrightnessContrast brightness={0} contrast={-0.6} />*/}
      {/*<ColorAverage blendFunction={BlendFunction.ALPHA} />*/}
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
      {/*  <Noise opacity={0.1} />*/}
      {/*</EffectComposer>*/}
    </>
  );
};
