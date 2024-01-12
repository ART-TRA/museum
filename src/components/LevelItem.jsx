import React, { useState } from 'react';
import { useCursor } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';

export const LevelItem = ({
  name,
  position,
  rotation,
  scale,
  children,
  onClick,
}) => {
  const [hover, setHover] = useState(false);
  const isExhibitActive = useRecoilValue(activeExhibitAtom);
  useCursor(hover);

  return (
    <group
      name={name}
      position={position}
      rotation={rotation}
      scale={scale}
      onPointerOver={() => {
        if (name !== 'hand' && !isExhibitActive) {
          setHover(true);
        }
      }}
      onPointerOut={() => setHover(false)}
      onClick={onClick}
    >
      {children}
    </group>
  );
};
