import {
  GET_PROFILE_ORDERS_FAILED,
  GET_PROFILE_ORDERS_SUCCESS,
  WS_PROFILE_ORDERS_START,
  WS_PROFILE_ORDERS_CLOSED,
} from "../actions/profile-orders";

const initialState = {
  request: false,
  online: false,
  success: false,
  failed: false,
  data: [],
}

export const profileOrders = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_ORDERS_SUCCESS:
      return {
        ...state,
        failed: false,
        success: true,
        data: action.payload,
      }

    case GET_PROFILE_ORDERS_FAILED:
      return {
        ...state,
        online: false,
        success: false,
        failed: true,
      }

    case WS_PROFILE_ORDERS_START:
      return {
        ...state,
        failed: false,
        request: true,
        success: false,
        online: false,
      }

    case WS_PROFILE_ORDERS_CLOSED:
      return {
        ...state,
        success: false,
        online: false,
      }
    default:
      return state;
  }
}