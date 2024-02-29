import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { FigureWrap } from 'src/components/HomeScreen/FigureWrap';

export const Cube = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();
  const textures = useFiguresTextures();

  return (
    <FigureWrap
      floatParams={{
        speed: 0.8,
        rotationIntensity: 0.6,
        floatIntensity: 0.5,
        floatingRange: [0.9, 0.5],
      }}
    >
      <mesh
        name="cube"
        castShadow
        receiveShadow
        geometry={nodes.Connect.geometry}
        position={[3.172, -0.634, -0.5]}
        rotation={[0.66, 0.36, 0.191]}
        onPointerOver={onFigureHover}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[4], event?.object?.scale)
        }
      >
        <meshPhysicalMaterial
          color={'#fff'}
          transmission={0.2}
          roughness={0.0}
          metalness={0.13}
          aoMap={textures.matcap4}
        />
      </mesh>
    </FigureWrap>
  );
};
