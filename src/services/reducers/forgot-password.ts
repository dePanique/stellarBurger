import { TForgotPassword } from "../actions/forgot-password";
import {
  REQUEST_NEW_PASS,
  REQUEST_NEW_PASS_SUCCESS,
  REQUEST_NEW_PASS_FAILED,
  REQUEST_NEW_PASS_RESET,
} from "../constants/forgot-password";

export type TForgotPasswordStoreState = {
  request: boolean;
  success: boolean;
  failed: boolean;
}

const initialState: TForgotPasswordStoreState = {
  request: false,
  success: false,
  failed: false,
}

export const forgotPasswordStore = (state = initialState, action: TForgotPassword): TForgotPasswordStoreState => {
  switch (action.type) {
    case REQUEST_NEW_PASS:
      return {
        ...initialState,
        request: true,
      }

    case REQUEST_NEW_PASS_SUCCESS:
      return {
        ...initialState,
        success: true,
      }

    case REQUEST_NEW_PASS_FAILED:
      return {
        ...initialState,
        failed: true,
      }

    case REQUEST_NEW_PASS_RESET:
      return {
        ...initialState,
      }

    default:
      return state;
  }
}