// import React, { useEffect, useState } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';
// import cn from 'classnames';
import { useProgress } from '@react-three/drei';

import { ExhibitDescription } from 'src/components/ExhibitDescription';
import { Nav } from 'src/icons/Nav';
import { Hand } from 'src/icons/Hand';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeRoomAtom, activeRoomNames } from 'src/recoil/atoms/activeRoom';
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from 'src/components/FadeIn';
import cn from 'classnames';
import { SoundSwitch } from 'src/components/SoundSwitch';
import { activeMuseumAtom } from 'src/recoil/atoms/activeMuseum';

const OverlayFooter = ({ isTitleScreen, setTitleScreen }) => {
  const roomActive = useRecoilValue(activeRoomAtom);
  const setActiveMuseum = useSetRecoilState(activeMuseumAtom);
  const footerClassNames = cn('footer', {
    'footer--title-screen': isTitleScreen,
  });

  return (
    <footer className={footerClassNames}>
      {!isTitleScreen && <p>{activeRoomNames[roomActive]}</p>}
      {isTitleScreen && (
        <button
          type="button"
          className="footer__start"
          onClick={() => {
            setTitleScreen(false);
            setActiveMuseum(true);
          }}
        >
          начать путешествие
        </button>
      )}
      {!isTitleScreen && <SoundSwitch />}
    </footer>
  );
};

export const Overlay = () => {
  const overlayRef = useRef();
  const { progress } = useProgress();
  const [isTitleScreen, setTitleScreen] = useState(true);
  const classNames = cn('overlay', {
    'overlay--started': !isTitleScreen,
  });

  const setFadeTransition = () => {
    overlayRef.current?.classList.toggle('overlay--faded');
  };

  return (
    <section ref={overlayRef} className={classNames}>
      {progress === 100 ? (
        <>
          <FadeIn />
          <header>
            <Hand />
            {!isTitleScreen && (
              <>
                <FadeIn />
                <Nav setFadeTransition={setFadeTransition} />
              </>
            )}
          </header>
          {isTitleScreen && (
            <div className="overlay__title-screen">
              <h1>МУЗЕЙ ПОСЛЕДНЕГО ДЕТСКОГО ДОМА</h1>
              <p>
                Добро пожаловать в будущее, где все детские дома исчезли, а дети
                вернулись в родную семью или нашли приёмных родителей.
              </p>
            </div>
          )}
          {!isTitleScreen && <ExhibitDescription />}
          <OverlayFooter
            isTitleScreen={isTitleScreen}
            setTitleScreen={setTitleScreen}
          />
        </>
      ) : (
        <div className="overlay--loader">
          <FadeIn />
          <Hand />
        </div>
      )}
    </section>
  );
};
