import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { Figures } from 'src/pages/Home/Figures';
import { useResize } from 'src/hooks/useResize';

export const Home = () => {
  const renderFigures = useRef();
  const { isDesktop } = useResize();
  const stateCameraPosition = useRef(new THREE.Vector3());
  const activeScreen = useRecoilValue(activeScreenAtom);

  useFrame((state) => {
    if (activeScreen !== 'room' && isDesktop) {
      stateCameraPosition.current.set(
        -17.6,
        -state.pointer.y * 1.6 + 2.5,
        -state.pointer.x * 1.6 - 2.7
      );
      state.camera.position.lerp(stateCameraPosition.current, 0.05);
      state.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  });

  if (activeScreen !== 'room') {
    return (
      <group
        ref={renderFigures}
        position={isDesktop ? [0, 0, 0] : [-6, 0, -1]}
        rotation={
          isDesktop ? [0, -Math.PI * 0.539, 0] : [0, -Math.PI * 0.55, 0]
        }
        // visible={activeScreen !== 'room'}
      >
        <Figures />
      </group>
    );
  }

  return null;
};
