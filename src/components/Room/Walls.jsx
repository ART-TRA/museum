import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useTextures } from 'src/hooks/useTextures';
import { RoomTitles } from 'src/components/Room/RoomTitles';

export const Walls = () => {
  const { nodes } = useGLTF('models/model.glb');
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

useGLTF.preload('models/model.glb');
