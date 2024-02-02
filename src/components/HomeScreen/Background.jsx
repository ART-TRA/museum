import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const Background = () => {
  const pointLightRef = useRef();

  useFrame((state) => {
    pointLightRef.current.position.x = state.mouse.x * 30;
    pointLightRef.current.position.y = state.mouse.y * 30;
  });

  return (
    <>
      <pointLight
        ref={pointLightRef}
        position-z={15}
        intensity={200}
        color="#F8C069"
        castShadow
      />
      <directionalLight
        // ref={lightHelper}
        color={'#ffffff'}
        position={[10, 20, -2]}
        castShadow
        intensity={5}
        shadow-mapSize={[2048, 2048]}
        // shadow-camera-far={6}
        // shadow-camera-left={-6}
        // shadow-camera-right={6}
        // shadow-camera-top={6}
        // shadow-camera-bottom={-6}
        // decay={1}
        penumbra={1}
        bias={0.0001}
      />
    </>
  );
};
