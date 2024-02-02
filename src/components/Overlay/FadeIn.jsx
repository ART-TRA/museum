import React from 'react';
import cn from 'classnames';

export const FadeIn = ({ duration }) => {
  const classNames = cn('fade-in', {
    [`fade-in--${duration}`]: duration,
  });
  return <div className={classNames} />;
};
