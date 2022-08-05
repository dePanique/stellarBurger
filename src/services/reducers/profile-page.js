import {
  LOG_OUT,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILED,
  LOG_OUT_RESET,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  USER_INFO_RESET,
} from "../actions/profile-page";

const initialState ={
  logout: {
    success: false,
    request: false,
    failed: false,
  },
  userInfo: {
    name: '',
    email: '',
    pass: '',
    request: false,
    success: false,
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
          ...initialState.logout,
          success: true,
        },
        userInfo: {
          ...initialState.userInfo
        }
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

    case GET_USER_INFO:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          request: true,
          failed: false,
        }
      }

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          request: false,
          success: true,
          name: action.payload.name,
          email: action.payload.email,
          failed: false,
        }
      }

    case GET_USER_INFO_FAILED:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          request: false,
          failed: action.paylod,
        }
      }

    case USER_INFO_RESET:
      return {
        ...state,
        userInfo: {
          ...initialState.userInfo,
        }
      }

    default:
      return state;
  }
}