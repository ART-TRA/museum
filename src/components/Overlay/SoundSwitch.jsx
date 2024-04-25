import cn from 'classnames';
import { useRecoilValue } from 'recoil';
import { soundAtom } from 'src/recoil/atoms/sound';
import { useAudio } from 'src/hooks/useAudio';

export const SoundSwitch = () => {
  const { playAmbientAudio, blockedButton } = useAudio();
  const sound = useRecoilValue(soundAtom);
  const classNames = cn('sound', {
    'sound--on': sound,
  });

  return (
    <button
      type="button"
      disabled={blockedButton}
      className="sound__wrap"
      onClick={playAmbientAudio}
    >
      <div className={classNames}>
        {[...Array(10)].map((_, index) => (
          <span key={index} />
        ))}
      </div>
    </button>
  );
};
