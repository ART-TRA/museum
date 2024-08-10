import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Pyramid = ({ model, groupRef }) => {
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <>
      <FloatWrap
        floatParams={{
          speed: 0.7,
          rotationIntensity: 1.0,
          floatIntensity: 1.0,
          floatingRange: [-0.2, 0.2],
        }}
      >
        <mesh
          name="pyramid"
          {...model}
          position-z={1}
          onPointerEnter={(event) =>
            onFigureHover(event, activeRoomKeys[0], 'over', groupRef)
          }
          onPointerOut={(event) =>
            onFigureHover(event, activeRoomKeys[0], 'out', groupRef)
          }
          onClick={(event) => onFigureClick(event, activeRoomKeys[0], groupRef)}
        />
      </FloatWrap>
    </>
  );
};
