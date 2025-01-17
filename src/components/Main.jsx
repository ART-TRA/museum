import React, { Suspense } from 'react';
import { Scene } from 'src/components/Scene';
import { RecoilRoot } from 'recoil';
import { Cursor } from 'src/components/Cursor';
import { Overlay } from 'src/components/Overlay';
import { useResize } from 'src/hooks/useResize';
import { SuspenseFallback } from 'src/components/Suspense/SuspenseFallback';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NotFound } from 'src/pages/NotFound';

export const Main = () => {
  const { isDesktop } = useResize();

  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: (
            <>
              <Overlay />
              <Scene />
            </>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      {/*<SuspenseFallback />*/}
      {/*<Suspense fallback={null}>*/}
      <RecoilRoot>
        {isDesktop && <Cursor />}
        <RouterProvider router={router} />
      </RecoilRoot>
      {/*</Suspense>*/}
    </>
  );
};
