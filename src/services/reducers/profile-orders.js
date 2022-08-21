import {
  WS_PROFILE_ORDERS_START,
  WS_PROFILE_ORDERS_SUCCESS,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_SEND,
  WS_PROFILE_ORDERS_CLOSED,
  WS_PROFILE_ORDERS_FAILED,

  CLOSE_PROFILE_ORDERS_WS,
} from "../actions/profile-orders";

const initialState = {
  request: false,
  online: false,
  failed: false,
  data: {},
}

export const profileOrders = (state = initialState, action) => {
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
        data: {
          ...action.payload,
          orders: action.payload.orders.reverse()
        },
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