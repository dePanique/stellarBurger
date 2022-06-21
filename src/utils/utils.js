const dataUrl = "https://norma.nomoreparties.space/api/";

function getData() {
  return fetch(`${dataUrl}ingredients`, {
    headers: {
      baseURL: dataUrl,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) return res.json();

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
}

export { getData };
