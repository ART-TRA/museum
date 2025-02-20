const MILLISECONDS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;

export function writeCookies(props) {
  const { name, value, expires = MILLISECONDS_PER_YEAR } = props;
  const now = new Date();
  const nowTime = now.getTime();
  const expireTime = nowTime + expires;
  now.setTime(expireTime);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )};expires=${now.toUTCString()};path=/`;
}

export function removeCookies(props) {
  const { name, value } = props;
  const now = new Date();
  const nowTime = now.getTime();
  const expireTime = nowTime - 1;
  now.setTime(expireTime);
  document.cookie = `${name}=${value};expires=${now.toUTCString()}path=/'`;
}

export function getCookies(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()[\]\\/+^])/gu, '\\$1')}=([^;]*)`,
      'u'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
