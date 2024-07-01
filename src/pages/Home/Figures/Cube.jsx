import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Cube = ({ model }) => {
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
      <mesh
        name="cube"
        {...model}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[4])}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[4], event?.object?.scale, 3000)
        }
      />
    </FloatWrap>
  );
};
