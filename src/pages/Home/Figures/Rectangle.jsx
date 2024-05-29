import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/hooks/useFigures';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';
import { useThree } from '@react-three/fiber';

const TEXTURES_DATA = [
  { name: 'map', url: '/textures/figures/rectangle/color.ktx2' },
  { name: 'normalMap', url: '/textures/figures/rectangle/normal.ktx2' },
  // {
  //   name: 'displacementMap',
  //   url: '/textures/figures/rectangle/displacement.ktx2',
  // },
  // { name: 'roughnessMap', url: '/textures/figures/rectangle/rough.ktx2' },
  { name: 'aoMap', url: '/textures/figures/rectangle/ao.ktx2' },
  { name: 'metalnessMap', url: '/textures/figures/rectangle/arm.ktx2' },
  // { name: 'top', url: '/textures/figures/rectangle/top.ktx2' },
];

export const Rectangle = () => {
  const { onFigureClick, onFigureHover } = useFigures();
  const ktx2Loader = useKTX2Loader();
  const { gl } = useThree();
  const ref = useRef();

  useEffect(() => {
    TEXTURES_DATA.forEach((data) => {
      ktx2Loader.loadTexture(data.url, (texture) => {
        texture.repeat.set(0.15, 1.1);
        texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
        texture.minFilter = texture.magFilter = THREE.NearestFilter;
        texture.offset.set(0.34, -0.32);
        gl.initTexture(texture);
        console.log('BOX', ref.current);
        ref.current.material[data.name] = texture;
      });
    });
  }, []);

  return (
    <FloatWrap
      floatParams={{
        speed: 0.7,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        ref={ref}
        name="rectangle"
        // castShadow
        // receiveShadow
        // geometry={nodes.Cube.geometry}
        position={[-1.996, 0.091, -0.837]}
        rotation={[0.459, 0.098, -0.347]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[1])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[1], event?.object?.scale, 1200)
        }
      >
        <boxGeometry args={[1.42, 7.02, 1.42]} />
        <meshStandardMaterial
          color={'#fff8f0'}
          aoMapIntensity={0.2}
          normalScale={0.5}
        />
      </mesh>
    </FloatWrap>
  );
};
