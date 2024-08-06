import React from 'react';
import cn from 'classnames';
import { useRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { OverlayHeader } from 'src/components/Overlay/Header';
import { ExhibitDescription } from 'src/components/Overlay/ExhibitDescription';
import { OverlayFooter } from 'src/components/Overlay/Footer';
import { HomeTitle } from 'src/components/Overlay/HomeTitle';
import { Tutorial } from 'src/components/Overlay/Tutorial';

export const Overlay = () => {
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const classNames = cn('overlay', {
    'overlay--started': activeScreen !== 'title',
  });

  return (
    <section className={classNames}>
      <OverlayHeader />
      <HomeTitle />
      <Tutorial />
      <ExhibitDescription />
      <OverlayFooter screen={activeScreen} setScreen={setActiveScreen} />
    </section>
  );
};
