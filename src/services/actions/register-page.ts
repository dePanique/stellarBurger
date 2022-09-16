import { createAccount, checkResponse } from "../../utils/utils";
import { deleteCookie, setCookie, setCookieTime } from "../../utils/cookies"
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_RESET
} from '../constants/register-page'
import { AppThunk, TAppDispatch } from "../..";
import { logInSuccess } from "./login-page";
import { authSuccess } from "./auth";

export interface ISignInRequest {
  readonly type: typeof SIGN_IN
}

export interface ISignInSuccess {
  readonly type: typeof SIGN_IN_SUCCESS
}

export interface ISignInFailed {
  readonly type: typeof SIGN_IN_FAILED
}

export interface ISignInReset {
  readonly type: typeof SIGN_IN_RESET
}

export type TRegisterPage =
  | ISignInRequest
  | ISignInSuccess
  | ISignInFailed
  | ISignInReset

export const signInRequest = (): ISignInRequest => ({
  type: SIGN_IN
})

export const signInSuccess = (): ISignInSuccess => ({
  type: SIGN_IN_SUCCESS
})

export const signInFailed = (): ISignInFailed => ({
  type: SIGN_IN_FAILED
})

export const signInReset = (): ISignInReset => ({
  type: SIGN_IN_RESET
})

export const signIn: AppThunk = (email:string, pass:string, name:string) => {
  return function (dispatch: TAppDispatch) {
    dispatch(signInRequest())

    createAccount(email, pass, name)
      .then((res) => {
        return checkResponse(res)
      })
      .catch((err) => {
        dispatch(signInFailed())

        console.log(`err in createAccount ${err}`);
      })
      .then((res) => {
        deleteCookie('accessToken');
        setCookie('accessToken', res.accessToken);
        deleteCookie('expire');
        setCookieTime();
        localStorage.clear()
        localStorage.setItem('refreshToken', res.refreshToken)

        dispatch(signInSuccess())
        dispatch(logInSuccess(res))
        dispatch(authSuccess())
      })
      .catch((err) => {
        console.log(`err in createAccount ${err}`);
      })
  }
}