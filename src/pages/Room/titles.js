import {
  activeRoomDesc,
  activeRoomKeys,
  activeRoomNames,
} from 'src/recoil/atoms/activeRoom';

export const TITLES = [
  {
    key: activeRoomKeys[0],
    title: activeRoomNames[activeRoomKeys[0]],
    description: activeRoomDesc[activeRoomKeys[0]],
    titlePosition: [-9.6, 2.1, -1.7],
    descPosition: [-9.6, 1.4, -1.7],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--same',
    titleFontSize: 0.45,
    descFontSize: 0.1,
    titleWidth: 4.0,
    descWidth: 2.5,
  },
  {
    key: activeRoomKeys[1],
    title: activeRoomNames[activeRoomKeys[1]],
    description: activeRoomDesc[activeRoomKeys[1]],
    titlePosition: [5.4, 2.1, 21.5],
    descPosition: [5.4, 1.4, 21.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--talents',
    titleFontSize: 0.45,
    descFontSize: 0.1,
    titleWidth: 4.0,
    descWidth: 2.2,
  },
  {
    key: activeRoomKeys[2],
    title: activeRoomNames[activeRoomKeys[2]],
    description: activeRoomDesc[activeRoomKeys[2]],
    titlePosition: [45.6, 3.3, 2.5],
    descPosition: [45.6, 1.8, 2.5],
    rotation: [0, -Math.PI * 0.5, 0],
    className: 'wall wall--dreams',
    titleFontSize: 0.7,
    descFontSize: 0.15,
    titleWidth: 4.0,
    descWidth: 4.46,
  },
  {
    key: activeRoomKeys[3],
    title: activeRoomNames[activeRoomKeys[3]],
    description: activeRoomDesc[activeRoomKeys[3]],
    titlePosition: [75.8, 2.0, -3.1],
    descPosition: [75.8, 1.1, -3.1],
    rotation: [0, 0, 0],
    className: 'wall wall--celebrate',
    titleFontSize: 0.45,
    descFontSize: 0.1,
    titleWidth: 3.5,
    descWidth: 2.4,
  },
  {
    key: activeRoomKeys[4],
    title: activeRoomNames[activeRoomKeys[4]],
    description: activeRoomDesc[activeRoomKeys[4]],
    titlePosition: [75, 1.9, -23.8],
    descPosition: [75, 1.2, -23.8],
    rotation: [0, -Math.PI * 0.25, 0],
    className: 'wall wall--toys',
    titleFontSize: 0.45,
    descFontSize: 0.1,
    titleWidth: 4.0,
    descWidth: 2.5,
  },
];