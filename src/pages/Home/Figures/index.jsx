import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { Cube } from 'src/pages/Home/Figures/Cube';
import { Pyramid } from 'src/pages/Home/Figures/Pyramid';
import { HalfTorus } from 'src/pages/Home/Figures/HalfTorus';
import { Sphere } from 'src/pages/Home/Figures/Sphere';
import { Rectangle } from 'src/pages/Home/Figures/Rectangle';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { BackPlane } from 'src/pages/Home/Figures/BackPlane';
import { useResize } from 'src/hooks/useResize';
import { useFigures } from 'src/hooks/useFigures';
import { useTouch } from 'src/hooks/useTouch';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';

export const Figures = () => {
  const { isDesktop } = useResize();
  const renderFigures = useRef();
  const homeModel = useGLTF('models/figures.glb');
  const { onFigureClick } = useFigures();
  const activeScreen = useRecoilValue(activeScreenAtom);
  const { swipeDirection } = useTouch();
  const firstMount = useRef(true);

  const slideToRoom = useCallback(() => {
    if (activeScreen === 'figures' && swipeDirection === 'up') {
      if (firstMount.current) {
        onFigureClick(activeRoomKeys[0]);
      }

      firstMount.current = false;
    }
  }, [activeScreen, swipeDirection]);

  const slideToRoomByWheel = () => {
    if (activeScreen === 'figures') {
      if (firstMount.current) {
        onFigureClick(activeRoomKeys[0]);
      }

      firstMount.current = false;
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('touchmove', slideToRoom);

    return () => {
      window.removeEventListener('touchmove', slideToRoom);
    };
  }, [slideToRoom, swipeDirection]);

  return (
    <group
      onWheel={slideToRoomByWheel}
      // visible={activeScreen !== 'room'}
      ref={renderFigures}
      position={isDesktop ? [0, 0, 0] : [0, -1, -17]}
      rotation={[-Math.PI * 0.05, 0, 0]}
      dispose={null}
    >
      <BackPlane />
      <group>
        <Pyramid nodes={homeModel?.nodes} />
        <Rectangle />
        <HalfTorus nodes={homeModel?.nodes} />
        <Sphere />
        <Cube />
      </group>
    </group>
  );
};

useGLTF.preload('models/figures.glb');
