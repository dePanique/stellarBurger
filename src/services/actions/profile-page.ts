import { checkResponse, logOut, getUserInfo, editUserInfo } from "../../utils/utils";
import { logInReset, updateAccessTokenEnch, updateAccessTokenFailed } from "./login-page";
import { deleteCookie, isCookieExpired } from "../../utils/cookies";
import {
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  LOG_OUT_RESET,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  USER_INFO_RESET,
  EDIT_USER_INFO,
  EDIT_USER_INFO_SUCCESS,
  EDIT_USER_INFO_FAILED,
} from '../constants/profile-page';
import { AppThunk, TAppDispatch } from "../..";
import { authFailed, authReset } from "./auth";
import { closeProfileOrdersWS } from "./profile-orders";
import { signInReset } from "./register-page";

export interface ILogOutRequest {
  readonly type: typeof LOG_OUT
}

export interface ILogOutSuccess {
  readonly type: typeof LOG_OUT_SUCCESS
}

export interface ILogOutFailed {
  readonly type: typeof LOG_OUT_FAILED
}

export interface ILogOutReset {
  readonly type: typeof LOG_OUT_RESET
}

export interface IGetUserInfoRequest {
  readonly type: typeof GET_USER_INFO
}

export interface IGetUserInfoSuccess {
  readonly type: typeof GET_USER_INFO_SUCCESS
  readonly payload: { name: string; email: string }
}

export interface IGetUserInfoFailed {
  readonly type: typeof GET_USER_INFO_FAILED
}

export interface IUserInfoReset {
  readonly type: typeof USER_INFO_RESET
}

export interface IEditUserInfoRequest {
  readonly type: typeof EDIT_USER_INFO
}

export interface IEditUserInfoSuccess {
  readonly type: typeof EDIT_USER_INFO_SUCCESS
  readonly payload: { name: string; email: string }
}

export interface IEditUserInfoFailed {
  readonly type: typeof EDIT_USER_INFO_FAILED
}

export type TProfilePage =
  | ILogOutRequest
  | ILogOutSuccess
  | ILogOutFailed
  | ILogOutReset
  | IGetUserInfoRequest
  | IGetUserInfoSuccess
  | IGetUserInfoFailed
  | IUserInfoReset
  | IEditUserInfoRequest
  | IEditUserInfoSuccess
  | IEditUserInfoFailed

export const logOutRequest = (): ILogOutRequest => ({
  type: LOG_OUT
})

export const logOutSuccess = (): ILogOutSuccess => ({
  type: LOG_OUT_SUCCESS
})

export const logOutFailed = (): ILogOutFailed => ({
  type: LOG_OUT_FAILED
})

export const logOutReset = (): ILogOutReset => ({
  type: LOG_OUT_RESET
})

export const getUserInfoRequest = (): IGetUserInfoRequest => ({
  type: GET_USER_INFO
})

export const getUserInfoSuccess = (payload: { name: string; email: string }): IGetUserInfoSuccess => ({
  type: GET_USER_INFO_SUCCESS,
  payload
})

export const getUserInfoFailed = (): IGetUserInfoFailed => ({
  type: GET_USER_INFO_FAILED
})

export const userInfoReset = (): IUserInfoReset => ({
  type: USER_INFO_RESET
})

export const editUserInfoRequest = (): IEditUserInfoRequest => ({
  type: EDIT_USER_INFO
})

export const editUserInfoSuccess = (payload: { name: string; email: string }): IEditUserInfoSuccess => ({
  type: EDIT_USER_INFO_SUCCESS,
  payload
})

export const editUserInfoFailed = (): IEditUserInfoFailed => ({
  type: EDIT_USER_INFO_FAILED
})


export const getUserInfoEnch: AppThunk = () => {
  return async function (dispatch: TAppDispatch) {
    dispatch(getUserInfoRequest)

    if (isCookieExpired()) {
      dispatch(updateAccessTokenEnch())
    }

    getUserInfo()
      .then((res) => {
        if (res.ok) {
          return checkResponse(res)
        } else {
          dispatch(updateAccessTokenEnch())
          return getUserInfo().then((res) => {
            console.log('getuser');
            return checkResponse(res)
          })
        }
      })
      .catch((err) => {
        console.log(`err in getUserInfoEnch ${err}`);

        dispatch(getUserInfoFailed())

        dispatch(authFailed())

        dispatch(updateAccessTokenFailed())

        dispatch(closeProfileOrdersWS())
      })
      .then((res) => {
        dispatch(getUserInfoSuccess(res.user))
      })
      .catch((err) => {
        console.log(`err in getUserInfoEnch ${err}`);
      })
  }
}


export const editUserInfoEnch: AppThunk = (nameValue: string, emailValue: string, passwordValue: string) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(editUserInfoRequest())

    if (isCookieExpired()) {
      dispatch(updateAccessTokenEnch())
    }

    editUserInfo(nameValue, emailValue, passwordValue)
      .then((res) => {
        if (res.ok) {
          return checkResponse(res)
        } else {
          dispatch(updateAccessTokenEnch())
          return editUserInfo(nameValue, emailValue, passwordValue).then((res) => {
            return checkResponse(res)
          })
        }
      })
      .catch((err) => {
        dispatch(editUserInfoFailed())

        console.log(`err in editUserInfoEnch ${err}`);
      })
      .then(() => {
        dispatch(editUserInfoSuccess({ name: nameValue, email: emailValue }))
      })
      .catch((err) => {
        console.log(`err in editUserInfoEncg ${err}`);
      })
  }
}

export const logOutEnch: AppThunk = (refreshToken: string) => {
  return function (dispatch: TAppDispatch) {
    dispatch(logOutRequest())

    logOut(refreshToken)
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`err in logOutEnch ${err}`);
      })
      .then(() => {
        dispatch(logOutRequest())

        dispatch(signInReset())

        dispatch(logInReset())

        localStorage.clear();
        deleteCookie('accessToken');
        deleteCookie('expire');

        dispatch(authReset())
      })
      .catch((err) => {
        console.log(`err in logOutEnch ${err}`);
      })
  }
}