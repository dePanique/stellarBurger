import { AppThunk, TAppDispatch } from "../..";
import { axiosApi, urlsObject } from "../../utils/axios";
import { TResponseApplyNewPass } from "../../utils/type";
import {
  RESET_PASS,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILED,
  RESET_PASS_INITIAL,
} from '../constants/reset-password';

export interface IResetPass {
  readonly type: typeof RESET_PASS
}

export interface IResetPassSuccess {
  readonly type: typeof RESET_PASS_SUCCESS
}

export interface IResetPassFailed {
  readonly type: typeof RESET_PASS_FAILED
}

export interface IResetPassInitial {
  readonly type: typeof RESET_PASS_INITIAL
}

export type TResetPass =
  | IResetPass
  | IResetPassSuccess
  | IResetPassFailed
  | IResetPassInitial

export const resetPass = (): IResetPass => ({
  type: RESET_PASS
})

export const resetPassSuccess = (): IResetPassSuccess => ({
  type: RESET_PASS_SUCCESS
})

export const resetPassFailed = (): IResetPassFailed => ({
  type: RESET_PASS_FAILED
})

export const resetPassInitial = (): IResetPassInitial => ({
  type: RESET_PASS_INITIAL
})

export const applyNewPassEnch: AppThunk = (password: string, token: string) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(resetPass())

    try {
      const res: TResponseApplyNewPass = await axiosApi.post(urlsObject.applyNewPass, {password, token});

      dispatch(resetPassSuccess())
    } catch (err) {
      console.log(`err in applyNewPassEnch ${err}`);
      dispatch(resetPassFailed())
    }
  }
}