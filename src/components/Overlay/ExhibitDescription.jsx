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
import { useState } from 'react';
import { Share2 } from 'src/icons/Share2';
import { CopyIndex } from 'src/icons/Copy';

const SHARE_DATA = {
  title: 'Отказники',
  text: 'Музей последнего детского дома',
  url: 'https://museum.scaph.ru/',
};

const ExhibitDescriptionInner = () => {
  const { isDesktop, isPhone } = useResize();
  const { swipeDirection } = useTouch();
  const exhibits = useExhibitsDescriptions();
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const [isExpanded, setExpanded] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
    'exhibit-description--expanded': isExpanded || !isPhone,
    'exhibit-description--hand': exhibitActive === 'hand',
  });

  const onExpandDescription = () => {
    if (isPhone) {
      setExpanded((prev) => !prev);
    }
  };

  const onShareExperience = async (event) => {
    event?.stopPropagation();

    try {
      if (navigator.canShare) {
        console.log('web share supported!', exhibitActive);
        await navigator.share(SHARE_DATA);
      } else {
        console.log('web share not supported!!');
        setCopiedText(true);
        await navigator.clipboard.writeText(SHARE_DATA.url);
        setTimeout(() => {
          setCopiedText(false);
        }, 3000);
      }
    } catch (error) {
      console.log('share error', error);
    }
  };

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
      setExpanded(false);
      setExhibitActive(null);
    }, 200);
  };

  const onHelpClick = (event) => {
    event.stopPropagation();
    console.log('help');
  };

  const onShareClick = (event) => {
    event.stopPropagation();
    console.log('share');
  };

  const onDirectionClick = (event, direction) => {
    event.stopPropagation();
    setExpanded(false);

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
      onClick={onExpandDescription}
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
        <div className="exhibit-description__body">
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
          {exhibitActive && exhibitActive !== 'hand' && (
            <button
              type="button"
              className="exhibit-description__share"
              onClick={onShareExperience}
              disabled={copiedText}
            >
              {copiedText ? (
                <>
                  <CopyIndex />
                  <p>
                    Ссылка <br />
                    скопирована
                  </p>
                </>
              ) : (
                <>
                  <Share2 />
                  <p>
                    Поделиться <br />
                    сайтом
                  </p>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      {exhibitActive && exhibitActive !== 'hand' && (
        <div className="exhibit-description__buttons">
          <button
            type="button"
            onClick={(event) => onDirectionClick(event, true)}
            disabled={exhibitActive === 'doll'}
          >
            <Arrow />
          </button>
          <button
            type="button"
            onClick={(event) => onDirectionClick(event, false)}
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
