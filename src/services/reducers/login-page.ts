import { TLogIn } from '../actions/login-page';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  LOG_IN_RESET,
  UPDATE_ACCESS_TOKEN_REQUEST,
  UPDATE_ACCESS_TOKEN_SUCCESS,
  UPDATE_ACCESS_TOKEN_FAILED
} from '../constants/login-page'

type TLoginStore = {
  success: boolean;
  user: {
    email: string;
    name: string;
  },
  request: boolean;
  failed: boolean;
  accessTokenStatus: {
    success: boolean;
    request: boolean;
    failed: boolean;
  }
}

const initialState: TLoginStore = {
  success: false,
  user: {
    email: '',
    name: '',
  },
  request: false,
  failed: false,
  accessTokenStatus: {
    success: false,
    request: false,
    failed: false,
  }
}

export const logInStore = (state:TLoginStore = initialState, action: TLogIn): TLoginStore => {
  switch (action.type) {
    case LOG_IN_REQUEST:
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

    case UPDATE_ACCESS_TOKEN_REQUEST:
      return {
        ...state,
        accessTokenStatus: {
          ...state.accessTokenStatus,
          request: true,
          failed: false,
        },
      };

    case UPDATE_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
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