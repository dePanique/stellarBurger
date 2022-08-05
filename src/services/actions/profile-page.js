import { checkResponse, logOut, getUserInfo } from "../../utils/utils";
import { SIGN_IN_RESET } from "./register-page";
import { LOG_IN_RESET } from "./login-page";
import { getCookie, deleteCookie } from "../../utils/cookies";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const LOG_OUT_RESET ="LOG_OUT_RESET";

export const GET_USER_INFO = "GET_USER_INFO";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const USER_INFO_RESET = "USER_INFO_RESET";

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
      deleteCookie('tokenExpire');
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
  }
}

export const getUserInfoEnch = (authStatus) => {
  return function(dispatch) {
    dispatch({
      type: GET_USER_INFO,
    })

    if (!authStatus) {

      return dispatch({
        type: GET_USER_INFO_FAILED,
        palyoad: 'authStatus is false'
      })

    }

    getUserInfo()
    .then((res) => {

      return checkResponse(res)
    })
    .catch((err) => {
      console.log(`err in getUserInfoEnch ${err}`);

      dispatch({
        type:GET_USER_INFO_FAILED,
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
