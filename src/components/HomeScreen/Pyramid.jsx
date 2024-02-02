import React, { useEffect, useRef } from 'react';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { changeScale } from 'src/components/HomeScreen';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { FlakesTexture } from 'src/utils/FlakesTexture';
import { useFigures } from 'src/components/HomeScreen/useFigures';

export const Pyramid = ({ nodes }) => {
  const meshRef = useRef();
  const textures = useFiguresTextures();
  const hovered = useRef(false);
  const activeScreen = useRecoilValue(activeScreenAtom);
  const { onFigureClick } = useFigures();

  const onHover = (event) => {
    if (activeScreen === 'figures') {
      event.stopPropagation();
      if (!hovered.current) {
        hovered.current = true;
        changeScale(meshRef.current);
        setTimeout(() => {
          hovered.current = false;
        }, 500);
      }
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
        geometry={nodes.Pyramid.geometry}
        // material={nodes.Pyramid.material}
        position={[-3.882, 0.741, 2.0]}
        rotation={[0.629, 0.208, 0.241]}
        onPointerOver={(event) => onHover(event)}
        onClick={() => onFigureClick(activeRoomKeys[0])}
      >
        <MeshTransmissionMaterial
          clearcoat={0.1}
          thickness={0.1}
          anisotropicBlur={0.6}
          chromaticAberration={0.6}
          samples={4}
          resolution={512}
          roughness={0.8}
          roughnessMap={textures.noise}
          map={textures.noise}
          normalMap={new THREE.CanvasTexture(new FlakesTexture())}
        />
      </mesh>
    </Float>
  );
};
