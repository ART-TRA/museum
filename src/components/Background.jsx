import { Environment } from '@react-three/drei';

export const Background = () => {
  return (
    <>
      <color attach="background" args={['#f6f7ff']} />
      {/*<fog attach="fog" color="#f6f7ff" near={60} far={70} />*/}
      {/*<ambientLight intensity={0.9} />*/}
      <Environment
        files={'/environment/env.hdr'}
        // background
        // blur={1.0}
        // environmentIntensity={1.1}
      />
    </>
  );
};
