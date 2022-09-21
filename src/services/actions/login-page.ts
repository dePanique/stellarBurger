import { checkResponse, updateAccessToken } from "../../utils/apiUtils";
import { deleteCookie, setCookie, setCookieTime } from "../../utils/cookies";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_IN_RESET,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED
} from '../constants/login-page';
import { AppThunk } from "../..";
import { authFailed, authSuccess } from "./auth";
import { TUserInfo } from "../../utils/type";
import { logOutReset } from "./profile-page";
import { axiosApi } from "../../utils/axios";

export type TSuccessLogin = {
  success: boolean;
  user: {
    email: string,
    name: string,
  }
}

export interface ILogInRequest {
  readonly type: typeof LOG_IN_REQUEST
}
export interface ILogInSuccess {
  readonly type: typeof LOG_IN_SUCCESS
  readonly payload: TSuccessLogin
}
export interface ILogInFailed {
  readonly type: typeof LOG_IN_FAILED
}
export interface ILogInReset {
  readonly type: typeof LOG_IN_RESET
}
export interface IUpdateAccessTokenRequest {
  readonly type: typeof UPDATE_ACCESS_TOKEN_REQUEST
}
export interface IUpdateAccessTokenSuccess {
  readonly type: typeof UPDATE_ACCESS_TOKEN_SUCCESS
}
export interface IUpdateAccessTokenFailed {
  readonly type: typeof UPDATE_ACCESS_TOKEN_FAILED
}

export type TLogIn =
  | ILogInRequest
  | ILogInSuccess
  | ILogInFailed
  | ILogInReset
  | IUpdateAccessTokenRequest
  | IUpdateAccessTokenSuccess
  | IUpdateAccessTokenFailed

export const logInRequest = (): ILogInRequest => ({
  type: LOG_IN_REQUEST
})

export const logInSuccess = (payload: TSuccessLogin): ILogInSuccess => ({
  type: LOG_IN_SUCCESS,
  payload
})

export const logInFailed = (): ILogInFailed => ({
  type: LOG_IN_FAILED
})

export const logInReset = (): ILogInReset => ({
  type: LOG_IN_RESET
})

export const updateAccessTokenRequest = (): IUpdateAccessTokenRequest => ({
  type: UPDATE_ACCESS_TOKEN_REQUEST
})

export const updateAccessTokenSuccess = (): IUpdateAccessTokenSuccess => ({
  type: UPDATE_ACCESS_TOKEN_SUCCESS
})

export const updateAccessTokenFailed = (): IUpdateAccessTokenFailed => ({
  type: UPDATE_ACCESS_TOKEN_FAILED
})

export const updateAccessTokenEnch: AppThunk = () => {

  return async function (dispatch) {
    dispatch(updateAccessTokenRequest());

    try {
      const res: TUserInfo = await updateAccessToken().then(res => checkResponse(res));
      console.log(res);

      deleteCookie('accessToken');
      setCookie('accessToken', res.accessToken, { expires: 1140 });
      deleteCookie('expire');
      setCookieTime();

      localStorage.clear();
      localStorage.setItem('refreshToken', res.refreshToken);

      dispatch(updateAccessTokenSuccess());
      dispatch(authSuccess());
    } catch (err) {
      console.log(`err in updateAccessTokenEnch ${err}`);
      dispatch(authFailed());
      dispatch(updateAccessTokenFailed());
    }
  }
}

export const logInEnch: AppThunk = (email: string, password: string) => {
  return async function (dispatch) {
    dispatch(logInRequest());

    try {
      const res: TUserInfo = await axiosApi.post('/auth/login', {email, password});

      dispatch(logInSuccess(res));
      dispatch(authSuccess());
      dispatch(logOutReset());
    } catch (err) {
      console.log(`err in logInEnch ${err}`);
      dispatch(logInFailed());
    }
  }
}