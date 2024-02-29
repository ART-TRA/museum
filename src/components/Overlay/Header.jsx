import React from 'react';
import { Hand } from 'src/icons/Hand';
import { FadeIn } from 'src/components/Overlay/FadeIn';
import { Nav } from 'src/icons/Nav';
import { useRecoilValue } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';

export const OverlayHeader = () => {
  const activeScreen = useRecoilValue(activeScreenAtom);

  const setFadeTransition = () => {
    const overlay = document.querySelector('.overlay');
    overlay?.classList.toggle('overlay--faded');
  };

  return (
    <header>
      <a href="/">
        <Hand />
      </a>
      {activeScreen === 'room' && (
        <>
          <FadeIn duration={4} />
          <Nav setFadeTransition={setFadeTransition} />
        </>
      )}
    </header>
  );
};
