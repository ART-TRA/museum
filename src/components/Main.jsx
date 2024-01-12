import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Overlay } from 'src/components/Overlay';
import { Scene } from 'src/components/Scene';
import { AtomEffects } from 'src/recoil/effects';

export const Main = () => {
  return (
    <RecoilRoot>
      <AtomEffects />
      <Overlay />
      <Suspense fallback={null}>
        <div className="grain" />
        <div className="scene">
          <Scene />
        </div>
      </Suspense>
    </RecoilRoot>
  );
};
