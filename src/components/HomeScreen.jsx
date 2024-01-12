import React from 'react';

export const HomeScreen = () => {
  return (
    <group rotation={[0, Math.PI * 0.5, 0]}>
      <mesh position={[2, 0, 0]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial />
      </mesh>
      <mesh
        position={[4, 0, 0]}
        rotation={[-Math.PI * 0.14, Math.PI * 0.1, Math.PI * 0.15]}
      >
        <boxGeometry args={[0.5, 3, 0.5]} />
        <meshStandardMaterial />
      </mesh>
      <mesh position={[2, 4, 0]}>
        <torusGeometry />
        <meshStandardMaterial />
      </mesh>

      <mesh position={[-0.5, -0.4, -2]}>
        <sphereGeometry args={[0.55, 32]} />
        <meshStandardMaterial />
      </mesh>

      <mesh
        position={[-2, 0, 0]}
        rotation={[-Math.PI * 0.15, Math.PI * 0.05, -Math.PI * 0.1]}
      >
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
};
