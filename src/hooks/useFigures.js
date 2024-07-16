import { activeRoomAtom } from 'src/recoil/atoms/activeRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { changeScaleDown, changeScaleUp } from 'src/utils/changeScale';
import {
  hoveredKeys,
  hoveredValues,
  lastHoveredFigureValueAtom,
} from 'src/recoil/atoms/lastHoveredFigureValue';
import { useFrame, useThree } from '@react-three/fiber';
import { clickTransition } from 'src/recoil/atoms/clickTransition';
import { setFadeTransition } from 'src/utils/setFadeTransition';

export const useFigures = () => {
  const setClickedTransition = useSetRecoilState(clickTransition);
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const setActiveRoom = useSetRecoilState(activeRoomAtom);
  const oneClickLimit = useRef(true);
  const { scene } = useThree();

  const onFigureHover = (event, activeRoomName, action, groupRef) => {
    const figures = [];
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.name !== event.object.name) {
        figures.push(child);
        // console.log(child);
      }
    });
    console.log('FIGURES', figures);
    event.stopPropagation();
    if (activeScreen === 'figures') {
      if (action === 'out') {
        if (activeRoomName !== 'empty') {
          changeScaleDown(event?.object, figures);
        }
      } else {
        if (activeRoomName !== 'empty') {
          changeScaleUp(event?.object, figures);
        }

        if (activeRoomName === hoveredKeys.empty) {
          document.body.style.cursor = 'auto';
        } else {
          document.body.style.cursor = 'pointer';
        }
      }
    }
  };

  const onFigureClick = (activeRoomName, scale, delayTime = 1000) => {
    if (activeScreen === 'figures') {
      setClickedTransition(true);
      document.body.style.cursor = 'auto';
      if (scale) {
        if (oneClickLimit.current) {
          gsap.to(scale, {
            x: 11.0,
            y: 11.0,
            z: 11.0,
            duration: 1,
            onStart: () => {
              setTimeout(() => {
                setFadeTransition();
              }, 100);
            },
            onComplete: () => {
              setActiveRoom(activeRoomName);
              setActiveScreen('room');
              window.dispatchEvent(
                new CustomEvent('onChangeActiveRoom', {
                  detail: activeRoomName,
                })
              );
              setTimeout(() => {
                setClickedTransition(false);
                setFadeTransition();
              }, 700);
            },
          });
        }
        oneClickLimit.current = false;
      } else {
        setFadeTransition();
        setTimeout(() => {
          setActiveRoom(activeRoomName);
          setActiveScreen('room');
          window.dispatchEvent(
            new CustomEvent('onChangeActiveRoom', {
              detail: activeRoomName,
            })
          );
          setClickedTransition(false);
          setFadeTransition();
        }, 500);
      }
    }
  };

  return { onFigureClick, onFigureHover };
};
