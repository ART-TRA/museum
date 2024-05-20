import React, { useEffect, useRef } from 'react';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import lottie from 'lottie-web';
import logoAnimation from 'src/components/Suspense/data.json';

export const SuspenseFallback = () => {
  const ref = useRef();

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: ref.current,
      animationData: logoAnimation,
      loop: true,
      autoplay: true,
    });
    // animate.setSpeed(0.1);

    return () => {
      animation.destroy();
    };
  }, []);

  return (
    <section className="overlay overlay--fallback">
      <div ref={ref} className="overlay--loader">
        <FadeIn />
      </div>
    </section>
  );
};
