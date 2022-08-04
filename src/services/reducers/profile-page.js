import {
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  LOG_OUT_RESET,
} from "../actions/profile-page";

const initialState ={
  logout: {
    success: false,
    request: false,
    failed: false,
  }
}

export const profilePageStore = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        logout: {
          ...state.logout,
          request: true,
        },
      }

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logout: {
          ...state.logout,
          success: true,
          request: false,
        },
      }

    case LOG_OUT_FAILED:
      return {
        ...state,
        logout: {
          ...state.logout,
          request: false,
          failed: true,
        },
      }

    case LOG_OUT_RESET:
      return {
        ...state,
        logout: {
          ...initialState.logout
        },
      }

    default:
      return state;
  }
}