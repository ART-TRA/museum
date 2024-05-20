import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Walls } from 'src/pages/Room/Walls';
import { Exhibits } from 'src/pages/Room/Exhibits';
import { Podiums } from 'src/pages/Room/Podiums';
import { Floors } from 'src/pages/Room/Floors';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import {
  activeRoomAtom,
  activeRoomKeys,
  activeRoomTimes,
} from 'src/recoil/atoms/activeRoom';
import { useResize } from 'src/hooks/useResize';
import { useTouch } from 'src/hooks/useTouch';
import { useKTX2Loader } from 'src/hooks/useKTX2Loader';
import { Effects } from 'src/components/Effects';
import { clickTransition } from 'src/recoil/atoms/clickTransition';

const SCROLL_MODIFIER = 0.04;
const SCROLL_SPEED = 0.04;
const TOUCH_SPEED = 0.01;
const TOUCH_SPEED_X10 = 0.08;
const ALLOWED_NAMES_EXHIBITS = [
  'Shoes_L',
  'Shoes_R',
  'Cups',
  'Bed',
  'Cubes',
  'Child_art',
  'Xylophone',
  'Diary',
  'Collage',
  'Christmas_Ball',
  'Bow_tie',
  'Toy_boxes',
  'Ball',
  'Hare',
  'Bear',
  'Skies',
  'Bear_body',
  'Truck',
  'Doll',
  'Hand',
];
const ALLOWED_NAMES_WALLS = [
  'WALL_11',
  'WALL_12',
  'WALL_13',
  'WALL_14',
  'WALL_15',
  'WALL_16',
  'WALL_17',
  'WALL_18',
  'WALL_19',
  'WALL_110',
  'WALL_111',
  'WALL_112',
  'WALL_113',
];
const ALLOWED_NAMES_FLOORS = [
  'FLOOR_11',
  'FLOOR_12',
  'FLOOR_13',
  'FLOOR_14',
  'FLOOR_15',
];
const ALLOWED_NAMES_PODIUMS = [
  'Elements_11',
  'Elements_12',
  'Elements_13',
  'Elements_14',
];

