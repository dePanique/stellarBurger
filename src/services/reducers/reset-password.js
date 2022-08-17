import {
  RESET_PASS,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILED,
} from "../actions/reset-password"

const initialState = {
  request: false,
  success: false,
  failed: false,
}

export const resetPassStore = (state = initialState, action) => {
  switch (action.type) {
    case RESET_PASS:
      return {
        ...initialState,
        request: true,
      }

    case RESET_PASS_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
        failed: false,
      }

    case RESET_PASS_FAILED: {
      return {
        ...state,
        request: false,
        failed: true,
      }
    }

    default:
      return state;
  }
}