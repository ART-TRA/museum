import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { Overlay } from 'src/components/Overlay';
import { FadeIn } from 'src/components/FadeIn';
import { Scene } from 'src/components/Scene';
import { AtomEffects } from 'src/recoil/effects';

export const Main = () => {
  return (
    <>
      <RecoilRoot>
        {/*<Overlay />*/}
        <AtomEffects />
        <Suspense fallback={null}>
          <div className="scene">
            <Scene />
            {/*<FadeIn />*/}
          </div>
        </Suspense>
      </RecoilRoot>
    </>
  );
};
