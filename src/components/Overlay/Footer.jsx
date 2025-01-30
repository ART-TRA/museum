import { useRecoilValue } from 'recoil';
import cn from 'classnames';
import { AnimationDurationLine } from 'src/components/Overlay/DurationLine';
import { SoundSwitch } from 'src/components/Overlay/SoundSwitch';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { activeRoomAtom, activeRoomNames } from 'src/recoil/atoms/activeRoom';
import { useResize } from 'src/hooks/useResize';
import { lastHoveredFigureValueAtom } from 'src/recoil/atoms/lastHoveredFigureValue';

export const OverlayFooter = ({ screen }) => {
  const { isDesktop } = useResize();
  const exhibitActive = useRecoilValue(activeExhibitAtom);
  const lastHoveredFigureValue = useRecoilValue(lastHoveredFigureValueAtom);
  const roomActive = useRecoilValue(activeRoomAtom);
  const footerClassNames = cn('footer', {
    'footer--title': screen === 'title',
    'footer--figures': screen === 'figures',
    'footer--room': screen === 'room',
    'footer--room-end':
      screen === 'room' && exhibitActive === 'hand' && !isDesktop,
  });

  return (
    <footer className={footerClassNames}>
      {screen === 'figures' && (
        <>
          <p
            dangerouslySetInnerHTML={{
              __html: lastHoveredFigureValue,
            }}
          />
          <div className="scroll-animated-icon" />
        </>
      )}
      {screen === 'room' && exhibitActive !== 'hand' && (
        <p dangerouslySetInnerHTML={{ __html: activeRoomNames[roomActive] }} />
      )}
      {screen === 'room' && exhibitActive === 'hand' && (
        <p>
          Сделано&nbsp;в&nbsp;
          <a href="https://ruport.ru" target="_blank" rel="noreferrer">
            RUPORT
          </a>
        </p>
      )}
      {screen !== 'title' && <SoundSwitch />}
      {screen === 'room' && <AnimationDurationLine />}
    </footer>
  );
};
