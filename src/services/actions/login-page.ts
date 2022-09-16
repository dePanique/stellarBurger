import { logIn, checkResponse, updateAccessToken } from "../../utils/utils";
import { deleteCookie, setCookie, setCookieTime } from "../../utils/cookies";
import { LOG_OUT_RESET } from "./profile-page";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_IN_RESET,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED
} from '../constants/login-page';
import { AppThunk, TAppDispatch } from "../..";
import { authFailed, authSuccess } from "./auth";

type TSuccessLogin = {
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

  return async function (dispatch: TAppDispatch) {
    dispatch(updateAccessToken());

    if (!localStorage.getItem('refreshToken')) {

      console.log("empty refreshToken");
      dispatch(updateAccessTokenFailed());

      dispatch(authFailed());

      return 0
    }


    await updateAccessToken()
      .then((res) => {

        return checkResponse(res);
      })
      .catch((err) => {
        if (err === 'Ошибка: 401') {
          localStorage.clear();
        }

        dispatch(authFailed());

        dispatch(updateAccessTokenFailed());
      })
      .then((res) => {
        deleteCookie('accessToken');
        setCookie('accessToken', res.accessToken);
        deleteCookie('expire');
        setCookieTime();
        localStorage.clear();
        localStorage.setItem('refreshToken', res.refreshToken);

        dispatch(updateAccessTokenSuccess());

        dispatch(authSuccess());
      })
      .catch((err) => {
        console.log(`err in updateAccessTokenEnch ${err}`);

        dispatch(updateAccessTokenFailed());
      })
  }
}

export const logInEnch: AppThunk = (email: string, pass: string) => {

  return function (dispatch: TAppDispatch) {
    dispatch(logInRequest());

    logIn(email, pass)
      .then((res) => {

        return checkResponse(res);
      })
      .catch((err) => {
        dispatch(logInFailed());

        console.log(`err in logInEnch ${err}`);
      })
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);

        setCookie('accessToken', res.accessToken);
        setCookieTime();

        dispatch(logInSuccess(res));

        dispatch(authSuccess());

        dispatch({
          type: LOG_OUT_RESET,
        });
      })
      .catch((err) => {
        console.log(`err in logInEnch ${err}`);
      })
  }
}