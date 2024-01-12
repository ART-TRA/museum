import { atom } from 'recoil';

export const activeRoomKeys = [
  'same',
  'talents',
  'dreams',
  'celebrate',
  'toys',
];

export const activeRoomNames = {
  [activeRoomKeys[0]]: 'Зал одинаковых вещей',
  [activeRoomKeys[1]]: 'Зал талантов',
  [activeRoomKeys[2]]: 'Зал с мечтами и стремлениями',
  [activeRoomKeys[3]]: 'Зал праздничных мелочей',
  [activeRoomKeys[4]]: 'Зал забытых игрушек',
};

export const activeRoomDesc = {
  [activeRoomKeys[0]]:
    'В этом зале можно погрузиться в обычную жизнь ребёнка из детского дома, в которой все дни похожи друг на друга.',
  [activeRoomKeys[1]]:
    'Экспонаты в этом зале помогали детям заниматься творчеством даже в самых сложных ситуациях. Теперь эти предметы – часть музея, а дети – часть семьи.',
  [activeRoomKeys[2]]:
    'Ребёнок может лишиться семьи, но мечты у него не отнять. В этом зале собраны экспонаты, которые хранили мысли и стремления и были первым шагом на пути к исполнению желаний.',
  [activeRoomKeys[3]]:
    'Праздники очень ждут в детских домах, ведь там не так много поводов для радости. Каждый экспонат в этом зале помогал детям отвлечься и погрузиться беззаботную атмосферу.',
  [activeRoomKeys[4]]:
    'В этом зале история игрушек приходит к своему счастливому финалу, когда они больше не нужны детям, у которых теперь есть семья.',
};

export const activeRoomTimes = {
  [activeRoomKeys[0]]: 0,
  [activeRoomKeys[1]]: 18,
  [activeRoomKeys[2]]: 36,
  [activeRoomKeys[3]]: 50,
  [activeRoomKeys[4]]: 63,
};

export const activeRoomAtom = atom({
  key: 'activeRoomAtom',
  default: activeRoomKeys[0],
});
