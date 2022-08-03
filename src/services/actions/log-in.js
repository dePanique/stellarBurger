import { logIn, checkResponse } from "../../utils/utils";

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";


export function logInEnch(email, pass) {

  return function(dispatch) {

    dispatch({
      type: LOG_IN,
    })

    logIn(email, pass)
      .then((res) => {

        return checkResponse(res)
      })
      .catch((err) => {

        dispatch({
          type: LOG_IN_FAILED,
        })

        console.log(`err in logInEnch ${err}`);
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('refreshToken', res.refreshToken)

        dispatch({
          type: LOG_IN_SUCCESS,
          payload: res,
        })
      })
      .catch((err) => {
        console.log(`err in logInEnch ${err}`);
      })
  }
}