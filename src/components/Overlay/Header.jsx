import React from 'react';
import { Hand } from 'src/icons/Hand';
import { Nav } from 'src/icons/Nav';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import cn from 'classnames';
import { FadeIn } from 'src/components/Overlay/FadeIn';

export const OverlayHeader = () => {
  const activeScreen = useRecoilValue(activeScreenAtom);
  const headerClassNames = cn('header', {
    'header--room': activeScreen === 'room',
  });

  const setFadeTransition = () => {
    const overlay = document.querySelector('.overlay');
    overlay?.classList.toggle('overlay--faded');
  };

  if (['figures', 'room'].includes(activeScreen)) {
    return (
      <header className={headerClassNames}>
        <a href="/">
          <Hand />
        </a>
        <Nav setFadeTransition={setFadeTransition} />
      </header>
    );
  }

  if (activeScreen === 'title') {
    return <FadeIn />;
  }

  return null;
};
