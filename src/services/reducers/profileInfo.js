import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
} from "../actions/profileInfo";

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
      };

    case SIGN_IN_SUCCESS:

      return {
        request: false,
        success: action.payload.success,
        failed: false,
      };

    case SIGN_IN_FAILED:

      return {
        ...initialState,
        failed: true,
      };

    default:
      return state;
  }
}