export const WS_START = 'WS_START';
export const WS_SUCCESS = 'WS_SUCCESS';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_SEND = 'WS_SEND';
export const WS_CLOSED = 'WS_CLOSED';
export const WS_FAILED = 'WS_FAILED';

export const CLOSE_WS = 'CLOSE_WS';

export const webSocketStart = (text) => {
  const action = {
    type: WS_START,
    payload: text
  }

  return action
}

export const closeWebSocket = () => {
  const action = {
    type: CLOSE_WS,
  }

  return action
}