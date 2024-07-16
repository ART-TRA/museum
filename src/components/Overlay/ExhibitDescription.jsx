import { Cross } from 'src/icons/Cross';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import cn from 'classnames';
import { useExhibitsDescriptions } from 'src/hooks/useExhibitsDescriptions';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useResize } from 'src/hooks/useResize';
import { useTouch } from 'src/hooks/useTouch';
import { Share } from 'src/icons/Share';
import { Arrow } from 'src/icons/Arrow';

const ExhibitDescriptionInner = () => {
  const { isDesktop } = useResize();
  const { swipeDirection } = useTouch();
  const exhibits = useExhibitsDescriptions();
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
    'exhibit-description--hand': exhibitActive === 'hand',
  });

  const onExitFromDescription = (event) => {
    if (event?.type !== 'wheel' && exhibitActive !== 'hand') {
      event?.preventDefault();
      event?.stopPropagation();
    }
    if (exhibitActive === 'hand') {
      setExhibitActive(null);
    }
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent('onExitFromDescription', {
          detail: exhibitActive,
        })
      );
      setExhibitActive(null);
    }, 200);
  };

  const onHelpClick = () => {
    console.log('help');
  };

  const onShareClick = () => {
    console.log('share');
  };

  const onDirectionClick = (direction) => {
    if (direction) {
      window.dispatchEvent(
        new CustomEvent('onChangeActiveExhibit', {
          detail: { name: exhibitActive, direction: 'next' },
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent('onChangeActiveExhibit', {
          detail: { name: exhibitActive, direction: 'prev' },
        })
      );
    }
  };

  return (
    <div
      className={classNames}
      onWheel={(event) => {
        if (exhibitActive === 'hand' && event.deltaY < 0) {
          onExitFromDescription(event);
        }
      }}
      onPointerMove={(event) => {
        if (
          !isDesktop &&
          swipeDirection === 'down' &&
          exhibitActive === 'hand'
        ) {
          onExitFromDescription();
        }
      }}
    >
      <button
        type="button"
        className="exhibit-description__close-field"
        onClick={(event) => {
          if (exhibitActive && exhibitActive !== 'hand') {
            onExitFromDescription(event);
          }
        }}
      >
        <p>closer</p>
      </button>
      {exhibitActive && exhibitActive !== 'hand' && (
        <button
          type="button"
          className="exhibit-description__close"
          onClick={(event) => onExitFromDescription(event)}
        >
          <Cross />
        </button>
      )}
      <div>
        <h2>{exhibits?.[exhibitActive]?.title}</h2>
        {exhibits?.[exhibitActive]?.owner && (
          <h3>
            ВЛАДЕЛЬЦЫ: <span>{exhibits?.[exhibitActive]?.owner}</span>
          </h3>
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: exhibits?.[exhibitActive]?.description,
          }}
        />
      </div>
      {exhibitActive && exhibitActive !== 'hand' && (
        <div className="exhibit-description__buttons">
          <button
            type="button"
            onClick={() => onDirectionClick(true)}
            disabled={exhibitActive === 'doll'}
          >
            <Arrow />
          </button>
          <button
            type="button"
            onClick={() => onDirectionClick(false)}
            disabled={exhibitActive === 'boots'}
          >
            <Arrow />
          </button>
        </div>
      )}
      {exhibitActive === 'hand' && (
        <div className="exhibit-description__help-wrap">
          <button
            type="button"
            className="exhibit-description__help"
            onClick={onHelpClick}
          >
            Помочь сиротам
          </button>
          <button type="button" onClick={onShareClick}>
            <Share />
          </button>
        </div>
      )}
    </div>
  );
};

export const ExhibitDescription = () => {
  const activeScreen = useRecoilValue(activeScreenAtom);

  if (activeScreen === 'room') {
    return <ExhibitDescriptionInner />;
  }

  return null;
};
