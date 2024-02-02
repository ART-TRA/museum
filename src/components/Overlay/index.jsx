import { useProgress } from '@react-three/drei';
import { ExhibitDescription } from 'src/components/Overlay/ExhibitDescription';
import { Nav } from 'src/icons/Nav';
import { Hand } from 'src/icons/Hand';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { activeRoomAtom, activeRoomNames } from 'src/recoil/atoms/activeRoom';
import { useEffect, useRef, useState } from 'react';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import cn from 'classnames';
import { SoundSwitch } from 'src/components/Overlay/SoundSwitch';
import { activeMuseumAtom } from 'src/recoil/atoms/activeMuseum';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { soundAtom } from 'src/recoil/atoms/sound';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import theme from '/sounds/ambient.mp3';

const AnimationDurationLine = () => {
  const roomDuration = useRecoilValue(roomDurationAtom);

  return (
    <div className="overlay__duration">
      <div style={{ width: (roomDuration * 100) / 84 + '%' }} />
    </div>
  );
};

const OverlayFooter = ({ screen, setScreen }) => {
  const ambient = useRef(new Audio(theme));
  const roomActive = useRecoilValue(activeRoomAtom);
  const setActiveMuseum = useSetRecoilState(activeMuseumAtom);
  const setSoundOn = useSetRecoilState(soundAtom);
  const footerClassNames = cn('footer', {
    'footer--title-screen': screen === 'title',
    'footer--figures-screen': screen === 'figures',
    'footer--room-screen': screen === 'room',
  });

  return (
    <footer className={footerClassNames}>
      {screen !== 'title' && <p>{activeRoomNames[roomActive]}</p>}
      {screen === 'title' && (
        <button
          type="button"
          className="footer__start"
          onClick={() => {
            setScreen('figures');
            setActiveMuseum(true);
            setTimeout(() => {
              setSoundOn(true);
            }, 1000);
          }}
        >
          начать путешествие
        </button>
      )}
      {screen !== 'title' && <SoundSwitch ambient={ambient} />}
      {screen === 'room' && <AnimationDurationLine />}
    </footer>
  );
};

export const Overlay = () => {
  const overlayRef = useRef();
  const progressParams = useProgress();
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const [allLoaded, setAllLoaded] = useState(false);
  const classNames = cn('overlay', {
    'overlay--started': activeScreen !== 'title',
  });

  const setFadeTransition = () => {
    overlayRef.current?.classList.toggle('overlay--faded');
  };

  const setOverlayVisible = () => {
    setAllLoaded(true);
  };

  useEffect(() => {
    window.addEventListener('allLoaded', setOverlayVisible);
  }, []);

  if (allLoaded) {
    return (
      <section ref={overlayRef} className={classNames}>
        <FadeIn />
        <header>
          <a href="/">
            <Hand />
          </a>
          {activeScreen === 'room' && (
            <>
              <FadeIn duration={4} />
              <Nav setFadeTransition={setFadeTransition} />
            </>
          )}
          {activeScreen === 'figures' && <FadeIn />}
        </header>
        {activeScreen === 'title' && (
          <div className="overlay__title-screen">
            <h1>МУЗЕЙ ПОСЛЕДНЕГО ДЕТСКОГО ДОМА</h1>
            <p>
              Добро пожаловать в будущее, где все детские дома исчезли, а дети
              вернулись в родную семью или нашли приёмных родителей.
            </p>
          </div>
        )}
        {activeScreen === 'room' && <ExhibitDescription />}
        <OverlayFooter screen={activeScreen} setScreen={setActiveScreen} />
        {/*{progressParams.progress === 100 ? (*/}
        {/*  <>*/}
        {/*    <FadeIn />*/}
        {/*    <header>*/}
        {/*      <a href="/">*/}
        {/*        <Hand />*/}
        {/*      </a>*/}
        {/*      {activeScreen === 'room' && (*/}
        {/*        <>*/}
        {/*          <FadeIn />*/}
        {/*          <Nav setFadeTransition={setFadeTransition} />*/}
        {/*        </>*/}
        {/*      )}*/}
        {/*      {activeScreen === 'figures' && <FadeIn />}*/}
        {/*    </header>*/}
        {/*    {activeScreen === 'title' && (*/}
        {/*      <div className="overlay__title-screen">*/}
        {/*        <h1>МУЗЕЙ ПОСЛЕДНЕГО ДЕТСКОГО ДОМА</h1>*/}
        {/*        <p>*/}
        {/*          Добро пожаловать в будущее, где все детские дома исчезли, а дети*/}
        {/*          вернулись в родную семью или нашли приёмных родителей.*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    )}*/}
        {/*    {activeScreen === 'room' && <ExhibitDescription />}*/}
        {/*    <OverlayFooter screen={activeScreen} setScreen={setActiveScreen} />*/}
        {/*  </>*/}
        {/*) : (*/}
        {/*  <div className="overlay--loader">*/}
        {/*    <FadeIn />*/}
        {/*    <Hand />*/}
        {/*  </div>*/}
        {/*)}*/}
      </section>
    );
  }
};
