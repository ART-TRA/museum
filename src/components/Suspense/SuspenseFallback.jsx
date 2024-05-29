import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import lottie from 'lottie-web';
import logoAnimation from 'src/components/Suspense/data.json';
import { useProgress } from '@react-three/drei';

export const SuspenseFallback = () => {
  const ref = useRef();
  const { progress } = useProgress();

  useLayoutEffect(() => {
    // animate.setSpeed(0.1);
    const animation = lottie.loadAnimation({
      container: ref.current,
      animationData: logoAnimation,
      loop: true,
      autoplay: true,
    });

    return () => {
      animation.destroy();
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        const container = document.querySelector('.overlay--fallback');
        if (container) {
          container.classList.add('overlay--hidden');
        }
      }, 2000);
    }
  }, [progress]);

  return (
    <section className="overlay--fallback">
      <div ref={ref} className="overlay--loader">
        <FadeIn duration={1} />
      </div>
    </section>
  );
};
