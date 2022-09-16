import { AppThunk, TAppDispatch } from "../..";
import { postOrderId, checkResponse } from "../../utils/utils";
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

export const getOrder = (): IGetOrderFailed => ({
  type: GET_ORDER_FAILED
})

export const getOrderNumber: AppThunk = (ingredientsId: string) => {
  return async function (dispatch: TAppDispatch) {
    dispatch(getOrderRequest());

    await postOrderId(ingredientsId)
      .then((res) => {
        return checkResponse(res);
      })
      .catch((err) => {
        console.log(`ошибка в ответе сервера в getOrderNumber ${err}`);
      })
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          payload: res,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
        console.log(`ошибка после GET_ORDER_FAILED в getOrderNumber ${err}`);
      });
  };
}
