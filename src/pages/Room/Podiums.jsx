import React, { useRef } from 'react';
import * as THREE from 'three';

export const Podiums = ({ nodes, rootRef }) => {
  const material = useRef(
    new THREE.MeshStandardMaterial({ color: '#fff', toneMapped: false })
  );

  return (
    <group ref={rootRef} name="Podiums">
      <mesh name="Elements_11" geometry={nodes.Elements_11.geometry} />
      <mesh name="Elements_12" geometry={nodes.Elements_12.geometry} />
      <mesh name="Elements_13" geometry={nodes.Elements_13.geometry} />
      <mesh name="Elements_14" geometry={nodes.Elements_14.geometry} />
      <mesh
        name="Elements_2"
        geometry={nodes.Elements_2.geometry}
        material={material.current}
      />
    </group>
  );
};
