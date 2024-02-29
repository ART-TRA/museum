import React from 'react';
import { Cross } from 'src/icons/Cross';
import { useRecoilState, useRecoilValue } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import cn from 'classnames';
import { useExhibits } from 'src/hooks/useExhibits';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';

const ExhibitDescriptionInner = () => {
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const exhibits = useExhibits();
  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
    'exhibit-description--hand': exhibitActive === 'hand',
  });

  const onExitFromDescription = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setExhibitActive(null);
    window.dispatchEvent(new CustomEvent('onExitFromDescription'));
  };

  const onHelpClick = () => {
    console.log('help');
  };

  return (
    <div className={classNames}>
      <button
        type="button"
        className="exhibit-description__close-field"
        onClick={(event) => onExitFromDescription(event)}
      >
        <p>closer</p>
      </button>
      {exhibitActive !== 'hand' && (
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
        <div>
          <div>
            <button
              type="button"
              className="exhibit-description__help"
              onClick={onHelpClick}
            >
              Помочь сиротам
            </button>
          </div>
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
