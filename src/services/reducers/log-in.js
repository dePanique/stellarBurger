import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
} from "../actions/log-in";

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
        request: false,
        success: action.payload.success,
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name,
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        failed: false,
      };

    case LOG_IN_FAILED:

      return {
        ...initialState,
        failed: true,
      };

    default:
      return state;
  }
}