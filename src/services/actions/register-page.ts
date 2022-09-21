import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_RESET
} from '../constants/register-page';
import { AppThunk, TAppDispatch } from "../..";
import { logInSuccess } from "./login-page";
import { authSuccess } from "./auth";
import { TUserInfo } from "../../utils/type";
import { axiosApi } from "../../utils/axios";

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

export const signIn: AppThunk = (email: string, pass: string, name: string) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(signInRequest())

    try {
      const res: TUserInfo = await axiosApi.post('/auth/register', {
          "email": email,
          "password": pass,
          "name": name,
      })
      console.log(res);

      dispatch(signInSuccess())
      dispatch(logInSuccess(res))
      dispatch(authSuccess())
    } catch (err) {
      console.log(`err in createAccount ${err}`);
      dispatch(signInFailed())
    }
  }
}