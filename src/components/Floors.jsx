import React from 'react';
import { MeshReflectorMaterial, useGLTF } from '@react-three/drei';
import { useTextures } from 'src/components/useTextures';
import { useControls } from 'leva';

export const Floors = () => {
  const { nodes } = useGLTF('models/model.gltf');
  const textures = useTextures();
  const { floorMirrorStrength, reflectorVisible } = useControls({
    floorMirrorStrength: { value: 0.3, min: 0, max: 1, step: 0.01 },
    reflectorVisible: true,
  });

  return (
    <group name="Floors">
      {reflectorVisible && (
        <>
          <mesh
            name="FLOOR_11mirror"
            position={[20, 0.02, 14]}
            rotation={[-Math.PI * 0.5, 0, 0]}
          >
            <planeGeometry args={[140, 54]} />
            <MeshReflectorMaterial
              transparent={true}
              opacity={floorMirrorStrength}
              // blur={[1048, 1048]}
              resolution={2048}
              args={[3800, 4280]}
              color={'#ffffff'}
              mirror={0.8}
              mixBlur={1}
              position={[0, 0, 0]}
              mixStrength={0.5}
              // rotation={[Math.PI / 2, 0, 0]}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              // map={aoFloor1Texture}
              // aoMap={aoFloor1Texture}
              // toneMapped={false}
              metalness={0.8}
              roughness={0.4}
            />
          </mesh>
          <mesh
            name="FLOOR_11mirror2"
            position={[60, 0.02, -45]}
            rotation={[-Math.PI * 0.5, 0, 0]}
          >
            <planeGeometry args={[60, 64]} />
            <MeshReflectorMaterial
              transparent={true}
              opacity={floorMirrorStrength}
              // blur={[1048, 1048]}
              resolution={2048}
              args={[3800, 4280]}
              color={'#ffffff'}
              mirror={0.8}
              mixBlur={1}
              position={[0, 0, 0]}
              mixStrength={0.5}
              // rotation={[Math.PI / 2, 0, 0]}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              // map={aoFloor1Texture}
              // aoMap={aoFloor1Texture}
              // toneMapped={false}
              metalness={0.8}
              roughness={0.4}
            />
          </mesh>
        </>
      )}
      <mesh
        name="FLOOR_11"
        geometry={nodes.FLOOR_11.geometry}
        position={[-28.507, -0.001, 8.767]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          aoMap={textures.floors.aoFloor1}
          toneMapped={false}
        />
      </mesh>
      <mesh name="FLOOR_12" geometry={nodes.FLOOR_12.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.floors.aoFloor2}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="FLOOR_13"
        geometry={nodes.FLOOR_13.geometry}
        position={[35.151, 0.757, -0.695]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.floors.aoFloor3}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="FLOOR_14"
        geometry={nodes.FLOOR_14.geometry}
        position={[35.151, 0.757, -0.695]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.floors.aoFloor4}
          toneMapped={false}
        />
      </mesh>
      <mesh
        name="FLOOR_15"
        geometry={nodes.FLOOR_15.geometry}
        position={[35.151, 0.757, -0.695]}
      >
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.floors.aoFloor5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
