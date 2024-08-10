import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Rectangle = ({ model, groupRef }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FloatWrap
      floatParams={{
        speed: 0.7,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        name="rectangle"
        {...model}
        // position-z={-0.9}
        onPointerEnter={(event) =>
          onFigureHover(event, activeRoomKeys[1], 'over', groupRef)
        }
        onPointerOut={(event) =>
          onFigureHover(event, activeRoomKeys[1], 'out', groupRef)
        }
        onClick={(event) => onFigureClick(event, activeRoomKeys[1], groupRef)}
      />
    </FloatWrap>
  );
};
