import React from 'react';
import { Cross } from 'src/icons/Cross';
import { useRecoilState } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import cn from 'classnames';
import { useExhibits } from 'src/hooks/useExhibits';

export const ExhibitDescription = () => {
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const exhibits = useExhibits();
  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
  });

  const onExitFromDescription = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('EXIT');
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
        className="exhibit-description__close"
        onClick={(event) => onExitFromDescription(event)}
      >
        <Cross />
      </button>
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
          <p>
            Сделано в{' '}
            <a href="https://ruport.ru" target="_blank" rel="noreferrer">
              RUPORT
            </a>
          </p>
        </div>
      )}
    </div>
  );
};
