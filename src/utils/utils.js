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
      "email": email
    })
  })
}

//TODO нужен ответ из email
function applyNewPass(pass, token) {
  return fetch(`${dataUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(  {
      "password": "",
      "token": ""
    })
  })
}

// function createAccount() {
//   return fetch(`${dataUrl}/auth/register`, {
//     method: 'POST',
//     headers: {
//       baseURL: dataUrl,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       "email": "testpanique@yandex.ru",
//       "password": "pass",
//       "name": "Panique"
//     })
//   })
// }

export { getData, postOrderId, checkResponse, requestEmailPassReset, applyNewPass };
