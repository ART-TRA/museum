import { activeRoomAtom } from 'src/recoil/atoms/activeRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import gsap from 'gsap';
import { changeScale } from 'src/components/HomeScreen/index';
import { useRef } from 'react';

export const useFigures = () => {
  const hovered = useRef(false);
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const setActiveRoom = useSetRecoilState(activeRoomAtom);

  const setFadeTransition = () => {
    const overlay = document.querySelector('.overlay');
    overlay?.classList.toggle('overlay--faded');
  };

  const onFigureHover = (event) => {
    event.stopPropagation();
    if (!hovered.current) {
      hovered.current = true;
      changeScale(event?.object);
      setTimeout(() => {
        hovered.current = false;
      }, 500);
    }
  };

  const onFigureClick = (activeRoomName, scale) => {
    if (activeScreen === 'figures') {
      if (scale) {
        gsap.to(scale, {
          x: 11.0,
          y: 11.0,
          z: 11.0,
          duration: 1,
          onStart: () => {
            setTimeout(() => {
              setFadeTransition();
            }, 500);
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
              setFadeTransition();
            }, 4000);
          },
        });
      } else {
        setFadeTransition();
        setActiveRoom(activeRoomName);
        setActiveScreen('room');
        window.dispatchEvent(
          new CustomEvent('onChangeActiveRoom', {
            detail: activeRoomName,
          })
        );
        setTimeout(() => {
          setFadeTransition();
        }, 4000);
      }
    }
  };

  return { onFigureClick, onFigureHover };
};
