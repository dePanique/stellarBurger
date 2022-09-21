import { dataUrl } from "./constants";
import { TCheckResponse } from "./type";

export const checkResponse: TCheckResponse = (res) => {
  if (res.ok) return res.json();

  throw new Error(res.statusText)
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