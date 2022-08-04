import { checkResponse, logOut } from "../../utils/utils";
import { SIGN_IN_RESET } from "./register-page";
import { LOG_IN_RESET } from "./login-page";

export const LOG_OUT = "LOG_OUT";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILED = "LOG_OUT_FAILED";
export const LOG_OUT_RESET ="LOG_OUT_RESET";


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
    })
    .catch((err) => {
      console.log(`err in logOutEnch ${err}`);
    })
  }
}
