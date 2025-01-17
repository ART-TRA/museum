import React from 'react';

export const Floors = ({ nodes, rootRef }) => {
  return (
    <group ref={rootRef} name="Floors">
      {/*<mesh*/}
      {/*  rotation={[-Math.PI * 0.5, 0, 0]}*/}
      {/*  position={[0, 0.01, 0]}*/}
      {/*>*/}
      {/*  <planeGeometry args={[100, 100]} />*/}
      {/*  <MeshReflectorMaterial*/}
      {/*    transparent*/}
      {/*    blur={[400, 100]}*/}
      {/*    resolution={1024}*/}
      {/*    mixBlur={0.6}*/}
      {/*    opacity={0.4}*/}
      {/*    depthScale={1.1}*/}
      {/*    minDepthThreshold={0.4}*/}
      {/*    maxDepthThreshold={1.25}*/}
      {/*    roughness={0.4}*/}
      {/*    mirror={0.6}*/}
      {/*  />*/}
      {/*</mesh>*/}
      <mesh
        name="floor_artifacts-helper"
        position={[-44, -0.1, 8]}
        rotation={[-Math.PI * 0.5, 0, 0]}
      >
        <meshStandardMaterial color={'#d7d7d7'} toneMapped={false} />
        <planeGeometry args={[20, 20]} />
      </mesh>
      <mesh
        name="Floor_1_1"
        geometry={nodes.FLOOR_11.geometry}
        position={[-28.507, -0.001, 8.767]}
      />
      <mesh name="Floor_1_2" geometry={nodes.FLOOR_12.geometry} />
      <mesh
        name="Floor_1_3"
        geometry={nodes.FLOOR_13.geometry}
        position={[35.151, 0.757, -0.695]}
      />
      <mesh
        name="Floor_1_4"
        geometry={nodes.FLOOR_14.geometry}
        position={[35.151, 0.757, -0.695]}
      />
      <mesh
        name="Floor_1_5"
        geometry={nodes.FLOOR_15.geometry}
        position={[35.151, 0.757, -0.695]}
      />
    </group>
  );
};
