import { ExhibitDescription } from 'src/components/Overlay/ExhibitDescription';
import { useRecoilState } from 'recoil';
import React, { useRef } from 'react';
import cn from 'classnames';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { OverlayFooter } from 'src/components/Overlay/Footer';
import { OverlayHeader } from 'src/components/Overlay/Header';

export const Overlay = () => {
  const overlayRef = useRef();
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const classNames = cn('overlay', {
    'overlay--started': activeScreen !== 'title',
  });

  return (
    <section ref={overlayRef} className={classNames}>
      <OverlayHeader />
      <ExhibitDescription />
      <OverlayFooter screen={activeScreen} setScreen={setActiveScreen} />
    </section>
  );
};
