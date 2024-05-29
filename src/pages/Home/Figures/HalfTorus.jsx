import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TEXTURES_DATA = [
  { name: 'normalMap', url: '/textures/figures/torus/normal.ktx2' },
  { name: 'map', url: '/textures/figures/torus/color.ktx2' },
  {
    name: 'displacementMap',
    url: '/textures/figures/torus/displacement.ktx2',
  },
  // { name: 'roughnessMap', url: '/textures/figures/torus/rough.ktx2' },
  { name: 'metalnessMap', url: '/textures/figures/torus/arm.ktx2' },
  { name: 'aoMap', url: '/textures/figures/torus/ao.ktx2' },
];

export const HalfTorus = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();
  const ktx2Loader = useKTX2Loader();
  const { gl } = useThree();
  const ref = useRef();

  useEffect(() => {
    TEXTURES_DATA.forEach((data) => {
      ktx2Loader.loadTexture(data.url, (texture) => {
        if (data.name === 'map') {
          // texture.minFilter = texture.magFilter = THREE.NearestFilter;
          // texture.offset.set(-0.77, 0.72);
          texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
          texture.repeat.set(3, 3);
          // texture.mapping = THREE.EquirectangularReflectionMapping;
        }

        ref.current[data.name] = texture;
        // ref.current.needsUpdate = true;
        gl.initTexture(texture);
      });
    });
  }, []);

  return (
    <FloatWrap
      floatParams={{
        speed: 0.9,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        // castShadow
        // receiveShadow
        name="torus"
        geometry={nodes.Tube.geometry}
        position={[-1.175, -0.046, -1.074]}
        rotation={[-2.966, -1.021, 2.787]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[2])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[2], event?.object?.scale, 1700)
        }
      >
        <meshStandardMaterial
          ref={ref}
          color={'#ffffff'}
          roughness={0.7}
          aoMapIntensity={0.2}
          displacementScale={0}
          toneMapped={false}
          // roughnessMap={textures.rough}
          // envMap={textures.metal}
          // envMapIntensity={10.1}
        />
      </mesh>
    </FloatWrap>
  );
};
