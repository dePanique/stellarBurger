import { TSetCookie } from "./type";

const setCookie: TSetCookie = (name, value, props) => {

  props = {
    path: '/',
    ...props
  };

  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name: string) {
  setCookie(name, '', { expires: -1 });
}

function isCookieExpired() {
  const cookie = getCookie('expire')
  if (cookie === undefined) return true

  const nowTime = new Date(Date.now()).toUTCString()
  const expireTime = (new Date(cookie)).toUTCString();

  return nowTime > expireTime
}

const setCookieTime = () => {
  const expireDate = (new Date(Date.now() + 19 * 60 * 1000)).toUTCString();

  if (getCookie('expire')) deleteCookie('expire');

  setCookie('expire', expireDate, {});
}

export { setCookie, getCookie, deleteCookie, setCookieTime, isCookieExpired };