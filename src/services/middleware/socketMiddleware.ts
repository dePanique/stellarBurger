import { ThunkMiddleware } from "redux-thunk";
import { TSocketMiddleware } from "../../utils/type";
import { TWSconstant } from "../constants/websocket";


export const socketMiddleware: TSocketMiddleware = (wsActions) => {
  let socket: WebSocket | null = null

  return (store) => {

    return (next) => (action) => {
      const { dispatch, } = store;
      const { type, payload } = action;

      const {
        socketInit,
        onOpen,
        onMessage,
        onClose,
        onError,
        closeWS,
      } = wsActions;

      if (type === socketInit) {
        if (typeof payload === 'string') {
          if (socket?.url === payload) next(action);
          socket = new WebSocket(payload);
        }
      }

      if (socket) {

        socket.onopen = event => {
          dispatch({
            type: onOpen
          })
        };

        socket.onmessage = event => {
          dispatch({
            type: onMessage,
            payload: JSON.parse(event.data)
          })
        };

        socket.onclose = event => {
          dispatch({
            type: onClose,
            payload: event.code
          })
          socket = null
        };

        socket.onerror = event => {
          dispatch({
            type: onError,
            payload: event.type
          });
          socket = null
        };

        if (type === closeWS) {
          socket.close()
          socket = null
        }
      }

      next(action);
    };
  };
};
