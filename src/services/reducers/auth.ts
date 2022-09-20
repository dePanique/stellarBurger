import { TAuth } from "../actions/auth";
import {
  AUTH_PROCESS,
  AUTH_SUCCESS,
  AUTH_FAILED,
  AUTH_RESET,
} from "../constants/auth";

export interface IAuthStoreState {
  request: boolean;
  success: boolean;
  failed: boolean;
}

const initialState: IAuthStoreState ={
  request: false,
  success: false,
  failed: false,
}

export const authStore = ( state = initialState, action: TAuth): IAuthStoreState => {
  switch (action.type) {
    case AUTH_PROCESS:
      return {
        ...initialState,
        request: true,
      }

    case AUTH_SUCCESS:
      return {
        ...initialState,
        success: true,
      }

    case AUTH_FAILED:
      return {
        ...initialState,
        failed: true,
      }

    case AUTH_RESET:
      return {
        ...initialState,
      }

    default:
      return state;
  }
}