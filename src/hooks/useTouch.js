import { useCallback, useEffect, useRef, useState } from 'react';

export const useTouch = () => {
  const tempTouchStart = useRef();
  const tempTouchEnd = useRef();
  const deviceType = useRef('');
  const [swipeDirection, setSwipeDirection] = useState('');

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
        tempTouchStart.current = event.changedTouches[0].clientY;
      } else if (event.type === 'touchmove') {
        tempTouchEnd.current = event.changedTouches[0].clientY;
        // swipeDirection.current =
        //   tempTouchEnd.current > tempTouchStart.current ? 'left' : 'right';
        if (tempTouchEnd.current > tempTouchStart.current) {
          // if (swipeDirection !== 'left')
          setSwipeDirection('up');
        } else {
          // if (swipeDirection !== 'right')
          setSwipeDirection('down');
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

  return { swipeDirection, detectTrackpad, defineTouchDevice };
};
