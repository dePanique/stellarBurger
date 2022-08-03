import { createAccount, checkResponse } from "../../utils/utils";

export const SIGN_IN = "SIGN_IN";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

export function signIn(email, pass, name) {

  return function(dispatch) {

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
        console.log(res);

        dispatch({
          type: SIGN_IN_SUCCESS,
          payload: res,
        })
      })
      .catch((err) => {
        console.log(`err in createAccount ${err}`);
      })
  }
}