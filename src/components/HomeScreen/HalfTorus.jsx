import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { FigureWrap } from 'src/components/HomeScreen/FigureWrap';

export const HalfTorus = ({ nodes }) => {
  const textures = useFiguresTextures();
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FigureWrap
      floatParams={{
        speed: 0.9,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Tube.geometry}
        position={[-1.175, -0.046, -1.074]}
        rotation={[-2.966, -1.021, 2.787]}
        onPointerOver={onFigureHover}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[2], event?.object?.scale)
        }
      >
        <meshStandardMaterial
          roughness={1}
          color={'#fff'}
          roughnessMap={textures.torus.rough}
          displacementMap={textures.torus.disp}
          normalMap={textures.torus.normal}
          aoMap={textures.torus.ao}
          aoMapIntensity={0.4}
          metalnessMap={textures.torus.arm}
          displacementScale={0.07}
        />
      </mesh>
    </FigureWrap>
  );
};
