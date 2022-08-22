import { checkResponse, requestEmailPassReset } from "../../utils/utils";

export const REQUEST_NEW_PASS = 'REQUEST_PASS_RESTORE';
export const REQUEST_NEW_PASS_SUCCESS = 'REQUEST_NEW_PASS_SUCCESS';
export const REQUEST_NEW_PASS_FAILED = 'REQUEST_NEW_PASS_FAILED';
export const REQUEST_NEW_PASS_RESET = 'REQUEST_NEW_PASS_RESET';

export const requestEmailPassResetEnch = (email) => {
  return function(dispatch) {
    dispatch({
      type: REQUEST_NEW_PASS,
    })

    requestEmailPassReset(email)
    .then((res) => {
      return checkResponse(res)
    })
    .catch((err) => {
      console.log(`err in requestEmailPassResetEnch ${err}`);

      dispatch({
        type: REQUEST_NEW_PASS_FAILED,
      })
    })
    .then((res) => {
      if (res.success) {
        dispatch({
          type: REQUEST_NEW_PASS_SUCCESS,
        })
      }
    })
    .catch((err) => {
      console.log(`err in requestEmailPassResetEnch ${err}`);

      dispatch({
        type: REQUEST_NEW_PASS_FAILED,
      })
    })
  }
}