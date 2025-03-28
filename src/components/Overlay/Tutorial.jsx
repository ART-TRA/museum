import { Cross } from 'src/icons/Cross';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'src/components/Carousel';
import mask from '/images/mask.png';
import tutorialVideo1 from './tutorial1.json';
import tutorialVideo2 from './tutorial2.json';
import lottie from 'lottie-web';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import cn from 'classnames';
import { tutorialVisibilityAtom } from 'src/recoil/atoms/tutorialVisibility';
import { useResize } from 'src/hooks/useResize';

const TutorialSlide = ({ data }) => {
  const ref = useRef();

  useLayoutEffect(() => {
    const instance = lottie.loadAnimation({
      container: ref.current,
      animationData: data.src,
      loop: true,
      autoplay: true,
    });

    return () => {
      instance?.destroy();
    };
  }, []);

  return (
    <div
      className="carousel__slide"
      onPointerMove={(event) => event.stopPropagation()}
    >
      <div className="carousel__slide-img-wrap">
        <img src={mask} alt="mask" className="carousel__slide-mask" />
        <div ref={ref} />
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: data?.title,
        }}
      />
    </div>
  );
};

export const Tutorial = () => {
  const { isDesktop } = useResize();
  const [open, setOpen] = useState(false);
  const setTutorialOpen = useSetRecoilState(tutorialVisibilityAtom);
  const activeScreen = useRecoilValue(activeScreenAtom);
  const tutorialClassNames = cn('tutorial', {
    'tutorial--visible': open,
  });

  const getTutorialData = () => {
    return [
      {
        title: `${
          isDesktop
            ? 'Скрольте для перемещения <br />по музею'
            : 'Используйте вертикальный свайп <br />для перемещения по музею'
        }`,
        src: tutorialVideo1,
      },
      {
        title: 'Кликайте на экспонаты <br />для взаимодействия',
        src: tutorialVideo2,
      },
    ];
  };

  const onExitFromTutorial = () => {
    setOpen(false);
    setTutorialOpen(false);
  };

  useEffect(() => {
    if (activeScreen === 'room') {
      setTimeout(() => {
        setOpen(true);
      }, 200);
    }
  }, [activeScreen]);

  if (activeScreen === 'room') {
    return (
      <div className={tutorialClassNames}>
        <div className="tutorial__content">
          <button
            type="button"
            className="tutorial__close"
            onClick={(event) => onExitFromTutorial(event)}
          >
            <Cross />
          </button>
          <Carousel
            pagination
            // autoplay
            elements={getTutorialData()}
            slide={TutorialSlide}
          />
        </div>
        <button
          type="button"
          className="tutorial__background-close"
          onPointerMove={(event) => {
            event.stopPropagation();
          }}
          onTouchMove={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => onExitFromTutorial(event)}
        />
      </div>
    );
  }

  return null;
};
