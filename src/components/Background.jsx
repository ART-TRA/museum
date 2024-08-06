import { Environment } from '@react-three/drei';

export const Background = () => {
  return (
    <>
      <color attach="background" args={['#a3a5a9']} />
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
