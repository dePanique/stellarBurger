import { checkResponse, logOut, getUserInfo, editUserInfo } from "../../utils/utils";
import { SIGN_IN_RESET } from "./register-page";
import { LOG_IN_RESET, updateAccessTokenEnch, UPDATE_ACCESS_TOKEN_FAILED } from "./login-page";
import { deleteCookie, isCookieExpired } from "../../utils/cookies";
import { AUTH_FAILED, AUTH_RESET } from "./auth";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const LOG_OUT_RESET ="LOG_OUT_RESET";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const USER_INFO_RESET = "USER_INFO_RESET";

export const EDIT_USER_INFO = "EDIT_USER_INFO";
export const EDIT_USER_INFO_SUCCESS = "EDIT_USER_INFO_SUCCESS";
export const EDIT_USER_INFO_FAILED = "EDIT_USER_INFO_FAILED";

export const getUserInfoEnch = () => {
  return async function(dispatch) {
    dispatch({
      type: GET_USER_INFO,
    })

    // if (!authStatus) {
    //   return dispatch({
    //     type: GET_USER_INFO_FAILED,
    //     palyoad: 'authStatus is false'
    //   })

    // }

console.log(2);
    if (isCookieExpired()) {
      console.log(3);
      await dispatch(updateAccessTokenEnch())
    }

    getUserInfo()
    .then((res) => {

      return checkResponse(res)
    })
    .catch((err) => {
      console.log(4);
      console.log(`err in getUserInfoEnch ${err}`);

      dispatch({
        type:GET_USER_INFO_FAILED,
      })

      dispatch({
        type:AUTH_FAILED,
      })

      dispatch({
        type:UPDATE_ACCESS_TOKEN_FAILED
      })

    })
    .then((res) => {
      console.log(5);
      console.log(res);
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

  return function(dispatch) {
    console.log(nameValue, emailValue, passwordValue);
    dispatch({
      type: EDIT_USER_INFO,
    })

    // if (isCookieExpired()) {
    //   console.log('expire');

    //   dispatch(updateAccessTokenEnch())
    // }

    editUserInfo(nameValue, emailValue, passwordValue)
    .then((res) => {
      return checkResponse(res)
    })
    .catch((err) => {
      dispatch({
        type: EDIT_USER_INFO_FAILED,
      })

      console.log(`err in editUserInfoEnch ${err}`);
    })
    .then((res) => {
      console.log(res);
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
  return function(dispatch) {
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
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
    .then((res) => {
      dispatch({
        type: SIGN_IN_RESET,
      })
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
    .then((res) => {
      dispatch({
        type: LOG_IN_RESET,
      })

      localStorage.clear('refreshToken');
      deleteCookie('accessToken');
      deleteCookie('expire');
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
    .then(() => {
      dispatch({
        type: AUTH_RESET,
      })
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
  }
}