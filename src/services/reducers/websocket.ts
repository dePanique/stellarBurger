import {
  WS_START,
  WS_SUCCESS,
  WS_MESSAGE,
  WS_SEND,
  WS_CLOSED,
  WS_FAILED,
} from "../constants/websocket";
import { TWSData } from '../../utils/type'
import { TWebSocket } from "../actions/websocket";

export type TWebSocketState = {
  request: boolean;
  failed: boolean;
  online: boolean;
  closeReason: string;
  data: TWSData;
  url: string;
}

const initialState: TWebSocketState = {
  request: false,
  failed: false,
  online: false,
  closeReason: '',
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
  },
  url: '',
}

export const websocket = (state = initialState, action: TWebSocket) => {
  switch (action.type) {
    case WS_START:
      return {
        ...initialState,
        request: true,
        url: action.payload
      }

    case WS_SUCCESS:
      return {
        ...state,
        request: false,
        failed: false,
        online: true,
      }

    case WS_MESSAGE:
      return {
        ...state,
        data: action.payload,
      }

    case WS_SEND:
      return {
        ...state,
      }

    case WS_CLOSED:
      return {
        ...state,
        online: false,
        closeReason: action.payload
      }

    case WS_FAILED:
      return {
        ...state,
        request: false,
        online: false,
        failed: true,
      }

    default:
      return state;
  }
}