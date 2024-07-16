import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const HalfTorus = ({ model, groupRef }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FloatWrap
      floatParams={{
        speed: 0.9,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        name="torus"
        {...model}
        onPointerEnter={(event) =>
          onFigureHover(event, activeRoomKeys[2], 'over', groupRef)
        }
        onPointerOut={(event) =>
          onFigureHover(event, activeRoomKeys[2], 'out', groupRef)
        }
        onClick={(event) =>
          onFigureClick(activeRoomKeys[2], event?.object?.scale, 1700)
        }
      >
        <meshStandardMaterial {...model.material} transparent={true} />
      </mesh>
    </FloatWrap>
  );
};
