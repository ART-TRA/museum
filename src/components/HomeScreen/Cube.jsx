import { useEffect, useRef } from 'react';
import { Float } from '@react-three/drei';
import { changeScale } from 'src/components/HomeScreen';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';

export const Cube = ({ nodes }) => {
  const meshRef = useRef();
  const hovered = useRef(false);
  const { onFigureClick } = useFigures();

  const materialArgs = useRef({
    clearcoat: 0.1,
    clearcoatRoughness: 0.1,
    roughness: 0.1,
    metalness: 0.3,
    color: '#fff',
  });

  const onHover = (event) => {
    event.stopPropagation();
    if (!hovered.current) {
      hovered.current = true;
      changeScale(meshRef.current);
      setTimeout(() => {
        hovered.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    changeScale(meshRef.current);
  }, [nodes]);

  return (
    <Float
      speed={0.8} // Animation speed, defaults to 1
      rotationIntensity={0.6} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.5} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[0.9, 0.5]}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Cube_1.geometry}
        // material={nodes.Cube_1.material}
        position={[3.172, -0.634, -0.5]}
        rotation={[0.66, 0.36, 0.191]}
        onPointerOver={(event) => onHover(event)}
        onClick={() => onFigureClick(activeRoomKeys[4])}
      >
        <meshStandardMaterial {...materialArgs} />
        {/*<meshPhongMaterial {...materialArgs} />*/}
        {/*<meshMatcapMaterial matcap={textures.matcap2} />*/}
      </mesh>
    </Float>
  );
};
