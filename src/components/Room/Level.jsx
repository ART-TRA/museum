import React, { useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { Exhibits } from 'src/components/Room/Exhibits';
import { Podiums } from 'src/components/Room/Podiums';
import { Floors } from 'src/components/Room/Floors';
import { Walls } from 'src/components/Room/Walls';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import {
  activeRoomAtom,
  activeRoomKeys,
  activeRoomTimes,
} from 'src/recoil/atoms/activeRoom';
import { Vector3 } from 'three';
import { activeMuseumAtom } from 'src/recoil/atoms/activeMuseum';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';

export function Level({ model, textures }) {
  const group = useRef();
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const exhibitOnObserve = useRef(null);
  const mixer = useRef(new THREE.AnimationMixer(model?.scene));
  const action = useRef(mixer.current.clipAction(model?.animations[0]));
  const setActiveRoom = useSetRecoilState(activeRoomAtom);
  action.current.setLoop(THREE.LoopOnce, 0);
  action.current.play();
  const isActiveMuseum = useRecoilValue(activeMuseumAtom);
  const setRoomDuration = useSetRecoilState(roomDurationAtom);

  const {
    exhibitsVisible,
    wallsVisible,
    touchPadSpeed,
    scrollSpeed,
    superSlowTouchPadSpeed,
  } = useControls({
    exhibitsVisible: true,
    wallsVisible: true,
    touchPadSpeed: { value: 0.01, min: 0.01, max: 0.1, step: 0.01 },
    scrollSpeed: { value: 0.12, min: 0.005, max: 0.5 },
    superSlowTouchPadSpeed: false,
  });

  const detectTrackpad = (event) => {
    const { deltaY, wheelDeltaY, deltaMode } = event;
    return wheelDeltaY ? wheelDeltaY === -3 * deltaY : deltaMode === 0;
  };

  const updateActiveRoom = () => {
    if (mixer.current.time < 18) {
      setActiveRoom(activeRoomKeys[0]);
    } else if (mixer.current.time >= 18 && mixer.current.time < 36) {
      setActiveRoom(activeRoomKeys[1]);
    } else if (mixer.current.time >= 36 && mixer.current.time < 50) {
      setActiveRoom(activeRoomKeys[2]);
    } else if (mixer.current.time >= 50 && mixer.current.time < 63) {
      setActiveRoom(activeRoomKeys[3]);
    } else {
      setActiveRoom(activeRoomKeys[4]);
    }
    setRoomDuration(mixer.current?.time);
  };

  const showLastDescription = () => {
    if (
      mixer.current.time <= 85 - scrollSpeed &&
      mixer.current.time >= 85 - scrollSpeed - 0.5
    ) {
      setExhibitActive('hand');
      exhibitOnObserve.current = {
        position: new Vector3(76.289, 2.963, -41.2),
        quaternion: new THREE.Quaternion().setFromAxisAngle(
          new THREE.Vector3(0, 1, 0),
          -Math.PI * 0.8
        ),
      };
    }
  };

  const onObserveRoom = useCallback(
    (event) => {
      if (exhibitOnObserve.current) exhibitOnObserve.current = null;
      if (mixer.current.time < 0) mixer.current.update(0);
      if (mixer.current.time >= 0) {
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
              if (mixer.current?.time >= touchPadSpeed) {
                mixer.current.update(-touchPadSpeed);
              }
            }
          }
        } else {
          // console.log('scroll', scrollSpeed);
          if (event.deltaY > 0) {
            if (mixer.current.time <= 85 - scrollSpeed) {
              showLastDescription();
              mixer.current.update(scrollSpeed);
            }
          } else {
            if (mixer.current?.time >= scrollSpeed) {
              mixer.current.update(-scrollSpeed);
            }
          }
        }
        updateActiveRoom();
      }
    },
    [scrollSpeed, touchPadSpeed, superSlowTouchPadSpeed]
  );

  const changeActiveRoom = (event) => {
    mixer.current.setTime(activeRoomTimes[event.detail]);
    setRoomDuration(mixer.current?.time);
  };

  useEffect(() => {
    if (!exhibitActive && isActiveMuseum) {
      document.addEventListener('wheel', onObserveRoom);
    }

    return () => {
      document.removeEventListener('wheel', onObserveRoom);
    };
  }, [
    exhibitActive,
    isActiveMuseum,
    scrollSpeed,
    touchPadSpeed,
    superSlowTouchPadSpeed,
  ]);

  useLayoutEffect(() => {
    window.addEventListener('onChangeActiveRoom', changeActiveRoom);
    window.addEventListener('onExitFromDescription', onObserveRoom);
    return () => {
      window.removeEventListener('onChangeActiveRoom', changeActiveRoom);
      window.removeEventListener('onExitFromDescription', onObserveRoom);
    };
  }, []);

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
      state.camera.position.lerp(model?.cameras[0].parent.position, 0.08);
      state.camera.quaternion.slerp(model?.cameras[0].parent.quaternion, 0.08);
      state.camera.scale.lerp(model?.cameras[0].parent.scale, 0.08);
    }
    state.camera.updateProjectionMatrix();
    state.camera.updateMatrixWorld();
  });

  return (
    <group ref={group} dispose={null}>
      <group>
        {exhibitsVisible && <Exhibits exhibitOnObserve={exhibitOnObserve} />}
        <Podiums />
        <Floors />
        {wallsVisible && <Walls />}
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
