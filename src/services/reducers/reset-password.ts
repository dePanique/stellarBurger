import { TResetPass } from "../actions/reset-password"
import {
  RESET_PASS,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAILED,
  RESET_PASS_INITIAL,
} from "../constants/reset-password"

export type TResetPassStoreState = {
  request: boolean,
  success: boolean,
  failed: boolean,
}

const initialState: TResetPassStoreState = {
  request: false,
  success: false,
  failed: false,
}

export const resetPassStore = (state = initialState, action: TResetPass): TResetPassStoreState => {
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

    case RESET_PASS_INITIAL: {
      return initialState
    }

    default:
      return state;
  }
}