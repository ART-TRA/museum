import React, { useState, useLayoutEffect } from 'react';

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerDown = (event) => {
    setPosition({ x: event.clientX, y: event.clientY });
    const cursor = document.querySelector('.cursor');
    cursor?.classList.add('cursor--clicked');
    setTimeout(() => {
      cursor?.classList.remove('cursor--clicked');
    }, 300);
  };

  useLayoutEffect(() => {
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  return (
    <div
      className="cursor"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};
