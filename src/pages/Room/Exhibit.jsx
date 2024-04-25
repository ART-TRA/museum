import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { ExhibitClickArea } from 'src/pages/Room/ExhibitClickArea';
import { ExhibitActiveIndicator } from 'src/pages/Room/ExhibitActiveIndicator';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';

export const Exhibit = ({
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
  indicatorPosition,
  indicatorRotation,
}) => {
  const hovered = useRef(false);
  const roomDuration = useRecoilValue(roomDurationAtom);
  const isExhibitActive = useRecoilValue(activeExhibitAtom);

  const onExhibitHover = (event, type) => {
    event.stopPropagation();
    if (roomDuration >= limits?.[0] && roomDuration < limits?.[1]) {
      if (!hovered.current && type === 'over') {
        hovered.current = true;
        document.body.style.cursor = 'pointer';
      } else if (hovered.current && type === 'out') {
        hovered.current = false;
        document.body.style.cursor = 'auto';
      }
    }
  };

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
      {roomDuration >= limits?.[0] &&
        roomDuration < limits?.[1] &&
        !isExhibitActive && (
          <ExhibitActiveIndicator
            indicatorPosition={indicatorPosition}
            indicatorRotation={indicatorRotation}
          />
        )}
      <ExhibitClickArea
        position={clickAreaPosition}
        size={clickAreaSize}
        onClick={() => {
          if (roomDuration >= limits?.[0] && roomDuration < limits?.[1]) {
            onExhibitClick?.();
          }
        }}
        onPointerOver={(event) => onExhibitHover(event, 'over')}
        onPointerOut={(event) => onExhibitHover(event, 'out')}
      />
      {children}
    </group>
  );
};
