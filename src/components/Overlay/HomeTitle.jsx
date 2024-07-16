import { useAudio } from 'src/hooks/useAudio';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import cn from 'classnames';
import { useProgress } from '@react-three/drei';
import { useEffect, useLayoutEffect, useRef } from 'react';
import lottie from 'lottie-web';
// import { DotLottiePlayer, Controls } from '@dotlottie/react-player';
import logoAnimation from 'src/components/Suspense/data.json';

// const lottie = lazy(() => import('lottie-web'));

export const HomeTitle = () => {
  const ref = useRef();
  const { progress } = useProgress();
  console.log('progress', progress);
  const { playAmbientAudio } = useAudio();
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const titleClassNames = cn('home-title home-title--blurred', {
    'home-title--hidden': activeScreen !== 'title',
    'home-title--loading': progress < 100 && activeScreen === 'title',
  });
  const animation = useRef();

  const onEnterFigures = (event) => {
    event.stopPropagation();
    if (activeScreen === 'title') {
      playAmbientAudio();
      setTimeout(() => {
        setActiveScreen('figures');
      }, 400);
    }
  };

  useLayoutEffect(() => {
    const loadLottie = async () => {
      animation.current = await lottie.loadAnimation({
        container: ref.current,
        animationData: logoAnimation,
        loop: true,
        autoplay: true,
      });
    };
    // animate.setSpeed(0.1);
    loadLottie();

    return () => {
      animation.current.destroy();
    };
  }, []);

  return (
    <div className={titleClassNames}>
      <div ref={ref} className="home-title__preloader">
        {/*<DotLottiePlayer*/}
        {/*  src="/textures/data.lottie"*/}
        {/*  autoplay*/}
        {/*  loop*/}
        {/*  renderer="svg"*/}
        {/*/>*/}
      </div>
      <div className="home-title__content">
        <h1>
          Музей последнего <br />
          детского дома
        </h1>
        <h3>
          Добро пожаловать в&nbsp;будущее, где все детские дома исчезли,
          а&nbsp;дети вернулись в&nbsp;родную семью или нашли приёмных
          родителей.
        </h3>
        <button type="button" onClick={onEnterFigures}>
          <div />
          <span>начать</span>
        </button>
      </div>
      <div
        className="home-title__preloader-duration"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
