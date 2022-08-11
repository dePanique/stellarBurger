import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_RESET,
} from "../actions/register-page";

const initialState = {
  success: false,
  request: false,
  failed: false,
}

export const signInStore = (state = initialState, action) => {

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