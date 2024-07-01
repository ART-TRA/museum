import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper } from 'three';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';

export const Figures = () => {
  const dirLight = useRef(null);
  // useHelper(dirLight, DirectionalLightHelper, 1, 'red');

  const { isDesktop } = useResize();
  const renderFigures = useRef();
  const { loadModel } = useKTX2Loader();
  const [homeModel, setHomeModel] = useState(null);

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

  useEffect(() => {
    loadModel((model) => {
      setHomeModel(model);
      // renderFigures.current.add(model.scene);
    });
  }, []);

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
      <directionalLight
        ref={dirLight}
        intensity={2.0}
        position={[7, 4, 18]}
        castShadow={false}
        dispose
      />
      <BackPlane />
      {homeModel && (
        <group>
          <Pyramid model={homeModel.scene.children[4]} />
          <Rectangle model={homeModel.scene.children[3]} />
          <HalfTorus model={homeModel.scene.children[1]} />
          <Sphere model={homeModel.scene.children[5]} />
          <Cube model={homeModel.scene.children[2]} />
        </group>
      )}
    </group>
  );
};
