import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export const setShadows = (obj) => {
  if (obj) {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.side = THREE.FrontSide;
      }
    });
  }
};

export const ModelVol2 = () => {
  const { camera } = useThree();
  const wallRef = useRef();
  const modelRef = useRef();
  const model = useGLTF('/models/level.gltf');
  const { actions } = useAnimations(model.animations, modelRef);

  const mixer = useRef(new THREE.AnimationMixer(model.scene));
  const action = useRef(mixer.current.clipAction(model.animations[0]));
  action.current.play();

  useEffect(() => {
    // console.log('model', model);
    // console.log('modelRef', modelRef.current);
    // modelRef.current.material.side = THREE.DoubleSide;
    // camera.position.copy(model.cameras[0].parent.position);
    // camera.quaternion.copy(model.cameras[0].parent.quaternion);
    // camera.scale.copy(model.cameras[0].parent.scale);
  }, [model]);

  // useEffect(() => {
  //   // console.log('actions', actions);
  //   if (actions && Object.keys(actions)?.length > 0) {
  //     // actions.Main.setLoop(THREE.LoopRepeat);
  //     actions[Object.keys(actions)[0]].reset().fadeIn(0.3).play();
  //     // actions.animation_0.play();
  //   }
  // }, [actions]);

  const onScroll = (event) => {
    console.log('scroll', model.cameras[0].parent.position);
    // camera.position.copy(model.cameras[0].parent.position);
    // camera.quaternion.copy(model.cameras[0].parent.quaternion);
    // camera.scale.copy(model.cameras[0].parent.scale);
    // camera.rotation.copy(model.cameras[0].parent.rotation);
    // camera.updateMatrixWorld(true);
  };

  const onWheel = (event) => {
    if (event.deltaY > 0) {
      mixer.current.update(0.1);
    } else {
      mixer.current.update(-0.1);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('wheel', onWheel);

    return () => {
      document.removeEventListener('wheel', onWheel);
    };
  }, []);

  useFrame((state, delta) => {
    // mixer.current.update(timer.current);
    camera.position.lerp(model.cameras[0].parent.position, delta);
    camera.quaternion.slerp(model.cameras[0].parent.quaternion, delta);
    // camera.rotation.copy(model.cameras[0].parent.rotation);
    // camera.scale.copy(model.cameras[0].parent.scale);
  });

  // const set = useThree((state) => state.set);
  // const mixer = useMemo(
  //   () => new THREE.AnimationMixer(model.scene),
  //   [model.scene]
  // );
  // const clock = useMemo(() => new THREE.Clock(), []);
  // useFrame(() => mixer.update(clock.getDelta()));
  //
  // useEffect(() => {
  //   // Use the camera that's defined in the glTF
  //   set({ camera: model.cameras[0] });
  //
  //   // Start an animation immediately (play it only once)
  //   const action = mixer.clipAction(model.animations[0]);
  //   action.setLoop(THREE.LoopOnce);
  //   action.clampWhenFinished = true;
  //   action.play();
  // }, [model.animations, model.cameras, model.scene, mixer, set]);

  return (
    <group>
      {/*<mesh*/}
      {/*  ref={wallRef}*/}
      {/*  geometry={model.nodes.WALL_1.geometry}*/}
      {/*  material={model.materials.Wall_1}*/}
      {/*/>*/}
      {/*<group name="Camera_Null">*/}
      {/*  <PerspectiveCamera*/}
      {/*    makeDefault*/}
      {/*    far={200000}*/}
      {/*    near={1}*/}
      {/*    fov={50.0}*/}
      {/*    // rotation={[0, Math.PI, 0]}*/}
      {/*    position={[0, 3, 20]}*/}
      {/*    name="Camera_Null"*/}
      {/*  />*/}
      {/*</group>*/}
      <axesHelper args={[150]} />
      <primitive ref={modelRef} object={model.scene} position={[0, 0.06, 0]} />
    </group>
  );
};

useGLTF.preload('models/level.gltf');
