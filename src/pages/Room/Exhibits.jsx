import React, { useRef } from 'react';
import { Exhibit } from 'src/pages/Room/Exhibit';
import { useRecoilState } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { EXHIBITS_TIME_COORDS, useExhibits } from 'src/hooks/useExhibits';

export const Exhibits = ({ nodes, exhibitOnObserve, rootRef }) => {
  const [isExhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const oneClickLimit = useRef(true);
  const { exhibits } = useExhibits();

  const onExhibitClick = (name, position, quaternion) => {
    if (oneClickLimit.current) {
      setExhibitActive(name);
      exhibitOnObserve.current = {
        position,
        quaternion,
      };
      setTimeout(() => {
        oneClickLimit.current = true;
      }, 3000);
    }
    oneClickLimit.current = false;
  };

  return (
    <group name="Exhibits" ref={rootRef}>
      <Exhibit
        name={exhibits.boots.name}
        position={[-26.923, 0.293, -7.992]}
        limits={[
          EXHIBITS_TIME_COORDS.boots - 1,
          EXHIBITS_TIME_COORDS.boots + 1,
        ]}
        clickAreaPosition={[0, 0.6, 0]}
        indicatorPosition={[0.1, 0.6, 0.33]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.boots.name,
              exhibits.boots.position,
              exhibits.boots.quaternion
            );
          }
        }}
      >
        <mesh
          name="Shoes_L"
          geometry={nodes.Shoes_L.geometry}
          position={[0.069, 0.539, -0.039]}
          rotation={[0, 0.504, 0]}
        />
        <mesh
          name="Shoes_R"
          geometry={nodes.Shoes_R.geometry}
          position={[-0.08, 0.539, 0.049]}
          rotation={[0, 0.652, 0]}
        />
      </Exhibit>
      <Exhibit
        name={exhibits.cups.name}
        position={[-36.012, 0.297, 7.955]}
        rotation={[-0.01, -0.005, -0.001]}
        limits={[EXHIBITS_TIME_COORDS.cups - 1, EXHIBITS_TIME_COORDS.cups + 1]}
        clickAreaPosition={[0, 0.65, 0]}
        indicatorPosition={[0.3, 0.7, 0.0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.cups.name,
              exhibits.cups.position,
              exhibits.cups.quaternion
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
            // map={textures.exhibits.cups}
            // aoMap={textures.exhibits.aoCups}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.bed.name}
        position={[-21.776, 0, 19.522]}
        rotation={[Math.PI, -0.96, Math.PI]}
        clickAreaPosition={[0, 0.65, 0]}
        indicatorPosition={[-0.8, 0.6, 0.6]}
        limits={[EXHIBITS_TIME_COORDS.bed - 1, EXHIBITS_TIME_COORDS.bed + 1]}
        clickAreaSize={1.3}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.bed.name,
              exhibits.bed.position,
              exhibits.bed.quaternion
            );
          }
        }}
      >
        <mesh
          name="Bed"
          geometry={nodes.Bed_low.geometry}
          position={[0, 0.2, 0]}
        >
          <meshStandardMaterial
            // color={'#ffffff'}
            // map={textures.exhibits.bed}
            // aoMap={textures.exhibits.aoBed}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.cubes.name}
        position={[-0.338, 0.007, -0.79]}
        rotation={[-Math.PI, 0, -Math.PI]}
        limits={[
          EXHIBITS_TIME_COORDS.cubes - 1,
          EXHIBITS_TIME_COORDS.cubes + 1,
        ]}
        clickAreaSize={0.8}
        clickAreaPosition={[0, 0.5, 0]}
        // indicatorPosition={[0, 1.2, 0]}
        indicatorPosition={[0, 0.8, -0.5]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.cubes.name,
              exhibits.cubes.position,
              exhibits.cubes.quaternion
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
            // map={textures.exhibits.cubes}
            // aoMap={textures.exhibits.aoCubes}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.art.name}
        position={[13.882, 1.4, 12.397]}
        rotation={[-Math.PI / 2, 0, 0]}
        limits={[
          EXHIBITS_TIME_COORDS.childArt - 1,
          EXHIBITS_TIME_COORDS.childArt + 1,
        ]}
        clickAreaSize={1.0}
        clickAreaPosition={[0, 0.5, 0.3]}
        // indicatorPosition={[0, 0, 1.1]}
        indicatorPosition={[0, 0.1, 0.3]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.art.name,
              exhibits.art.position,
              exhibits.art.quaternion
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
            // map={textures.exhibits.art}
            // aoMap={textures.exhibits.aoArt}
            // toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.xylophone.name}
        position={[25.275, -0.015, -2.434]}
        rotation={[Math.PI / 2, 0, Math.PI / 9]}
        limits={[
          EXHIBITS_TIME_COORDS.xylophone - 1,
          EXHIBITS_TIME_COORDS.xylophone + 1,
        ]}
        clickAreaSize={0.9}
        clickAreaPosition={[0, 0, -1.8]}
        // indicatorPosition={[0, 1.0, -2.5]}
        indicatorPosition={[0, 0.5, -1.8]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.xylophone.name,
              exhibits.xylophone.position,
              exhibits.xylophone.quaternion
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
            // map={textures.exhibits.xylophone}
            // aoMap={textures.exhibits.aoXylophone}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.diary.name}
        position={[46.131, -0.001, 33.496]}
        rotation={[0, -0.295, 0]}
        limits={[
          EXHIBITS_TIME_COORDS.diary - 1,
          EXHIBITS_TIME_COORDS.diary + 1,
        ]}
        clickAreaSize={0.8}
        clickAreaPosition={[0, 1.5, 0]}
        // indicatorPosition={[0, 1.9, 0]}
        indicatorPosition={[0, 1.56, -0.1]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.diary.name,
              exhibits.diary.position,
              exhibits.diary.quaternion
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
            // map={textures.exhibits.diary}
            // aoMap={textures.exhibits.aoDiary}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.collage.name}
        position={[66.573, 1.4, 30.021]}
        rotation={[Math.PI / 2, 0, 2.473]}
        limits={[
          EXHIBITS_TIME_COORDS.collage - 1,
          EXHIBITS_TIME_COORDS.collage + 1,
        ]}
        clickAreaSize={0.85}
        clickAreaPosition={[0, 0.5, -0.33]}
        // indicatorPosition={[0, 0, -1]}
        indicatorPosition={[0, 0, -0.4]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.collage.name,
              exhibits.collage.position,
              exhibits.collage.quaternion
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
            // map={textures.exhibits.collage}
            // aoMap={textures.exhibits.aoCollage} !hidden
            // toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.bauble.name}
        position={[58.205, -0.088, 4.855]}
        rotation={[-Math.PI, 0.36, -Math.PI]}
        limits={[
          EXHIBITS_TIME_COORDS.christmasBall - 1,
          EXHIBITS_TIME_COORDS.christmasBall + 1,
        ]}
        clickAreaSize={0.7}
        clickAreaPosition={[0, 1.5, 0]}
        // indicatorPosition={[0, 2.3, 0]}
        indicatorPosition={[-0.4, 1.56, 0.3]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.bauble.name,
              exhibits.bauble.position,
              exhibits.bauble.quaternion
            );
          }
        }}
      >
        <mesh
          name="Christmas_Ball"
          geometry={nodes.Christmass_Ball.geometry}
          position={[-0.278, 1.668, 0.148]}
          rotation={[0, 0.122, 0]}
        >
          <meshStandardMaterial
            color={'#ffffff'}
            // map={textures.exhibits.bauble}
            // aoMap={textures.exhibits.aoBauble}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.bowTie.name}
        position={[55.58, 0, -12.921]}
        rotation={[0, -0.403, 0]}
        limits={[
          EXHIBITS_TIME_COORDS.bowTie - 1,
          EXHIBITS_TIME_COORDS.bowTie + 1,
        ]}
        clickAreaSize={0.7}
        clickAreaPosition={[0, 1.5, 0]}
        // indicatorPosition={[0, 2.01, 0]}
        indicatorPosition={[0.2, 1.62, 0.05]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.bowTie.name,
              exhibits.bowTie.position,
              exhibits.bowTie.quaternion
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
            // map={textures.exhibits.bowTie}
            // aoMap={textures.exhibits.aoBowTie}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.storageRoom.name}
        position={[66.969, 0, -42.586]}
        rotation={[0, -0.215, -Math.PI]}
        scale={[1, -1, 1]}
        limits={[
          EXHIBITS_TIME_COORDS.storageRoom - 1,
          EXHIBITS_TIME_COORDS.storageRoom + 1,
        ]}
        clickAreaSize={1.5}
        clickAreaPosition={[5.8, 1.6, 0]}
        // indicatorPosition={[3.4, 1.5, 3.5]}
        indicatorPosition={[6.3, 1.5, 0]}
        indicatorRotation={[0, -Math.PI * 0.17, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.storageRoom.name,
              exhibits.storageRoom.position,
              exhibits.storageRoom.quaternion
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
            // map={textures.exhibits.ball}
            // aoMap={textures.exhibits.aoBall}
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
            // map={textures.exhibits.toyBoxes}
            // aoMap={textures.exhibits.aoToyBoxes}
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
            // map={textures.exhibits.skies}
            // aoMap={textures.exhibits.aoSkies}
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
            // map={textures.exhibits.hare}
            // aoMap={textures.exhibits.aoHare}
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
            // map={textures.exhibits.bear1}
            // aoMap={textures.exhibits.aoBear1}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.bear.name}
        position={[46.632, 0, -37.835]}
        rotation={[Math.PI, Math.PI / 4, -Math.PI]}
        limits={[EXHIBITS_TIME_COORDS.bear - 1, EXHIBITS_TIME_COORDS.bear + 1]}
        clickAreaSize={0.6}
        clickAreaPosition={[0, 1, 0]}
        // indicatorPosition={[0, 1.4, 0]}
        indicatorPosition={[0, 1, 0.15]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.bear.name,
              exhibits.bear.position,
              exhibits.bear.quaternion
            );
          }
        }}
      >
        <mesh name="Bear_body_helper" position={[0.04, 1.13, -0.1]}>
          <meshStandardMaterial color={'#6c5959'} />
          <planeGeometry args={[0.09, 0.09]} />
        </mesh>
        <mesh
          name="Bear_body"
          geometry={nodes.Bear_body.geometry}
          position={[-0.003, 0.947, 0.056]}
          rotation={[Math.PI, -Math.PI / 4, Math.PI]}
        >
          <meshStandardMaterial
            color={'#6c5959'}
            // map={textures.exhibits.bear2}
            // aoMap={textures.exhibits.aoBear2}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.car.name}
        position={[48.412, 0, -57.511]}
        rotation={[0, 0.782, 0]}
        limits={[
          EXHIBITS_TIME_COORDS.truck - 1,
          EXHIBITS_TIME_COORDS.truck + 1,
        ]}
        clickAreaSize={0.6}
        clickAreaPosition={[0, 0.3, 0]}
        // indicatorPosition={[0, 0.9, 0]}
        indicatorPosition={[-0.1, 0.6, 0.26]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.car.name,
              exhibits.car.position,
              exhibits.car.quaternion
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
            // map={textures.exhibits.truck}
            // aoMap={textures.exhibits.aoTruck}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name={exhibits.doll.name}
        position={[67.651, 0, -57.222]}
        rotation={[0, Math.PI / 4, 0]}
        limits={[EXHIBITS_TIME_COORDS.doll - 1, EXHIBITS_TIME_COORDS.doll + 1]}
        clickAreaSize={0.5}
        clickAreaPosition={[0, 0.9, 0]}
        // indicatorPosition={[0, 1.4, 0]}
        indicatorPosition={[-0.03, 1.06, 0]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.doll.name,
              exhibits.doll.position,
              exhibits.doll.quaternion
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
            // map={textures.exhibits.doll}
            // aoMap={textures.exhibits.aoDoll}
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
      <Exhibit
        name="hand"
        position={[83.289, 2.963, -34.818]}
        rotation={[Math.PI, -0.794, Math.PI]}
        limits={[
          EXHIBITS_TIME_COORDS.hand - 1,
          EXHIBITS_TIME_COORDS.hand + 0.1,
        ]}
        clickAreaSize={1.3}
        clickAreaPosition={[0, 0, 4.3]}
        indicatorPosition={[0, 0, 5]}
        onExhibitClick={() => {
          if (!isExhibitActive) {
            onExhibitClick(
              exhibits.hand.name,
              exhibits.hand.position,
              exhibits.hand.quaternion
            );
          }
        }}
      >
        <mesh
          name="Hand"
          geometry={nodes.Hand.geometry}
          position={[-0.066, -1.535, 3.488]}
          rotation={[0, -0.01, 1.544]}
        >
          <meshStandardMaterial
            color={'#e8e9ee'}
            // map={textures.exhibits.aoHand}
            // aoMap={textures.exhibits.hand} !hidden
            toneMapped={false}
          />
        </mesh>
      </Exhibit>
    </group>
  );
};
