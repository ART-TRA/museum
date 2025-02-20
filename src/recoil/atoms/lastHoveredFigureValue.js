import { atom } from 'recoil';

export const hoveredKeys = {
  empty: 'empty',
  same: 'same',
  talents: 'talents',
  dreams: 'dreams',
  celebrate: 'celebrate',
  toys: 'toys',
};

export const hoveredValues = {
  empty: 'скрольте <br /> или выберите объект',
  same: 'Зал одинаковых вещей',
  talents: 'Зал талантов',
  dreams: 'Зал с мечтами и стремлениями',
  celebrate: 'Зал праздничных мелочей',
  toys: 'Зал забытых игрушек',
};

export const lastHoveredFigureValueAtom = atom({
  key: 'lastHoveredFigureValueAtom',
  default: hoveredValues.empty,
});
