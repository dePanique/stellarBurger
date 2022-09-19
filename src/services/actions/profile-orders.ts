import {
  WS_PROFILE_ORDERS_START,
  WS_PROFILE_ORDERS_SUCCESS,
  WS_PROFILE_ORDERS_MESSAGE,
  WS_PROFILE_ORDERS_SEND,
  WS_PROFILE_ORDERS_CLOSED,
  WS_PROFILE_ORDERS_FAILED,
  CLOSE_PROFILE_ORDERS_WS,
} from '../constants/profile-orders';

export interface IWSProfileOrdersStart {
  readonly type: typeof WS_PROFILE_ORDERS_START
}
export interface IWSProfileOrdersSuccess {
  readonly type: typeof WS_PROFILE_ORDERS_SUCCESS
}
export interface IWSProfileOrdersMessage {
  readonly type: typeof WS_PROFILE_ORDERS_MESSAGE
}
export interface IWSProfileOrdersSend {
  readonly type: typeof WS_PROFILE_ORDERS_SEND
}
export interface IWSProfileOrdersClosed {
  readonly type: typeof WS_PROFILE_ORDERS_CLOSED
}
export interface IWSProfileOrdersFailed {
  readonly type: typeof WS_PROFILE_ORDERS_FAILED
}
export interface ICloseProfileOrdersWS {
  readonly type: typeof CLOSE_PROFILE_ORDERS_WS
}

export type TProfileOrders =
  | IWSProfileOrdersStart
  | IWSProfileOrdersSuccess
  | IWSProfileOrdersMessage
  | IWSProfileOrdersSend
  | IWSProfileOrdersClosed
  | IWSProfileOrdersFailed
  | ICloseProfileOrdersWS

export const profileOrdersStart = (): IWSProfileOrdersStart => ({
  type: WS_PROFILE_ORDERS_START
})

export const profileOrdersSuccess = (): IWSProfileOrdersSuccess => ({
  type: WS_PROFILE_ORDERS_SUCCESS
})

export const profileOrdersMessage = (): IWSProfileOrdersMessage => ({
  type: WS_PROFILE_ORDERS_MESSAGE,
})

export const profileOrdersSend = (): IWSProfileOrdersSend => ({
  type: WS_PROFILE_ORDERS_SEND
})

export const profileOrdersClosed = (): IWSProfileOrdersClosed => ({
  type: WS_PROFILE_ORDERS_CLOSED
})

export const profileOrdersFailed = (): IWSProfileOrdersFailed => ({
  type: WS_PROFILE_ORDERS_FAILED
})

export const closeProfileOrdersWS = (): ICloseProfileOrdersWS => ({
  type: CLOSE_PROFILE_ORDERS_WS
})