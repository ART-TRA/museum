import React, { useEffect, useLayoutEffect } from 'react';
import { Environment, Lightformer } from '@react-three/drei';
import { useControls } from 'leva';
import { HDRJPGLoader } from '@monogrid/gainmap-js';
import { useFrame, useThree } from '@react-three/fiber';
import {
  EquirectangularReflectionMapping,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  WebGLRenderer,
} from 'three';
import * as THREE from 'three';

export const Background = () => {
  // const { gl, scene } = useThree();
  // const renderer = new WebGLRenderer();
  // const pmremGenerator = new THREE.PMREMGenerator(renderer);
  // pmremGenerator.compileEquirectangularShader();
  // let container, stats;
  // let camera, controls;
  // let torusMesh, planeMesh;
  // let hdrJpg, hdrJpgPMREMRenderTarget, hdrJpgEquirectangularMap;
  // let hdrPMREMRenderTarget, hdrEquirectangularMap;
  // const resolutions = {};
  //
  // hdrJpg = new HDRJPGLoader(renderer).load('/environment/env1.jpg', () => {
  //   resolutions['HDR JPG'] = hdrJpg.width + 'x' + hdrJpg.height;
  //   // displayStats('HDR JPG');
  //   hdrJpgEquirectangularMap = hdrJpg.renderTarget.texture;
  //   hdrJpgPMREMRenderTarget = pmremGenerator.fromEquirectangular(
  //     hdrJpgEquirectangularMap
  //   );
  //   hdrJpgEquirectangularMap.mapping = THREE.EquirectangularReflectionMapping;
  //   hdrJpgEquirectangularMap.needsUpdate = true;
  //   hdrJpg.dispose();
  // });

  // const loadBackground = async () => {
  //   const renderer = new WebGLRenderer();
  //   const loader = new HDRJPGLoader(renderer);
  //   const result = await loader.loadAsync('/environment/env1.jpg');
  //   console.log('RES', result);
  //   const mesh = new Mesh(
  //     new PlaneGeometry(),
  //     new MeshBasicMaterial({ map: result.renderTarget.texture })
  //   );
  //   scene.add(mesh);
  //   scene.background = result.renderTarget.texture;
  //   scene.environment = result.renderTarget.texture;
  //   scene.background.mapping = EquirectangularReflectionMapping;
  //   result.dispose();
  // };
  // console.log('SCENE', scene);
  // useLayoutEffect(() => {
  //   loadBackground();
  // }, []);

  // useFrame(() => {
  //   const pmremRenderTarget = hdrJpgPMREMRenderTarget;
  //   const equirectangularMap = hdrJpgEquirectangularMap;
  //   const newEnvMap = pmremRenderTarget ? pmremRenderTarget.texture : null;
  //   scene.environment = equirectangularMap;
  //   scene.background = equirectangularMap;
  // });

  return (
    <>
      {/*<ambientLight intensity={0.5} />*/}
      <Environment files={'/environment/env.hdr'} blur={1.0} />
      {/*<Environment preset="sunset" blur={0.4} background resolution={256} />*/}
      {/*  <group rotation={[-Math.PI / 3, 0, 1]}>*/}
      {/*    <Lightformer*/}
      {/*      form="circle"*/}
      {/*      intensity={4}*/}
      {/*      rotation-x={Math.PI / 2}*/}
      {/*      position={[0, 5, -9]}*/}
      {/*      scale={2}*/}
      {/*    />*/}
      {/*    <Lightformer*/}
      {/*      form="circle"*/}
      {/*      intensity={2}*/}
      {/*      rotation-y={Math.PI / 2}*/}
      {/*      position={[-5, 1, -1]}*/}
      {/*      scale={2}*/}
      {/*    />*/}
      {/*    <Lightformer*/}
      {/*      form="circle"*/}
      {/*      intensity={2}*/}
      {/*      rotation-y={Math.PI / 2}*/}
      {/*      position={[-5, -1, -1]}*/}
      {/*      scale={2}*/}
      {/*    />*/}
      {/*    <Lightformer*/}
      {/*      form="circle"*/}
      {/*      intensity={2}*/}
      {/*      rotation-y={-Math.PI / 2}*/}
      {/*      position={[10, 1, 0]}*/}
      {/*      scale={8}*/}
      {/*    />*/}
      {/*  </group>*/}
      {/*</Environment>*/}
      {/*<spotLight*/}
      {/*  position={[10, 10, 10]}*/}
      {/*  angle={0.15}*/}
      {/*  penumbra={1}*/}
      {/*  intensity={1}*/}
      {/*  castShadow*/}
      {/*/>*/}
      <color attach="background" args={['#c5cad3']} />
      {/*<fog attach="fog" args={['#ff8a16', 28, 50]} />*/}
    </>
  );
};
