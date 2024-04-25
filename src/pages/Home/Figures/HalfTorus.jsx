import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const HalfTorus = ({ nodes }) => {
  const { onFigureClick, onFigureHover } = useFigures();
  // const textures = useFiguresTextures();

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
        // castShadow
        // receiveShadow
        name="torus"
        geometry={nodes.Tube.geometry}
        position={[-1.175, -0.046, -1.074]}
        rotation={[-2.966, -1.021, 2.787]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[2])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[2], event?.object?.scale, 1700)
        }
      >
        {/*<MeshTransmissionMaterial*/}
        {/*  backside*/}
        {/*  backsideThickness={10}*/}
        {/*  thickness={5}*/}
        {/*  color={'#ace7e7'}*/}
        {/*  transmission={0.9}*/}
        {/*  // envMapIntensity={2}*/}
        {/*>*/}
        {/*  <color attach="background" args={['#fff']} />*/}
        {/*</MeshTransmissionMaterial>*/}
        <meshStandardMaterial
          // roughness={1}
          color={'#cecece'}
          // aoMap={textures.torus.diff}
          // roughnessMap={textures.torus.rough}
          // displacementMap={textures.torus.disp}
          // normalMap={textures.torus.normal}
          // aoMap={textures.torus.ao}
          aoMapIntensity={7.4}
          // metalnessMap={textures.torus.arm}
          // displacementScale={0.03}
        />
      </mesh>
    </FloatWrap>
  );
};
