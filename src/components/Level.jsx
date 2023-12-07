import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  useCursor,
  useGLTF,
  PerspectiveCamera,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { useTextures } from 'src/components/useTextures';
import * as THREE from 'three';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { Quaternion, Vector3 } from 'three';
import { easing } from 'maath';

export function Model(props) {
  const group = useRef();
  const exhibitOnObserve = useRef(null);
  const { nodes, animations, scene, cameras } = useGLTF('models/model.gltf');
  const textures = useTextures();
  const mixer = useRef(new THREE.AnimationMixer(scene));
  const action = useRef(mixer.current.clipAction(animations[0]));
  action.current.play();
  const [hover, setHover] = useState(false);

  useCursor(hover);

  const {
    floorMirrorStrength,
    reflectorVisible,
    exhibitsVisible,
    wallsVisible,
    touchPadSpeed,
    scrollSpeed,
    superSlowTouchPadSpeed,
  } = useControls({
    floorMirrorStrength: { value: 0.3, min: 0, max: 1, step: 0.01 },
    reflectorVisible: true,
    exhibitsVisible: true,
    wallsVisible: true,
    touchPadSpeed: { value: 0.01, min: 0.01, max: 0.1, step: 0.01 },
    scrollSpeed: { value: 0.12, min: 0.005, max: 0.5 },
    superSlowTouchPadSpeed: false,
  });

  const onExhibitClick = (event, position, quaternion) => {
    exhibitOnObserve.current = {
      position,
      quaternion,
    };
  };

  const detectTrackpad = (event) => {
    const { deltaY, wheelDeltaY, deltaMode } = event;
    return wheelDeltaY ? wheelDeltaY === -3 * deltaY : deltaMode === 0;
  };

  const onObserveRoom = useCallback(
    (event) => {
      if (exhibitOnObserve.current) exhibitOnObserve.current = null;
      if (detectTrackpad(event)) {
        if (event.deltaY > 0) {
          if (superSlowTouchPadSpeed) {
            console.log('superSlowTouchPadSpeed', touchPadSpeed * 0.1);
            mixer.current.update(touchPadSpeed * 0.1);
          } else {
            mixer.current.update(touchPadSpeed);
          }
        } else {
          if (superSlowTouchPadSpeed) {
            console.log('superSlowTouchPadSpeed', -touchPadSpeed * 0.1);
            mixer.current.update(-touchPadSpeed * 0.1);
          } else {
            mixer.current.update(-touchPadSpeed);
          }
        }
      } else {
        console.log('scroll', scrollSpeed);
        if (event.deltaY > 0) {
          mixer.current.update(scrollSpeed);
        } else {
          mixer.current.update(-scrollSpeed);
        }
      }
    },
    [scrollSpeed, touchPadSpeed, superSlowTouchPadSpeed]
  );

  useEffect(() => {
    console.log('speed', scrollSpeed);
    document.addEventListener('wheel', onObserveRoom);

    return () => {
      document.removeEventListener('wheel', onObserveRoom);
    };
  }, [scrollSpeed, touchPadSpeed, superSlowTouchPadSpeed]);

  useFrame((state) => {
    if (exhibitOnObserve.current) {
      // easing.damp3(
      //   state.camera.position,
      //   exhibitOnObserve.current?.position,
      //   0.4,
      //   0.08
      // );
      // easing.dampQ(
      //   state.camera.quaternion,
      //   exhibitOnObserve.current?.quaternion,
      //   0.4,
      //   0.08
      // );

      state.camera.position.lerp(exhibitOnObserve.current?.position, 0.08);
      state.camera.quaternion.slerp(exhibitOnObserve.current?.quaternion, 0.08);
    } else {
      state.camera.position.lerp(cameras[0].parent.position, 0.08);
      state.camera.quaternion.slerp(cameras[0].parent.quaternion, 0.08);
      state.camera.scale.lerp(cameras[0].parent.scale, 0.08);
    }
    state.camera.updateProjectionMatrix();
    state.camera.updateMatrixWorld();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        {exhibitsVisible && (
          <group name="----------Exponats----------">
            <group
              name="Exponat_01"
              position={[-26.923, 0.293, -7.992]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(-26.923, 1, -6),
                  event.eventObject.quaternion
                )
              }
            >
              <mesh
                name="Shoes_L"
                geometry={nodes.Shoes_L.geometry}
                position={[0.069, 0.539, -0.039]}
                rotation={[0, 0.504, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.shoe1}
                  aoMap={textures.exhibits.aoShoe1}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                name="Shoes_R"
                geometry={nodes.Shoes_R.geometry}
                position={[-0.08, 0.539, 0.049]}
                rotation={[0, 0.652, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.shoe2}
                  aoMap={textures.exhibits.aoShoe2}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_02"
              position={[-36.012, 0.297, 7.955]}
              rotation={[-0.01, -0.005, -0.001]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(-34, 1, 7.955),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI / 2
                  )
                )
              }
            >
              <mesh
                name="Caps"
                geometry={nodes.Caps.geometry}
                position={[0, 0.585, -0.014]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.cups}
                  aoMap={textures.exhibits.aoCups}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_03"
              position={[-21.776, 0, 19.522]}
              rotation={[Math.PI, -0.96, Math.PI]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(-21.776, 1, 14.522),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI
                  )
                )
              }
            >
              <mesh
                name="Bed_low"
                geometry={nodes.Bed_low.geometry}
                position={[0, 0.2, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.bed}
                  aoMap={textures.exhibits.aoBed}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_04"
              position={[-0.338, 0.007, -0.79]}
              rotation={[-Math.PI, 0, -Math.PI]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(-0.338, 1, 3),
                  new THREE.Quaternion(0, 0, 0, 1)
                )
              }
            >
              <mesh
                name="Kubiki"
                geometry={nodes.Kubiki.geometry}
                position={[0.033, 0.578, 0.096]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.cubes}
                  aoMap={textures.exhibits.aoCubes}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_05"
              position={[13.882, 1.4, 12.397]}
              rotation={[-Math.PI / 2, 0, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(13.882, 1.4, 8),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI
                  )
                )
              }
            >
              <mesh
                name="Child_art"
                geometry={nodes.Child_art.geometry}
                position={[0, -0.301, 0.3]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.art}
                  aoMap={textures.exhibits.aoArt}
                  // toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_06"
              position={[25.275, -0.015, -2.434]}
              rotation={[Math.PI / 2, 0, Math.PI / 9]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(24, 1.8, 2),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    -Math.PI * 0.11
                  )
                )
              }
            >
              <mesh
                name="Xilofon"
                geometry={nodes.Xilofon.geometry}
                position={[-0.011, 0.046, -1.405]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.xylophone}
                  aoMap={textures.exhibits.aoXylophone}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_07"
              position={[46.131, -0.001, 33.496]}
              rotation={[0, -0.295, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(46.62, 1.5, 32),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.9
                  )
                )
              }
            >
              <mesh
                name="Diary"
                geometry={nodes.Diary.geometry}
                position={[0, 1.488, 0]}
                rotation={[0, 0.698, 0]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.diary}
                  aoMap={textures.exhibits.aoDiary}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_08"
              position={[66.573, 1.4, 30.021]}
              rotation={[Math.PI / 2, 0, 2.473]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(65, 1.7, 28),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 1.2
                  )
                )
              }
            >
              <mesh
                name="Kollag"
                geometry={nodes.Kollag.geometry}
                position={[-0.015, -0.081, -0.35]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.collage}
                  // aoMap={textures.exhibits.aoCollage}
                  // toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_09"
              position={[58.205, -0.088, 4.855]}
              rotation={[-Math.PI, 0.36, -Math.PI]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(60.5, 1.4, 4.2),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.6
                  )
                )
              }
            >
              <mesh
                name="Christmass_Ball"
                geometry={nodes.Christmass_Ball.geometry}
                position={[-0.278, 1.668, 0.148]}
                rotation={[0, 0.122, 0]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.bauble}
                  aoMap={textures.exhibits.aoBauble}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_10"
              position={[55.58, 0, -12.921]}
              rotation={[0, -0.403, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(57.5, 1.5, -11.5),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.28
                  )
                )
              }
            >
              <mesh
                name="Bow_tie"
                geometry={nodes.Bow_tie.geometry}
                position={[0.047, 1.643, 0.012]}
                rotation={[1.18, 1.025, -1.13]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.bowTie}
                  aoMap={textures.exhibits.aoBowTie}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_11"
              position={[66.969, 0, -42.586]}
              rotation={[0, -0.215, -Math.PI]}
              scale={[1, -1, 1]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(63, 1, -40.5),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.1
                  )
                )
              }
            >
              <mesh
                name="Ball"
                geometry={nodes.Ball.geometry}
                position={[6.714, 0.25, -0.376]}
                rotation={[0, -0.215, Math.PI]}
                scale={[1, -1, 1]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.ball}
                  aoMap={textures.exhibits.aoBall}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                name="Toy_boxes"
                geometry={nodes.Toy_boxes.geometry}
                position={[7.6, 0.478, -1.65]}
                rotation={[0, -0.215, Math.PI]}
                scale={[1, -1, 1]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.toyBoxes}
                  aoMap={textures.exhibits.aoToyBoxes}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                name="Skies"
                geometry={nodes.Skies.geometry}
                position={[7.78, 1.332, -2.173]}
                rotation={[0, -0.215, Math.PI]}
                scale={[1, -1, 1]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.skies}
                  aoMap={textures.exhibits.aoSkies}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                name="Hare"
                geometry={nodes.Hare.geometry}
                position={[7.312, 0.273, -1.366]}
                rotation={[0, 0.175, Math.PI]}
                scale={[1, -1, 1]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.hare}
                  aoMap={textures.exhibits.aoHare}
                  toneMapped={false}
                />
              </mesh>
              <mesh
                name="Bear"
                geometry={nodes.Bear.geometry}
                position={[7.386, 0.026, -1.056]}
                rotation={[Math.PI, 1.396, 0]}
                scale={[1, -1, 1]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.bear1}
                  aoMap={textures.exhibits.aoBear1}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_12"
              position={[46.632, 0, -37.835]}
              rotation={[Math.PI, Math.PI / 4, -Math.PI]}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(47.2, 1, -38.7),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.8
                  )
                )
              }
            >
              <mesh
                name="Bear_body"
                geometry={nodes.Bear_body.geometry}
                position={[-0.003, 0.947, 0.056]}
                rotation={[Math.PI, -Math.PI / 4, Math.PI]}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.bear2}
                  aoMap={textures.exhibits.aoBear2}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_13"
              position={[48.412, 0, -57.511]}
              rotation={[0, 0.782, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(50.5, 0.7, -56),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    Math.PI * 0.25
                  )
                )
              }
            >
              <mesh
                name="Truck"
                geometry={nodes.Truck.geometry}
                position={[0.023, 0.329, -0.006]}
                rotation={[Math.PI, Math.PI / 3, -Math.PI]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.truck}
                  aoMap={textures.exhibits.aoTruck}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_14"
              position={[67.651, 0, -57.222]}
              rotation={[0, Math.PI / 4, 0]}
              onPointerOver={() => setHover(true)}
              onPointerOut={() => setHover(false)}
              onClick={(event) =>
                onExhibitClick(
                  event,
                  new Vector3(66.5, 1.1, -56),
                  new THREE.Quaternion().setFromAxisAngle(
                    new THREE.Vector3(0, 1, 0),
                    -Math.PI * 0.25
                  )
                )
              }
            >
              <mesh
                name="Doll"
                geometry={nodes.Doll.geometry}
                position={[-0.025, 0.858, 0.002]}
                rotation={[0, -1.571, 0]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.doll}
                  aoMap={textures.exhibits.aoDoll}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_15"
              position={[83.289, 2.963, -34.818]}
              rotation={[Math.PI, -0.794, Math.PI]}
            >
              <mesh
                name="Hand"
                geometry={nodes.Hand.geometry}
                position={[-0.066, -1.535, 3.488]}
                rotation={[0, -0.01, 1.544]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.aoHand}
                  // aoMap={textures.exhibits.hand}
                  toneMapped={false}
                />
              </mesh>
            </group>
          </group>
        )}
        <group name="----------Elements----------">
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
        <group name="----------Floors------------">
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
        {wallsVisible && (
          <group name="----------Walls--------------">
            <mesh name="Ceiling_11" geometry={nodes.Ceiling_11.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.floors.aoCeiling}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_113" geometry={nodes.WALL_113.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall13}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_112" geometry={nodes.WALL_112.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall12}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_111" geometry={nodes.WALL_111.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall11}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_110" geometry={nodes.WALL_110.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall10}
                toneMapped={false}
              />
            </mesh>
            <mesh
              name="WALL_19"
              geometry={nodes.WALL_19.geometry}
              position={[79.43, -0.001, -0.365]}
            >
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall9}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_18" geometry={nodes.WALL_18.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall8}
                toneMapped={false}
              />
            </mesh>
            <mesh
              name="WALL_17"
              geometry={nodes.WALL_17.geometry}
              position={[52.288, 6.3, 6.693]}
            >
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall7}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_16" geometry={nodes.WALL_16.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall6}
                toneMapped={false}
              />
            </mesh>
            <mesh
              name="WALL_15"
              geometry={nodes.WALL_15.geometry}
              position={[15.615, -0.001, 21.461]}
            >
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall5}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_14" geometry={nodes.WALL_14.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall4}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_13" geometry={nodes.WALL_13.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall3}
                toneMapped={false}
              />
            </mesh>
            <mesh name="WALL_12" geometry={nodes.WALL_12.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall2}
                toneMapped={false}
              />
            </mesh>
            <mesh
              name="WALL_11"
              geometry={nodes.WALL_11.geometry}
              position={[52.797, 0.207, 0.163]}
            >
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall1}
                toneMapped={false}
              />
            </mesh>
          </group>
        )}
        <group
          name="Camera_Null"
          position={[-17, 1.4, -1.6]}
          rotation={[0, -1.571, 0]}
        >
          <PerspectiveCamera
            name="OctaneCamera"
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

useGLTF.preload('models/model.gltf');
