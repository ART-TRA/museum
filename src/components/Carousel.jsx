import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { ArrowNav } from 'src/icons/ArrowNav';
import { useState } from 'react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import cn from 'classnames';

import 'swiper/css/effect-fade';

export const CarouselNavigation = () => {
  const swiper = useSwiper();
  const [swiperPosition, setSwiperPosition] = useState('start');
  const carouselClassNames = cn('carousel__navigation', {
    [`carousel__navigation--${swiperPosition}`]: swiperPosition,
  });

  if (!swiper) return null;

  return (
    <div className={carouselClassNames}>
      <button
        disabled={!swiper?.allowSlidePrev}
        onClick={() => {
          swiper?.slidePrev();
          if (swiper.isBeginning) setSwiperPosition('start');
        }}
        className="carousel__navigation-el carousel__navigation-el--prev"
      >
        <ArrowNav />
      </button>
      <button
        disabled={swiper.isEnd}
        onClick={() => {
          swiper?.slideNext();
          if (swiper.isEnd) setSwiperPosition('end');
        }}
        className="carousel__navigation-el carousel__navigation-el--next"
      >
        <ArrowNav />
      </button>
    </div>
  );
};

export const Carousel = ({
  elements,
  slide: SlideComponent,
  children,
  slideProps = {},
  ...props
}) => {
  const carouselClassNames = cn('carousel', props.className);

  return (
    <Swiper
      {...props}
      effect={'fade'}
      className={carouselClassNames}
      ref={props.rootRef}
      slidesPerGroup={1}
      slidesPerView={1}
      loop={false}
      touchMoveStopPropagation
      modules={[Autoplay, Pagination, Navigation, EffectFade]}
      pagination={
        props.pagination && {
          clickable: true,
          dynamicBullets: props.dynamicBullets,
          dynamicMainBullets: 2,
          //   bulletClass: 'pagination-bullet',
          //   bulletActiveClass: 'pagination-bullet--active',
        }
      }
      allowTouchMove={false}
      // grabCursor
      autoplay={
        props.autoplay && {
          delay: 4000,
          disableOnInteraction: false,
        }
      }
    >
      <CarouselNavigation />
      {children}
      {elements?.length > 0 &&
        elements?.map((element, i) => {
          if (SlideComponent) {
            return (
              <SwiperSlide key={i}>
                {({ isActive }) => (
                  <SlideComponent
                    isActive={isActive}
                    index={i}
                    slide
                    data={element}
                    {...slideProps}
                  />
                )}
              </SwiperSlide>
            );
          }

          return null;
        })}
    </Swiper>
  );
};
