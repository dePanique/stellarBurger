import { TWSData } from '../../utils/type';
import {
WS_START,
WS_SUCCESS,
WS_MESSAGE,
WS_SEND,
WS_CLOSED,
WS_FAILED,
CLOSE_WS,
} from '../constants/websocket';

export interface IWSStart {
  readonly type: typeof WS_START;
  readonly payload: string;
}
export interface IWSSuccess {
  readonly type: typeof WS_SUCCESS;
  readonly payload: null
}
export interface IWSMessage {
  readonly type: typeof WS_MESSAGE;
  payload: TWSData;
}
export interface IWSSend {
  readonly type: typeof WS_SEND;
  readonly payload: null

}
export interface IWSClosed {
  readonly type: typeof WS_CLOSED;
  payload: string;
}
export interface IWSFailed {
  readonly type: typeof WS_FAILED;
  readonly payload: null

}
export interface IWSCloseWS {
  readonly type: typeof CLOSE_WS;
  readonly payload: null

}

export type TWebSocket =
  | IWSStart
  | IWSSuccess
  | IWSMessage
  | IWSSend
  | IWSClosed
  | IWSFailed
  | IWSCloseWS

export const wsStart = (url: string):IWSStart => ({
  type: WS_START,
  payload: url
})

export const wsSuccess = ():IWSSuccess => ({
  type: WS_SUCCESS,
  payload: null
})

export const wsMessage = (data: TWSData):IWSMessage => ({
  type: WS_MESSAGE,
  payload: data
})

export const wsSend = ():IWSSend => ({
  type: WS_SEND,
  payload: null

})

export const wsClosed = (text: string):IWSClosed => ({
  type: WS_CLOSED,
  payload: text
})

export const wsFailed = ():IWSFailed => ({
  type: WS_FAILED,
  payload: null

})

export const wsCloseWS = ():IWSCloseWS => ({
  type: CLOSE_WS,
  payload: null
})

export const WSActions = {
  socketInit: wsStart,
  onOpen: wsSuccess,
  onMessage: wsMessage,
  onClose: wsSend,
  onError: wsClosed,
  closeWS: wsCloseWS,
}