import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Background } from 'src/components/HomeScreen/Background';
import { Pyramid } from 'src/components/HomeScreen/Pyramid';
import { CubeLong } from 'src/components/HomeScreen/CubeLong';
import { HalfTorus } from 'src/components/HomeScreen/HalfTorus';
import { Cube } from 'src/components/HomeScreen/Cube';
import { Sphere } from 'src/components/HomeScreen/Sphere';
import gsap from 'gsap';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useRecoilState, useRecoilValue } from 'recoil';
import { StartTitle } from 'src/components/HomeScreen/StartTitle';
import { BackPlane } from 'src/components/HomeScreen/BackPlane';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';

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
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const scrollLimit = useRef(4);
  const { onFigureClick } = useFigures();

  const slideToRoom = () => {
    console.log('slideToRoom0', activeScreen);
    if (activeScreen === 'figures') {
      console.log('slideToRoom', scrollLimit.current);
      scrollLimit.current -= 1;

      if (scrollLimit.current <= 0) {
        console.log('onFigureClick');
        onFigureClick(activeRoomKeys[0]);
      }
    }
  };

  useFrame((state) => {
    if (activeScreen !== 'room') {
      state.camera.position.lerp(
        new THREE.Vector3(-state.mouse.x * 1.6, -state.mouse.y * 1.6, 18),
        0.05
      );

      state.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });

  return (
    <group dispose={null} rotation={[0, 0, 0]}>
      <StartTitle
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
      />
      {activeScreen !== 'room' && <Background />}
      <group onWheel={(event) => slideToRoom(event)}>
        <Pyramid nodes={model?.nodes} />
        <CubeLong nodes={model?.nodes} />
        <HalfTorus nodes={model?.nodes} />
        <Sphere nodes={model?.nodes} />
        <Cube nodes={model?.nodes} />
        <BackPlane />
      </group>
    </group>
  );
};
