import { Cross } from 'src/icons/Cross';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Carousel } from 'src/components/Carousel';
import mask from '/images/mask.png';
import tutorialVideo1 from './tutorial1.json';
import tutorialVideo2 from './tutorial2.json';
import lottie from 'lottie-web';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import cn from 'classnames';

const tutorialData = [
  {
    title: 'Скролльте чтобы <br /> перемещаться по музею',
    src: tutorialVideo1,
  },
  {
    title: 'Кликайте на экспонаты чтобы <br /> узнать о них подробнее',
    src: tutorialVideo2,
  },
];

const TutorialSlide = ({ data }) => {
  const ref = useRef();
  // const animation = useRef();

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
    <div className="carousel__slide">
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
  const [open, setOpen] = useState(false);
  const activeScreen = useRecoilValue(activeScreenAtom);
  const tutorialClassNames = cn('tutorial', {
    'tutorial--visible': open,
  });

  const onExitFromTutorial = (event) => {
    setOpen(false);
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
      <div
        className={tutorialClassNames}
        onTouchMove={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="tutorial__close"
          onClick={(event) => onExitFromTutorial(event)}
        >
          <Cross />
        </button>
        <Carousel
          allowTouchMove
          grabCursor
          pagination
          // autoplay
          elements={tutorialData}
          slide={TutorialSlide}
          spaceBetween={8}
          slidesPerView={1}
        />
        <button
          type="button"
          className="tutorial__background-close"
          onClick={(event) => onExitFromTutorial(event)}
        />
      </div>
    );
  }

  return null;
};
