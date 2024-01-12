import React from 'react';
import { useTextures } from 'src/components/useTextures';
import { useGLTF } from '@react-three/drei';

export const Podiums = () => {
  const { nodes } = useGLTF('models/model.gltf');
  const textures = useTextures();

  return (
    <group name="Podiums">
      <mesh name="Elements_11" geometry={nodes.Elements_11.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.elements.aoEl1}
          toneMapped={false}
        />
      </mesh>
      <mesh name="Elements_12" geometry={nodes.Elements_12.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.elements.aoEl2}
          toneMapped={false}
        />
      </mesh>
      <mesh name="Elements_13" geometry={nodes.Elements_13.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.elements.aoEl3}
          toneMapped={false}
        />
      </mesh>
      <mesh name="Elements_14" geometry={nodes.Elements_14.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          map={textures.elements.aoEl4}
          toneMapped={false}
        />
      </mesh>
      <mesh name="Elements_2" geometry={nodes.Elements_2.geometry}>
        <meshStandardMaterial
          color={'#ffffff'}
          // map={textures.elements.aoEl4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
