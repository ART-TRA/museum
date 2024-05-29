import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';
import * as THREE from 'three';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const TEXTURES_DATA = [
  { name: 'map', url: '/textures/figures/sphere/color.ktx2' },
  { name: 'aoMap', url: '/textures/figures/sphere/color.ktx2' },
  // { name: 'envMap', url: '/textures/figures/sphere/color.ktx2' },
  { name: 'normalMap', url: '/textures/figures/sphere/normal.ktx2' },
  {
    name: 'displacementMap',
    url: '/textures/figures/sphere/displacement.ktx2',
  },
  // { name: 'roughnessMap', url: '/textures/figures/sphere/rough.ktx2' },
  // { name: 'metalnessMap', url: '/textures/figures/sphere/metal.ktx2' },
];

export const Sphere = () => {
  const { onFigureClick, onFigureHover } = useFigures();
  const ktx2Loader = useKTX2Loader();
  // const textures = useTextures();
  const { gl } = useThree();
  const ref = useRef();

  useEffect(() => {
    TEXTURES_DATA.forEach((data) => {
      ktx2Loader.loadTexture(data.url, (texture) => {
        if (data.name === 'map') {
          texture.repeat.set(1, 1);
          texture.minFilter = THREE.NearestFilter;
          texture.magFilter = THREE.NearestFilter;
          texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
          texture.mapping = THREE.EquirectangularReflectionMapping;
          console.log('sphere vol1');
          // ref.current.material.aoMap = texture;
        }

        if (data.name === 'normalMap') {
          texture.repeat.set(2.9, 2.9);
          texture.wrapT = texture.wrapS = THREE.RepeatWrapping;
        }

        // texture.minFilter = texture.magFilter = THREE.NearestFilter;
        ref.current.material[data.name] = texture;
        gl.initTexture(texture);
        // ref.current.material.needsUpdate = true;
      });
    });
    console.log('SPHERE', ref.current.material);
  }, []);

  return (
    <FloatWrap
      floatParams={{
        position: [0, 1.9, 1],
        rotation: [Math.PI / 3.5, 0, 0],
        speed: 1,
        rotationIntensity: 0.3,
        floatIntensity: 0.4,
      }}
    >
      <mesh
        ref={ref}
        name="sphere"
        // castShadow
        // receiveShadow
        // geometry={nodes.Sphere.geometry}
        // scale={0.9}
        position={[0.9, -1.831, 3]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[3])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[3], event?.object?.scale, 2000)
        }
      >
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshPhysicalMaterial
          side={THREE.FrontSide}
          clearcoat={0.5}
          metalness={1}
          ior={0.1}
          color={'#f8f8f8'}
          reflectivity={5.2}
          // envMapIntensity={0.5}
          aoMapIntensity={0.4}
          normalScale={0.05}
          // roughnessScale={10.7}
          roughness={0.38}
          displacementScale={0}
          iridescence={0.09}
          flatShading={false}
          // toneMapping={false}

          // roughnessMap={textures.color}
          // envMap={textures.color}
          // iridescenceIOR={10.3}
          //emissive={'#595959'}
          // clearcoatRoughness={0.6}
        />
      </mesh>
    </FloatWrap>
  );
};
