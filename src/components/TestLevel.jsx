import React, { useEffect, useRef } from 'react';
import {
  useGLTF,
  useAnimations,
  MeshReflectorMaterial,
  useTexture,
} from '@react-three/drei';
import * as THREE from 'three';
import { MeshStandardMaterial } from 'three';
import { useControls } from 'leva';
import { useTextures } from 'src/components/useTextures';

export function Level3(props) {
  const group = useRef();
  const { nodes, materials, animations, scene } = useGLTF('models/level2.glb');
  const { actions } = useAnimations(animations, group);
  const textures = useTextures();

  const {
    floorMirrorStrength,
    reflectorVisible,
    exhibitsVisible,
    wallsVisible,
  } = useControls({
    floorMirrorStrength: { value: 0.3, min: 0, max: 1, step: 0.01 },
    reflectorVisible: true,
    exhibitsVisible: true,
    wallsVisible: true,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {exhibitsVisible && (
          <group name="----------Exponats----------" scale={0.001}>
            <group name="Exponat_01" position={[-2692.303, 29.345, -799.19]}>
              <mesh
                name="Shoes_L"
                geometry={nodes.Shoes_L.geometry}
                position={[6.882, 53.855, -3.868]}
                rotation={[0, 0.504, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.shoe1}
                  aoMap={textures.exhibits.aoShoe1}
                  // toneMapped={false}
                />
              </mesh>
              <mesh
                name="Shoes_R"
                geometry={nodes.Shoes_R.geometry}
                position={[-8.003, 53.855, 4.867]}
                rotation={[0, 0.652, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.shoe2}
                  aoMap={textures.exhibits.aoShoe2}
                  // toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_02"
              position={[-3601.168, 29.663, 795.458]}
              rotation={[-0.01, -0.005, -0.001]}
            >
              <mesh
                name="Caps"
                geometry={nodes.Caps.geometry}
                position={[0.017, 58.543, -1.431]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.cups}
                  aoMap={textures.exhibits.aoCups}
                  // toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_03"
              position={[-2177.609, 0, 1952.233]}
              rotation={[Math.PI, -0.96, Math.PI]}
            >
              <mesh
                name="Bed_low"
                geometry={nodes.Bed_low.geometry}
                position={[0, 20, 0]}
              >
                <meshStandardMaterial
                  // color={'#ffffff'}
                  map={textures.exhibits.bed}
                  aoMap={textures.exhibits.aoBed}
                  // toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_04"
              position={[-33.821, 0.701, -78.993]}
              rotation={[-Math.PI, 0, -Math.PI]}
            >
              <mesh
                name="Kubiki"
                geometry={nodes.Kubiki.geometry}
                position={[3.269, 57.781, 9.589]}
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
              position={[1388.209, 140, 1239.745]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <mesh
                name="Child_art"
                geometry={nodes.Child_art.geometry}
                position={[0, -30.117, 30]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.art}
                  aoMap={textures.exhibits.aoArt}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_06"
              position={[2527.55, -1.452, -243.404]}
              rotation={[Math.PI / 2, 0, Math.PI / 9]}
            >
              <mesh
                name="Xilofon"
                geometry={nodes.Xilofon.geometry}
                position={[-1.108, 4.55, -140.475]}
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
              position={[4613.149, -0.105, 3349.584]}
              rotation={[0, -0.295, 0]}
            >
              <mesh
                name="Diary"
                geometry={nodes.Diary.geometry}
                position={[0, 148.829, 0.042]}
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
              position={[6657.277, 140, 3002.112]}
              rotation={[Math.PI / 2, 0, 2.473]}
            >
              <mesh
                name="Kollaj"
                geometry={nodes.Kollaj.geometry}
                position={[-1.532, -8.108, -35]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.collage}
                  aoMap={textures.exhibits.aoCollage}
                  toneMapped={false}
                />
              </mesh>
            </group>
            <group
              name="Exponat_09"
              position={[5820.472, -8.756, 485.536]}
              rotation={[-Math.PI, 0.36, -Math.PI]}
            >
              <mesh
                name="Christmass_Ball"
                geometry={nodes.Christmass_Ball.geometry}
                position={[-27.75, 166.762, 14.773]}
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
              position={[5557.986, 0, -1292.088]}
              rotation={[0, -0.403, 0]}
            >
              <mesh
                name="bow_tie_LP"
                geometry={nodes.bow_tie_LP.geometry}
                position={[4.715, 164.332, 1.235]}
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
              position={[6696.894, 0, -4258.613]}
              rotation={[0, -0.215, -Math.PI]}
              scale={[1, -1, 1]}
            >
              <mesh
                name="Ball"
                geometry={nodes.Ball.geometry}
                position={[671.45, 25, -37.629]}
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
                name="Toy_boxs"
                geometry={nodes.Toy_boxs.geometry}
                position={[760.023, 47.842, -165.019]}
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
                name="Skis"
                geometry={nodes.Skis.geometry}
                position={[837.381, 133.218, -214.427]}
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
                position={[731.21, 27.329, -136.602]}
                rotation={[0, 0.175, -Math.PI]}
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
                name="Bear_LP"
                geometry={nodes.Bear_LP.geometry}
                position={[738.58, 2.632, -105.581]}
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
              position={[4663.247, 0, -3783.545]}
              rotation={[Math.PI, Math.PI / 4, -Math.PI]}
            >
              <mesh
                name="bear_body"
                geometry={nodes.bear_body.geometry}
                position={[-0.271, 94.731, 5.639]}
                rotation={[Math.PI, -Math.PI / 4, Math.PI]}
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
              position={[4841.208, 0, -5751.099]}
              rotation={[0, 0.782, 0]}
            >
              <mesh
                name="Truck"
                geometry={nodes.Truck.geometry}
                position={[2.268, 32.946, -0.642]}
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
              position={[6765.105, 0, -5722.216]}
              rotation={[0, Math.PI / 4, 0]}
            >
              <mesh
                name="Dolls"
                geometry={nodes.Dolls.geometry}
                position={[-2.475, 85.784, 0.232]}
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
              position={[8328.934, 296.289, -3481.771]}
              rotation={[Math.PI, -0.794, Math.PI]}
            >
              <mesh
                name="Hand"
                geometry={nodes.Hand.geometry}
                position={[-6.642, -153.523, 348.776]}
                rotation={[0, -0.01, 1.544]}
              >
                <meshStandardMaterial
                  color={'#ffffff'}
                  map={textures.exhibits.hand}
                  aoMap={textures.exhibits.aoHand}
                  toneMapped={false}
                />
              </mesh>
            </group>
          </group>
        )}
        <group name="----------Elements----------" scale={0.001}>
          <mesh name="Elements_11" geometry={nodes.Elements_11.geometry}>
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.elements.aoEl1}
              // toneMapped={false}
            />
          </mesh>
          <mesh name="Elements_12" geometry={nodes.Elements_12.geometry}>
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.elements.aoEl2}
              // toneMapped={false}
            />
          </mesh>
          <mesh name="Elements_13" geometry={nodes.Elements_13.geometry}>
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.elements.aoEl3}
              // toneMapped={false}
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
        <group name="----------Floors--------------" scale={0.001}>
          {reflectorVisible && (
            <>
              <mesh
                name="FLOOR_11mirror"
                position={[2000, 3, 1300]}
                rotation={[-Math.PI * 0.5, 0, 0]}
              >
                {/*<planeGeometry args={[5000, 4380]} />*/}
                <planeGeometry args={[14000, 5300]} />
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
                position={[6000, 3, -4550]}
                rotation={[-Math.PI * 0.5, 0, 0]}
              >
                {/*<planeGeometry args={[5000, 4380]} />*/}
                <planeGeometry args={[6000, 6400]} />
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
            position={[-2850.75, 1, 876.75]}
          >
            <meshStandardMaterial
              color={'#ffffff'}
              aoMap={textures.floors.aoFloor1}
              toneMapped={false}
            />
          </mesh>
          <mesh
            name="FLOOR_12"
            geometry={nodes.FLOOR_12.geometry}
            position={[0, 1, 0]}
          >
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.floors.aoFloor2}
              toneMapped={false}
            />
          </mesh>
          <mesh
            name="FLOOR_13"
            geometry={nodes.FLOOR_13.geometry}
            position={[3515.082, 77, -69.535]}
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
            position={[3515.082, 77, -69.535]}
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
            position={[3515.082, 77, -69.535]}
          >
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.floors.aoFloor5}
              toneMapped={false}
            />
          </mesh>
          <mesh name="Ceiling_1" geometry={nodes.Ceiling_1.geometry}>
            <meshStandardMaterial
              color={'#ffffff'}
              map={textures.floors.aoCeiling}
              toneMapped={false}
            />
          </mesh>
        </group>
        {wallsVisible && (
          <group name="----------Walls--------------" scale={0.001}>
            <mesh
              name="WALL_11"
              geometry={nodes.WALL_11.geometry}
              position={[5279.651, 20.652, 16.261]}
            >
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall1}
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
            <mesh name="WALL_13" geometry={nodes.WALL_13.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall3}
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
            <mesh name="WALL_15" geometry={nodes.WALL_15.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall5}
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
            <mesh name="WALL_17" geometry={nodes.WALL_17.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall7}
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
            <mesh name="WALL_19" geometry={nodes.WALL_19.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall9}
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
            <mesh name="WALL_111" geometry={nodes.WALL_111.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall11}
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
            <mesh name="WALL_113" geometry={nodes.WALL_113.geometry}>
              <meshStandardMaterial
                color={'#ffffff'}
                map={textures.walls.aoWall13}
                toneMapped={false}
              />
            </mesh>
          </group>
        )}
      </group>
    </group>
  );
}

useGLTF.preload('models/level2.glb');
