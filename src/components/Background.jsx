import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Environment, Lightformer, useHelper } from '@react-three/drei';
import {
  Bloom,
  BrightnessContrast,
  ColorAverage,
  EffectComposer,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { AmbientLight, DirectionalLight } from 'three';
import { useControls } from 'leva';

const envs = [
  '/environment/env1.hdr',
  '/environment/env2.hdr',
  '/environment/env3.hdr',
  '/environment/env4.hdr',
  '/environment/env5.hdr',
  '/environment/env6.hdr',
  '/environment/env7.hdr',
  '/environment/env8.hdr',
  '/environment/env9.hdr',
];

export const Background = () => {
  const { gl, scene } = useThree();
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

  const {
    ambientLight,
    directionalLight,
    ambientLightON,
    directionalLightON,
    envMaps,
  } = useControls({
    ambientLight: { value: 0.8, min: 0, max: 4, step: 0.01 },
    directionalLight: { value: 0.7, min: 0, max: 4, step: 0.01 },
    ambientLightON: true,
    directionalLightON: true,
    envMaps: { value: 0, min: 0, max: 8, step: 1 },
  });

  // -------------------------------------------------------------------------
  const ambLight = useRef(new AmbientLight(0xffffff, ambientLight));
  const dirLight = useRef(new DirectionalLight(0xffffff, directionalLight));
  const helper = new THREE.DirectionalLightHelper(dirLight.current, 5);

  useEffect(() => {
    ambLight.current.intensity = ambientLight;
    dirLight.current.intensity = directionalLight;

    // gl.shadowMap.type = THREE.VSMShadowMap;
    // gl.shadowMap.type = THREE.PCFSoftShadowMap;
    dirLight.current.position.set(2, 50, 2);
    dirLight.current.color = new THREE.Color('#ffffff');
    dirLight.current.target.position.set(0, 0, 0);
    dirLight.current.shadow.mapSize.set(2048, 2048);
    // dirLight.current.shadow.radius = 7;
    // dirLight.current.shadow.blurSamples = 20;
    dirLight.current.shadow.camera.top = 30;
    dirLight.current.shadow.camera.bottom = -30;
    // dirLight.current.shadow.camera.left = -30000;
    // dirLight.current.shadow.camera.right = 30000;
    // dirLight.current.castShadow = true;

    if (ambientLightON) {
      scene.add(ambLight.current);
    } else {
      scene.remove(ambLight.current);
    }
    if (directionalLightON) {
      scene.add(dirLight.current);
    } else {
      scene.remove(dirLight.current);
    }
    // scene.add(helper);
  }, [ambientLight, directionalLight, ambientLightON, directionalLightON]);
  // -------------------------------------------------------------------------

  return (
    <>
      {/*<ambientLight intensity={0.2} />*/}
      {/*<Environment preset="sunset" background blur={0.5} />*/}

      <Environment files={envs[envMaps]} background blur={0.5}>
        <Lightformer
          intensity={0.5}
          rotation-x={Math.PI / 2}
          position={[0, 4, -9]}
          scale={[10, 1, 1]}
        />

        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, -6]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, -3]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, 0]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, 3]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, 6]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
        {/*<Lightformer*/}
        {/*  intensity={1}*/}
        {/*  rotation-x={Math.PI / 2}*/}
        {/*  position={[0, 4, 9]}*/}
        {/*  scale={[10, 1, 1]}*/}
        {/*/>*/}
      </Environment>

      {/*<color attach="background" args={['']} />*/}
      {/*<fog attach="fog" args={['#ffffff00', 0, 95]} />*/}
      {/*<directionalLight*/}
      {/*  ref={lightHelper}*/}
      {/*  color={'#ffffff'}*/}
      {/*  position={[4, 40, 5]}*/}
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
      {/*  bias={0.0001}*/}
      {/*>*/}
      {/*  <perspectiveCamera ref={shadowCameraRef} attach="shadow-camera" />*/}
      {/*</directionalLight>*/}
      {/*<directionalLight*/}
      {/*  ref={lightHelper}*/}
      {/*  color={'#ffffff'}*/}
      {/*  position={[-10, 20, -5]}*/}
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
      {/*  bias={0.0001}*/}
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
