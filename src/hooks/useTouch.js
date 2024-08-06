import { useCallback, useEffect, useRef, useState } from 'react';

export const useTouch = () => {
  const tempTouchStart = useRef([]);
  const tempTouchEnd = useRef([]);
  const deviceType = useRef('');
  const [swipeDirection, setSwipeDirection] = useState('');
  // const swipeDirection = useRef('');
  const swipeDelta = useRef({
    start: 0,
    move: 0,
  });

  const defineTouchDevice = () => {
    try {
      document.createEvent('TouchEvent');
      deviceType.current = 'touch';
      return true;
    } catch (e) {
      deviceType.current = 'mouse';
      return false;
    }
  };

  const detectTrackpad = (event) => {
    const { deltaY, wheelDeltaY, deltaMode } = event;
    // console.log('detectTrackpad', wheelDeltaY);
    return wheelDeltaY ? wheelDeltaY === -3 * deltaY : deltaMode === 0;
  };

  const defineTouchDirection = useCallback(
    (event) => {
      if (event.type === 'touchstart') {
        swipeDelta.current.start = event.changedTouches[0].clientY;
        tempTouchStart.current = [
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY,
        ];
      } else if (event.type === 'touchmove') {
        swipeDelta.current.move =
          event.changedTouches[0].clientY - swipeDelta.current.start;
        tempTouchEnd.current = [
          event.changedTouches[0].clientX,
          event.changedTouches[0].clientY,
        ];
        // console.log(swipeDelta.current.move);

        // const deltaX = event.touches[0].clientX - tempTouchStart.current[0];
        // if (Math.abs(deltaX) > minValue) {
        //   console.log('PREVENT', Math.abs(deltaX));
        //   event.preventDefault();
        //   event.returnValue = false;
        //   return false;
        // }

        // swipeDirection.current =
        //   tempTouchEnd.current > tempTouchStart.current ? 'left' : 'right';
        if (tempTouchEnd.current[1] > tempTouchStart.current[1]) {
          // if (swipeDirection !== 'left')
          setSwipeDirection('up');
          // swipeDirection.current = 'up';
        } else {
          // if (swipeDirection !== 'right')
          setSwipeDirection('down');
          // swipeDirection.current = 'down';
        }

        // setSwipeDirection((prev) => {
        //   if (tempTouchEnd.current > tempTouchStart.current && prev !== 'left') {
        //     return 'left';
        //   }
        //   if (
        //     tempTouchEnd.current <= tempTouchStart.current &&
        //     prev !== 'right'
        //   ) {
        //     return 'right';
        //   }
        // });
        // console.log('SWIPE', swipeDirection.current);
      }
    },
    [setSwipeDirection]
  );

  useEffect(() => {
    defineTouchDevice();

    document.addEventListener('touchstart', defineTouchDirection);
    document.addEventListener('touchmove', defineTouchDirection);

    return () => {
      document.addEventListener('touchstart', defineTouchDirection);
      document.removeEventListener('touchmove', defineTouchDirection);
    };
  }, [defineTouchDirection]);

  return {
    swipeDirection,
    detectTrackpad,
    defineTouchDevice,
    swipePower: swipeDelta.current.move,
  };
};
