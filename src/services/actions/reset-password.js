import { applyNewPass, checkResponse } from "../../utils/utils";

export const RESET_PASS = 'RESET_PASS';
export const RESET_PASS_SUCCESS = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAILED = 'RESET_PASS_FAILED';

export const applyNewPassEnch = (pass, token) => {
  return function (dispatch) {

    dispatch({
      type: RESET_PASS,
    })

    applyNewPass(pass, token)
      .then((res) => {
        return checkResponse(res)
      })
      .catch((err) => {
        console.log(`err in applyNewPassEnch ${err}`);

        dispatch({
          type: RESET_PASS_FAILED,
        })
      })
      .then((res) => {
        console.log(res);

        dispatch({
          type: RESET_PASS_SUCCESS
        })
      })
      .catch((err) => {
        console.log(`err in applyNewPassEnch ${err}`);

        dispatch({
          type: RESET_PASS_FAILED,
        })
      })
  }
}