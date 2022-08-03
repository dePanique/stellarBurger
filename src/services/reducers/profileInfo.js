import {
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
} from "../actions/profileInfo";

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

export const profileStore = (state = initialState, action) => {

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
        user: {
          email: action.payload.user.email,
          name: action.payload.user.name,
        },
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
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