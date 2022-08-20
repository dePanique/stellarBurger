export const WS_FEED_START = 'WS_FEED_START';
export const WS_FEED_SUCCESS = 'WS_FEED_SUCCESS';
export const WS_FEED_MESSAGE = 'WS_FEED_MESSAGE';
export const WS_FEED_SEND = 'WS_FEED_SEND';
export const WS_FEED_CLOSED = 'WS_FEED_CLOSED';
export const WS_FEED_FAILED = 'WS_FEED_FAILED';
export const GET_FEED_INGREDIENTS = 'GET_FEED_INGREDIENTS';

export const feedEnch = (action) => {
  return function(dispatch) {

    if (action === 'start') {
      dispatch({
        type: WS_FEED_START,
      })
    } else {
      dispatch({
        type: WS_FEED_CLOSED,
      })
    }
  }
}