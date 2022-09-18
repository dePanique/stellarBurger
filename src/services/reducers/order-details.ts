import { TGetOrder } from "../actions/order-details";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from "../constants/order-details";

export type TOrderDetailsState = {
  request: boolean;
  failed: boolean;
  name: string;
  number: number;
  success: boolean;
}

const initialState: TOrderDetailsState = {
  request: false,
  failed: false,
  name: "",
  number: 0,
  success: false,
};

export const orderDetails = (state = initialState, action: TGetOrder): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...initialState,
        request: true,
      };

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        success: true,
        name: action.payload.name,
        number: action.payload.order.number,
      };

    case GET_ORDER_FAILED:
      return {
        ...state,
        success: false,
        request: false,
        failed: true,
      };

    default:
      return state;
  }
};
