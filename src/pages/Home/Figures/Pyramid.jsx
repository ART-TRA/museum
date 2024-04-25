import React from 'react';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
// import * as THREE from 'three';
// import {
//   MeshTransmissionMaterial,
//   RenderTexture,
//   Preload,
//   Text,
// } from '@react-three/drei';
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
          {/*<torusGeometry args={[1, 0.4, 128, 64]} />*/}
          {/*<torusKnotGeometry args={[1, 0.4, 256, 32]} />*/}

          {/*<MeshTransmissionMaterial*/}
          {/*  backside*/}
          {/*  backsideThickness={10}*/}
          {/*  thickness={5}*/}
          {/*  color={'#ace7e7'}*/}
          {/*  transmission={0.9}*/}
          {/*  // envMapIntensity={2}*/}
          {/*>*/}
          {/*  <color attach="background" args={['#fff']} />*/}
          {/*</MeshTransmissionMaterial>*/}

          <meshPhysicalMaterial
            // transparent
            // opacity={0.6}
            // transmission={0.99}
            color={'#fff'}
            roughness={0.012}
            metalness={0.1}
            ior={1.5}
            envMapIntensity={0.9}
            // clearcoat={1}
            // envMap={textures.env}
            // side={THREE.DoubleSide}
            // reflectivity={0.2}
            // toneMapped={false}
          />
          {/*<mesh position={[0.94, -1.18, 0]}>*/}
          {/*  <boxGeometry args={[0.004, 0.004, 1.72]} />*/}
          {/*  <meshStandardMaterial color={'#fff'} side={THREE.DoubleSide} />*/}
          {/*</mesh>*/}
          {/*<mesh position={[0, -1.18, -0.88]} rotation={[0, Math.PI * 0.5, 0]}>*/}
          {/*  <boxGeometry args={[0.004, 0.004, 1.8]} />*/}
          {/*  <meshStandardMaterial color={'#fff'} side={THREE.DoubleSide} />*/}
          {/*</mesh>*/}
          {/*<mesh*/}
          {/*  position={[0.48, -0.07, -0.45]}*/}
          {/*  rotation={[-Math.PI * 0.38, -Math.PI * 0.118, 0]}*/}
          {/*>*/}
          {/*  <boxGeometry args={[0.007, 0.007, 2.5]} />*/}
          {/*  <meshStandardMaterial color={'#ffffff'} side={THREE.DoubleSide} />*/}
          {/*</mesh>*/}
        </mesh>
      </FloatWrap>
    </>
  );
};
