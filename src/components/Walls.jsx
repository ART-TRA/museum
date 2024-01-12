import React from 'react';
import { Html, useGLTF, Text, Billboard } from '@react-three/drei';
import { useTextures } from 'src/components/useTextures';
import titleFont from '/fonts/AmaticSC/AmaticSCBold.woff';
import {
  activeRoomDesc,
  activeRoomKeys,
  activeRoomNames,
} from 'src/recoil/atoms/activeRoom';

const TITLES = [
  {
    key: activeRoomKeys[0],
    title: activeRoomNames[activeRoomKeys[0]],
    description: activeRoomDesc[activeRoomKeys[0]],
    position: [-9.6, 1.7, -1.7],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--same',
  },
  {
    key: activeRoomKeys[1],
    title: activeRoomNames[activeRoomKeys[1]],
    description: activeRoomDesc[activeRoomKeys[1]],
    position: [5.4, 1.7, 21.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--talents',
  },
  {
    key: activeRoomKeys[2],
    title: activeRoomNames[activeRoomKeys[2]],
    description: activeRoomDesc[activeRoomKeys[2]],
    position: [45.6, 2.9, 2.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--dreams',
  },
  {
    key: activeRoomKeys[3],
    title: activeRoomNames[activeRoomKeys[3]],
    description: activeRoomDesc[activeRoomKeys[3]],
    position: [75.8, 1.7, -3.1],
    rotation: [0, 0, 0],
    className: 'wall wall--celebrate',
  },
  {
    key: activeRoomKeys[4],
    title: activeRoomNames[activeRoomKeys[4]],
    description: activeRoomDesc[activeRoomKeys[4]],
    position: [75, 1.7, -23.8],
    rotation: [0, -Math.PI * 0.25, 0],
    className: 'wall wall--toys',
  },
];

const RoomTitles = () => {
  return (
    <>
      {TITLES.map((item) => (
        <Html
          // id={item.key}
          key={item.key}
          position={item.position}
          rotation={item.rotation}
          transform
          occlude
          // prepend
          className={item.className}
          zIndexRange={[0, -1]}
          style={{ zIndex: -4, userSelect: 'none' }}
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Html>
        // <Text
        //   maxWidth={3}
        //   textAlign="center"
        //   // whiteSpace="overflowWrap"
        //   position={item.position}
        //   rotation={item.rotation}
        //   anchorX="center"
        //   anchorY="middle"
        //   color="#4c4c4c"
        //   key={item.key}
        //   font={titleFont}
        //   fontSize={0.5}
        //   lineHeight={1}
        //   children={item.title}
        // />
      ))}
    </>
  );
};

export const Walls = () => {
  const { nodes } = useGLTF('models/model.gltf');
  const textures = useTextures();

  return (
    <group name="Walls">
      <RoomTitles />
      <mesh name="Ceiling_11" geometry={nodes.Ceiling_11.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.floors.aoCeiling}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_113" geometry={nodes.WALL_113.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall13}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_112" geometry={nodes.WALL_112.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall12}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_111" geometry={nodes.WALL_111.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall11}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_110" geometry={nodes.WALL_110.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall10}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="WALL_19"
        geometry={nodes.WALL_19.geometry}
        position={[79.43, -0.001, -0.365]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall9}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_18" geometry={nodes.WALL_18.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall8}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="WALL_17"
        geometry={nodes.WALL_17.geometry}
        position={[52.288, 6.3, 6.693]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall7}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_16" geometry={nodes.WALL_16.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall6}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="WALL_15"
        geometry={nodes.WALL_15.geometry}
        position={[15.615, -0.001, 21.461]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall5}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_14" geometry={nodes.WALL_14.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall4}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_13" geometry={nodes.WALL_13.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall3}
          toneMapped={false}
        />
      </mesh>
      <mesh name="WALL_12" geometry={nodes.WALL_12.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall2}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="WALL_11"
        geometry={nodes.WALL_11.geometry}
        position={[52.797, 0.207, 0.163]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.walls.aoWall1}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

useGLTF.preload('models/model.gltf');
