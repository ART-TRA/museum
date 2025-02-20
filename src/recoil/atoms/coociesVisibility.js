import { atom } from 'recoil';
import { getCookies } from 'src/utils/cookie';
import { COOKIES_AGREE } from 'src/utils/constants';

export const cookiesVisibilityAtom = atom({
  key: 'cookiesVisibilityAtom',
  default: Boolean(getCookies(COOKIES_AGREE)),
});
