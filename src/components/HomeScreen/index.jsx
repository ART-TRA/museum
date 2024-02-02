import React, { useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Background } from 'src/components/HomeScreen/Background';
import { Pyramid } from 'src/components/HomeScreen/Pyramid';
import { CubeLong } from 'src/components/HomeScreen/CubeLong';
import { HalfTorus } from 'src/components/HomeScreen/HalfTorus';
import { Cube } from 'src/components/HomeScreen/Cube';
import { Sphere } from 'src/components/HomeScreen/Sphere';
import gsap from 'gsap';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useRecoilValue } from 'recoil';

export const changeScale = (mesh) => {
  gsap.from(mesh?.scale, {
    x: 0.7,
    y: 0.7,
    z: 0.7,
    duration: 1,
    ease: 'elastic.out(1.5, 0.5)',
    stagger: {
      grid: [20, 20],
      amount: 0.7,
    },
  });
};

export const HomeScreen = ({ model }) => {
  const activeScreen = useRecoilValue(activeScreenAtom);
  const { camera } = useThree();
  useFrame((state) => {
    state.camera.position.lerp(
      new THREE.Vector3(-state.mouse.x * 1.6, -state.mouse.y * 1.6, 18),
      0.05
    );

    state.camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  useEffect(() => {
    if (activeScreen === 'figures') {
      gsap.fromTo(
        camera.position,
        {
          z: 0,
        },
        {
          duration: 2,
          z: camera.position.z,
        }
      );
    }
  }, [activeScreen]);

  return (
    <group dispose={null} rotation={[0, 0, 0]}>
      <PerspectiveCamera
        makeDefault={false}
        far={10000000000}
        near={0.01}
        fov={0.773}
        position={[0, 0, 715.188]}
      />
      <Background />
      <Pyramid nodes={model?.nodes} />
      <CubeLong nodes={model?.nodes} />
      <HalfTorus nodes={model?.nodes} />
      <Sphere nodes={model?.nodes} />
      <Cube nodes={model?.nodes} />
    </group>
  );
};
