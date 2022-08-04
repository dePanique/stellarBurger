import { logIn, checkResponse, updateAccessToken } from "../../utils/utils";
import { setCookie } from "../../utils/cookies"
import { LOG_OUT_RESET } from "./profile-page";

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const LOG_IN_RESET = "LOG_IN_RESET";

export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_ACCESS_TOKEN_SUCCESS = "UPDATE_ACCESS_TOKEN_SUCCESS";
export const UPDATE_ACCESS_TOKEN_FAILED = "UPDATE_ACCESS_TOKEN_FAILED";

export function updateAccessTokenEnch(refreshToken) {

  return function (dispatch) {

    dispatch({
      type: UPDATE_ACCESS_TOKEN,
    })

    updateAccessToken(refreshToken)
      .then((res) => {
        return checkResponse(res)
      })
      .catch((err) => {
        console.log(`err in updateAccessTokenEnch ${err}`)
        dispatch({
          type: UPDATE_ACCESS_TOKEN_FAILED,
        })
      })
      .then((res) => {

        dispatch({
          type: UPDATE_ACCESS_TOKEN_SUCCESS,
          payload: res.accessToken,
        })

        setCookie("accessToken", res.accessToken.split('Bearer ')[1]);

      })
      .catch((err) => {
        console.log(`err in updateAccessTokenEnch ${err}`)
        dispatch({
          type: UPDATE_ACCESS_TOKEN_FAILED,
        })
      })
  }
}

export function logInEnch(email, pass) {

  return function (dispatch) {

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
        localStorage.setItem('refreshToken', res.refreshToken);

        setCookie("accessToken", res.accessToken.split('Bearer ')[1], {expires: 8});

        dispatch({
          type: LOG_IN_SUCCESS,
          payload: res,
        });

        dispatch({
          type: LOG_OUT_RESET,
        })
      })
      .catch((err) => {
        console.log(`err in logInEnch ${err}`);
      })
  }
}