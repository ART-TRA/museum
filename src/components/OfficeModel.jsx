import React, { useEffect, useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { BufferAttribute } from 'three';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export const OfficeModel = () => {
  const modelRef = useRef();
  const globalTexture = useTexture('/textures/global_ao_baked.jpg');
  globalTexture.flipY = false;
  globalTexture.anisotropy = 4.5;
  globalTexture.needsPMREMUpdate = true;
  // globalTexture.mode = 'multiply';
  // globalTexture.colorSpace = 'srgb';
  const localTexture = useTexture('/textures/local_ao_baked.jpg');
  localTexture.flipY = false;
  localTexture.anisotropy = 4.5;
  localTexture.needsPMREMUpdate = true;
  // localTexture.colorSpace = 'srgb';
  const constructionTexture = useTexture(
    '/textures/large_scale_lightmap_denoised.jpg'
  );
  constructionTexture.flipY = false;
  constructionTexture.colorSpace = 'srgb';
  // constructionTexture.internalFormat = 'RGBA8UI';

  const charactersTexture = useTexture('/textures/character_baked_AO.jpg');
  charactersTexture.flipY = false;

  const model = useGLTF('models/office.gltf');
  const { nodes, materials, animations, scene, cameras } = model;
  console.log(model);

  const mixer = useRef(new THREE.AnimationMixer(scene));
  const action = useRef(mixer.current.clipAction(animations[0]));
  console.log('AAA', action.current);
  action.current.play();

  useEffect(() => {
    model.scene.traverse((n) => {
      if (n.isMesh) {
        // n.castShadow = true;
        // n.receiveShadow = true;
        // n.geometry.setAttribute(
        //   'uv2',
        //   new BufferAttribute(n.geometry.attributes.uv.array, 2)
        // );
        // if (n.material.map) n.material.map.anisotropy = 4;

        n.material.toneMapped = false;
        n.material.emissive = new THREE.Color('#fdfdff');
        n.material.emissiveIntensity = 0.35;
        n.material.envMapIntensity = 0.8;

        if (n.name === 'global_ao_baked_objects') {
          n.material.map = globalTexture;
          // n.material.aoMapIntensity = 0.2;
          n.material.toneMapped = false;
          // n.material.metalness = 0.1;
        }
        if (n.name === 'local_ao_baked_objects') {
          n.material.map = localTexture;
          n.material.toneMapped = false;
          // n.material.metalness = 0.1;
        }
        if (n.name === 'characters_and_non_baked_objects') {
          // n.material.map = charactersTexture;
          // n.material.aoMap = charactersTexture;
          // n.material.toneMapped = false;
        }
        if (n.name === 'construction') {
          n.material.map = constructionTexture;
          // n.material.aoMap = constructionTexture;
          n.material.toneMapped = false;
          n.material.emissive = new THREE.Color(0xffffff);
          n.material.emissiveIntensity = 0.4;
          // n.material.envMapIntensity = 1.8;
          // n.material.transparent = true;
          // n.material.opacity = 1.0;
          // n.material.aoMapIntensity = 0;
          n.material.envMapIntensity = 0.8;
          // n.material.metalness = 0.1;
        }
        if (n.name === 'hitbox') {
          n.material.visible = false;
        }
      }
    });
  }, [model]);

  useFrame((state, delta) => {
    mixer.current.update(0.01);
    state.camera.position.lerp(cameras[0].parent.position, 0.08);
    state.camera.quaternion.slerp(cameras[0].parent.quaternion, 0.08);
    state.camera.rotation.copy(cameras[0].parent.rotation);
    state.camera.scale.copy(cameras[0].parent.scale);
    state.camera.updateProjectionMatrix();
    state.camera.updateMatrixWorld();
  });

  return (
    <group dispose={null}>
      <primitive ref={modelRef} object={scene} position={[0, 0, 0]} />
      {/*<mesh*/}
      {/*  name="characters_and_non_baked_objects"*/}
      {/*  geometry={nodes.characters_and_non_baked_objects.geometry}*/}
      {/*  material={materials.character_baked_ao_mat}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="global_ao_baked_objects"*/}
      {/*  geometry={nodes.global_ao_baked_objects.geometry}*/}
      {/*  material={materials.global_ao_baked_mat}*/}
      {/*  position={[6.127998352050781, 0, 9.667462348937988]}*/}
      {/*  rotation={[0, -0.6806786829081602, 0]}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="construction"*/}
      {/*  geometry={nodes.construction.geometry}*/}
      {/*  material={materials.constructions_baked_material}*/}
      {/*  position={[0, 0, 0]}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="flickering_lamp"*/}
      {/*  geometry={nodes.flickering_lamp.geometry}*/}
      {/*  material={materials.flickering_emission_material}*/}
      {/*  // position={[0, 0, 0]}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="tv_screen"*/}
      {/*  geometry={nodes.tv_screen.geometry}*/}
      {/*  material={materials.tv_screen_mat}*/}
      {/*  position={[-3.958855628967285, 1.502101182937622, -7.672811508178711]}*/}
      {/*  rotation={[0.6141693274010982, -1.019226662099748, 0.08957942570997013]}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="hitbox"*/}
      {/*  geometry={nodes.hitbox.geometry}*/}
      {/*  material={materials.tv_screen_mat}*/}
      {/*  // position={[-3.958855628967285, 1.502101182937622, -7.672811508178711]}*/}
      {/*  // rotation={[0.6141693274010982, -1.019226662099748, 0.08957942570997013]}*/}
      {/*/>*/}
      {/*<mesh*/}
      {/*  name="emission_objects"*/}
      {/*  geometry={nodes.emission_objects.geometry}*/}
      {/*  material={materials.emission}*/}
      {/*  position={[4.414929389953613, 8.71803251811798e-8, 11.975165367126465]}*/}
      {/*  rotation={[3.141592653589793, -0.5064906106361053, 3.141592653589793]}*/}
      {/*/>*/}
      {/*{nodes.local_ao_baked_objects.geometry && (*/}
      {/*  <mesh*/}
      {/*    name="local_ao_baked_objects"*/}
      {/*    geometry={nodes.local_ao_baked_objects.geometry}*/}
      {/*    material={materials.global_ao_baked_mat}*/}
      {/*    position={[4.311942100524902, 1.9899265766143799, 11.965597152709961]}*/}
      {/*  />*/}
      {/*)}*/}
    </group>
  );
};

useGLTF.preload('models/office.gltf');
