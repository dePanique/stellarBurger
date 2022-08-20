import { getCookie } from './cookies';

const dataUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
}

function getData() {
  return fetch(`${dataUrl}/ingredients`, {
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
  })
}

function postOrderId(array) {
  return fetch(`${dataUrl}/orders`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": array,
    })
  })
}

function requestEmailPassReset(email) {
  return fetch(`${dataUrl}/password-reset`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": `${email}`
    })
  })
}

function applyNewPass(pass, token) {
  return fetch(`${dataUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(  {
      "password": pass,
      "token": token
    })
  })
}

function createAccount(email, pass, name) {
  return fetch(`${dataUrl}/auth/register`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "name": name,
    })
  })
}

function logIn(email, pass) {
  return fetch(`${dataUrl}/auth/login`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
    })
  })
}

function updateAccessToken() {
  return fetch(`${dataUrl}/auth/token`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "token": localStorage.getItem('refreshToken'),
    })
  })
}

function logOut(refreshToken) {
  return fetch(`${dataUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "token": refreshToken,
    })
  })
}

function editUserInfo(name, email, pass) {
  const token = getCookie('accessToken');

  return fetch(`${dataUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
    body: JSON.stringify({
      "name": name,
      "email": email,
      "password": pass,
    })
  })
}

async function getUserInfo() {
  const token = getCookie('accessToken');

  return await fetch(`${dataUrl}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: `${token}`,
    },
  })
}

const makeColumnsList = (list, styles) => {
  let updatedList = [];
  // if (list.length > 20) {
  //   updatedList = list.splice(list.length - 1 - 20);
  // } else {
  //   updatedList = list
  // }

  updatedList = list

  return updatedList.map((el, index) => {
    if (index === updatedList.length - 1 || !((index + 1 )%10) ) {
      return (
        <li key={Math.random().toString(36).slice(2)} className={styles + ' text text_type_digits-default'}>
          {el}
        </li>
      )
    }

    return (
      <li key={Math.random().toString(36).slice(2)} className={styles + ' text text_type_digits-default mb-2'}>
        {el}
      </li>
    )
  })
}

const calcBurgerPriceFeedPage = (ingredients, data) => {
  let summ = 0
  ingredients.forEach(el => {
    data.find((dataEl) => {
      if (el === dataEl._id) {
        summ += dataEl.price
      }
    })
  })
  return summ
}


export {
  getData,
  postOrderId,
  checkResponse,
  requestEmailPassReset,
  applyNewPass,
  createAccount,
  logIn,
  updateAccessToken,
  logOut,
  editUserInfo,
  getUserInfo,
  makeColumnsList,
  calcBurgerPriceFeedPage,
};
