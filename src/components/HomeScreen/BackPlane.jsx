import React from 'react';

export const BackPlane = () => {
  return (
    <mesh position={[0, 0, -5]} visible={false}>
      <planeGeometry args={[24, 20]} />
      <meshStandardMaterial color={'#ff0000'} />
    </mesh>
  );
};
