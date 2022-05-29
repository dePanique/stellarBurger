import PropTypes from 'prop-types'

const dataTemplate = PropTypes.shape({
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
})

const dataUrl = 'https://norma.nomoreparties.space/api/'

function getData () {
  return fetch(`${dataUrl}ingredients`, {
  headers: {
    baseURL: dataUrl,
    "Content-Type": "application/json",
  },
}).then((res) => {
  if (res.ok) return res.json()

  return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => console.log(`Ошибка: ${err}`))
}

export  { dataTemplate, getData }