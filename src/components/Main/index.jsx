import React, { Suspense, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Overlay } from 'src/components/Overlay';
import { AtomEffects } from 'src/recoil/effects';
import { Scene } from 'src/components/Main/Scene';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import { Hand } from 'src/icons/Hand';
import { Cursor } from 'src/components/Main/Cursor';

const SuspenseFallback = () => {
  useEffect(() => {
    return () => {
      console.log('Suspense return');
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
        <Cursor />
        <AtomEffects />
        <Overlay />
        {/*<div className="grain" />*/}
        <div className="scene">
          <Scene />
        </div>
      </RecoilRoot>
    </Suspense>
  );
};
