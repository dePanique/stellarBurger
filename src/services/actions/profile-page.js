import { checkResponse, logOut, getUserInfo, editUserInfo } from "../../utils/utils";
import { SIGN_IN_RESET } from "./register-page";
import { LOG_IN_RESET, updateAccessTokenEnch, UPDATE_ACCESS_TOKEN_FAILED } from "./login-page";
import { deleteCookie, getCookie, isCookieExpired } from "../../utils/cookies";
import { AUTH_FAILED, AUTH_RESET } from "./auth";
import { CLOSE_PROFILE_ORDERS_WS, WS_PROFILE_ORDERS_START } from "./profile-orders";
import { WS_URL } from "../../utils/constants";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const LOG_OUT_RESET = "LOG_OUT_RESET";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const USER_INFO_RESET = "USER_INFO_RESET";

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const EDIT_USER_INFO_SUCCESS = "EDIT_USER_INFO_SUCCESS";
export const EDIT_USER_INFO_FAILED = "EDIT_USER_INFO_FAILED";

export const getUserInfoEnch = () => {
  return async function (dispatch) {
    dispatch({
      type: GET_USER_INFO,
    })

    if (isCookieExpired()) {
      dispatch(updateAccessTokenEnch())
    }

    getUserInfo()
      .then((res) => {
        if (res.ok) {
          return checkResponse(res)
        } else {
          dispatch(updateAccessTokenEnch())
          return getUserInfo().then((res) => {
            console.log('getuser');
            return checkResponse(res)
          })
        }
      })
      .catch((err) => {
        console.log(`err in getUserInfoEnch ${err}`);

        dispatch({
          type: GET_USER_INFO_FAILED,
        })

        dispatch({
          type: AUTH_FAILED,
        })

        dispatch({
          type: UPDATE_ACCESS_TOKEN_FAILED
        })

        dispatch({
          type: CLOSE_PROFILE_ORDERS_WS,
        })
      })
      .then((res) => {

        dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: res.user,
        })
      })
      .catch((err) => {

        console.log(`err in getUserInfoEnch ${err}`);
      })
  }
}

export const editUserInfoEnch = (nameValue, emailValue, passwordValue) => {
  return async function (dispatch) {
    dispatch({
      type: EDIT_USER_INFO,
    })

    if (isCookieExpired()) {
      console.log('expire');

      dispatch(updateAccessTokenEnch())
    }

    editUserInfo(nameValue, emailValue, passwordValue)
      .then((res) => {
        if (res.ok) {
          return checkResponse(res)
        } else {
          dispatch(updateAccessTokenEnch())
          return editUserInfo(nameValue, emailValue, passwordValue).then((res) => {
            console.log('edit');
            return checkResponse(res)})
        }
      })
      .catch((err) => {
        dispatch({
          type: EDIT_USER_INFO_FAILED,
        })

        console.log(`err in editUserInfoEnch ${err}`);
      })
      .then((res) => {
        dispatch({
          type: EDIT_USER_INFO_SUCCESS,
          payload: {
            name: nameValue,
            email: emailValue,
          }
        })
      })
      .catch((err) => {
        console.log(`err in editUserInfoEncg ${err}`);
      })
  }
}

export function logOutEnch(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: LOG_OUT,
    })

    logOut(refreshToken)
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`err in logOutEnch ${err}`);
      })
      .then((res) => {
        dispatch({
          type: LOG_OUT_SUCCESS,
        })

        dispatch({
          type: SIGN_IN_RESET,
        })

        dispatch({
          type: LOG_IN_RESET,
        })

        localStorage.clear('refreshToken');
        deleteCookie('accessToken');
        deleteCookie('expire');

        dispatch({
          type: AUTH_RESET,
        })
      })
      .catch((err) => {
        console.log(`err in logOutEnch ${err}`);
      })
  }
}