import { useRef } from 'react';
import { useResize } from 'src/hooks/useResize';
import {
  activeRoomDesc,
  activeRoomKeys,
  activeRoomNames,
} from 'src/recoil/atoms/activeRoom';

export const useRoomTitles = () => {
  const { isDesktop } = useResize();
  const titles = useRef([
    {
      key: activeRoomKeys[0],
      title: activeRoomNames[activeRoomKeys[0]],
      description: activeRoomDesc[activeRoomKeys[0]],
      titlePosition: isDesktop ? [-9.6, 2.1, -1.7] : [-9.6, 2.1, -1.6],
      descPosition: isDesktop ? [-9.6, 1.4, -1.7] : [-9.6, 1.27, -1.6],
      rotation: [0, -Math.PI * 0.5, 0],
      className: 'wall wall--same',
      titleFontSize: isDesktop ? 0.45 : 0.36,
      descFontSize: 0.1,
      titleWidth: isDesktop ? 4.0 : 2.0,
      descWidth: isDesktop ? 2.5 : 2.0,
    },
    {
      key: activeRoomKeys[1],
      title: activeRoomNames[activeRoomKeys[1]],
      description: activeRoomDesc[activeRoomKeys[1]],
      titlePosition: [5.4, 2.1, 21.5],
      descPosition: [5.4, 1.4, 21.5],
      rotation: [0, -Math.PI * 0.5, 0],
      className: 'wall wall--talents',
      titleFontSize: isDesktop ? 0.45 : 0.36,
      descFontSize: 0.1,
      titleWidth: isDesktop ? 4.0 : 2.0,
      descWidth: isDesktop ? 2.2 : 1.9,
    },
    {
      key: activeRoomKeys[2],
      title: activeRoomNames[activeRoomKeys[2]],
      description: activeRoomDesc[activeRoomKeys[2]],
      titlePosition: isDesktop ? [45.6, 3.3, 2.5] : [45.6, 3.3, 2.1],
      descPosition: isDesktop ? [45.6, 1.8, 2.5] : [45.6, 1.6, 2.1],
      rotation: [0, -Math.PI * 0.5, 0],
      className: 'wall wall--dreams',
      titleFontSize: isDesktop ? 0.7 : 0.6,
      descFontSize: 0.15,
      titleWidth: isDesktop ? 4.0 : 2.0,
      descWidth: isDesktop ? 4.46 : 3.0,
    },
    {
      key: activeRoomKeys[3],
      title: activeRoomNames[activeRoomKeys[3]],
      description: activeRoomDesc[activeRoomKeys[3]],
      titlePosition: isDesktop ? [75.8, 2.0, -3.1] : [75.9, 2.0, -3.1],
      descPosition: isDesktop ? [75.8, 1.1, -3.1] : [75.9, 1.04, -3.1],
      rotation: [0, 0, 0],
      className: 'wall wall--celebrate',
      titleFontSize: isDesktop ? 0.45 : 0.36,
      descFontSize: 0.1,
      titleWidth: isDesktop ? 3.5 : 2.0,
      descWidth: isDesktop ? 2.4 : 2.0,
    },
    {
      key: activeRoomKeys[4],
      title: activeRoomNames[activeRoomKeys[4]],
      description: activeRoomDesc[activeRoomKeys[4]],
      titlePosition: isDesktop ? [75, 1.9, -23.8] : [74.75, 1.9, -23.8],
      descPosition: isDesktop ? [75, 1.2, -23.8] : [74.75, 1.04, -23.8],
      rotation: [0, -Math.PI * 0.25, 0],
      className: 'wall wall--toys',
      titleFontSize: isDesktop ? 0.45 : 0.36,
      descFontSize: 0.1,
      titleWidth: isDesktop ? 4.0 : 2.0,
      descWidth: isDesktop ? 2.5 : 1.8,
    },
  ]);

  return titles.current;
};
