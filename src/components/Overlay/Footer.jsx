import { useRecoilValue, useSetRecoilState } from 'recoil';
import React, { useLayoutEffect, useRef } from 'react';
import cn from 'classnames';
import { AnimationDurationLine } from 'src/components/Overlay/DurationLine';
import { SoundSwitch } from 'src/components/Overlay/SoundSwitch';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { activeRoomAtom, activeRoomNames } from 'src/recoil/atoms/activeRoom';
import { soundAtom } from 'src/recoil/atoms/sound';
import theme from '/sounds/ambient.mp3';

export const OverlayFooter = ({ screen, setScreen }) => {
  const exhibitActive = useRecoilValue(activeExhibitAtom);
  const ambient = useRef(new Audio(theme));
  const roomActive = useRecoilValue(activeRoomAtom);
  const setSoundOn = useSetRecoilState(soundAtom);
  const footerClassNames = cn('footer', {
    'footer--title-screen': screen === 'title',
    'footer--figures-screen': screen === 'figures',
    'footer--room-screen': screen === 'room',
  });

  const onFiguresScreenOpen = () => {
    console.log('onFiguresScreenOpen');
    setScreen('figures');
    setSoundOn(true);
  };

  useLayoutEffect(() => {
    window.addEventListener('onFiguresScreenOpen', onFiguresScreenOpen);
  }, [screen]);

  return (
    <footer className={footerClassNames}>
      {screen !== 'room' && (
        <>
          <p>
            начните <br /> скролить
          </p>
          <div className="scroll-animated-icon" />
        </>
      )}
      {screen === 'room' && exhibitActive !== 'hand' && (
        <p dangerouslySetInnerHTML={{ __html: activeRoomNames[roomActive] }} />
      )}
      {screen === 'room' && exhibitActive === 'hand' && (
        <p>
          Сделано <br />в{' '}
          <a href="https://ruport.ru" target="_blank" rel="noreferrer">
            RUPORT
          </a>
        </p>
      )}
      {screen !== 'title' && <SoundSwitch ambient={ambient} />}
      {screen === 'room' && <AnimationDurationLine />}
    </footer>
  );
};
