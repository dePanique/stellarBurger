import { AppThunk, TAppDispatch } from "../..";
import { postOrderId, checkResponses } from "../../utils/apiUtils";
import { getCookie } from "../../utils/cookies";
import { TResponseOrder } from "../../utils/type";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED
} from '../constants/order-details'

type TPayloadSuccess = {
  name: string;
  order: {
    number: number;
  }
}

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  payload: TPayloadSuccess;
}

export interface IGetOrderFailed {
  readonly type: typeof GET_ORDER_FAILED
}

export type TGetOrder =
  | IGetOrderRequest
  | IGetOrderSuccess
  | IGetOrderFailed


export const getOrderRequest = (): IGetOrderRequest => ({
  type: GET_ORDER_REQUEST
})

export const getOrderSuccess = (payload: TPayloadSuccess): IGetOrderSuccess => ({
  type: GET_ORDER_SUCCESS,
  payload
})

export const getOrderFailed = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})

export const getOrderNumber: AppThunk = (ingredientsId: string) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(getOrderRequest());

    try {
      const token = getCookie('accessToken')
      if (!token) throw new Error('badToken');
      const res: TResponseOrder = await postOrderId(ingredientsId, token).then((res) => checkResponses(res))
      dispatch(getOrderSuccess(res));
    } catch (err) {
      dispatch(getOrderFailed());
    }
  };
}
