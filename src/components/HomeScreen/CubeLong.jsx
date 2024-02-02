import { useRef, useEffect } from 'react';
import { Float } from '@react-three/drei';
import { changeScale } from 'src/components/HomeScreen';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { useFigures } from 'src/components/HomeScreen/useFigures';

export const CubeLong = ({ nodes }) => {
  const meshRef = useRef();
  const textures = useFiguresTextures();
  const hovered = useRef(false);
  const { onFigureClick } = useFigures();

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
      speed={0.7} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        // geometry={nodes.Cube.geometry}
        // material={nodes.Cube.material}
        position={[-1.996, 0.091, -0.837]}
        rotation={[0.459, 0.098, -0.347]}
        onPointerOver={(event) => onHover(event)}
        onClick={() => onFigureClick(activeRoomKeys[1])}
      >
        <boxGeometry args={[1.4, 7, 1.3]} />
        <meshStandardMaterial
          // color={'#ffffff'}
          map={textures.colored}
          normalMap={textures.normal}
          // aoMap={textures.exhibits.aoShoe1}
          toneMapped={false}
        />
      </mesh>
    </Float>
  );
};
