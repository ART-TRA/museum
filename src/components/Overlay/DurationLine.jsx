import { useRecoilValue } from 'recoil';
import { roomDurationAtom } from 'src/recoil/atoms/roomDuration';
import { EXHIBITS_TIME_COORDS } from 'src/hooks/useExhibits';

export const AnimationDurationLine = () => {
  const roomDuration = useRecoilValue(roomDurationAtom);

  return (
    <div className="overlay__duration">
      <div
        style={{
          width: (roomDuration * 100) / EXHIBITS_TIME_COORDS.hand + '%',
        }}
      />
    </div>
  );
};
