import React from 'react';
import { WallTitles } from 'src/pages/Room/WallTitles';
import * as THREE from 'three';

export const Walls = ({ nodes, rootRef }) => {
  return (
    <group ref={rootRef} name="Walls">
      <WallTitles />
      <mesh name="Ceiling" geometry={nodes.Ceiling_11.geometry} />
      <mesh name="Wall_1_13" geometry={nodes.WALL_113.geometry} />
      <mesh name="Wall_1_12" geometry={nodes.WALL_112.geometry} />
      <mesh name="Wall_1_11" geometry={nodes.WALL_111.geometry} />
      <mesh name="Wall_1_10" geometry={nodes.WALL_110.geometry} />
      <mesh
        name="Wall_1_9"
        position={[79.43, -0.001, -0.365]}
        geometry={nodes.WALL_19.geometry}
      />
      <mesh name="Wall_1_8" geometry={nodes.WALL_18.geometry} />
      <mesh
        name="Wall_1_7"
        position={[52.288, 6.3, 6.693]}
        geometry={nodes.WALL_17.geometry}
      />
      <mesh name="Wall_1_6" geometry={nodes.WALL_16.geometry} />
      <mesh
        name="Wall_1_5"
        position={[15.615, -0.001, 21.461]}
        geometry={nodes.WALL_15.geometry}
      />
      <mesh name="Wall_1_4" geometry={nodes.WALL_14.geometry} />
      <mesh name="Wall_1_3" geometry={nodes.WALL_13.geometry} />
      <mesh name="Wall_1_2" geometry={nodes.WALL_12.geometry} />
      <mesh
        name="Wall_1_1"
        position={[52.797, 0.207, 0.163]}
        geometry={nodes.WALL_11.geometry}
      />
      <mesh position={[80.62, 2.9, -37.1]} rotation={[0, Math.PI * 0.25, 0]}>
        <meshStandardMaterial
          transparent
          opacity={0.7}
          color={'#485265'}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
        <planeGeometry args={[3, 2]} />
      </mesh>
    </group>
  );
};
