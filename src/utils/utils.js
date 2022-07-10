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

export { getData, postOrderId, checkResponse };
