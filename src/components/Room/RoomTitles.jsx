import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import React, { useMemo } from 'react';
import { Html } from '@react-three/drei';
import {
  activeRoomDesc,
  activeRoomKeys,
  activeRoomNames,
} from 'src/recoil/atoms/activeRoom';

const TITLES = [
  {
    key: activeRoomKeys[0],
    title: activeRoomNames[activeRoomKeys[0]],
    description: activeRoomDesc[activeRoomKeys[0]],
    position: [-9.6, 1.7, -1.7],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--same',
  },
  {
    key: activeRoomKeys[1],
    title: activeRoomNames[activeRoomKeys[1]],
    description: activeRoomDesc[activeRoomKeys[1]],
    position: [5.4, 1.7, 21.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--talents',
  },
  {
    key: activeRoomKeys[2],
    title: activeRoomNames[activeRoomKeys[2]],
    description: activeRoomDesc[activeRoomKeys[2]],
    position: [45.6, 2.9, 2.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--dreams',
  },
  {
    key: activeRoomKeys[3],
    title: activeRoomNames[activeRoomKeys[3]],
    description: activeRoomDesc[activeRoomKeys[3]],
    position: [75.8, 1.7, -3.1],
    rotation: [0, 0, 0],
    className: 'wall wall--celebrate',
  },
  {
    key: activeRoomKeys[4],
    title: activeRoomNames[activeRoomKeys[4]],
    description: activeRoomDesc[activeRoomKeys[4]],
    position: [75, 1.7, -23.8],
    rotation: [0, -Math.PI * 0.25, 0],
    className: 'wall wall--toys',
  },
];

export const RoomTitles = () => {
  const roomDuration = useRecoilValue(roomDurationAtom);
  const isTitlesVisible = useMemo(() => {
    return (
      (roomDuration >= 0 && roomDuration < 0.36) ||
      (roomDuration >= 17.6 && roomDuration < 20) ||
      (roomDuration >= 35.6 && roomDuration < 38) ||
      (roomDuration >= 49.3 && roomDuration < 51.6) ||
      (roomDuration >= 62 && roomDuration < 64.7)
    );
  }, [roomDuration]);

  return (
    <>
      {TITLES.map((item, i) => (
        <Html
          // id={i}
          key={item.key}
          position={item.position}
          rotation={item.rotation}
          transform
          occlude
          // prepend
          className={item.className}
          zIndexRange={[0, -1]}
          style={{
            zIndex: -4,
            userSelect: 'none',
            opacity: isTitlesVisible ? 1 : 0,
          }}
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </Html>
        // <Text
        //   maxWidth={3}
        //   textAlign="center"
        //   // whiteSpace="overflowWrap"
        //   position={item.position}
        //   rotation={item.rotation}
        //   anchorX="center"
        //   anchorY="middle"
        //   color="#4c4c4c"
        //   key={item.key}
        //   font={titleFont}
        //   fontSize={0.5}
        //   lineHeight={1}
        //   children={item.title}
        // />
      ))}
    </>
  );
};
