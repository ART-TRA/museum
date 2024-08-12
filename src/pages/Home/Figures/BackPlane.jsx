import React from 'react';
import { useResize } from 'src/hooks/useResize';
import { useFigures } from 'src/hooks/useFigures';
import { hoveredKeys } from 'src/recoil/atoms/lastHoveredFigureValue';

export const BackPlane = () => {
  const { isDesktop } = useResize();
  const { onFigureHover } = useFigures();

  return (
    <mesh
      position={[0, 0, -10]}
      onPointerEnter={(event) => onFigureHover(event, hoveredKeys.empty)}
    >
      <planeGeometry args={isDesktop ? [45, 25] : [20, 40]} />
      <meshBasicMaterial color={'#fafbff'} toneMapped={false} />
    </mesh>
  );
};
