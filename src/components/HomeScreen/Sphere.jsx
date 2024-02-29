import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { FigureWrap } from 'src/components/HomeScreen/FigureWrap';

export const Sphere = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FigureWrap
      floatParams={{
        position: [0, 1.9, 1],
        rotation: [Math.PI / 3.5, 0, 0],
        speed: 1,
        rotationIntensity: 0.3,
        floatIntensity: 0.4,
      }}
    >
      <mesh
        name="sphere"
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        scale={0.9}
        position={[0.9, -1.831, 3]}
        onPointerOver={onFigureHover}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[3], event?.object?.scale)
        }
      >
        <meshStandardMaterial
          clearcoat={0.1}
          clearcoatRoughness={0.6}
          roughness={0.3}
          metalness={0.9}
          color={'#86888a'}
        />
      </mesh>
    </FigureWrap>
  );
};
