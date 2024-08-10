import { activeRoomAtom } from 'src/recoil/atoms/activeRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import gsap from 'gsap';
import { useRef } from 'react';
import { changeScaleDown, changeScaleUp } from 'src/utils/changeScale';
import { hoveredKeys } from 'src/recoil/atoms/lastHoveredFigureValue';
import { clickTransition } from 'src/recoil/atoms/clickTransition';
import { setFadeTransition } from 'src/utils/setFadeTransition';
import { blockedScrollAtom } from 'src/recoil/atoms/blockedScroll';

export const useFigures = () => {
  const setClickedTransition = useSetRecoilState(clickTransition);
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const setActiveRoom = useSetRecoilState(activeRoomAtom);
  const oneClickLimit = useRef(true);
  const [blockedScroll, setBlockedScroll] = useRecoilState(blockedScrollAtom);

  const onFigureHover = (event, activeRoomName, action, groupRef) => {
    const figures = [];
    groupRef?.current.traverse((child) => {
      if (child.isMesh && child.name !== event.object.name) {
        figures.push(child);
      }
    });
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

  const onFigureClick = (event, activeRoomName, groupRef) => {
    if (activeScreen === 'figures' && !blockedScroll && oneClickLimit.current) {
      event?.stopPropagation();
      const scale = event?.object?.scale;

      setBlockedScroll(true);
      setClickedTransition(true);
      document.body.style.cursor = 'auto';
      oneClickLimit.current = false;
      if (scale) {
        groupRef.current.traverse((child) => {
          if (child.isMesh && child.name !== event.object.name) {
            gsap.to(child.scale, {
              x: 0.1,
              y: 0.1,
              z: 0.1,
              duration: 0.3,
            });
          }
        });
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
        }, 1100);
      }
    }
  };

  return { onFigureClick, onFigureHover };
};
