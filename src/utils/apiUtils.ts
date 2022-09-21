import { dataUrl } from "./constants";
import { TCheckResponse } from "./type";

export const checkResponse: TCheckResponse = (res) => {
  if (res.ok) return res.json();

  throw new Error(res.statusText)
}

export function postOrderId(array: string, token: string) {
  return fetch(`${dataUrl}/orders?token=${token}`, {
    method: 'POST',
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({
      "ingredients": array,
    })
  })
}

export function requestEmailPassReset(email: string) {
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

export function applyNewPass(pass: string, token: string) {
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

export function updateAccessToken() {
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

export function logOut(refreshToken: string) {
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

export function editUserInfo(name: string, email: string, pass: string, token: string) {
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

export async function getUserInfo(token: string) {
  return await fetch(`${dataUrl}/auth/user`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  })
}