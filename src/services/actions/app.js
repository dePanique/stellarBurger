import { getData, checkResponse } from '../../utils/utils';
import { GET_FEED_INGREDIENTS } from './feed-page';

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    getData()
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`ошибка в ответе сервера в getIngredients ${err}`);
      })
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res,
        });

        res.data.forEach((el, index) => {
          dispatch({
            type: GET_FEED_INGREDIENTS,
            payload: {
              _id: res.data[index]._id,
              price: res.data[index].price,
              image_mobile: res.data[index].image_mobile,
              name: res.data[index].name,
            }
          })
        })
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(
          `ошибка после GET_INGREDIENTS_FAILED в getIngredients ${err}`
        );
      });
  };
}
