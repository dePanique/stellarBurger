import {
  AUTH_PROCESS,
  AUTH_SUCCESS,
  AUTH_FAILED
} from "../actions/auth"

const initialState ={
  request: false,
  success: false,
  failed: false,
}

export const authStore = ( state = initialState, action) => {
  switch (action.type) {
    case AUTH_PROCESS:
      return {
        ...state,
        request: true,
      }

    case AUTH_SUCCESS:
      return {
        ...state,
        request: false,
        success: true,
        failed: false,
      }

    case AUTH_FAILED:
      return {
        ...state,
        request: false,
        success: false,
        failed: true,
      }

    default:
      return state;
  }
}