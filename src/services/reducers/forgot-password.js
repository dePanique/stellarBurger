import {
  REQUEST_NEW_PASS,
  REQUEST_NEW_PASS_SUCCESS,
  REQUEST_NEW_PASS_FAILED,
} from "../actions/forgot-password";

const initialState = {
  request: false,
  success: false,
  failed: false,
}

export const forgotPasswordStore = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_NEW_PASS:
      return {
        ...initialState,
        request: true,
      }

    case REQUEST_NEW_PASS_SUCCESS:
      return {
        ...initialState,
        request: false,
        success: true,
        failed: false,
      }

    case REQUEST_NEW_PASS_FAILED:
      return {
        ...initialState,
        failed: true,
      }

    default:
      return state;
  }
}