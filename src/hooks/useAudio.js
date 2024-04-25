import gsap from 'gsap';
import theme from '/sounds/ambient.mp3';
import { useSetRecoilState } from 'recoil';
import { soundAtom } from 'src/recoil/atoms/sound';
import { useState } from 'react';

// play method must be called inside the event handler

const ambient = new Audio(theme);
ambient.loop = true;

export const useAudio = () => {
  const [blockedButton, setBlockedButton] = useState(false);
  const setSound = useSetRecoilState(soundAtom);

  const playAmbientAudio = () => {
    if (!blockedButton) {
      if (ambient.paused) {
        ambient.volume = 0;
        ambient.play();
        gsap.timeline().to(ambient, {
          volume: 0.65,
          duration: 1,
          onComplete: () => {
            setBlockedButton(false);
            setSound(true);
          },
        });
      } else {
        gsap.timeline().to(ambient, {
          volume: 0.0,
          duration: 1,
          onComplete: () => {
            ambient.pause();
            setSound(false);
            setBlockedButton(false);
          },
        });
      }
    }
    setBlockedButton(true);
  };

  return { playAmbientAudio, blockedButton };
};
