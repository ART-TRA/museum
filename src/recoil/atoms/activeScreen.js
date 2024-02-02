import { atom } from 'recoil';

export const activeScreenAtom = atom({
  key: 'activeScreenAtom',
  default: 'title', //title || figures || room
});
