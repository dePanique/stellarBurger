import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from "../middleware/wsActionTypes";


export const wsConnectionSuccess = () => {
  console.log('succ');
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  console.log('err');
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  console.log('clos');
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = message => {
  console.log('getMess');
  return {
    type: WS_GET_MESSAGE,
  };
};

export const wsSendMessage = message => {
  console.log('sendMess');
  return {
    type: WS_SEND_MESSAGE,
  };
};
