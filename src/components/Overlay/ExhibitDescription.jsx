import React from 'react';
import { Cross } from 'src/icons/Cross';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import cn from 'classnames';
import { useExhibits } from 'src/hooks/useExhibits';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useResize } from 'src/hooks/useResize';
import { useTouch } from 'src/hooks/useTouch';
import { Share } from 'src/icons/Share';

const ExhibitDescriptionInner = () => {
  const { isDesktop } = useResize();
  const { swipeDirection } = useTouch();
  const exhibits = useExhibits();
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
    'exhibit-description--hand': exhibitActive === 'hand',
  });

  const onExitFromDescription = (event) => {
    if (event?.type !== 'wheel' && exhibitActive !== 'hand') {
      console.log('preventDefault', exhibitActive);
      event?.preventDefault();
      event?.stopPropagation();
    }
    // console.log('onExitFromDescription', exhibitActive);
    setExhibitActive(null);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('onExitFromDescription'));
    }, 200);
  };

  const onHelpClick = () => {
    console.log('help');
  };

  const onShareClick = () => {
    console.log('share');
  };

  // useEffect(() => {
  //   if (!isDesktop && swipeDirection === 'down' && exhibitActive === 'hand') {
  //     // console.log('swipeDirection', swipeDirection);
  //     onExitFromDescription();
  //   }
  // }, [swipeDirection, exhibitActive]);

  return (
    <div
      className={classNames}
      onWheel={(event) => {
        console.log('VOL1', exhibitActive, event.deltaY);
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
      <h2>{exhibits?.[exhibitActive]?.title}</h2>
      <p
        dangerouslySetInnerHTML={{
          __html: exhibits?.[exhibitActive]?.description,
        }}
      />
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
