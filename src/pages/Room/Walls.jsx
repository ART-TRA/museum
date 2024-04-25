import React from 'react';
import { WallTitles } from 'src/pages/Room/WallTitles';

export const Walls = ({ nodes, rootRef }) => {
  return (
    <group ref={rootRef} name="Walls">
      <WallTitles />
      <mesh name="WALL_10" geometry={nodes.Ceiling_11.geometry} />
      <mesh name="WALL_113" geometry={nodes.WALL_113.geometry} />
      <mesh name="WALL_112" geometry={nodes.WALL_112.geometry} />
      <mesh name="WALL_111" geometry={nodes.WALL_111.geometry} />
      <mesh name="WALL_110" geometry={nodes.WALL_110.geometry} />
      <mesh
        name="WALL_19"
        position={[79.43, -0.001, -0.365]}
        geometry={nodes.WALL_19.geometry}
      />
      <mesh name="WALL_18" geometry={nodes.WALL_18.geometry} />
      <mesh
        name="WALL_17"
        position={[52.288, 6.3, 6.693]}
        geometry={nodes.WALL_17.geometry}
      />
      <mesh name="WALL_16" geometry={nodes.WALL_16.geometry} />
      <mesh
        name="WALL_15"
        position={[15.615, -0.001, 21.461]}
        geometry={nodes.WALL_15.geometry}
      />
      <mesh name="WALL_14" geometry={nodes.WALL_14.geometry} />
      <mesh name="WALL_13" geometry={nodes.WALL_13.geometry} />
      <mesh name="WALL_12" geometry={nodes.WALL_12.geometry} />
      <mesh
        name="WALL_11"
        position={[52.797, 0.207, 0.163]}
        geometry={nodes.WALL_11.geometry}
      />
    </group>
  );
};
