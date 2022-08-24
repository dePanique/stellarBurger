import {
  WS_START,
  WS_SUCCESS,
  WS_MESSAGE,
  WS_SEND,
  WS_CLOSED,
  WS_FAILED,
} from "../actions/websocket";


const initialState = {
  request: false,
  failed: false,
  online: false,
  closeReason: '',
  data: [],
}

export const websocket = (state = initialState, action) => {
  switch (action.type) {
    case WS_START:
      return {
        ...initialState,
        request: true,
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
        failed: action.payload,
      }

    default:
      return state;
  }
}