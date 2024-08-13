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
import {
  ALLOWED_NAMES_EXHIBITS,
  ALLOWED_NAMES_FLOORS,
  ALLOWED_NAMES_PODIUMS,
  ALLOWED_NAMES_WALLS,
  SCROLL_MODIFIER,
  SCROLL_SPEED,
  TOUCH_SPEED,
  TOUCH_SPEED_X10,
} from 'src/pages/Room/constants';
import { setFadeTransition } from 'src/utils/setFadeTransition';
import { useExhibits } from 'src/hooks/useExhibits';
import { easing } from 'maath';
import gsap from 'gsap';

export const Room = () => {
  const renderRoom = useRef();
  const { swipeDirection, detectTrackpad } = useTouch();
  const { isDesktop } = useResize();
  const { loadTexture } = useKTX2Loader();
  const model = useGLTF('models/model.glb', true);
  const { gl, camera } = useThree();

  const exhibitOnObserve = useRef(null);
  const frameDelta = useRef(0);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const activeScreen = useRecoilValue(activeScreenAtom);
  const [roomDuration, setRoomDuration] = useRecoilState(roomDurationAtom);
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const isClickedTransition = useRecoilValue(clickTransition);
  const { exhibits, exhibitsDirections } = useExhibits();

  const exhibitsRef = useRef();
  const walls = useRef();
  const floors = useRef();
  const podiums = useRef();

  const mixer = useRef(new THREE.AnimationMixer(model?.scene));
  const action = useRef(mixer.current.clipAction(model?.animations[0]));
  action.current.setLoop(THREE.LoopOnce, 0);
  action.current.play();

  const onChangeActiveExhibit = useCallback(
    ({ detail }) => {
      setFadeTransition();
      setTimeout(() => {
        if (
          detail.direction === 'next' &&
          exhibitsDirections[detail.name].next
        ) {
          setExhibitActive(exhibitsDirections[detail.name].next.name);
          exhibitOnObserve.current = {
            position: exhibitsDirections[detail.name].next.position,
            quaternion: exhibitsDirections[detail.name].next.quaternion,
          };
        } else if (
          detail.direction === 'prev' &&
          exhibitsDirections[detail.name].prev
        ) {
          setExhibitActive(exhibitsDirections[detail.name].prev.name);
          exhibitOnObserve.current = {
            position: exhibitsDirections[detail.name].prev.position,
            quaternion: exhibitsDirections[detail.name].prev.quaternion,
          };
        }
      }, 300);

      setTimeout(() => {
        setFadeTransition();
      }, 1000);
    },
    [exhibitsDirections, setExhibitActive]
  );

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

  const onExitFromDescription = ({ detail }) => {
    if (exhibitOnObserve.current) exhibitOnObserve.current = null;
    mixer.current.setTime(exhibits[detail].cameraTime);
    console.log('TIME', mixer.current?.time);
    setRoomDuration(mixer.current?.time);
  };

  const updateActiveRoom = useCallback(() => {
    if (mixer.current.time < 18 && activeRoom !== activeRoomKeys[0]) {
      setActiveRoom(activeRoomKeys[0]);
    } else if (
      mixer.current.time >= 18 &&
      mixer.current.time < 36 &&
      activeRoom !== activeRoomKeys[1]
    ) {
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
        frameDelta.current >= 140
      ) {
        if (exhibitOnObserve.current) exhibitOnObserve.current = null;
        if (mixer.current.time < 0) mixer.current.update(0);
        if (mixer.current.time >= 0) {
          if (
            swipeDirection === 'down' &&
            mixer.current.time <= 85 - TOUCH_SPEED_X10
          ) {
            showLastDescription(
              85 - TOUCH_SPEED_X10,
              85 - TOUCH_SPEED_X10 - 0.1,
              'swipe'
            );
            mixer.current.update(TOUCH_SPEED_X10);
          }

          if (swipeDirection === 'up') {
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

  const onCameraViewUpdate = useCallback(() => {
    if (mixer.current.time > 19 && mixer.current.time < 23) {
      camera.far = 60;
      camera.updateProjectionMatrix();
    } else if (mixer.current.time > 23 && mixer.current.time < 32) {
      camera.far = 70;
      camera.updateProjectionMatrix();
    } else if (mixer.current.time > 37 && mixer.current.time < 39) {
      camera.far = 50;
      camera.updateProjectionMatrix();
    } else if (mixer.current.time > 48 && mixer.current.time < 54) {
      camera.far = 74;
      camera.updateProjectionMatrix();
    } else if (mixer.current.time > 60 && mixer.current.time < 66) {
      camera.far = 60;
      camera.updateProjectionMatrix();
    } else {
      camera.far = 40;
      camera.updateProjectionMatrix();
    }
  }, [roomDuration]);

  useEffect(() => {
    renderRoom.current.traverse((child) => {
      if (
        (child.isMesh &&
          child.name &&
          (ALLOWED_NAMES_EXHIBITS.includes(child.name) ||
            ALLOWED_NAMES_WALLS.includes(child.name))) ||
        ALLOWED_NAMES_FLOORS.includes(child.name) ||
        ALLOWED_NAMES_PODIUMS.includes(child.name)
      ) {
        loadTexture(
          ALLOWED_NAMES_EXHIBITS.includes(child.name)
            ? `/textures/room/${child.name}.ktx2`
            : `/textures/room/AO_${child.name}.ktx2`,
          (texture) => {
            gl.initTexture(texture);
            if (child.name === 'Hand') {
              child.material = new THREE.MeshStandardMaterial({
                color: '#eeeef5',
                // toneMapped: false,
                // map: texture,
                aoMap: texture,
                // envMap: texture,
                aoMapIntensity: ALLOWED_NAMES_EXHIBITS.includes(child.name)
                  ? 0.3
                  : 0.5,
                envMapIntensity: ALLOWED_NAMES_EXHIBITS.includes(child.name)
                  ? 0.2
                  : 0.1,
              });
            } else {
              child.material = new THREE.MeshStandardMaterial({
                color: '#fff',
                toneMapped: false,
                ...(ALLOWED_NAMES_EXHIBITS.includes(child.name) && {
                  map: texture,
                }),
                ...(!ALLOWED_NAMES_EXHIBITS.includes(child.name) && {
                  aoMap: texture,
                }),
                aoMapIntensity: ALLOWED_NAMES_EXHIBITS.includes(child.name)
                  ? 0.3
                  : 0.5,
                envMapIntensity: ALLOWED_NAMES_EXHIBITS.includes(child.name)
                  ? 0.2
                  : 0.1,
              });
            }
          }
        );
      }
    });
  }, [model.nodes]);

  useLayoutEffect(() => {
    window.addEventListener('onChangeActiveRoom', changeActiveRoom);
    window.addEventListener('onExitFromDescription', onExitFromDescription);
    window.addEventListener('onChangeActiveExhibit', onChangeActiveExhibit);
    if (!isDesktop) {
      window.addEventListener('touchmove', onRoomObserve);
    }

    return () => {
      window.removeEventListener('onChangeActiveRoom', changeActiveRoom);
      window.removeEventListener(
        'onExitFromDescription',
        onExitFromDescription
      );
      window.removeEventListener(
        'onChangeActiveExhibit',
        onChangeActiveExhibit
      );
      if (!isDesktop) {
        window.removeEventListener('touchmove', onRoomObserve);
      }
    };
  }, [onRoomObserve]);

  useFrame((state, delta) => {
    renderRoom.current.visible = activeScreen === 'room';
    if (activeScreen === 'room') {
      updateActiveRoom();
      onCameraViewUpdate();
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
        // easing.damp3(
        //   state.camera.position,
        //   model?.cameras[0].parent.position,
        //   isClickedTransition ? 0 : 0.8,
        //   isClickedTransition ? SCROLL_MODIFIER * 20 : 0.01
        // );
        // easing.dampQ(
        //   state.camera.quaternion,
        //   model?.cameras[0].parent.quaternion,
        //   isClickedTransition ? 0 : 0.8,
        //   isClickedTransition ? SCROLL_MODIFIER * 20 : 0.01
        // );

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
        rootRef={exhibitsRef}
      />
      <Podiums nodes={model.nodes} rootRef={podiums} />
      <Floors nodes={model.nodes} rootRef={floors} />
      {/*<Effects />*/}
    </group>
  );
};

useGLTF.preload('models/model.glb');
