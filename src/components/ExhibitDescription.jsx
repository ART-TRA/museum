import React from 'react';
import { Cross } from 'src/icons/Cross';
import { useRecoilState } from 'recoil';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { useExhibits } from 'src/components/useExhibits';
import cn from 'classnames';

export const ExhibitDescription = () => {
  const [exhibitActive, setExhibitActive] = useRecoilState(activeExhibitAtom);
  const exhibits = useExhibits();
  const classNames = cn('exhibit-description', {
    'exhibit-description--visible': exhibitActive,
  });

  const onExitFromDescription = () => {
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
        onClick={onExitFromDescription}
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
