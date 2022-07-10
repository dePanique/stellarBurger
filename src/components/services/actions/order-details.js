import { postOrderId } from "../../../utils/utils";
import { checkResponse } from "../../../utils/utils";

export const GET_ORDER = "GET_ORDERID";
export const GET_ORDER_SUCCESS = "GET_ORDERID_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDERID_FAILED";

export function getOrderNumber(ingredientsId) {
  return async function (dispatch) {
    dispatch({
      type: GET_ORDER,
    });

    await postOrderId(ingredientsId)
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`ошибка в ответе сервера в getOrderNumber ${err}`);
      })
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
        console.log(`ошибка после GET_ORDER_FAILED в getOrderNumber ${err}`);
      });
  };
}
