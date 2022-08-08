function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
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

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

function isCookieExpired() {
  if (getCookie('expire') === undefined) return true

  const nowTime = new Date(Date.now()).toUTCString()
  const expireTime = (new Date(getCookie('expire'))).toUTCString();

  return nowTime > expireTime
}

const setCookieTime = () => {
  const expireDate = (new Date(Date.now() + 1 * 1000)).toUTCString();

  setCookie('expire', expireDate);
}

export { setCookie, getCookie, deleteCookie, setCookieTime, isCookieExpired };