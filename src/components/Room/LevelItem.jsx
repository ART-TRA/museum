import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { ExhibitClickArea } from 'src/components/Room/ExhibitClickArea';

export const LevelItem = ({
  name,
  position,
  rotation,
  scale,
  children,
  onClick,
  limits,
  clickAreaPosition,
  clickAreaSize,
  onExhibitClick,
}) => {
  const roomDuration = useRecoilValue(roomDurationAtom);

  // useEffect(() => {
  //   document.body.style.cursor = hovered ? '/images/hover.webm, auto' : 'auto';
  //   return () => (document.body.style.cursor = 'auto');
  // }, [hovered]);

  return (
    <group
      name={name}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={() => {
        if (roomDuration >= limits?.[0] && roomDuration < limits?.[1]) {
          onClick?.();
        }
      }}
    >
      <ExhibitClickArea
        position={clickAreaPosition}
        size={clickAreaSize}
        onClick={() => {
          if (roomDuration >= limits?.[0] && roomDuration < limits?.[1]) {
            onExhibitClick?.();
          }
        }}
      />
      {children}
    </group>
  );
};
