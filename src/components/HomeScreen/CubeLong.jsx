import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFiguresTextures } from 'src/hooks/useFiguresTextures';
import { useFigures } from 'src/components/HomeScreen/useFigures';
import { FigureWrap } from 'src/components/HomeScreen/FigureWrap';

export const CubeLong = ({ nodes }) => {
  const textures = useFiguresTextures();
  const { onFigureClick, onFigureHover } = useFigures();

  return (
    <FigureWrap
      floatParams={{
        speed: 0.7,
        rotationIntensity: 1.0,
        floatIntensity: 1.0,
        floatingRange: [-0.2, 0.2],
      }}
    >
      <mesh
        castShadow
        receiveShadow
        // geometry={nodes.Cube.geometry}
        position={[-1.996, 0.091, -0.837]}
        rotation={[0.459, 0.098, -0.347]}
        onPointerOver={onFigureHover}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[1], event?.object?.scale)
        }
      >
        <boxGeometry args={[1.4, 7, 1.3]} />
        <meshStandardMaterial
          color={'#cccccc'}
          roughness={0.4}
          metalness={0}
          map={textures.longCube.diff}
          aoMap={textures.longCube.ao}
          aoMapIntensity={0.4}
          normalMap={textures.longCube.normal}
          roughnessMap={textures.longCube.rough}
          displacementMap={textures.longCube.disp}
          metalnessMap={textures.torus.arm}
          displacementScale={0}
          toneMapped={false}
        />
      </mesh>
    </FigureWrap>
  );
};
