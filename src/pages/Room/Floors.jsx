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
        name="FLOOR_11"
        geometry={nodes.FLOOR_11.geometry}
        position={[-28.507, -0.001, 8.767]}
      />
      <mesh name="FLOOR_12" geometry={nodes.FLOOR_12.geometry} />
      <mesh
        name="FLOOR_13"
        geometry={nodes.FLOOR_13.geometry}
        position={[35.151, 0.757, -0.695]}
      />
      <mesh
        name="FLOOR_14"
        geometry={nodes.FLOOR_14.geometry}
        position={[35.151, 0.757, -0.695]}
      />
      <mesh
        name="FLOOR_15"
        geometry={nodes.FLOOR_15.geometry}
        position={[35.151, 0.757, -0.695]}
      />
    </group>
  );
};
