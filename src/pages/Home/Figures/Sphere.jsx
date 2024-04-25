import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';

export const Sphere = () => {
  const { onFigureClick, onFigureHover } = useFigures();
  // const textures = useFiguresTextures();

  return (
    <FloatWrap
      floatParams={{
        position: [0, 1.9, 1],
        rotation: [Math.PI / 3.5, 0, 0],
        speed: 1,
        rotationIntensity: 0.3,
        floatIntensity: 0.4,
      }}
    >
      <mesh
        name="sphere"
        // castShadow
        // receiveShadow
        // geometry={nodes.Sphere.geometry}
        // scale={0.9}
        position={[0.9, -1.831, 3]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[3])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[3], event?.object?.scale, 2000)
        }
      >
        <sphereGeometry args={[1.1, 64, 64]} />
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
          // clearcoat={0.1}
          // clearcoatRoughness={0.6}
          roughness={0.3}
          metalness={0.9}
          color={'#dbdbdc'}
          // metalnessMap={textures.sphere.metall}
          // map={textures.sphere.color}
          // displacementMap={textures.sphere.disp}
          // normalMap={textures.sphere.normal}
          // roughnessMap={textures.sphere.rough}
          // displacementScale={0.02}
        />
      </mesh>
    </FloatWrap>
  );
};
