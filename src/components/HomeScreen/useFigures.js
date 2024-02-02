import { activeRoomAtom } from 'src/recoil/atoms/activeRoom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';

export const useFigures = () => {
  const [activeScreen, setActiveScreen] = useRecoilState(activeScreenAtom);
  const setActiveRoom = useSetRecoilState(activeRoomAtom);

  const setFadeTransition = () => {
    const overlay = document.querySelector('.overlay');
    overlay?.classList.toggle('overlay--faded');
  };

  const onFigureClick = (activeRoomName) => {
    if (activeScreen === 'figures') {
      setFadeTransition();
      setActiveScreen('room');
      setActiveRoom(activeRoomName);
      setTimeout(() => {
        window.dispatchEvent(
          new CustomEvent('onChangeActiveRoom', {
            detail: activeRoomName,
          })
        );
      }, 200);
      setTimeout(() => {
        setFadeTransition();
      }, 3000);
    }
  };

  return { onFigureClick };
};
