import React from 'react';
import { OrbitControls, Stats } from '@react-three/drei';

export const Settings = () => {
  return (
    <>
      <OrbitControls
        enabled={false}
        // enablePan={false}
        // enableZoom={false}
        // enableRotate={false}
      />
      <Stats showPanel={0} className="stats" />
    </>
  );
};
