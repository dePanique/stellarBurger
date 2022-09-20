import { TRegisterPage } from "../actions/register-page";
import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_RESET,
} from "../constants/register-page";

export type TSignInStoreState = {
  success: boolean,
  request: boolean,
  failed: boolean,
}

const initialState: TSignInStoreState = {
  success: false,
  request: false,
  failed: false,
}

export const signInStore = (state = initialState, action: TRegisterPage): TSignInStoreState => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        request: true,
        failed: false,
      };

    case SIGN_IN_SUCCESS:
      return {
        request: false,
        success: true,
        failed: false,
      };

    case SIGN_IN_FAILED:
      return {
        ...state,
        failed: true,
      };

    case SIGN_IN_RESET:
      return initialState

    default:
      return state;
  }
}