import { Cross } from 'src/icons/Cross';
import { writeCookies } from 'src/utils/cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { COOKIES_AGREE } from 'src/utils/constants';
import { cookiesVisibilityAtom } from 'src/recoil/atoms/coociesVisibility';
import { activeScreenAtom } from 'src/recoil/atoms/activeScreen';
import { useProgress } from '@react-three/drei';

export const Cookies = () => {
  const { progress } = useProgress();
  const activeScreen = useRecoilValue(activeScreenAtom);
  const [hasCookies, setCookies] = useRecoilState(cookiesVisibilityAtom);

  const onCloseCookies = () => {
    writeCookies({
      name: COOKIES_AGREE,
      value: true,
    });
    setCookies(true);
  };

  if (hasCookies || activeScreen === 'room' || progress < 100) return null;

  return (
    <div className="cookies">
      <p>этот сайт использует файлы cookie</p>
      <button type="button" className="cookies__close" onClick={onCloseCookies}>
        <Cross outline={false} />
      </button>
    </div>
  );
};
