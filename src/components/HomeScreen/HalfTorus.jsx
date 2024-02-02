import { useEffect, useRef } from 'react';
import { Float } from '@react-three/drei';
import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { changeScale } from 'src/components/HomeScreen';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';

export const HalfTorus = ({ nodes }) => {
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
      speed={0.9} // Animation speed, defaults to 1
      rotationIntensity={1} // XYZ rotation intensity, defaults to 1
      floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.2, 0.2]}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Tube.geometry}
        // material={nodes.Tube.material}
        position={[-1.175, -0.046, -1.074]}
        rotation={[-2.966, -1.021, 2.787]}
        onPointerOver={(event) => onHover(event)}
        onClick={() => onFigureClick(activeRoomKeys[2])}
      >
        <meshStandardMaterial
          // aoMap={textures.rough}
          roughness={1}
          color={'#fffef6'}
          roughnessMap={textures.rough}
          // displacementMap={textures.rough}
          // displacementScale={0.01}
        />
      </mesh>
    </Float>
  );
};
