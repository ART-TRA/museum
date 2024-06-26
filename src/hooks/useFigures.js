import { activeRoomAtom } from 'src/recoil/atoms/activeRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { changeScale } from 'src/utils/changeScale';
import {
  hoveredKeys,
  hoveredValues,
  lastHoveredFigureValueAtom,
} from 'src/recoil/atoms/lastHoveredFigureValue';
import { useFrame } from '@react-three/fiber';
import { clickTransition } from 'src/recoil/atoms/clickTransition';

export const useFigures = () => {
  const hoverDeltaTime = useRef(new Date());
  const setClickedTransition = useSetRecoilState(clickTransition);
  const [lastHoveredFigureValue, setLastHoveredFigureValue] = useRecoilState(
    lastHoveredFigureValueAtom
  );
  const scaled = useRef(false);
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const setActiveRoom = useSetRecoilState(activeRoomAtom);
  const oneClickLimit = useRef(true);

  const setFadeTransition = () => {
    const overlay = document.querySelector('.overlay');
    overlay?.classList.toggle('overlay--faded');
  };

  const onFigureHover = (event, activeRoomName) => {
    // const tempTime = new Date();
    event.stopPropagation();
    if (activeScreen === 'figures') {
      // console.log('onFigureHover', hoverDeltaTime.current);
      if (!scaled.current && activeRoomName !== 'empty') {
        scaled.current = true;
        changeScale(event?.object);
        setTimeout(() => {
          scaled.current = false;
        }, 500);
      }

      setTimeout(() => {
        setLastHoveredFigureValue(hoveredValues[activeRoomName]);
      }, 400);

      if (activeRoomName === hoveredKeys.empty) {
        // if (tempTime - hoverDeltaTime.current > 2000) {
        //   setTimeout(() => {
        //     setLastHoveredFigureValue(hoveredValues[activeRoomName]);
        //   }, 400);
        // }
        document.body.style.cursor = 'auto';
      } else {
        // if (lastHoveredFigureValue !== hoveredValues[activeRoomName]) {
        //   setTimeout(() => {
        //     setLastHoveredFigureValue(hoveredValues[activeRoomName]);
        //   }, 400);
        // }
        document.body.style.cursor = 'pointer';
      }
    }
    // hoverDeltaTime.current = tempTime;
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
