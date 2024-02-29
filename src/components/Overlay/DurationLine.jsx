import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';

export const AnimationDurationLine = () => {
  const roomDuration = useRecoilValue(roomDurationAtom);

  return (
    <div className="overlay__duration">
      <div style={{ width: (roomDuration * 100) / 84 + '%' }} />
    </div>
  );
};
