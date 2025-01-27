import React, { useRef } from 'react';
import * as THREE from 'three';

export const Podiums = ({ nodes, rootRef }) => {
  const material = useRef(
    new THREE.MeshStandardMaterial({ color: '#fff', toneMapped: false })
  );

  return (
    <group ref={rootRef} name="Podiums">
      <mesh name="Elements_1_1" geometry={nodes.Elements_11.geometry} />
      <mesh name="Elements_1_2" geometry={nodes.Elements_12.geometry} />
      <mesh
        name="Elements_1_3"
        geometry={nodes.Elements_13.geometry}
        material-toneMapped={false}
        material-color={'#fff'}
        material-aoMapIntensity={0.5}
      />
      <mesh position={[59.6, 0, -47.8]} rotation={[0, Math.PI * 0.1, 0]}>
        <meshBasicMaterial color={'#383838'} />
        <planeGeometry args={[5, 12]} />
      </mesh>
      <mesh name="Elements_1_4" geometry={nodes.Elements_14.geometry} />
      <mesh
        name="Elements_2"
        geometry={nodes.Elements_2.geometry}
        material={material.current}
      />
    </group>
  );
};
