import React, { Suspense, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Overlay } from 'src/components/Overlay';
import { AtomEffects } from 'src/recoil/effects';
import { Scene } from 'src/components/Main/Scene';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import { Hand } from 'src/icons/Hand';

const SuspenseFallback = () => {
  useEffect(() => {
    return () => {
      window.dispatchEvent(new CustomEvent('allLoaded'));
    };
  }, []);

  return (
    <section className="overlay">
      <div className="overlay--loader">
        <FadeIn />
        <Hand />
      </div>
    </section>
  );
};

export const Main = () => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <RecoilRoot>
        <AtomEffects />
        <Overlay />
        <div className="grain" />
        <div className="scene">
          <Scene />
        </div>
      </RecoilRoot>
    </Suspense>
  );
};
