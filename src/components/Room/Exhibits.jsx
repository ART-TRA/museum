import React from 'react';
import { Vector3 } from 'three';
import { LevelItem } from 'src/components/Room/LevelItem';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { useThree } from '@react-three/fiber';
import { activeMuseumAtom } from 'src/recoil/atoms/activeMuseum';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { useTextures } from 'src/hooks/useTextures';

export const Exhibits = ({ exhibitOnObserve }) => {
  const { viewport } = useThree();
  const { nodes } = useGLTF('models/model.glb');
  const textures = useTextures();
  const roomDuration = useRecoilValue(roomDurationAtom);
  const isActiveMuseum = useRecoilValue(activeMuseumAtom);
  const [isExhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);

  const onExhibitClick = (name, position, quaternion) => {
    if (isActiveMuseum) {
      setExhibitActive(name);
      exhibitOnObserve.current = {
        position,
        quaternion,
      };
    }
  };
  console.log('roomDuration', roomDuration);
  return (
    <group name="Exhibits">
      <LevelItem
        name="boots"
        position={[-26.923, 0.293, -7.992]}
        limits={[1.8, 5.7]}
        clickAreaPosition={[0, 0.6, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'boots',
              new Vector3(-26.983 + viewport.width * 0.003, 0.89, -6),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 0.15, 0),
                -Math.PI * 0.4
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="cups"
        position={[-36.012, 0.297, 7.955]}
        rotation={[-0.01, -0.005, -0.001]}
        limits={[7.5, 11]}
        clickAreaPosition={[0, 0.65, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'cups',
              new Vector3(-34, 0.93, 7.955),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.445 - viewport.width * 0.002
              )
            );
          }
        }}
      >
        <mesh
          name="Cups"
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
      </LevelItem>
      <LevelItem
        name="bed"
        position={[-21.776, 0, 19.522]}
        rotation={[Math.PI, -0.96, Math.PI]}
        clickAreaPosition={[0, 0.65, 0]}
        limits={[12.5, 15.8]}
        clickAreaSize={1.3}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'bed',
              new Vector3(-23.25, 0.7, 13.3),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="cubes"
        position={[-0.338, 0.007, -0.79]}
        rotation={[-Math.PI, 0, -Math.PI]}
        limits={[21.8, 24.65]}
        clickAreaSize={0.8}
        clickAreaPosition={[0, 0.5, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'cubes',
              new Vector3(-0.338 + viewport.width * 0.053, 0.8, 4),
              new THREE.Quaternion(0, 0, 0, 1)
            );
          }
        }}
      >
        <mesh
          name="Cubes"
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
      </LevelItem>
      <LevelItem
        name="art"
        position={[13.882, 1.4, 12.397]}
        rotation={[-Math.PI / 2, 0, 0]}
        limits={[26.5, 29.5]}
        clickAreaSize={1.0}
        clickAreaPosition={[0, 0.5, 0.3]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'art',
              new Vector3(13.8 - viewport.width * 0.051, 1.6, 8),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="xylophone"
        position={[25.275, -0.015, -2.434]}
        rotation={[Math.PI / 2, 0, Math.PI / 9]}
        limits={[31.4, 34.22]}
        clickAreaSize={0.9}
        clickAreaPosition={[0, 0, -1.8]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'xylophone',
              new Vector3(24.43 + viewport.width * 0.0015, 1.8, 2),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                -Math.PI * 0.13
              )
            );
          }
        }}
      >
        <mesh
          name="Xylophone"
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
      </LevelItem>
      <LevelItem
        name="diary"
        position={[46.131, -0.001, 33.496]}
        rotation={[0, -0.295, 0]}
        limits={[39.8, 42.72]}
        clickAreaSize={0.8}
        clickAreaPosition={[0, 1.5, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'diary',
              new Vector3(46.665 - viewport.width * 0.0045, 1.45, 31.6),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.86
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="collage"
        position={[66.573, 1.4, 30.021]}
        rotation={[Math.PI / 2, 0, 2.473]}
        limits={[44, 46.6]}
        clickAreaSize={0.85}
        clickAreaPosition={[0, 0.5, -0.33]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'collage',
              new Vector3(64, 1.7, 27.6),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 1.19
              )
            );
          }
        }}
      >
        <mesh
          name="Collage"
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
      </LevelItem>
      <LevelItem
        name="bauble"
        position={[58.205, -0.088, 4.855]}
        rotation={[-Math.PI, 0.36, -Math.PI]}
        limits={[53.4, 56.4]}
        clickAreaSize={0.7}
        clickAreaPosition={[0, 1.5, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'bauble',
              new Vector3(59.6, 1.45, 4.2),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.6
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="bowTie"
        position={[55.58, 0, -12.921]}
        rotation={[0, -0.403, 0]}
        limits={[57.8, 60.3]}
        clickAreaSize={0.7}
        clickAreaPosition={[0, 1.5, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'bowTie',
              new Vector3(56.7, 1.6, -12.14),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.24
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="storageRoom"
        position={[66.969, 0, -42.586]}
        rotation={[0, -0.215, -Math.PI]}
        scale={[1, -1, 1]}
        limits={[65.6, 68.8]}
        clickAreaSize={1.5}
        clickAreaPosition={[5.8, 1.6, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'storageRoom',
              new Vector3(62.2, 0.56, -41.8),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.1
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="bear"
        position={[46.632, 0, -37.835]}
        rotation={[Math.PI, Math.PI / 4, -Math.PI]}
        limits={[69.7, 73]}
        clickAreaSize={0.6}
        clickAreaPosition={[0, 1, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'bear',
              new Vector3(47.7, 0.96, -39),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.7
              )
            );
          }
        }}
      >
        <mesh
          name="Bear_body"
          geometry={nodes.Bear_body.geometry}
          position={[-0.003, 0.947, 0.056]}
          rotation={[Math.PI, -Math.PI / 4, Math.PI]}
        >
          <meshStandardMaterial
            color={'#ffffff'}
            map={textures.exhibits.bear2}
            aoMap={textures.exhibits.aoBear2}
            toneMapped={false}
          />
        </mesh>
      </LevelItem>
      <LevelItem
        name="car"
        position={[48.412, 0, -57.511]}
        rotation={[0, 0.782, 0]}
        limits={[74.2, 77.8]}
        clickAreaSize={0.6}
        clickAreaPosition={[0, 0.3, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'car',
              new Vector3(49.95, 0.5, -56.4),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                Math.PI * 0.23
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="doll"
        position={[67.651, 0, -57.222]}
        rotation={[0, Math.PI / 4, 0]}
        limits={[79.4, 82.4]}
        clickAreaSize={0.5}
        clickAreaPosition={[0, 0.9, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              'doll',
              new Vector3(66.9, 1.02, -56.4),
              new THREE.Quaternion().setFromAxisAngle(
                new THREE.Vector3(0, 1, 0),
                -Math.PI * 0.3
              )
            );
          }
        }}
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
      </LevelItem>
      <LevelItem
        name="hand"
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
      </LevelItem>
    </group>
  );
};

useGLTF.preload('models/model.glb');
