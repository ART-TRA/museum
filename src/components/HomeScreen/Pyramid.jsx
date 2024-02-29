import React from 'react';
import * as THREE from 'three';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { FigureWrap } from 'src/components/HomeScreen/FigureWrap';

export const Pyramid = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <>
      <FigureWrap
        floatParams={{
          speed: 0.7,
          rotationIntensity: 1.0,
          floatIntensity: 1.0,
          floatingRange: [-0.2, 0.2],
        }}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pyramid.geometry}
          position={[-3.6, 0.741, 2.0]}
          rotation={[0.629, 0.9, 0.241]}
          onPointerOver={onFigureHover}
          onClick={(event) =>
            onFigureClick(activeRoomKeys[0], event?.object?.scale)
          }
        >
          <meshPhysicalMaterial
            // transparent
            // opacity={0.6}
            transmission={0.99}
            color={'#d3d3d3'}
            roughness={0.012}
            metalness={0.1}
            ior={1.5}
            // envMap={textures.env}
            envMapIntensity={1}
            // toneMapped={false}
          />
          <mesh position={[0.94, -1.18, 0]}>
            <boxGeometry args={[0.004, 0.004, 1.72]} />
            <meshStandardMaterial color={'#fff'} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, -1.18, -0.88]} rotation={[0, Math.PI * 0.5, 0]}>
            <boxGeometry args={[0.004, 0.004, 1.8]} />
            <meshStandardMaterial color={'#fff'} side={THREE.DoubleSide} />
          </mesh>
          <mesh
            position={[0.48, -0.07, -0.45]}
            rotation={[-Math.PI * 0.38, -Math.PI * 0.118, 0]}
          >
            <boxGeometry args={[0.007, 0.007, 2.5]} />
            <meshStandardMaterial color={'#ffffff'} side={THREE.DoubleSide} />
          </mesh>
        </mesh>
      </FigureWrap>
    </>
  );
};
