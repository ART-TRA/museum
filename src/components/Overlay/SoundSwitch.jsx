import { useEffect } from 'react';
import cn from 'classnames';
import gsap from 'gsap';
import { useRecoilState } from 'recoil';
import { soundAtom } from 'src/recoil/atoms/sound';

export const SoundSwitch = ({ ambient }) => {
  const [sound, setSound] = useRecoilState(soundAtom);
  const classNames = cn('sound', {
    'sound--on': sound,
  });

  const playAmbientSound = () => {
    gsap.timeline().fromTo(
      ambient.current,
      {
        volume: sound ? 0.0 : 1.0,
      },
      {
        volume: sound ? 1.0 : 0.0,
        duration: 1,
      },
      1
    );
    // ambient.current.currentTime = 0;
    ambient.current.loop = true;

    if (sound) {
      ambient.current.play();
    } else {
      if (ambient.current.volume === 0) ambient.current.pause();
    }
  };

  useEffect(() => {
    playAmbientSound();
  }, [sound]);

  return (
    <button
      type="button"
      className="sound__wrap"
      onClick={() => setSound((prev) => !prev)}
    >
      <div className={classNames}>
        {[...Array(10)].map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </button>
  );
};
