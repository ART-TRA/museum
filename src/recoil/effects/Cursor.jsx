import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import cursorAtom from 'src/recoil/atoms/cursor';

export const CursorEffect = () => {
  const hovered = useRecoilValue(cursorAtom);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'default';
  }, [hovered]);

  return null;
};
