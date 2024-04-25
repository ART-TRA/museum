import React, { useMemo } from 'react';
import { useSpring, a } from '@react-spring/three';
import { Text } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { useRoomTitles } from 'src/hooks/useRoomTitles';

const AnimatedText = a(Text);

export const WallTitles = () => {
  const titles = useRoomTitles();
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
            color="#4c4c4c"
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
            color="#4c4c4c"
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
