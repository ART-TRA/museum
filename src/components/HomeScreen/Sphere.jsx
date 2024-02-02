import { useEffect, useRef } from 'react';
import { Float } from '@react-three/drei';
import { changeScale } from 'src/components/HomeScreen';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';

export const Sphere = ({ nodes }) => {
  const meshRef = useRef();
  const hovered = useRef(false);
  const { onFigureClick } = useFigures();

  const materialArgs = useRef({
    clearcoat: 0.25,
    clearcoatRoughness: 0.6,
    roughness: 0.4,
    metalness: 0.9,
    color: '#b2b2b2',
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
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={0.3} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.4} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      // floatingRange={[1, 0]}
      position={[0, 1.9, 1]}
      rotation={[Math.PI / 3.5, 0, 0]}
    >
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        // material={nodes.Sphere.material}
        scale={0.9}
        position={[0.9, -1.831, 3]}
        onPointerOver={(event) => onHover(event)}
        onClick={() => onFigureClick(activeRoomKeys[3])}
      >
        <meshStandardMaterial {...materialArgs.current} />
      </mesh>
    </Float>
  );
};
