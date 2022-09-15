import { createAccount, checkResponse } from "../../utils/utils";
import { LOG_IN_SUCCESS } from "./login-page";
import { deleteCookie, setCookie, setCookieTime } from "../../utils/cookies"
import { AUTH_SUCCESS } from "../constants/auth";

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const SIGN_IN_RESET = "SIGN_IN_RESET";

export function signIn(email, pass, name) {
  return function (dispatch) {
    dispatch({
      type: SIGN_IN,
    })

    createAccount(email, pass, name)
      .then((res) => {

        return checkResponse(res)
      })
      .catch((err) => {
        dispatch({
          type: SIGN_IN_FAILED,
        })

        console.log(`err in createAccount ${err}`);
      })
      .then((res) => {
        deleteCookie('accessToken');
        setCookie('accessToken', res.accessToken);
        deleteCookie('expire');
        setCookieTime();
        localStorage.clear('refresToken')
        localStorage.setItem('refreshToken', res.refreshToken)

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: res,
        })

        dispatch({
          type: LOG_IN_SUCCESS,
          payload: res,
        })

        dispatch({
          type: AUTH_SUCCESS,
          payload: res.accessToken,
        })

      })
      .catch((err) => {
        console.log(`err in createAccount ${err}`);
      })
  }
}