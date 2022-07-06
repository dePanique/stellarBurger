import { getData } from "../../../utils/utils";

export const GET_INGREDIENTS = 'GET_INGREDIENTS'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export function getIgredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    })

    getData()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        payload: res.data
      })
    }).catch((err) => {
      dispatch({
        type: GET_INGREDIENTS_FAILED,
      })
      console.log(`ошибка в получение данных от сервера об ингредиентых ${err}`)
    })
  }
}