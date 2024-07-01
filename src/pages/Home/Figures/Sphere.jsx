import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Sphere = ({ model }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FloatWrap
      floatParams={{
        position: [0, 1.4, 1],
        rotation: [Math.PI / 3.5, 0, 0],
        speed: 1,
        rotationIntensity: 0.3,
        floatIntensity: 0.4,
      }}
    >
      <mesh
        name="sphere"
        {...model}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[3])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[3], event?.object?.scale, 2000)
        }
      >
        <meshPhysicalMaterial
          {...model.material}
          roughnessMap={null}
          roughness={0.2}
        />
      </mesh>
    </FloatWrap>
  );
};
