import { TAppDispatch, AppThunk } from '../..';
import {
  AUTH_PROCESS,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_RESET
} from '../constants/auth';

export interface IAuthProcess  {
  readonly type: typeof AUTH_PROCESS;
}

export interface IAuthSuccess  {
  readonly type: typeof AUTH_SUCCESS;
}

export interface IAuthFailed  {
  readonly type: typeof AUTH_FAILED;
}

export interface IAuthReset  {
  readonly type: typeof AUTH_RESET;
}

export type TAuth =
  | IAuthProcess
  | IAuthSuccess
  | IAuthFailed
  | IAuthReset

export const authProcess = (): IAuthProcess => ({
  type: AUTH_PROCESS
})

export const authSuccess = (): IAuthSuccess => ({
  type: AUTH_SUCCESS
})

export const authFailed = (): IAuthFailed => ({
  type: AUTH_FAILED
})

export const authReset = (): IAuthReset => ({
  type: AUTH_RESET
})

export const authenticationEnch: AppThunk = () => {

  return function(dispatch: TAppDispatch) {
    dispatch(authProcess());

    if (localStorage.getItem('refreshToken')) {
      dispatch(authSuccess());
    } else {
      dispatch(authFailed());
    }
  }
}