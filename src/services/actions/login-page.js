import { logIn, checkResponse, updateAccessToken } from "../../utils/utils";
import { deleteCookie, setCookie, setCookieTime } from "../../utils/cookies"
import { LOG_OUT_RESET } from "./profile-page";
import { AUTH_FAILED, AUTH_SUCCESS } from "./auth";

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILED = "LOG_IN_FAILED";
export const LOG_IN_RESET = "LOG_IN_RESET";

export const UPDATE_ACCESS_TOKEN = "UPDATE_ACCESS_TOKEN";
export const UPDATE_ACCESS_TOKEN_SUCCESS = "UPDATE_ACCESS_TOKEN_SUCCESS";
export const UPDATE_ACCESS_TOKEN_FAILED = "UPDATE_ACCESS_TOKEN_FAILED";

export function updateAccessTokenEnch() {

  return async function (dispatch) {

    dispatch({
      type: UPDATE_ACCESS_TOKEN,
    })

    if (!localStorage.getItem('refreshToken')) {

      console.log("empty refreshToken");
      dispatch({
        type: UPDATE_ACCESS_TOKEN_FAILED,
      })

      dispatch({
        type: AUTH_FAILED,
      })

      return 0
    }


    await updateAccessToken()
      .then((res) => {

        return checkResponse(res)
      })
      .catch((err) => {

        if(err === 'Ошибка: 401') {
          localStorage.clear()
        }
        
        dispatch({
          type: AUTH_FAILED,
        })

        dispatch({
          type: UPDATE_ACCESS_TOKEN_FAILED,
        })


      })
      .then((res) => {
        deleteCookie('accessToken');
        setCookie('accessToken', res.accessToken);
        deleteCookie('expire');
        setCookieTime();
        localStorage.clear('refresToken')
        localStorage.setItem('refreshToken', res.refreshToken)

        dispatch({
          type: UPDATE_ACCESS_TOKEN_SUCCESS,
          payload: res.accessToken,
        })

        dispatch({
          type: AUTH_SUCCESS,
          payload: res.accessToken,
        })

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

        setCookie('accessToken', res.accessToken);
        setCookieTime();

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