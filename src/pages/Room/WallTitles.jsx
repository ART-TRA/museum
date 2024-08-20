import React, { useMemo } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { useRoomTitles } from 'src/hooks/useRoomTitles';
import { TITLES_COLOR } from 'src/pages/Room/constants';
import { activeRoomTimes } from 'src/recoil/atoms/activeRoom';

const AnimatedText = a(Text);

export const WallTitles = () => {
  const titles = useRoomTitles();
  const roomDuration = useRecoilValue(roomDurationAtom);
  const isTitlesVisible = useMemo(() => {
    return (
      (roomDuration >= activeRoomTimes.same &&
        roomDuration < activeRoomTimes.same + 0.36) ||
      (roomDuration >= activeRoomTimes.talents - 0.4 &&
        roomDuration < activeRoomTimes.talents + 2) ||
      (roomDuration >= activeRoomTimes.dreams - 0.4 &&
        roomDuration < activeRoomTimes.dreams + 2) ||
      (roomDuration >= activeRoomTimes.celebrate - 1 &&
        roomDuration < activeRoomTimes.celebrate + 2) ||
      (roomDuration >= activeRoomTimes.toys - 1 &&
        roomDuration < activeRoomTimes.toys + 2)
    );
  }, [roomDuration]);

  const animatedProps = useSpring({
    opacity: isTitlesVisible ? 1.0 : 0.0,
  });

  return (
    <>
      {titles.map((item) => (
        <group key={item.key}>
          <AnimatedText
            maxWidth={item.titleWidth}
            textAlign="center"
            // whiteSpace="overflowWrap"
            position={item.titlePosition}
            rotation={item.rotation}
            anchorX="center"
            anchorY="middle"
            color={TITLES_COLOR}
            font={'/fonts/AmaticSC/AmaticSCBold.woff'}
            fontSize={item.titleFontSize}
            lineHeight={1}
            // children={item.title}
            // material={new THREE.MeshStandardMaterial()}
          >
            {item.title}
            <a.meshStandardMaterial
              attach="material"
              opacity={animatedProps.opacity}
            />
          </AnimatedText>
          <AnimatedText
            maxWidth={item.descWidth}
            textAlign="center"
            // whiteSpace="overflowWrap"
            position={item.descPosition}
            rotation={item.rotation}
            anchorX="center"
            anchorY="middle"
            color={TITLES_COLOR}
            font={'/fonts/Inter/Inter-Regular.woff'}
            fontSize={item.descFontSize}
            lineHeight={1.45}
            // children={item.description}
            // material={new THREE.MeshStandardMaterial()}
          >
            {item.description}
            <a.meshStandardMaterial
              attach="material"
              opacity={animatedProps.opacity}
            />
          </AnimatedText>
        </group>
      ))}
    </>
  );
};
