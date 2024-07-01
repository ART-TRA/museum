import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Rectangle = ({ model }) => {
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
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[1])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[1], event?.object?.scale, 1200)
        }
      />
    </FloatWrap>
  );
};
