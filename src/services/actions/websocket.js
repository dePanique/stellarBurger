export const WS_START = 'WS_START';
export const WS_SUCCESS = 'WS_SUCCESS';
export const WS_MESSAGE = 'WS_MESSAGE';
export const WS_SEND = 'WS_SEND';
export const WS_CLOSED = 'WS_CLOSED';
export const WS_FAILED = 'WS_FAILED';

export const CLOSE_WS = 'CLOSE_WS';

export const wsEnch = (wsUrl, action) => {
  return function (dispatch) {

    if (action === 'start') {
      dispatch({
        type: WS_START,
        payload: wsUrl,
      })
    }

    if (action === 'close') {
      dispatch({
        type: CLOSE_WS,
      })
    }

  }
}