import React from 'react';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import * as THREE from 'three';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Pyramid = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <>
      <FloatWrap
        floatParams={{
          speed: 0.7,
          rotationIntensity: 1.0,
          floatIntensity: 1.0,
          floatingRange: [-0.2, 0.2],
        }}
      >
        <mesh
          name="pyramid"
          // castShadow
          // receiveShadow
          geometry={nodes.Pyramid.geometry}
          position={[-3.6, 0.741, 2.0]}
          rotation={[0.629, 0.9, 0.241]}
          // rotation={[-Math.PI * 0.15, Math.PI * 0.25, 0]}
          onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[0])}
          // onPointerOut={(event) => onFigureHover(event, 'out')}
          onClick={(event) =>
            onFigureClick(activeRoomKeys[0], event?.object?.scale)
          }
        >
          <pointLight
            position={[0.4, -0.5, -0.65]}
            intensity={8}
            color={'#4264ff'}
            castShadow={false}
            dispose
          />
          <meshPhysicalMaterial
            // transparent
            // opacity={0.6}
            transmission={0.92}
            color={'#fcfcff'}
            roughness={0.25}
            metalness={0.07}
            ior={3.5}
            clearcoat={0.3}
            clearcoatRoughness={1}
            // aoMap={textures.env}
            // envMap={textures.env}
            // aoMapIntensity={0.4}
            // envMapIntensity={0.4}
            side={THREE.DoubleSide}
            reflectivity={0.9}
            toneMapped={false}
          />
        </mesh>
      </FloatWrap>
    </>
  );
};
