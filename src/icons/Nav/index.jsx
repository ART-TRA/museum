import React, { useRef } from 'react';
import cn from 'classnames';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeRoomAtom, activeRoomKeys } from 'src/recoil/atoms/activeRoom';
import { activeExhibitAtom } from 'src/recoil/atoms/activeExhibit';
import { clickTransition } from 'src/recoil/atoms/clickTransition';
import { setFadeTransition } from 'src/utils/setFadeTransition';

const PATHS = [
  {
    key: activeRoomKeys[0],
    d: 'M18.7853 34.2126L15.9983 27.4621L15.9993 27.4593L15.1431 25.3911L5.43222 17.6797L0 30.959L2.97322 39.938L12.623 36.4476L18.7853 34.2126Z',
  },
  {
    key: activeRoomKeys[1],
    d: 'M35.9158 4.97312L25.888 2L15.9992 27.4588L18.7844 34.2103L12.622 36.4471L6.59961 51.8971L8.007 57.7296L17.9496 60L24.1128 44.7346C22.4914 44.7858 21.5019 44.7234 21.5019 44.7234L19.4348 35.9429L22.2468 32.0574C25.8778 31.994 28.1914 31.5625 29.5543 31.1766L29.5728 31.171L30.7245 28.3135L32.9324 22.7531L34.5344 18.8675L38.284 9.56793L35.9158 4.97312Z',
  },
  {
    key: activeRoomKeys[2],
    d: 'M46.3633 33.2854L44.7373 24.2952C44.7373 24.2952 44.3333 21.4358 39.8267 19.9847L37.9041 19.4544C36.9841 19.2288 36.9155 19.2027 36.4106 19.1328L34.5297 18.8672L32.9278 22.7527L30.7199 28.3131L31.1831 30.5499C31.1831 30.5499 30.7143 30.8454 29.5487 31.1744C28.1858 31.5603 25.8723 31.9918 22.2412 32.0551L19.4338 35.9407L21.5046 44.724C21.5046 44.724 22.4942 44.7864 24.1156 44.7352C26.9572 44.642 31.7427 44.2011 36.5505 42.4527C37.1789 40.4326 38.4304 38.6663 40.1235 37.4095C41.8166 36.1528 43.8635 35.4709 45.9677 35.4626C45.9955 35.4169 46.6033 34.5958 46.3633 33.2854Z',
  },
  {
    key: activeRoomKeys[3],
    d: 'M52.6643 38.0116C50.8416 36.3623 48.4755 35.4517 46.0239 35.4561H45.9674C43.354 35.4561 40.8477 36.5004 38.9998 38.3592C37.1519 40.2181 36.1138 42.7392 36.1138 45.368C36.1138 50.8426 40.5509 55.28 46.0276 55.28C51.2977 55.28 55.606 51.1661 55.9183 45.9738C55.9303 45.7734 55.9377 45.5712 55.9377 45.368C55.938 43.9791 55.6466 42.6057 55.0825 41.338C54.5184 40.0702 53.6943 38.9367 52.6643 38.0116Z',
  },
  {
    key: activeRoomKeys[4],
    d: 'M76.1698 30.6579L68.5 18.6807L49.0569 26.4853L52.5647 37.9248C52.5647 37.9248 52.5999 37.9547 52.6574 38.0124C53.6867 38.9378 54.51 40.0715 55.0735 41.3392C55.637 42.607 55.9279 43.9801 55.9271 45.3688C55.9271 45.572 55.9197 45.7742 55.9076 45.9746L60.4198 54.4102L80.0001 46.4145L76.1698 30.6579Z',
  },
];

const NavItem = ({ data }) => {
  const setClickedTransition = useSetRecoilState(clickTransition);
  const [activeRoom, setActiveRoom] = useRecoilState(activeRoomAtom);
  const setExhibitActive = useSetRecoilState(activeExhibitAtom);
  const pathClassNames = cn('navigation-path', {
    'navigation-path--active': activeRoom === data.key,
  });
  const oneClickLimit = useRef(true);

  const onChangeActivePath = () => {
    if (oneClickLimit.current) {
      setFadeTransition();
      setExhibitActive(null);
      setTimeout(() => {
        setClickedTransition(true);
        if (activeRoom !== data.key) {
          setActiveRoom(data.key);
        }
        window.dispatchEvent(new CustomEvent('onExitFromDescription'));
      }, 200);
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('onChangeActiveRoom', {
            detail: data.key,
          })
        );
      }, 200);
      setTimeout(() => {
        setClickedTransition(false);
        setFadeTransition();
      }, 500);
      setTimeout(() => {
        oneClickLimit.current = true;
      }, 3000);
    }
    oneClickLimit.current = false;
  };

  return (
    <path
      key={data.key}
      d={data.d}
      fill="#4a5468"
      stroke="#4a5468"
      strokeWidth="2"
      className={pathClassNames}
      onClick={onChangeActivePath}
    />
  );
};

export const Nav = () => {
  return (
    <svg
      width="80"
      height="62"
      viewBox="0 0 80 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="navigation"
    >
      {PATHS.map((data) => (
        <NavItem key={data.key} data={data} />
      ))}
    </svg>
  );
};
