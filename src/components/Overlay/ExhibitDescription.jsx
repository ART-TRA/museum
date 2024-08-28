import { Cross } from 'src/icons/Cross';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import cn from 'classnames';
import { useExhibitsDescriptions } from 'src/hooks/useExhibitsDescriptions';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useResize } from 'src/hooks/useResize';
import { useTouch } from 'src/hooks/useTouch';
import { Arrow } from 'src/icons/Arrow';
import { useEffect, useRef, useState } from 'react';
import { Share2 } from 'src/icons/Share2';
import { CopyIcon } from 'src/icons/Copy';
import gsap from 'gsap';

const SHARE_DATA = {
  title: 'Отказники',
  text: 'Музей последнего детского дома',
  url: 'https://museum.scaph.ru/',
};

const ExhibitShareControl = () => {
  const [exhibitActive] = useRecoilState(activeExhibitAtom);
  const [copiedText, setCopiedText] = useState(false);

  const onHelpClick = (event) => {
    event.stopPropagation();
    console.log('help');
  };

  const onShareExperience = async (event) => {
    event?.stopPropagation();

    try {
      if (navigator.canShare) {
        console.log('web share supported!', exhibitActive);
        await navigator.share(SHARE_DATA);
      } else {
        console.log('web share not supported!!');
        await navigator.clipboard.writeText(SHARE_DATA.url);
        setCopiedText(true);
        setTimeout(() => {
          setCopiedText(false);
        }, 3000);
      }
    } catch (error) {
      console.log('share error', error);
    }
  };

  return (
    <div className="exhibit-description__share-control">
      {exhibitActive && exhibitActive === 'hand' && (
        <button
          type="button"
          className="exhibit-description__help"
          onClick={onHelpClick}
        >
          Помочь сиротам
        </button>
      )}
      <button
        type="button"
        className="exhibit-description__share"
        onClick={onShareExperience}
        disabled={copiedText}
      >
        {copiedText ? (
          <>
            <CopyIcon />
            {exhibitActive !== 'hand' && (
              <p>
                Ссылка <br />
                скопирована
              </p>
            )}
          </>
        ) : (
          <>
            <Share2 />
            {exhibitActive !== 'hand' && (
              <p>
                Поделиться <br />
                сайтом
              </p>
            )}
          </>
        )}
      </button>
    </div>
  );
};

const ExhibitDirectionControl = ({ setExpanded }) => {
  const [exhibitActive] = useRecoilState(activeExhibitAtom);
  const { isPhone } = useResize();

  const onDirectionClick = (event, direction) => {
    event.stopPropagation();
    setExpanded(false);

    window.dispatchEvent(
      new CustomEvent('onChangeActiveExhibit', {
        detail: { name: exhibitActive, direction },
      })
    );
  };

  if (!(isPhone && exhibitActive === 'hand')) {
    return (
      <div className="exhibit-description__direction-control">
        <button
          type="button"
          onClick={(event) => onDirectionClick(event, 'next')}
          disabled={exhibitActive === 'hand'}
        >
          <Arrow />
        </button>
        <button
          type="button"
          onClick={(event) => onDirectionClick(event, 'prev')}
          disabled={exhibitActive === 'boots'}
        >
          <Arrow />
        </button>
      </div>
    );
  }

  return null;
};

const ExhibitDescriptionInner = () => {
  const { isDesktop, isPhone } = useResize();
  const { defineSwipeDirection } = useTouch();
  const exhibits = useExhibitsDescriptions();
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const [isExpanded, setExpanded] = useState(false);

  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
    'exhibit-description--expanded': isExpanded || !isPhone,
    'exhibit-description--hand': exhibitActive === 'hand',
  });

  const onExpandDescription = (event, touchDirection) => {
    if (isPhone) {
      if (touchDirection === 'up') {
        setExpanded(true);
      } else if (touchDirection === 'down') {
        setExpanded(false);
      }
    }
  };

  const onExitFromDescription = (event) => {
    event?.preventDefault();
    event?.stopPropagation();
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

  //TEXT SPIRAL ANIMATION
  // let timeline = useRef(null);
  // const maskClassNames = cn('exhibit-description__mask', {
  //   'exhibit-description__mask--visible': exhibitActive,
  // });
  // useEffect(() => {
  //   const container = document.querySelector('.exhibit-description__body-wrap');
  //   if (isDesktop && exhibitActive) {
  //     if (container) {
  //       setTimeout(() => {
  //         container.classList.add('exhibit-description__body-wrap--visible');
  //       }, 300);
  //     }
  //     timeline.current?.pause();
  //     timeline.current = gsap
  //       .timeline({ repeat: 0, repeatDelay: 0, yoyo: true })
  //       .from(
  //         '.m',
  //         {
  //           duration: (i) => [0.0, 1.0][i],
  //           y: -10266,
  //           ease: 'steps(29)',
  //           stagger: 0.2,
  //         },
  //         0
  //       );
  //   } else if (isDesktop) {
  //     if (container) {
  //       container.classList.remove('exhibit-description__body-wrap--visible');
  //     }
  //   }
  // }, [exhibitActive]);

  return (
    <div
      className={classNames}
      onTouchMove={(event) =>
        onExpandDescription(event, defineSwipeDirection(event))
      }
      onTouchStart={defineSwipeDirection}
      onClick={() => setExpanded((prev) => !prev)}
    >
      <button
        type="button"
        className="exhibit-description__close-field"
        onClick={onExitFromDescription}
        onPointerMove={(event) => {
          if (!isDesktop && defineSwipeDirection(event)) {
            event.preventDefault();
          }
        }}
      />
      {!(isDesktop && exhibitActive === 'hand') && (
        <button
          type="button"
          className="exhibit-description__close"
          onClick={onExitFromDescription}
        >
          <Cross />
        </button>
      )}
      <div className="exhibit-description__body-wrap">
        {/*{isDesktop && exhibitActive && (*/}
        {/*  <div className={maskClassNames}>*/}
        {/*    <svg viewBox="0 0 630 352">*/}
        {/*      <mask id="m1">*/}
        {/*        <image*/}
        {/*          className="m"*/}
        {/*          xlinkHref="/images/liquidMask.svg"*/}
        {/*          y="-1"*/}
        {/*          width="630"*/}
        {/*          height="10620"*/}
        {/*        />*/}
        {/*      </mask>*/}
        {/*      <mask id="m2">*/}
        {/*        <image*/}
        {/*          className="m"*/}
        {/*          xlinkHref="/images/liquidMask.svg"*/}
        {/*          y="-1"*/}
        {/*          width="630"*/}
        {/*          height="10620"*/}
        {/*        />*/}
        {/*      </mask>*/}
        {/*      <image*/}
        {/*        mask="url(#m2)"*/}
        {/*        xlinkHref="/images/maskSvg.png"*/}
        {/*        width="932"*/}
        {/*        height="768"*/}
        {/*      />*/}
        {/*    </svg>*/}
        {/*  </div>*/}
        {/*)}*/}
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
          {!(isPhone && exhibitActive === 'hand') && <ExhibitShareControl />}
        </div>
      </div>
      <ExhibitDirectionControl setExpanded={setExpanded} />
      {isPhone && exhibitActive === 'hand' && <ExhibitShareControl />}
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
