import { GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from '../actions/order-details'

const initialState = {
  request: false,
  failed: false,
  name: '',
  number: '',
}

export const orderDetails = (state=initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        request: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        name: action.payload.name,
        number: action.payload.order.number,
      };

    case GET_ORDER_FAILED:
      return {
        ...state,
        request: false,
        failed: true,
      };

    default:
      return state;
  }
}