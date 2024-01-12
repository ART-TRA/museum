import { useState } from 'react';
import cn from 'classnames';

export const SoundSwitch = () => {
  const [soundOn, setSoundOn] = useState(false);
  const classNames = cn('sound', {
    'sound--on': soundOn,
  });

  return (
    <button
      type="button"
      className={classNames}
      onClick={() => setSoundOn((prev) => !prev)}
    >
      {[...Array(8)].map((_, index) => (
        <span key={index} />
      ))}
    </button>
  );
};
