import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_IN_RESET,
  UPDATE_ACCESS_TOKEN,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED,
} from "../actions/login-page";

const initialState = {
  success: false,
  user: {
    email: '',
    name: '',
  },
  accessToken: '',
  refreshToken: '',
  request: false,
  failed: false,
  accessTokenStatus: {
    success: false,
    request: false,
    failed: false,
  }
}

export const logInStore = (state = initialState, action) => {
  switch (action.type) {

    case LOG_IN:

      return {
        ...state,
        request: true,
      };

    case LOG_IN_SUCCESS:

      return {
        ...state,
        request: false,
        success: action.payload.success,
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name,
        },
        accessToken: 0,
        refreshToken: 0,
        failed: false,
        accessTokenStatus: {
          ...state.accessTokenStatus,
          success: true,
          failed: false,
        }
      };

    case LOG_IN_FAILED:

      return {
        ...initialState,
        failed: true,
      };

    case UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessTokenStatus: {
          ...state.accessTokenStatus,
          request: true,
        },
      };

    case UPDATE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: 0,
        accessTokenStatus: {
          ...state.accessTokenStatus,
          request: false,
          success: true,
        },
      };

    case UPDATE_ACCESS_TOKEN_FAILED:
      return {
        ...state,
        accessTokenStatus: {
          request: false,
          success: false,
          failed: true,
        },
      };

    case LOG_IN_RESET:
      return initialState;

    default:
      return state;
  }
}