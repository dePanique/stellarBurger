import {
  WS_PROFILE_ORDERS_START,
  WS_PROFILE_ORDERS_SUCCESS,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_SEND,
  WS_PROFILE_ORDERS_CLOSED,
  WS_PROFILE_ORDERS_FAILED,

  CLOSE_PROFILE_ORDERS_WS,
} from "../constants/profile-orders";
import { TProfileOrders } from "../actions/profile-orders";

type TProfileOrdersState = {
  request: boolean;
  online: boolean;
  failed: boolean;
}

const initialState: TProfileOrdersState = {
  request: false,
  online: false,
  failed: false,
}

export const profileOrders = (state = initialState, action: TProfileOrders): TProfileOrdersState => {
  switch (action.type) {
    case WS_PROFILE_ORDERS_START:
      return {
        ...state,
        request: true,
        online: false,
        failed: false,
      }

    case WS_PROFILE_ORDERS_SUCCESS:
      return {
        ...state,
        request: false,
        online: true,
        failed: false,
      }

    case WS_PROFILE_ORDERS_MESSAGE:
      return {
        ...state,
      }

    case WS_PROFILE_ORDERS_SEND:
      return {
        ...state,
      }

    case WS_PROFILE_ORDERS_FAILED:
      return {
        ...state,
        request: false,
        online: false,
        failed: true,
      }

    case WS_PROFILE_ORDERS_CLOSED:
      return {
        ...state,
        online: false,
      }

    case CLOSE_PROFILE_ORDERS_WS:
      return {
        ...state,
        online: false
      }

    default:
      return state;
  }
}