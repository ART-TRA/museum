import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import cn from 'classnames';

import 'swiper/css/effect-fade';

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
      allowTouchMove
      grabCursor
      autoplay={
        props.autoplay && {
          delay: 4000,
          disableOnInteraction: false,
        }
      }
    >
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