export const Room = () => {
  const renderRoom = useRef();
  const { swipeDirection, detectTrackpad } = useTouch();
  const { isDesktop } = useResize();
  const { loadTexture } = useKTX2Loader();
  const model = useGLTF('models/model.glb', true);
  const { gl } = useThree();

  const exhibitOnObserve = useRef(null);
  const frameDelta = useRef(0);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const activeScreen = useRecoilValue(activeScreenAtom);
  const [roomDuration, setRoomDuration] = useRecoilState(roomDurationAtom);
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const isClickedTransition = useRecoilValue(clickTransition);

  const mixer = useRef(new THREE.AnimationMixer(model?.scene));
  const action = useRef(mixer.current.clipAction(model?.animations[0]));
  action.current.setLoop(THREE.LoopOnce, 0);
  action.current.play();

  const showLastDescription = useCallback(
    (maxTime, minTime, type) => {
      if (
        roomDuration <= maxTime &&
        roomDuration >= minTime &&
        exhibitActive !== 'hand'
      ) {
        console.log('showLastDescription', type, roomDuration);
        setExhibitActive('hand');
        exhibitOnObserve.current = {
          position: isDesktop
            ? new THREE.Vector3(76.289, 2.963, -41.2)
            : new THREE.Vector3(76.5, 2.963, -43.1),
          quaternion: new THREE.Quaternion().setFromAxisAngle(
            new THREE.Vector3(0, 1, 0),
            -Math.PI * 0.8
          ),
        };
      }
    },
    [roomDuration, activeRoom]
  );

  const changeActiveRoom = (event) => {
    mixer.current.setTime(activeRoomTimes[event.detail]);
    setRoomDuration(mixer.current?.time);
  };

  const updateActiveRoom = useCallback(() => {
    // console.log('updateActiveRoom', mixer.current.time, roomDuration);
    if (mixer.current.time < 18 && activeRoom !== activeRoomKeys[0]) {
      setActiveRoom(activeRoomKeys[0]);
    } else if (
      mixer.current.time >= 18 &&
      mixer.current.time < 36 &&
      activeRoom !== activeRoomKeys[1]
    ) {
      console.log('updateActiveRoom');
      setActiveRoom(activeRoomKeys[1]);
    } else if (
      mixer.current.time >= 36 &&
      mixer.current.time < 50 &&
      activeRoom !== activeRoomKeys[2]
    ) {
      setActiveRoom(activeRoomKeys[2]);
    } else if (
      mixer.current.time >= 50 &&
      mixer.current.time < 63 &&
      activeRoom !== activeRoomKeys[3]
    ) {
      setActiveRoom(activeRoomKeys[3]);
    } else if (mixer.current.time >= 63 && activeRoom !== activeRoomKeys[4]) {
      setActiveRoom(activeRoomKeys[4]);
    }
    setRoomDuration(mixer.current?.time);
  }, [activeRoom, setActiveRoom, setRoomDuration, roomDuration]);

  const onRoomObserve = useCallback(
    (event) => {
      if (
        activeScreen === 'room' &&
        !exhibitActive &&
        frameDelta.current >= 60
      ) {
        if (exhibitOnObserve.current) exhibitOnObserve.current = null;
        if (mixer.current.time < 0) mixer.current.update(0);
        if (mixer.current.time >= 0) {
          if (
            swipeDirection === 'up' &&
            mixer.current.time <= 85 - TOUCH_SPEED_X10
          ) {
            showLastDescription(
              85 - TOUCH_SPEED_X10,
              85 - TOUCH_SPEED_X10 - 0.1,
              'swipe'
            );
            mixer.current.update(TOUCH_SPEED_X10);
          }

          if (swipeDirection === 'down') {
            if (mixer.current.time >= TOUCH_SPEED_X10) {
              mixer.current.update(-TOUCH_SPEED_X10);
            } else {
              mixer.current.update(-mixer.current.time + 0.001);
            }
          }

          if (detectTrackpad(event)) {
            if (event.deltaY > 0) {
              mixer.current.update(TOUCH_SPEED);
              if (mixer.current.time > 84) {
                mixer.current.time = 84;
              }
            } else {
              if (mixer.current?.time >= TOUCH_SPEED) {
                mixer.current.update(-TOUCH_SPEED);
              }
            }
          } else {
            let speedModifier = 1;
            if (Math.abs(event.deltaY) <= 30) {
              speedModifier = 0.25;
            }
            if (event.deltaY > 0) {
              mixer.current.update(SCROLL_SPEED * speedModifier);

              if (mixer.current.time > 84) {
                mixer.current.time = 84;
              }
            } else {
              if (mixer.current?.time >= SCROLL_SPEED) {
                mixer.current.update(-SCROLL_SPEED * speedModifier);
              }
            }
          }
          if (event.deltaY) {
            showLastDescription(84, 84, 'all');
          }
          // updateActiveRoom();
        }
      }
    },
    [activeScreen, activeRoom, swipeDirection, exhibitActive, roomDuration]
  );

  const exhibits = useRef();
  const walls = useRef();
  const floors = useRef();
  const podiums = useRef();

  useEffect(() => {
    exhibits.current.traverse((child) => {
      if (
        child.isMesh &&
        child.name &&
        ALLOWED_NAMES_EXHIBITS.includes(child.name)
      ) {
        loadTexture(`/textures/room/${child.name}.ktx2`, (texture) => {
          gl.initTexture(texture);
          if (child.name === 'Hand') {
            child.material = new THREE.MeshStandardMaterial({
              color: '#efefff',
              // toneMapped: false,
              // map: texture,
              aoMap: texture,
              // envMap: texture,
              aoMapIntensity: 0.3,
              envMapIntensity: 0.2,
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: '#fff',
              toneMapped: false,
              map: texture,
            });
          }
        });
      }
    });

    walls.current.children.forEach((child) => {
      if (
        child.isMesh &&
        child.name &&
        ALLOWED_NAMES_WALLS.includes(child.name)
      ) {
        loadTexture(`/textures/room/AO_${child.name}.ktx2`, (texture) => {
          gl.initTexture(texture);
          child.material = new THREE.MeshStandardMaterial({
            color: '#fcfcff',
            toneMapped: false,
            aoMap: texture,
            roughness: 0.5,
            metalness: 0.01,
            aoMapIntensity: 0.4,
          });
        });
      }
    });

    floors.current.children.forEach((child) => {
      if (
        child.isMesh &&
        child.name &&
        ALLOWED_NAMES_FLOORS.includes(child.name)
      ) {
        loadTexture(`/textures/room/AO_${child.name}.ktx2`, (texture) => {
          child.material = new THREE.MeshStandardMaterial({
            color: '#fcfcff',
            toneMapped: false,
            aoMap: texture,
            roughness: 0.1,
            metalness: 0.01,
            aoMapIntensity: 0.8,
          });
        });
      }
    });

    podiums.current.children.forEach((child) => {
      if (
        child.isMesh &&
        child.name &&
        ALLOWED_NAMES_PODIUMS.includes(child.name)
      ) {
        loadTexture(`/textures/room/AO_${child.name}.ktx2`, (texture) => {
          child.material = new THREE.MeshStandardMaterial({
            color: '#fcfcff',
            toneMapped: false,
            aoMap: texture,
            roughness: 0.5,
            metalness: 0.01,
            aoMapIntensity: 0.6,
          });
        });
      }
    });
  }, [model.nodes]);

  useLayoutEffect(() => {
    window.addEventListener('onChangeActiveRoom', changeActiveRoom);
    window.addEventListener('onExitFromDescription', onRoomObserve);
    if (!isDesktop) {
      window.addEventListener('touchmove', onRoomObserve);
    }

    return () => {
      window.removeEventListener('onChangeActiveRoom', changeActiveRoom);
      window.removeEventListener('onExitFromDescription', onRoomObserve);
      if (!isDesktop) {
        window.removeEventListener('touchmove', onRoomObserve);
      }
    };
  }, [onRoomObserve]);

  useFrame((state) => {
    renderRoom.current.visible = activeScreen === 'room';
    if (activeScreen === 'room') {
      updateActiveRoom();
      if (frameDelta.current <= 190) {
        frameDelta.current += 1;
      }

      if (exhibitOnObserve.current) {
        state.camera.position.lerp(
          exhibitOnObserve.current?.position,
          SCROLL_MODIFIER + 0.02
        );
        state.camera.quaternion.slerp(
          exhibitOnObserve.current?.quaternion,
          SCROLL_MODIFIER + 0.02
        );
      } else {
        state.camera.position.lerp(
          model?.cameras[0].parent.position,
          isClickedTransition ? SCROLL_MODIFIER * 20 : SCROLL_MODIFIER
        );
        state.camera.quaternion.slerp(
          model?.cameras[0].parent.quaternion,
          isClickedTransition ? SCROLL_MODIFIER * 20 : SCROLL_MODIFIER
        );
      }
    }
  });

  return (
    <group
      ref={renderRoom}
      onWheel={(event) => {
        onRoomObserve(event);
      }}
    >
      <Walls nodes={model.nodes} rootRef={walls} />
      <Exhibits
        nodes={model.nodes}
        exhibitOnObserve={exhibitOnObserve}
        rootRef={exhibits}
      />
      <Podiums nodes={model.nodes} rootRef={podiums} />
      <Floors nodes={model.nodes} rootRef={floors} />
      {/*<Effects />*/}
    </group>
  );
};

useGLTF.preload('models/model.glb');
