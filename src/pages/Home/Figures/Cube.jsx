import React from 'react';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { RoundedBox } from '@react-three/drei';

export const Cube = () => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FloatWrap
      floatParams={{
        speed: 0.8,
        rotationIntensity: 0.6,
        floatIntensity: 0.5,
        floatingRange: [0.9, 0.5],
      }}
    >
      <RoundedBox
        name="cube"
        // castShadow
        // receiveShadow
        args={[2.5, 2.5, 2.5]}
        radius={0.2}
        position={[3.172, -0.634, -0.5]}
        rotation={[0.66, 0.36, 0.191]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[4])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[4], event?.object?.scale, 3000)
        }
      >
        <meshPhysicalMaterial
          // aoMap={textures.env}
          envMapIntensity={1.3}
          clearcoat={0.1}
          // clearcoatRoughness={0.6}
          color={'#ffffff'}
          // transmission={0.2}
          roughness={0.17}
          metalness={0.03}
          reflectivity={0.9}
          ior={2.5}
          iridescence={0.3}
          // map={textures.env}
          aoMapIntensity={0.3}
        />
      </RoundedBox>
    </FloatWrap>
  );
};
