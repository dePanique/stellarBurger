import { postOrderId } from "../../../utils/utils";

export const GET_ORDER = "GET_ORDERID";
export const GET_ORDER_SUCCESS = "GET_ORDERID_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDERID_FAILED";

export function getIngredients(ingredientsId) {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER,
    });

    await postOrderId(ingredientsId)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(
          `ошибка в получение данных от сервера об ингредиентых ${err}`
        );
      });
  };
}
