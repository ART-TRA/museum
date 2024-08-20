import { useEffect, useRef } from 'react';

export const useTouch = () => {
  const tempTouchStart = useRef([]);
  const tempTouchEnd = useRef([]);
  const deviceType = useRef('');
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
    return wheelDeltaY ? wheelDeltaY === -3 * deltaY : deltaMode === 0;
  };

  const defineSwipeDirection = (event) => {
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
      if (tempTouchEnd.current[1] > tempTouchStart.current[1]) {
        return 'down';
      } else {
        return 'up';
      }
    }
  };

  useEffect(() => {
    defineTouchDevice();
  }, []);

  return {
    detectTrackpad,
    defineTouchDevice,
    defineSwipeDirection,
    swipePower: swipeDelta.current.move,
  };
};
