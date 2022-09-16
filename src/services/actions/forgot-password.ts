import { AppThunk, TAppDispatch } from "../..";
import { checkResponse, requestEmailPassReset } from "../../utils/utils";
import {
  REQUEST_NEW_PASS,
  REQUEST_NEW_PASS_SUCCESS,
  REQUEST_NEW_PASS_FAILED,
  REQUEST_NEW_PASS_RESET
} from '../constants/forgot-password'

export interface IRequestNewPass {
  readonly type: typeof REQUEST_NEW_PASS,
}
export interface IRequestNewPassSuccess {
  readonly type: typeof REQUEST_NEW_PASS_SUCCESS,
}
export interface IRequestNewPassFailed {
  readonly type: typeof REQUEST_NEW_PASS_FAILED,
}
export interface IRequestNewPassReset {
  readonly type: typeof REQUEST_NEW_PASS_RESET,
}

export type TForgotPassword =
  | IRequestNewPass
  | IRequestNewPassSuccess
  | IRequestNewPassFailed
  | IRequestNewPassReset

export const requestNewPass = (): IRequestNewPass => ({
  type: REQUEST_NEW_PASS
})
export const requestNewPassSuccess = (): IRequestNewPassSuccess => ({
  type: REQUEST_NEW_PASS_SUCCESS
})
export const requestNewPassFailed = (): IRequestNewPassFailed => ({
  type: REQUEST_NEW_PASS_FAILED
})
export const requestNewPassReset = (): IRequestNewPassReset => ({
  type: REQUEST_NEW_PASS_RESET
})

export const requestEmailPassResetEnch: AppThunk = (email: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch(requestNewPass());

    requestEmailPassReset(email)
      .then((res) => {
        return checkResponse(res)
      })
      .catch((err) => {
        console.log(`err in requestEmailPassResetEnch ${err}`);

        dispatch(requestNewPassFailed())
      })
      .then((res) => {
        if (res.success) {
          dispatch(requestNewPassSuccess());
        }
      })
      .catch((err) => {
        console.log(`err in requestEmailPassResetEnch ${err}`);

        dispatch(requestNewPassFailed());
      })
  }
}