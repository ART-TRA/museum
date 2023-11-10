import React, { useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import {
  MeshReflectorMaterial,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useSetRecoilState } from 'recoil';
import { useControls } from 'leva';
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
  const { camera } = useThree();
  const modelRef = useRef();
  const { touchPadSpeed, scrollSpeed } = useControls({
    touchPadSpeed: { value: 0.01, min: 0.005, max: 0.1, step: 0.001 },
    scrollSpeed: { value: 0.12, min: 0.005, max: 0.5 },
  });
  const { nodes, materials, animations, scene, cameras } =
    useGLTF('models/level2.glb');
  const modelLevel = useGLTF('models/level.glb');
  const mixer = useRef(new THREE.AnimationMixer(scene));
  // console.log(modelLevel);
  const action = useRef(mixer.current.clipAction(animations[0]));
  action.current.play();

  const detectTrackpad = (event) => {
    const { deltaY, wheelDeltaY, deltaMode } = event;
    return wheelDeltaY ? wheelDeltaY === -3 * deltaY : deltaMode === 0;
  };

  const onObserveRoom = useCallback(
    (event) => {
      if (detectTrackpad(event)) {
        console.log('detect touchpad');
        if (event.deltaY > 0) {
          mixer.current.update(touchPadSpeed);
        } else {
          mixer.current.update(-touchPadSpeed);
        }
      } else {
        console.log(scrollSpeed);
        if (event.deltaY > 0) {
          mixer.current.update(scrollSpeed);
        } else {
          mixer.current.update(-scrollSpeed);
        }
      }
    },
    [scrollSpeed, touchPadSpeed]
  );

  const isTouch = useRef(false);
  const onMouseTouch = (action) => {
    isTouch.current = action;
  };

  const aoWall1Texture = useTexture('/textures/scene/AO_wall_1_1.jpg');
  aoWall1Texture.flipY = false;
  aoWall1Texture.anisotropy = 4.5;
  aoWall1Texture.needsPMREMUpdate = true;

  useEffect(() => {
    scene.traverse((n) => {
      if (n.isMesh) {
        n.material.toneMapped = false;
        n.material.emissive = new THREE.Color('#fdfdff');
        n.material.emissiveIntensity = 0.35;
        n.material.envMapIntensity = 0.8;

        if (n.name === 'WALL_11') {
          console.log('AAAAAA');
          // n.material.map = aoWall1Texture;
          n.material.toneMapped = false;
        }
      }
    });
  }, [materials]);

  useEffect(() => {
    console.log('speed', scrollSpeed);
    // document.addEventListener('wheel', onObserveRoom);
    document.addEventListener('pointerdown', () => onMouseTouch(1));
    document.addEventListener('pointerup', () => onMouseTouch(0));

    return () => {
      // document.removeEventListener('wheel', onObserveRoom);
      document.removeEventListener('pointerdown', () => onMouseTouch(1));
      document.removeEventListener('pointerup', () => onMouseTouch(0));
    };
  }, [scrollSpeed, touchPadSpeed]);

  useFrame((state, delta) => {
    // state.camera.position.lerp(cameras[0].parent.position, 0.08);
    // state.camera.quaternion.slerp(cameras[0].parent.quaternion, 0.08);

    if (isTouch.current) {
      // camera.quaternion.y -= state.mouse.x * 0.008;
      // camera.quaternion.x -= state.mouse.y * 0.008;
      // state.camera.rotation.copy(new THREE.Vector3(state.mouse, 0));
      // state.camera.quaternion.slerp(cameras[0].parent.quaternion, 0.08);
    }

    // state.camera.scale.lerp(cameras[0].parent.scale, 0.08);
    // state.camera.updateProjectionMatrix();
    // state.camera.updateMatrixWorld();
  });

  return (
    <group ref={modelRef} {...props} dispose={null}>
      <group>
        <group name="----------Exponats----------">
          <group name="Exponat_01" position={[-2692.303, 29.345, -799.19]}>
            <mesh
              name="Shoes_L"
              castShadow
              receiveShadow
              geometry={nodes.Shoes_L.geometry}
              material={materials.Mat}
              position={[6.882, 53.855, -3.868]}
              rotation={[0, 0.504, 0]}
            />
            <mesh
              name="Shoes_R"
              castShadow
              receiveShadow
              geometry={nodes.Shoes_R.geometry}
              material={materials.Mat}
              position={[-8.003, 53.855, 4.867]}
              rotation={[0, 0.652, 0]}
            />
          </group>
          <group
            name="Exponat_02"
            position={[-3601.168, 29.663, 795.458]}
            rotation={[-0.01, -0.005, -0.001]}
          >
            <mesh
              name="Caps"
              castShadow
              receiveShadow
              geometry={nodes.Caps.geometry}
              material={materials.Mat}
              position={[0.017, 58.543, -1.431]}
            />
          </group>
          <group
            name="Exponat_03"
            position={[-2177.609, 0, 1952.233]}
            rotation={[Math.PI, -0.96, Math.PI]}
          >
            <mesh
              name="Bed_low"
              castShadow
              receiveShadow
              geometry={nodes.Bed_low.geometry}
              material={materials.Mat}
              position={[0, 20, 0]}
            />
          </group>
          <group
            name="Exponat_04"
            position={[-33.821, 0.701, -78.993]}
            rotation={[-Math.PI, 0, -Math.PI]}
          >
            <mesh
              name="Kubiki"
              castShadow
              receiveShadow
              geometry={nodes.Kubiki.geometry}
              material={materials.Mat}
              position={[3.269, 57.781, 9.589]}
            />
          </group>
          <group
            name="Exponat_05"
            position={[1388.209, 140, 1239.745]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              name="Child_art"
              castShadow
              receiveShadow
              geometry={nodes.Child_art.geometry}
              material={materials.Mat}
              position={[0, -30.117, 30]}
            />
          </group>
          <group
            name="Exponat_06"
            position={[2527.55, -1.452, -243.404]}
            rotation={[Math.PI / 2, 0, Math.PI / 9]}
          >
            <mesh
              name="Xilofon"
              castShadow
              receiveShadow
              geometry={nodes.Xilofon.geometry}
              material={materials.Mat}
              position={[-1.108, 4.55, -140.475]}
            />
          </group>
          <group
            name="Exponat_07"
            position={[4613.149, -0.105, 3349.584]}
            rotation={[0, -0.295, 0]}
          >
            <mesh
              name="Diary"
              castShadow
              receiveShadow
              geometry={nodes.Diary.geometry}
              material={materials.Mat}
              position={[0, 148.829, 0.042]}
              rotation={[0, 0.698, 0]}
            />
          </group>
          <group
            name="Exponat_08"
            position={[6657.277, 140, 3002.112]}
            rotation={[Math.PI / 2, 0, 2.473]}
          >
            <mesh
              name="Kollaj"
              castShadow
              receiveShadow
              geometry={nodes.Kollaj.geometry}
              material={materials.Mat}
              position={[-1.532, -8.108, -35]}
            />
          </group>
          <group
            name="Exponat_09"
            position={[5820.472, -8.756, 485.536]}
            rotation={[-Math.PI, 0.36, -Math.PI]}
          >
            <mesh
              name="Christmass_Ball"
              castShadow
              receiveShadow
              geometry={nodes.Christmass_Ball.geometry}
              material={materials.Mat}
              position={[-27.75, 166.762, 14.773]}
              rotation={[0, 0.122, 0]}
            />
          </group>
          <group
            name="Exponat_10"
            position={[5557.986, 0, -1292.088]}
            rotation={[0, -0.403, 0]}
          >
            <mesh
              name="bow_tie_LP"
              castShadow
              receiveShadow
              geometry={nodes.bow_tie_LP.geometry}
              material={materials.Mat}
              position={[4.715, 164.332, 1.235]}
              rotation={[1.18, 1.025, -1.13]}
            />
          </group>
          <group
            name="Exponat_11"
            position={[6696.894, 0, -4258.613]}
            rotation={[0, -0.215, -Math.PI]}
            scale={[1, -1, 1]}
          >
            <mesh
              name="Ball"
              castShadow
              receiveShadow
              geometry={nodes.Ball.geometry}
              material={materials.Mat}
              position={[671.45, 25, -37.629]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Toy_boxs"
              castShadow
              receiveShadow
              geometry={nodes.Toy_boxs.geometry}
              material={materials.Mat}
              position={[760.023, 47.842, -165.019]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Skis"
              castShadow
              receiveShadow
              geometry={nodes.Skis.geometry}
              material={materials.Mat}
              position={[837.381, 133.218, -214.427]}
              rotation={[0, -0.215, Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Hare"
              castShadow
              receiveShadow
              geometry={nodes.Hare.geometry}
              material={materials.Mat}
              position={[731.21, 27.329, -136.602]}
              rotation={[0, 0.175, -Math.PI]}
              scale={[1, -1, 1]}
            />
            <mesh
              name="Bear_LP"
              castShadow
              receiveShadow
              geometry={nodes.Bear_LP.geometry}
              material={materials.Mat}
              position={[738.58, 2.632, -105.581]}
              rotation={[Math.PI, 1.396, 0]}
              scale={[1, -1, 1]}
            />
          </group>
          <group
            name="Exponat_12"
            position={[4663.247, 0, -3783.545]}
            rotation={[Math.PI, Math.PI / 4, -Math.PI]}
          >
            <mesh
              name="bear_body"
              castShadow
              receiveShadow
              geometry={nodes.bear_body.geometry}
              material={materials.Mat}
              position={[-0.271, 94.731, 5.639]}
              rotation={[Math.PI, -Math.PI / 4, Math.PI]}
            />
          </group>
          <group
            name="Exponat_13"
            position={[4841.208, 0, -5751.099]}
            rotation={[0, 0.782, 0]}
          >
            <mesh
              name="Truck"
              castShadow
              receiveShadow
              geometry={nodes.Truck.geometry}
              material={materials.Mat}
              position={[2.268, 32.946, -0.642]}
              rotation={[Math.PI, Math.PI / 3, -Math.PI]}
            />
          </group>
          <group
            name="Exponat_14"
            position={[6765.105, 0, -5722.216]}
            rotation={[0, Math.PI / 4, 0]}
          >
            <mesh
              name="Dolls"
              castShadow
              receiveShadow
              geometry={nodes.Dolls.geometry}
              material={materials.Mat}
              position={[-2.475, 85.784, 0.232]}
              rotation={[0, -1.571, 0]}
            />
          </group>
          <group
            name="Exponat_15"
            position={[8328.934, 296.289, -3481.771]}
            rotation={[Math.PI, -0.794, Math.PI]}
          >
            <mesh
              name="Hand"
              castShadow
              receiveShadow
              geometry={nodes.Hand.geometry}
              material={materials.Mat}
              position={[-6.642, -153.523, 348.776]}
              rotation={[0, -0.01, 1.544]}
            />
          </group>
        </group>
        <group name="----------Elements----------">
          <mesh
            name="Elements_11"
            castShadow
            receiveShadow
            geometry={nodes.Elements_11.geometry}
            material={materials.Mat}
          />
          <mesh
            name="Elements_12"
            castShadow
            receiveShadow
            geometry={nodes.Elements_12.geometry}
            material={materials.Mat}
          />
          <mesh
            name="Elements_13"
            castShadow
            receiveShadow
            geometry={nodes.Elements_13.geometry}
            material={materials.Mat}
          />
          <mesh
            name="Elements_14"
            castShadow
            receiveShadow
            geometry={nodes.Elements_14.geometry}
            material={materials.Mat}
          />
          <mesh
            name="Elements_2"
            castShadow
            receiveShadow
            geometry={nodes.Elements_2.geometry}
            material={materials.Mat}
          />
        </group>
        <group name="----------Walls--------------">
          <mesh
            name="Ceiling_1"
            castShadow
            receiveShadow
            geometry={nodes.Ceiling_1.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_113"
            castShadow
            receiveShadow
            geometry={nodes.WALL_113.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_112"
            castShadow
            receiveShadow
            geometry={nodes.WALL_112.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_111"
            castShadow
            receiveShadow
            geometry={nodes.WALL_111.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_110"
            castShadow
            receiveShadow
            geometry={nodes.WALL_110.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_19"
            castShadow
            receiveShadow
            geometry={nodes.WALL_19.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_18"
            castShadow
            receiveShadow
            geometry={nodes.WALL_18.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_17"
            castShadow
            receiveShadow
            geometry={nodes.WALL_17.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_16"
            castShadow
            receiveShadow
            geometry={nodes.WALL_16.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_15"
            castShadow
            receiveShadow
            geometry={nodes.WALL_15.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_14"
            castShadow
            receiveShadow
            geometry={nodes.WALL_14.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_13"
            castShadow
            receiveShadow
            geometry={nodes.WALL_13.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_12"
            castShadow
            receiveShadow
            geometry={nodes.WALL_12.geometry}
            material={materials.Mat}
          />
          <mesh
            name="WALL_11"
            castShadow
            receiveShadow
            geometry={nodes.WALL_11.geometry}
            material={materials.Mat}
            position={[5279.651, 20.652, 16.261]}
          />
          <mesh
            name="FLOOR_11"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_11.geometry}
            // material={materials.Mat}
            position={[-2850.75, -0.073, 876.75]}
          >
            <MeshReflectorMaterial
              // blur={[1048, 1048]}
              resolution={2048}
              args={[4000, 4000]}
              mirror={0.8}
              mixBlur={1}
              mixStrength={0.5}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -1, 0]}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              // color={'#919191'}
              color={'#ffffff'}
              metalness={0.8}
              roughness={0.4}
              // roughnessMap={floor}
              // normalMap={normal}
              // normalScale={[0.2, 0.2]}
              // roughnessScale={[0.02, 0.02]}
            />
          </mesh>
          <mesh
            name="FLOOR_12"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_12.geometry}
            material={materials.Mat}
          />
          <mesh
            name="FLOOR_13"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_13.geometry}
            material={materials.Mat}
            position={[3515.082, 75.695, -69.535]}
          />
          <mesh
            name="FLOOR_14"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_14.geometry}
            material={materials.Mat}
            position={[3515.082, 75.695, -69.535]}
          />
          <mesh
            name="FLOOR_15"
            castShadow
            receiveShadow
            geometry={nodes.FLOOR_15.geometry}
            material={materials.Mat}
            position={[3515.082, 75.695, -69.535]}
          />
        </group>
        <group
          name="Camera_Null"
          position={[7425, 360, -4370.621]}
          rotation={[-3.018, -0.782, -3.055]}
        >
          <PerspectiveCamera
            name="Camera"
            makeDefault={false}
            far={10000000000}
            near={0.01}
            fov={32.269}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('models/level2.glb');
