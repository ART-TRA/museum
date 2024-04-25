import React, { useRef } from 'react';
import { FloatWrap } from 'src/pages/Home/Figures/FloatWrap';
import { useFigures } from 'src/hooks/useFigures';
import { activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import * as THREE from 'three';

const settings = {
  radius: { value: 0.25 },
};

export const Cube = () => {
  const { onFigureClick, onFigureHover } = useFigures();
  const cubeGeometry = useRef(new THREE.BoxGeometry(2.5, 2.5, 2.5, 40, 40, 40));
  const cubeMaterial = useRef(
    new THREE.MeshStandardMaterial({ color: '#fff' })
  );

  cubeMaterial.current.onBeforeCompile = (shader) => {
    shader.uniforms.boxSize = {
      value: new THREE.Vector3(
        cubeGeometry.current.parameters.width,
        cubeGeometry.current.parameters.height,
        cubeGeometry.current.parameters.depth
      ).multiplyScalar(0.5),
    };
    shader.uniforms.radius = settings.radius;
    shader.vertexShader =
      `
  uniform vec3 boxSize;
  uniform float radius;
  ` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      `#include <begin_vertex>`,
      `#include <begin_vertex>
    
    float maxRadius = clamp(radius, 0.0, min(boxSize.x, min(boxSize.y, boxSize.z)));
    vec3 signs = sign(position);
    
    vec3 subBox = boxSize - vec3(maxRadius);
    
    vec3 absPos = abs(transformed); 
    // xy
    vec2 sub = absPos.xy - subBox.xy;
    if (absPos.x > subBox.x && absPos.y > subBox.y && absPos.z <= subBox.z) {
      transformed.xy = normalize(sub) * maxRadius + subBox.xy;
      transformed.xy *= signs.xy;
    }
    // xz
    sub = absPos.xz - subBox.xz;
    if (absPos.x > subBox.x && absPos.z > subBox.z && absPos.y <= subBox.y) {
      transformed.xz = normalize(sub) * maxRadius + subBox.xz;
      transformed.xz *= signs.xz;
    }
    // yz
    sub = absPos.yz - subBox.yz;
    if (absPos.y > subBox.y && absPos.z > subBox.z && absPos.x <= subBox.x) {
      transformed.yz = normalize(sub) * maxRadius + subBox.yz;
      transformed.yz *= signs.yz;
    }
    
    // corner
    if (all(greaterThan(absPos, subBox))){
      vec3 sub3 = absPos - subBox;
      transformed = (normalize(sub3) * maxRadius + subBox) * signs;
    }
    
    // re-compute normals for correct shadows and reflections
    objectNormal = all(equal(position, transformed)) ? normal : normalize(position - transformed); 
    transformedNormal = normalMatrix * objectNormal;
    `
    );
  };

  return (
    <FloatWrap
      floatParams={{
        speed: 0.8,
        rotationIntensity: 0.6,
        floatIntensity: 0.5,
        floatingRange: [0.9, 0.5],
      }}
    >
      <mesh
        name="cube"
        // geometry={nodes.Connect.geometry}
        geometry={cubeGeometry.current}
        material={cubeMaterial.current}
        position={[3.172, -0.634, -0.5]}
        rotation={[0.66, 0.36, 0.191]}
        onPointerEnter={(event) => onFigureHover(event, activeRoomKeys[4])}
        // onPointerOut={(event) => onFigureHover(event, 'out')}
        onClick={(event) =>
          onFigureClick(activeRoomKeys[4], event?.object?.scale, 3000)
        }
      >
        {/*<meshPhysicalMaterial*/}
        {/*  color={'#fff'}*/}
        {/*  transmission={0.2}*/}
        {/*  roughness={0.0}*/}
        {/*  metalness={0.13}*/}
        {/*  // aoMap={textures.matcap4}*/}
        {/*/>*/}
      </mesh>
    </FloatWrap>
  );
};
