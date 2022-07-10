import { getData } from "../../../utils/utils";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getIgredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS,
    });

    getData()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: "SET_BUN",
          payload: {
            bun: res.data.find((element) => element.type === "bun"),
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
        console.log(
          `ошибка в получение данных от сервера об ингредиентых ${err}`
        );
      });
  };
}
