import React, { useRef, useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSetRecoilState } from 'recoil';
import cursorAtom from 'src/recoil/atoms/cursor';

const LevelGroup = ({ children, ...props }) => {
  const setHovered = useSetRecoilState(cursorAtom);

  const onModelClick = (name) => {
    console.log('click', name);
  };

  return (
    <group
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onModelClick(props.name)}
      {...props}
    >
      {children}
    </group>
  );
};

export function Level(props) {
  const { nodes, materials, animations, scene, cameras } =
    useGLTF('models/level.gltf');
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const action = useRef(mixer.current.clipAction(animations[0]));
  action.current.play();

  const onWheel = (event) => {
    if (event.deltaY > 0) {
      mixer.current.update(0.1);
    } else {
      mixer.current.update(-0.1);
    }
  };

  useLayoutEffect(() => {
    document.addEventListener('wheel', onWheel);

    return () => {
      document.removeEventListener('wheel', onWheel);
    };
  }, []);

  useFrame((state, delta) => {
    state.camera.position.lerp(cameras[0].parent.position, delta);
    state.camera.quaternion.slerp(cameras[0].parent.quaternion, delta);
    // state.camera.rotation.copy(cameras[0].parent.rotation);
    // state.camera.scale.copy(cameras[0].parent.scale);
  });

  return (
    <group {...props} dispose={null}>
      <group>
        <group name="----------Exponats----------">
          <LevelGroup name="Shoes" position={[-26.923, 0.293, -7.992]}>
            <mesh
              name="Shoes_L"
              castShadow
              receiveShadow
              geometry={nodes.Shoes_L.geometry}
              material={materials.E01_Shoes_L}
              position={[0.069, 0.539, -0.039]}
              rotation={[0, 0.504, 0]}
            />
            <mesh
              name="Shoes_R"
              castShadow
              receiveShadow
              geometry={nodes.Shoes_R.geometry}
              material={materials.E01_Shoes_R}
              position={[-0.08, 0.539, 0.049]}
              rotation={[0, 0.652, 0]}
            />
          </LevelGroup>
          <LevelGroup
            name="Caps"
            position={[-36.012, 0.297, 7.955]}
            rotation={[-0.01, -0.005, -0.001]}
          >
            <mesh
              name="Caps"
              castShadow
              receiveShadow
              geometry={nodes.Caps.geometry}
              material={materials.E02_Cups}
              position={[0, 0.585, -0.014]}
            />
          </LevelGroup>
          <LevelGroup
            name="Bed"
            position={[-21.776, 0, 19.522]}
            rotation={[Math.PI, -0.96, Math.PI]}
          >
            <mesh
              name="Bed_low"
              castShadow
              receiveShadow
              geometry={nodes.Bed_low.geometry}
              material={materials.E03_Bed}
              position={[0, 0.2, 0]}
            />
          </LevelGroup>
          <LevelGroup
            name="Cubes"
            position={[-0.338, 0.007, -0.79]}
            rotation={[-Math.PI, 0, -Math.PI]}
          >
            <mesh
              name="Cubes"
              castShadow
              receiveShadow
              geometry={nodes.Kubiki.geometry}
              material={materials.E04_Kubiki}
              position={[0.033, 0.578, 0.096]}
            />
          </LevelGroup>
          <LevelGroup
            name="Child_art"
            position={[13.882, 1.4, 12.397]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              name="Child_art"
              castShadow
              receiveShadow
              geometry={nodes.Child_art.geometry}
              material={materials.E05_Child_art}
              position={[0, -0.301, 0.3]}
            />
          </LevelGroup>
          <LevelGroup
            name="Xilofon"
            position={[25.275, -0.015, -2.434]}
            rotation={[Math.PI / 2, 0, Math.PI / 9]}
          >
            <mesh
              name="Xilofon"
              castShadow
              receiveShadow
              geometry={nodes.Xilofon.geometry}
              material={materials.E06_Xilofon}
              position={[-0.011, 0.046, -1.405]}
            />
          </LevelGroup>
          <LevelGroup
            name="Diary"
            position={[46.131, -0.001, 33.496]}
            rotation={[0, -0.295, 0]}
          >
            <mesh
              name="Diary"
              castShadow
              receiveShadow
              geometry={nodes.Diary.geometry}
              material={materials.E07_Diary}
              position={[0, 1.488, 0]}
              rotation={[0, 0.698, 0]}
            />
          </LevelGroup>
          <LevelGroup
            name="Kollaj"
            position={[66.573, 1.4, 30.021]}
            rotation={[Math.PI / 2, 0, 2.473]}
          >
            <mesh
              name="Kollaj"
              castShadow
              receiveShadow
              geometry={nodes.Kollaj.geometry}
              material={materials.E08_Kollaj}
              position={[-0.015, -0.081, -0.35]}
            />
          </LevelGroup>
          <LevelGroup
            name="Christmas_Ball"
            position={[58.205, -0.088, 4.855]}
            rotation={[-Math.PI, 0.36, -Math.PI]}
          >
            <mesh
              name="Christmas_Ball"
              castShadow
              receiveShadow
              geometry={nodes.Christmass_Ball.geometry}
              material={materials.E09_Christmass_Ball}
              position={[-0.278, 1.668, 0.148]}
              rotation={[0, 0.122, 0]}
            />
          </LevelGroup>
          <LevelGroup
            name="BowTie"
            position={[55.58, 0, -12.921]}
            rotation={[0, -0.403, 0]}
          >
            <mesh
              name="bow_tie_LP"
              castShadow
              receiveShadow
              geometry={nodes.bow_tie_LP.geometry}
              material={materials.E10_bow_tie_LP}
              position={[0.047, 1.643, 0.012]}
              rotation={[1.18, 1.025, -1.13]}
            />
          </LevelGroup>
          <LevelGroup
            name="Exponat_11"
            position={[66.969, 0, -42.586]}
            rotation={[0, -0.215, -Math.PI]}
            scale={[1, -1, 1]}
          >
            <mesh
              name="Ball"
              castShadow
              receiveShadow
              geometry={nodes.Ball.geometry}
              material={materials.E11_Ball}
              position={[6.714, 0.25, -0.376]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Toy_boxs"
              castShadow
              receiveShadow
              geometry={nodes.Toy_boxs.geometry}
              material={materials.E11_Toy_boxes}
              position={[7.6, 0.478, -1.65]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Skis"
              castShadow
              receiveShadow
              geometry={nodes.Skis.geometry}
              material={materials.E11_Skies}
              position={[8.374, 1.332, -2.144]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Hare"
              castShadow
              receiveShadow
              geometry={nodes.Hare.geometry}
              material={materials.E11_Hare}
              position={[7.312, 0.273, -1.366]}
              rotation={[0, 0.175, -Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Bear_LP"
              castShadow
              receiveShadow
              geometry={nodes.Bear_LP.geometry}
              material={materials.E11_Bear_LP}
              position={[7.386, 0.026, -1.056]}
              rotation={[Math.PI, 1.396, 0]}
              scale={[1, -1, 1]}
            />
          </LevelGroup>
          <group
            name="Exponat_12"
            position={[46.632, 0, -37.835]}
            rotation={[Math.PI, Math.PI / 4, -Math.PI]}
          >
            <mesh
              name="bear_body"
              castShadow
              receiveShadow
              geometry={nodes.bear_body.geometry}
              material={materials.E12_bear_body}
              position={[-0.003, 0.947, 0.056]}
              rotation={[Math.PI, -Math.PI / 4, Math.PI]}
            />
          </group>
          <group
            name="Exponat_13"
            position={[48.412, 0, -57.511]}
            rotation={[0, 0.782, 0]}
          >
            <mesh
              name="Truck"
              castShadow
              receiveShadow
              geometry={nodes.Truck.geometry}
              material={materials.E13_Truck}
              position={[0.023, 0.329, -0.006]}
              rotation={[Math.PI, Math.PI / 3, -Math.PI]}
            />
          </group>
          <group
            name="Exponat_14"
            position={[67.651, 0, -57.222]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <mesh
              name="Dolls"
              castShadow
              receiveShadow
              geometry={nodes.Dolls.geometry}
              material={materials.E14_Dolls}
              position={[-0.025, 0.858, 0.002]}
              rotation={[0, -1.571, 0]}
            />
          </group>
          <group
            name="Exponat_15"
            position={[83.289, 2.963, -34.818]}
            rotation={[Math.PI, -0.794, Math.PI]}
          >
            <mesh
              name="Hand"
              castShadow
              receiveShadow
              geometry={nodes.Hand.geometry}
              material={materials.E15_Hand}
              position={[-0.066, -1.535, 3.488]}
              rotation={[0, -0.01, 1.544]}
            />
          </group>
        </group>
        <group name="----------Elements----------">
          <mesh
            name="Elements_1"
            castShadow
            receiveShadow
            geometry={nodes.Elements_1.geometry}
            material={materials['Elements 1']}
            position={[8.922, 11.159, 5.981]}
          />
          <mesh
            name="Elements_2"
            castShadow
            receiveShadow
            geometry={nodes.Elements_2.geometry}
            material={materials['Elements 2']}
            position={[60.685, 12.8, 4.482]}
          />
          <mesh
            name="Elements_3"
            castShadow
            receiveShadow
            geometry={nodes.Elements_3.geometry}
            material={materials['Elements 3']}
            position={[22.931, 1.906, -18.994]}
          />
          <mesh
            name="Elements_Exponats"
            castShadow
            receiveShadow
            geometry={nodes.Elements_Exponats.geometry}
            material={materials['Elements Exponats']}
            position={[22.931, 1.906, -18.994]}
          />
        </group>
        <group name="----------Walls--------------">
          <mesh
            name="WALL_1"
            castShadow
            receiveShadow
            geometry={nodes.WALL_1.geometry}
            material={materials.Wall_1}
            position={[29.995, 3.179, -10.327]}
          />
          <mesh
            name="WALL_2"
            castShadow
            receiveShadow
            geometry={nodes.WALL_2.geometry}
            material={materials.Wall_2}
            position={[52.81, 2.92, -17.295]}
          />
          <mesh
            name="WALL_3"
            castShadow
            receiveShadow
            geometry={nodes.WALL_3.geometry}
            material={materials.Wall_3}
            position={[29.995, 3.179, -10.327]}
          />
          <mesh
            name="WALL_4"
            castShadow
            receiveShadow
            geometry={nodes.WALL_4.geometry}
            material={materials.Wall_4}
            position={[29.995, 3.179, -10.327]}
          />
          <mesh
            name="WALL_5"
            castShadow
            receiveShadow
            geometry={nodes.WALL_5.geometry}
            material={materials.Wall_5}
            position={[64.191, -2.636, 14.136]}
          />
          <mesh
            name="FLOOR_1"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_1.geometry}
            material={materials.Floor_1}
            position={[49.121, -0.05, 9.568]}
          />
          <mesh
            name="FLOOR_2"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_2.geometry}
            material={materials.Floor_2}
            position={[39.558, 1.564, -0.38]}
          />
          <mesh
            name="FLOOR_3"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_3.geometry}
            material={materials.Floor_3}
            position={[49.121, -0.05, 9.568]}
          />
          <mesh
            name="FLOOR_4"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_4.geometry}
            material={materials.Floor_4}
            position={[49.121, -0.05, 9.568]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('models/level.gltf');
