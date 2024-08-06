import React, { Suspense } from 'react';
import { Scene } from 'src/components/Scene';
import { RecoilRoot } from 'recoil';
import { Cursor } from 'src/components/Cursor';
import { Overlay } from 'src/components/Overlay';
import { useResize } from 'src/hooks/useResize';
import { SuspenseFallback } from 'src/components/Suspense/SuspenseFallback';

export const Main = () => {
  const { isDesktop } = useResize();

  return (
    <>
      {/*<SuspenseFallback />*/}
      {/*<Suspense fallback={null}>*/}
      <RecoilRoot>
        {isDesktop && <Cursor />}
        <Overlay />
        <Scene />
      </RecoilRoot>
      {/*</Suspense>*/}
    </>
  );
};
