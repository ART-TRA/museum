import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { useFigures } from 'src/hooks/useFigures';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';

export const Rectangle = () => {
  const { onFigureClick, onFigureHover } = useFigures();
  // const textures = useFiguresTextures();

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
        // castShadow
        // receiveShadow
        // geometry={nodes.Cube.geometry}
        position={[-1.996, 0.091, -0.837]}
        rotation={[0.459, 0.098, -0.347]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[1])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[1], event?.object?.scale, 1200)
        }
      >
        <boxGeometry args={[1.4, 7, 1.3]} />
        <meshStandardMaterial
          color={'#ffffff'}
          roughness={0.9}
          metalness={0}
          // map={textures.longCube.diff}
          // aoMap={textures.longCube.ao}
          aoMapIntensity={0.4}
          // normalMap={textures.longCube.normal}
          // roughnessMap={textures.longCube.rough}
          // displacementMap={textures.longCube.disp}
          // metalnessMap={textures.torus.arm}
          // displacementScale={0}
          toneMapped={false}
        />
      </mesh>
    </FloatWrap>
  );
};
